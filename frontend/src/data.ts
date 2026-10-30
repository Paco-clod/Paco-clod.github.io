import type { Project } from "./types";

export const projects: Project[] = [
  {
    title: "NFL Big Data Bowl Paris",
    category: "data",
    description: "Analyse de données sportives et modélisation pour extraire des indicateurs de performance.",
    image: "/photo_de_profil.jpeg",
    technologies: ["Python", "Pandas", "Machine Learning"],
    featured: true,
  },
  {
    title: "AgroClimat",
    category: "data",
    description: "Solution IA conçue à Sèmè City avec Sorbonne Université pour soutenir la résilience agricole face au changement climatique.",
    image: "/dsi_awards_agriculture.jpg",
    technologies: ["IA", "Data Science", "Agriculture"],
    featured: true,
    url: "https://agroclimat.streamlit.app/",
  },
  {
    title: "AXI'HOM — Capital humain",
    category: "consulting",
    description: "SaaS RH enrichi par l'IA pour structurer le pilotage du capital humain.",
    image: "/axihom-logo-header.avif",
    technologies: ["SaaS", "IA", "SI"],
    featured: true,
    url: "https://axi-hom.com",
  },
  {
    title: "APG DEO GRATIAS BUSINESS",
    category: "web",
    description: "Plateforme de réservation et de services pour événements, séjours et déplacements.",
    image: "/LogoAPG-removebg.webp",
    technologies: ["Web", "Réservation", "UX"],
    url: "https://wa.me/33605837368",
  },
  {
    title: "AS Capital Investment",
    category: "web",
    description: "Conception du site web, stratégie SEO et présence digitale du cabinet.",
    image: "/photo_with_awards.jpg",
    technologies: ["Web", "SEO", "Stratégie digitale"],
    url: "https://ascapitalinvestment.fr",
  },
];

export interface TimelineEntry {
  kind: "diploma" | "certification";
  period: string;
  title: string;
  institution: string;
  description: string;
}

export const timeline: TimelineEntry[] = [
  { kind: "diploma", period: "2026–2027 · En cours", title: "Master 1 Expert en ingénierie informatique — Big Data & IA", institution: "ESIEE-IT · Pontoise", description: "Formation actuelle en données massives, intelligence artificielle et ingénierie logicielle." },
  { kind: "certification", period: "Juillet 2026", title: "Introduction PMI-CPMAI", institution: "Project Management Institute", description: "Fondamentaux du pilotage de projets d’intelligence artificielle." },
  { kind: "certification", period: "Juin 2026", title: "Python Project for Data Engineering", institution: "IBM / Coursera", description: "Python appliqué aux pipelines et aux traitements de données." },
  { kind: "certification", period: "Mai 2025", title: "IBM Data Analyst", institution: "IBM / Coursera", description: "Analyse, SQL, Python et visualisation des données." },
  { kind: "certification", period: "Décembre 2024", title: "Business Analysis Fundamentals", institution: "Microsoft / Coursera", description: "Analyse métier et formalisation des besoins." },
  { kind: "certification", period: "Septembre 2024", title: "Intelligence Artificielle 360", institution: "Sorbonne Université / Sèmè City", description: "Machine Learning, enjeux éthiques et réglementation de l’IA." },
  { kind: "certification", period: "Mai 2024", title: "Dashboards avec Power BI", institution: "OpenClassrooms", description: "Visualisation et aide à la décision." },
  { kind: "certification", period: "Juin 2023", title: "Data Analyst", institution: "Africa TechUp Tour / iSHEERO", description: "Analyse et valorisation des données." },
  { kind: "diploma", period: "2019–2022", title: "Licence en Génie Télécoms & TIC", institution: "UCAO — EGEI · Cotonou", description: "Major de promotion. Réseaux, systèmes et technologies de l’information." },
  { kind: "diploma", period: "Formation initiale", title: "Baccalauréat scientifique", institution: "Bénin", description: "Fondations scientifiques et analytiques." },
];
