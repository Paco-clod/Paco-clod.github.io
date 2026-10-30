import { useEffect, useRef, useState } from "react";
import { getKemyAnswer, type KemyMessage } from "../kemy";
import type { GitHubRepository } from "../types";

interface KemyAssistantProps {
  repositories: GitHubRepository[];
}

const welcomeMessage: KemyMessage = {
  id: 1,
  role: "assistant",
  content: "Bienvenue sur le portfolio de M. Pacôme SODAZINDJI. Que puis-je faire pour vous ?",
};

export default function KemyAssistant({ repositories }: KemyAssistantProps) {
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<KemyMessage[]>([welcomeMessage]);
  const nextId = useRef(2);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function submitQuestion(value = question) {
    const trimmedQuestion = value.trim();
    if (!trimmedQuestion) return;

    const answer = getKemyAnswer(trimmedQuestion, repositories);
    setMessages((current) => [
      ...current,
      { id: nextId.current++, role: "user", content: trimmedQuestion },
      { id: nextId.current++, role: "assistant", content: answer.content, links: answer.links },
    ]);
    setQuestion("");
  }

  return (
    <aside className={open ? "kemy-widget is-open" : "kemy-widget"} aria-label="Assistant Kemy">
      {open && (
        <div className="kemy-panel">
          <div className="kemy-panel-header">
            <div className="kemy-avatar" aria-hidden="true">K</div>
            <div><strong>Kemy</strong><span>Assistant du portfolio</span></div>
            <button type="button" className="kemy-close" onClick={() => setOpen(false)} aria-label="Fermer Kemy">×</button>
          </div>
          <div className="kemy-messages" aria-live="polite">
            {messages.map((message) => (
              <div className={`kemy-message ${message.role}`} key={message.id}>
                <p>{message.content}</p>
                {message.role === "assistant" && message.links?.map((link) => (
                  <a href={link.href} key={link.href} target={link.href.startsWith("http") ? "_blank" : undefined} rel={link.href.startsWith("http") ? "noreferrer" : undefined} onClick={() => link.href.startsWith("#") && setOpen(false)}>{link.label} →</a>
                ))}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="kemy-suggestions">
            <button type="button" onClick={() => submitQuestion("Quel est son parcours ?")}>Son parcours</button>
            <button type="button" onClick={() => submitQuestion("Quels sont ses projets ?")}>Ses projets</button>
            <button type="button" onClick={() => submitQuestion("Comment le contacter ?")}>Le contacter</button>
          </div>
          <form className="kemy-form" onSubmit={(event) => { event.preventDefault(); submitQuestion(); }}>
            <label className="sr-only" htmlFor="kemy-question">Votre question</label>
            <input id="kemy-question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Posez votre question..." autoComplete="off" />
            <button type="submit" aria-label="Envoyer la question">➤</button>
          </form>
        </div>
      )}
      {!open && <span className="kemy-hint">Besoin d’une information ?</span>}
      <button className="kemy-launcher" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-label={open ? "Fermer Kemy" : "Ouvrir Kemy"}>
        <span className="kemy-launcher-icon">K</span>
        <span className="kemy-launcher-label">Kemy</span>
      </button>
    </aside>
  );
}
