export type ProjectCategory = "data" | "web" | "consulting";

export interface Project {
  title: string;
  category: ProjectCategory;
  description: string;
  image: string;
  technologies: string[];
  featured?: boolean;
  url?: string;
}

export interface GitHubRepository {
  id: number;
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
}
