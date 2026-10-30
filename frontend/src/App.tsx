import { useEffect, useMemo, useState } from "react";
import { projects } from "./data";
import KemyAssistant from "./components/KemyAssistant";
import { fetchRepositories } from "./services/githubApi";
import type { GitHubRepository, ProjectCategory } from "./types";

type Theme = "dark" | "light";
type Filter = "all" | ProjectCategory;

const categoryLabels: Record<Filter, string> = {
  all: "Toutes les réalisations",
  data: "Data & IA",
  web: "Web, mobile & SEO",
  consulting: "Consulting SI",
};

function App() {
  const [theme, setTheme] = useState<Theme>(() =>
    localStorage.getItem("portfolio-theme") === "light" ? "light" : "dark",
  );
  const [filter, setFilter] = useState<Filter>("all");
  const [repositories, setRepositories] = useState<GitHubRepository[]>([]);
  const [githubState, setGithubState] = useState<"idle" | "loading" | "error">("idle");
  const [menuOpen, setMenuOpen] = useState(false);

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

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#accueil" onClick={() => setMenuOpen(false)}>
          Pacôme<span>SODAZINDJI</span>
        </a>
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
          <a href="#parcours" onClick={() => setMenuOpen(false)}>Parcours</a>
          <a href="#realisations" onClick={() => setMenuOpen(false)}>Réalisations</a>
          <a href="#opensource" onClick={() => setMenuOpen(false)}>Open Source</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
          <button className="theme-toggle" type="button" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
            {theme === "dark" ? "☼ Clair" : "☾ Sombre"}
          </button>
        </nav>
      </header>

      <main>
        <section className="hero section" id="accueil">
          <div className="hero-copy">
            <p className="eyebrow">Étudiant en Master 1 · ESIEE-IT · Pontoise</p>
            <h1>Big Data &<br />Intelligence Artificielle</h1>
            <p className="professional-title">Expert en ingénierie informatique et innovation numérique.</p>
            <p className="intro">
              Je conçois des solutions où la donnée devient un levier de décision,
              d’innovation et de transformation durable.
            </p>
            <div className="actions">
              <a className="button primary" href="assets/CV_Pacome_SODAZINDJI_Data_IA.pdf" download>Télécharger le CV</a>
              <a className="button secondary" href="tel:+33605837368">Appeler</a>
              <a className="button whatsapp" href="https://wa.me/33605837368" target="_blank" rel="noreferrer">WhatsApp</a>
            </div>
          </div>
          <img className="hero-image" src="/photo_pro.jpg" alt="Portrait professionnel de Pacôme SODAZINDJI" />
        </section>

        <section className="availability section">
          <p className="eyebrow">Recherche active</p>
          <h2>Stage M1 à partir d’avril 2027</h2>
          <p>Alternance M2 à partir de septembre, octobre ou novembre 2027 · Île-de-France et France.</p>
        </section>

        <section className="section story" id="parcours">
          <p className="eyebrow">Trajectoire</p>
          <h2>Des fondations techniques à l’IA appliquée</h2>
          <p>Après un <strong>baccalauréat scientifique</strong>, j’ai obtenu une <strong>Licence en Génie Télécoms et TIC</strong> à l’UCAO/EGEI de Cotonou, en tant que <strong>major de promotion</strong>.</p>
          <p>À Sèmè City, dans le cadre de ma formation <strong>IA 360 en partenariat avec Sorbonne Université</strong>, j’ai conçu <strong>AgroClimat</strong>, une solution d’aide à la décision pour la résilience agricole. Cette réalisation a ouvert la voie à un stage au <strong>SCAI — Sorbonne Center for Artificial Intelligence</strong>.</p>
          <p>Le projet a ensuite reçu deux <strong>2ᵉ Prix DSI Awards 2024</strong>, en <strong>Data Science & IA</strong> et en <strong>Agriculture</strong>, après vote public et décision des jurys et des DSI. J’ai également été <strong>panéliste/communicateur ERSUMA-OHADA</strong> sur l’intelligence artificielle et l’Afrique.</p>
          <p>Après des missions pour la LNB et la GIZ, j’ai exercé comme <strong>Responsable SI chez GDB & ASSOCIÉS jusqu’en août 2026</strong>, en pilotant notamment AXI’HOM et des projets de digitalisation.</p>
        </section>

        <section className="section" id="realisations">
          <p className="eyebrow">Portfolio de réalisations</p>
          <h2>Projets Data, IA & transformation numérique</h2>
          <div className="filters" role="group" aria-label="Filtrer les projets">
            {(Object.keys(categoryLabels) as Filter[]).map((key) => (
              <button className={filter === key ? "filter active" : "filter"} key={key} type="button" onClick={() => setFilter(key)}>
                {categoryLabels[key]}
              </button>
            ))}
          </div>
          <div className="project-grid">
            {visibleProjects.map((project) => (
              <article className="project-card" key={project.title}>
                <img src={project.image} alt="" />
                <div><p className="card-kicker">{categoryLabels[project.category]}</p><h3>{project.title}</h3><p>{project.description}</p><div className="tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="opensource">
          <p className="eyebrow">Ingénierie logicielle</p>
          <h2>Code & Open Source</h2>
          {githubState === "loading" && <p>Chargement des dépôts...</p>}
          {githubState === "error" && <p className="error">Les dépôts GitHub sont momentanément indisponibles.</p>}
          <div className="repo-grid">
            {repositories.slice(0, 6).map((repository) => (
              <article className="repo-card" key={repository.id}>
                <div><h3>{repository.name}</h3><span>★ {repository.stargazers_count}</span></div>
                <p>{repository.description || "Projet logiciel et expérimentation technique."}</p>
                <a href={repository.html_url} target="_blank" rel="noreferrer">{repository.language || "Multi-langages"} · Voir le code →</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <p className="eyebrow">Échangeons</p>
          <h2>Un projet Data, IA ou SI ?</h2>
          <p>Un besoin métier, une idée ou un défi numérique : discutons de la manière de lui donner une forme mesurable.</p>
          <a className="button primary" href="mailto:comepaco0@gmail.com">Me contacter par email</a>
        </section>
      </main>
      <KemyAssistant repositories={repositories} />
      <footer>© 2026 Pacôme SODAZINDJI · React · TypeScript · FastAPI · MongoDB Atlas</footer>
    </div>
  );
}

export default App;
