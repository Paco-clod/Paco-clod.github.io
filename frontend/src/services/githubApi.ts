import type { GitHubRepository } from "../types";

const GITHUB_ENDPOINT =
  "https://api.github.com/users/Paco-clod/repos?sort=updated&per_page=100";

export async function fetchRepositories(
  signal?: AbortSignal,
): Promise<GitHubRepository[]> {
  const response = await fetch(GITHUB_ENDPOINT, { signal });
  if (!response.ok) {
    throw new Error(`GitHub API responded with ${response.status}`);
  }

  const repositories: unknown = await response.json();
  if (!Array.isArray(repositories)) {
    throw new Error("Invalid GitHub API response");
  }

  return repositories as GitHubRepository[];
}
