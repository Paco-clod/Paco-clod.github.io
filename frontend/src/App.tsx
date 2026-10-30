import { useEffect, useMemo, useState, type FormEvent } from "react";
import { projects, timeline } from "./data";
import { fetchRepositories } from "./services/githubApi";
import { sendContactMessage } from "./services/portfolioApi";
import type { GitHubRepository, ProjectCategory } from "./types";

type Theme = "dark" | "light";
type Filter = "all" | ProjectCategory;
type Page = "home" | "projects" | "github" | "interventions" | "contact";

const categoryLabels: Record<Filter, string> = {
  all: "Toutes les réalisations",
  data: "Data & IA",
  web: "Web, mobile & SEO",
  consulting: "Consulting SI",
};

function App() {
  const [page, setPage] = useState<Page>(() => getPageFromHash());
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark",
  );
  const [filter, setFilter] = useState<Filter>("all");
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [githubState, setGithubState] = useState<"idle" | "loading" | "error">("idle");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => setPage(getPageFromHash());
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const controller = new AbortController();
    setGithubState("loading");
    fetchRepositories(controller.signal)
      .then((items) => {
        setRepositories(items);
        setGithubState("idle");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("Unable to load GitHub repositories", error);
        setGithubState("error");
      });
    return () => controller.abort();
  }, []);

  const visibleProjects = useMemo(
    () => projects.filter((project) => filter === "all" || project.category === filter),
    [filter],
  );

  const navigate = (target: Page) => {
    window.location.hash = target === "home" ? "accueil" : target;
    setPage(target);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <button className="brand brand-button" type="button" onClick={() => navigate("home")}>
          Pacôme<span>SODAZINDJI</span>
        </button>
        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span /><span /><span />
        </button>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"}>
          <button onClick={() => navigate("home")}>Accueil</button>
          <button onClick={() => navigate("projects")}>Réalisations</button>
          <button onClick={() => navigate("github")}>Code & Open Source</button>
          <button onClick={() => navigate("interventions")}>Interventions & prix</button>
          <button onClick={() => navigate("contact")}>Contact</button>
          <button className="theme-toggle" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "☼ Clair" : "☾ Sombre"}
          </button>
        </nav>
      </header>

      <main>
        {page === "projects" && <ProjectsPage filter={filter} setFilter={setFilter} visibleProjects={visibleProjects} />}
        {page === "github" && <GitHubPage repositories={repositories} githubState={githubState} />}
        {page === "interventions" && <InterventionsPage />}
        {page === "contact" && <ContactPage />}
        {page === "home" && <HomePage navigate={navigate} filter={filter} setFilter={setFilter} visibleProjects={visibleProjects} repositories={repositories} githubState={githubState} />}
      </main>
      <footer>© 2026 Pacôme SODAZINDJI · React · TypeScript · FastAPI · MongoDB Atlas</footer>
    </div>
  );
}

function getPageFromHash(): Page {
  const hash = window.location.hash.replace("#", "");
  return hash === "projects" || hash === "github" || hash === "interventions" || hash === "contact" ? hash : "home";
}

interface HomePageProps {
  navigate: (page: Page) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  visibleProjects: typeof projects;
  repositories: GitHubRepository[];
  githubState: "idle" | "loading" | "error";
}

function HomePage({ navigate, filter, setFilter, visibleProjects, repositories, githubState }: HomePageProps) {
  return (
    <>
      <section className="hero section" id="accueil">
        <div className="hero-copy">
          <p className="eyebrow">Étudiant en Master 1 · ESIEE-IT · Pontoise</p>
          <h1>Big Data &<br />Intelligence Artificielle</h1>
          <p className="professional-title">Expert en ingénierie informatique et innovation numérique.</p>
          <p className="intro">Je conçois des solutions où la donnée devient un levier de décision, d’innovation et de transformation durable.</p>
          <div className="actions">
            <a className="button primary" href="/CV_Pacome_SODAZINDJI_Data_IA.pdf" download>Télécharger le CV</a>
            <a className="button secondary" href="tel:+33605837368">Appeler</a>
            <a className="button whatsapp" href="https://wa.me/33605837368" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </div>
        <img className="hero-image" src="/photo_pro.jpg" alt="Portrait professionnel de Pacôme SODAZINDJI" />
      </section>
      <section className="availability section"><p className="eyebrow">Recherche active</p><h2>Stage M1 à partir d’avril 2027</h2><p>Alternance M2 à partir de septembre, octobre ou novembre 2027 · Île-de-France et France.</p></section>
      <section className="section story" id="parcours">
        <p className="eyebrow">Trajectoire</p><h2>Des fondations techniques à l’IA appliquée</h2>
        <p>Après un <strong>baccalauréat scientifique</strong>, j’ai obtenu une <strong>Licence en Génie Télécoms et TIC</strong> à l’UCAO/EGEI de Cotonou, en tant que <strong>major de promotion</strong>.</p>
        <p>À Sèmè City, dans le cadre de ma formation <strong>IA 360 en partenariat avec Sorbonne Université</strong>, j’ai conçu <strong>AgroClimat</strong>, une solution d’aide à la décision pour la résilience agricole. Cette réalisation a ouvert la voie à un stage au <strong>SCAI — Sorbonne Center for Artificial Intelligence</strong>.</p>
        <p>Le projet a reçu deux <strong>2ᵉ Prix DSI Awards 2024</strong>, en <strong>Data Science & IA</strong> et en <strong>Agriculture</strong>, après vote public et décision des jurys et des DSI. J’ai également été <strong>panéliste/communicateur ERSUMA-OHADA</strong>.</p>
        <p>Après des missions pour la LNB et la GIZ, j’ai exercé comme <strong>Responsable SI chez GDB & ASSOCIÉS jusqu’en août 2026</strong>, en pilotant notamment AXI’HOM et des projets de digitalisation.</p>
      </section>
      <TimelineSection />
      <section className="section home-projects"><p className="eyebrow">Sélection</p><h2>Réalisations stratégiques</h2><ProjectGrid projects={visibleProjects.slice(0, 3)} /><button className="button primary" onClick={() => navigate("projects")}>Voir toutes les réalisations</button></section>
      <section className="section home-repos"><p className="eyebrow">Ingénierie logicielle</p><h2>Code & Open Source</h2>{githubState === "loading" && <p>Chargement des dépôts...</p>}{githubState === "error" && <p className="error">Les dépôts GitHub sont momentanément indisponibles.</p>}<RepoGrid repositories={repositories.slice(0, 3)} /></section>
    </>
  );
}

function ProjectsPage({ filter, setFilter, visibleProjects }: { filter: Filter; setFilter: (filter: Filter) => void; visibleProjects: typeof projects }) {
  return <section className="section page-section"><p className="eyebrow">Portfolio de réalisations</p><h1 className="page-heading">Réalisations & Projets</h1><p className="intro">Des projets Data, IA, web et transformation numérique conçus pour répondre à des enjeux concrets.</p><Filters filter={filter} setFilter={setFilter} /><ProjectGrid projects={visibleProjects} /></section>;
}

function Filters({ filter, setFilter }: { filter: Filter; setFilter: (filter: Filter) => void }) {
  return <div className="filters" role="group" aria-label="Filtrer les projets">{(Object.keys(categoryLabels) as Filter[]).map((key) => <button className={filter === key ? "filter active" : "filter"} key={key} type="button" onClick={() => setFilter(key)}>{categoryLabels[key]}</button>)}</div>;
}

function ProjectGrid({ projects: items }: { projects: typeof projects }) {
  return <div className="project-grid">{items.map((project) => <article className="project-card" key={project.title}><img src={project.image} alt="" /><div><p className="card-kicker">{categoryLabels[project.category]}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>{project.url && <a className="project-link" href={project.url} target="_blank" rel="noreferrer">Découvrir le projet →</a>}</div></article>)}</div>;
}

function GitHubPage({ repositories, githubState }: { repositories: GitHubRepository[]; githubState: "idle" | "loading" | "error" }) {
  return <section className="section page-section"><p className="eyebrow">Dépôts & expérimentations</p><h1 className="page-heading">Code & Open Source</h1><p className="intro">Une sélection de projets techniques et de travaux Data/IA disponibles sur GitHub.</p>{githubState === "loading" && <p>Chargement des dépôts...</p>}{githubState === "error" && <p className="error">Les dépôts GitHub sont momentanément indisponibles.</p>}<RepoGrid repositories={repositories} /></section>;
}

function InterventionsPage() {
  return <section className="section page-section"><p className="eyebrow">Prises de parole & reconnaissance</p><h1 className="page-heading">Interventions, Colloques & Distinctions</h1><p className="intro">Une trajectoire qui associe recherche appliquée, engagement institutionnel et innovation numérique.</p><div className="feature-grid">
    <article className="feature-card"><p className="card-kicker">ERSUMA · OHADA</p><h2>Panéliste & communicateur</h2><p><strong>« L’intelligence artificielle et l’Afrique : regards croisés des juristes, politistes, économistes et sociologues »</strong>. Intervention à Porto-Novo et en visioconférence dans le cadre du Forum Intelligence Artificielle et Droit Africain.</p><a href="/Attestation_ERSUMA_OHADA.png" target="_blank" rel="noreferrer">Voir l’attestation →</a></article>
    <article className="feature-card"><p className="card-kicker">COPMAN 2025</p><h2>Digitalisation événementielle</h2><p>Création et déploiement du site web officiel du Congrès Panafricain des Maladies Neuromusculaires, avec appui technique, logistique et communication digitale.</p></article>
    <article className="feature-card award"><img src="/dsi_awards_data_ia.jpg" alt="Prix DSI Awards Data Science et IA" /><h2>2ᵉ Prix — Data Science & IA</h2><p>DSI Awards Bénin 2024 · Club DSI & EY.</p></article>
    <article className="feature-card award"><img src="/dsi_awards_agriculture.jpg" alt="Prix DSI Awards Agriculture" /><h2>2ᵉ Prix — Agriculture</h2><p>Distinction obtenue pour AgroClimat et son application de l’IA à la résilience agricole.</p></article>
    <article className="feature-card"><p className="card-kicker">Attestations professionnelles</p><h2>Satisfaction & bonne exécution</h2><p>Attestations liées aux missions de digitalisation, aux tableaux de bord Power BI et à la gestion d’infrastructures SI.</p><a href="/Attestation-Satisfaction.pdf" target="_blank" rel="noreferrer">Consulter l’attestation →</a></article>
  </div></section>;
}

function TimelineSection() {
  return <section className="section timeline-section"><p className="eyebrow">Parcours académique</p><h2>Formation & certifications</h2><div className="timeline-modern">{timeline.map((entry, index) => <article className={`timeline-modern-item ${entry.kind}`} key={entry.title}><span className="timeline-icon">{entry.kind === "diploma" ? "🎓" : "✦"}<b>{String(index + 1).padStart(2, "0")}</b></span><div><p className="card-kicker">{entry.period}</p><h3>{entry.title}</h3><p><strong>{entry.institution}</strong> · {entry.description}</p></div></article>)}</div></section>;
}

function ContactPage() {
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setSending(true); setStatus("Envoi en cours…");
    try {
      await sendContactMessage({ nom: String(form.get("nom") || ""), email: String(form.get("email") || ""), telephone: `${form.get("code_pays")} ${form.get("telephone") || ""}`.trim(), sujet: String(form.get("sujet") || ""), message: String(form.get("message") || "") });
      event.currentTarget.reset(); setStatus("Message envoyé avec succès.");
    } catch { setStatus("La transmission a échoué. Réessayez plus tard."); }
    finally { setSending(false); }
  }
  return <section className="section page-section"><p className="eyebrow">Échangeons</p><h1 className="page-heading">Contact & prise de rendez-vous</h1><p className="intro">Réservez un créneau ou écrivez-moi pour une opportunité de stage, d’alternance ou une mission Data & IA.</p><div className="contact-details"><a href="mailto:comepaco0@gmail.com">✉ comepaco0@gmail.com</a><a href="tel:+33605837368">☎ +33 6 05 83 73 68</a><span>⌖ Île-de-France · Goussainville / Pontoise</span></div><div className="contact-layout"><div><h2>Réserver un créneau</h2><iframe className="calendly-frame" title="Réserver un rendez-vous Calendly" src="https://calendly.com/comepaco0?embed_domain=sodazindj-pacome.me&embed_type=Inline" /></div><form className="contact-form" onSubmit={handleSubmit}><h2>Envoyer un message</h2><label>Nom complet *<input name="nom" required /></label><label>Adresse e-mail *<input name="email" type="email" required /></label><label>Téléphone<div className="phone-row"><select name="code_pays" defaultValue="+33"><option value="+33">🇫🇷 France (+33)</option><option value="+229">🇧🇯 Bénin (+229)</option><option value="+1">🇺🇸/🇨🇦 USA/Canada (+1)</option><option value="+44">🇬🇧 Royaume-Uni (+44)</option></select><input name="telephone" type="tel" /></div></label><label>Sujet *<input name="sujet" required /></label><label>Message *<textarea name="message" rows={5} required /></label><button className="button primary" disabled={sending}>{sending ? "Envoi…" : "Envoyer le message"}</button><p className={status.includes("succès") ? "form-success" : "form-status"}>{status}</p></form></div></section>;
}

function RepoGrid({ repositories }: { repositories: GitHubRepository[] }) {
  return <div className="repo-grid">{repositories.map((repository) => <article className="repo-card" key={repository.id}><div><h3>{repository.name}</h3><span>★ {repository.stargazers_count}</span></div><p>{repository.description || "Projet logiciel et expérimentation technique."}</p><a href={repository.html_url} target="_blank" rel="noreferrer">{repository.language || "Multi-langages"} · Voir le code →</a></article>)}</div>;
}

export default App;
