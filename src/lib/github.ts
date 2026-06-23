const GITHUB_API = "https://api.github.com";
const CACHE_TTL = 60 * 60 * 1000; // 1 hour

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

function getCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(`gh_${key}`);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (Date.now() - entry.timestamp > CACHE_TTL) {
      localStorage.removeItem(`gh_${key}`);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function setCache<T>(key: string, data: T): void {
  if (typeof window === "undefined") return;
  try {
    const entry: CacheEntry<T> = { data, timestamp: Date.now() };
    localStorage.setItem(`gh_${key}`, JSON.stringify(entry));
  } catch {
    // localStorage full or unavailable
  }
}

export interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string;
}

export interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
  topics: string[];
}

export async function fetchGitHubUser(
  username: string
): Promise<GitHubUser | null> {
  const cached = getCache<GitHubUser>(`user_${username}`);
  if (cached) return cached;

  try {
    const res = await fetch(`${GITHUB_API}/users/${username}`);
    if (!res.ok) return null;
    const data = await res.json();
    setCache(`user_${username}`, data);
    return data;
  } catch {
    return null;
  }
}

export async function fetchGitHubRepos(
  username: string
): Promise<GitHubRepo[]> {
  const cached = getCache<GitHubRepo[]>(`repos_${username}`);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${GITHUB_API}/users/${username}/repos?sort=updated&per_page=6`
    );
    if (!res.ok) return [];
    const data = await res.json();
    setCache(`repos_${username}`, data);
    return data;
  } catch {
    return [];
  }
}

export async function fetchLanguages(
  username: string
): Promise<Record<string, number>> {
  const repos = await fetchGitHubRepos(username);
  const languages: Record<string, number> = {};

  for (const repo of repos) {
    if (repo.language) {
      languages[repo.language] = (languages[repo.language] || 0) + 1;
    }
  }

  return languages;
}
