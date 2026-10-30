import type { GitHubRepository } from "./types";

export interface KemyMessage {
  id: number;
  role: "assistant" | "user";
  content: string;
  links?: Array<{ label: string; href: string }>;
}

export interface KemyAnswer {
  content: string;
  links?: Array<{ label: string; href: string }>;
}

const profileLinks = {
  cv: "assets/CV_Pacome_SODAZINDJI_Data_IA.pdf",
  phone: "tel:+33605837368",
  whatsapp: "https://wa.me/33605837368",
  calendly: "https://calendly.com/comepaco0",
  github: "https://github.com/Paco-clod",
  linkedin: "https://www.linkedin.com/in/pacome-sodazindji-55a6821b/",
};

function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function hasAny(message: string, terms: string[]): boolean {
  return terms.some((term) => message.includes(term));
}

export function getKemyAnswer(
  question: string,
  repositories: GitHubRepository[],
): KemyAnswer {
  const message = normalize(question);

  if (!message) {
    return {
      content: "Je peux vous renseigner sur son parcours, ses projets, ses distinctions, ses certifications, GitHub ou les moyens de le contacter.",
    };
  }

  if (hasAny(message, ["bonjour", "salut", "hello", "bienvenue", "bonsoir"])) {
    return {
      content: "Bienvenue sur le portfolio de M. Pacôme SODAZINDJI. Que puis-je faire pour vous ?",
    };
  }

  if (hasAny(message, ["cv", "curriculum", "resume", "telecharger"])) {
    return {
      content: "Vous pouvez télécharger son CV professionnel au format PDF.",
      links: [{ label: "Télécharger le CV", href: profileLinks.cv }],
    };
  }

  if (hasAny(message, ["appeler", "telephone", "numero", "joindre", "tel"])) {
    return {
      content: "Vous pouvez joindre Pacôme directement au +33 6 05 83 73 68.",
      links: [{ label: "Appeler directement", href: profileLinks.phone }],
    };
  }

  if (hasAny(message, ["whatsapp", "message"])) {
    return {
      content: "Vous pouvez lui écrire directement sur WhatsApp.",
      links: [{ label: "Écrire sur WhatsApp", href: profileLinks.whatsapp }],
    };
  }

  if (hasAny(message, ["rendez-vous", "rendez vous", "agenda", "calendly", "disponibilite"])) {
    return {
      content: "Vous pouvez réserver un créneau dans son agenda Calendly.",
      links: [{ label: "Réserver un rendez-vous", href: profileLinks.calendly }],
    };
  }

  if (hasAny(message, ["linkedin", "profil professionnel"])) {
    return {
      content: "Voici son profil professionnel LinkedIn.",
      links: [{ label: "Voir LinkedIn", href: profileLinks.linkedin }],
    };
  }

  if (hasAny(message, ["github", "depot", "code source", "open source"])) {
    const repositoryNames = repositories
      .slice(0, 5)
      .map((repository) => repository.name)
      .join(", ");
    const suffix = repositoryNames
      ? ` Les dépôts récemment chargés incluent notamment : ${repositoryNames}.`
      : "";
    return {
      content: `Pacôme publie ses travaux techniques sur GitHub.${suffix}`,
      links: [{ label: "Voir GitHub", href: profileLinks.github }],
    };
  }

  if (hasAny(message, ["agroclimat", "agriculture", "climat"])) {
    return {
      content: "AgroClimat est un projet d’intelligence artificielle conçu à Sèmè City en partenariat avec Sorbonne Université. Il vise à soutenir la résilience agricole face aux effets du changement climatique. Le projet a reçu deux 2ᵉ Prix DSI Awards 2024 : Data Science & IA et Agriculture.",
      links: [{ label: "Voir les réalisations", href: "#realisations" }],
    };
  }

  if (hasAny(message, ["prix", "distinction", "award", "recompense"])) {
    return {
      content: "Pacôme a reçu deux 2ᵉ Prix DSI Awards 2024 pour AgroClimat : le prix Data Science & IA et le prix Agriculture. Il a également participé à des interventions institutionnelles, notamment comme panéliste/communicateur à l’ERSUMA/OHADA.",
      links: [{ label: "Voir les distinctions", href: "#interventions" }],
    };
  }

  if (hasAny(message, ["formation", "diplome", "master", "certification", "etude"])) {
    return {
      content: "Pacôme est étudiant en Master 1 Big Data & Intelligence Artificielle à l’ESIEE-IT, à Pontoise. Il est titulaire d’une Licence en Génie Télécoms et TIC obtenue à l’UCAO/EGEI de Cotonou, où il a été major de promotion. Son parcours comprend également des certifications en IA, Data Analytics, Python, Power BI, Business Analysis et gestion de projets IA.",
      links: [{ label: "Voir le parcours", href: "#parcours" }],
    };
  }

  if (hasAny(message, ["experience", "parcours professionnel", "gdb", "giz", "lnb", "axi"])) {
    return {
      content: "Son expérience comprend des missions de transformation numérique pour la LNB et la GIZ, un stage en IA au SCAI — Sorbonne Center for Artificial Intelligence — et une expérience de Responsable SI chez GDB & ASSOCIÉS, terminée en août 2026. Il a notamment travaillé sur AXI’HOM, la digitalisation et les indicateurs décisionnels.",
      links: [{ label: "Découvrir son parcours", href: "#parcours" }],
    };
  }

  if (hasAny(message, ["stage", "alternance", "recrut", "opportunite", "emploi"])) {
    return {
      content: "Pacôme recherche un stage de Master 1 à partir d’avril 2027, puis une alternance de Master 2 à partir de septembre 2027, avec une disponibilité possible en octobre ou novembre selon les calendriers d’entreprise. Les domaines ciblés sont la Data Engineering, la Data Science, la Business Intelligence, l’IA et le pilotage de projets Data.",
      links: [
        { label: "Télécharger le CV", href: profileLinks.cv },
        { label: "Prendre rendez-vous", href: profileLinks.calendly },
      ],
    };
  }

  return {
    content: "Je ne trouve pas cette information dans les données vérifiées du portfolio. Je peux vous renseigner sur son parcours, ses projets, ses distinctions, ses certifications, GitHub, LinkedIn ou les moyens de le contacter.",
    links: [
      { label: "Télécharger le CV", href: profileLinks.cv },
      { label: "Contacter Pacôme", href: "mailto:comepaco0@gmail.com" },
    ],
  };
}
