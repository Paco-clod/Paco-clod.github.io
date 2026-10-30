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
  },
  {
    title: "AXI'HOM — Capital humain",
    category: "consulting",
    description: "SaaS RH enrichi par l'IA pour structurer le pilotage du capital humain.",
    image: "/axihom-logo-header.avif",
    technologies: ["SaaS", "IA", "SI"],
    featured: true,
  },
  {
    title: "APG DEO GRATIAS BUSINESS",
    category: "web",
    description: "Plateforme de réservation et de services pour événements, séjours et déplacements.",
    image: "/LogoAPG-removebg.webp",
    technologies: ["Web", "Réservation", "UX"],
  },
  {
    title: "AS Capital Investment",
    category: "web",
    description: "Conception du site web, stratégie SEO et présence digitale du cabinet.",
    image: "/photo_with_awards.jpg",
    technologies: ["Web", "SEO", "Stratégie digitale"],
  },
];
