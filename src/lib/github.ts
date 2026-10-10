// Server-side GitHub data for the "Live from GitHub" panel. Runs at build time
// and again at most once an hour (ISR), so visitors never hit the API directly.
import { PINNED_FALLBACK } from "./constants";

const GITHUB_API = "https://api.github.com";
const REVALIDATE = 60 * 60; // 1 hour

export interface GitHubRepo {
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  pushed_at: string;
}

export interface GitHubSummary {
  publicRepos: number;
  pinned: GitHubRepo[];
  languages: [string, number][]; // across pinned repos, most common first
  pinnedFromProfile: boolean; // false when the fallback list was used
}

function apiHeaders(): HeadersInit {
  const headers: Record<string, string> = { Accept: "application/vnd.github+json" };
  // Optional: raises the API rate limit from 60 to 5,000 requests/hour.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  return headers;
}

async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: apiHeaders(), next: { revalidate: REVALIDATE } });
  if (!res.ok) throw new Error(`GitHub ${res.status} for ${url}`);
  return res.json();
}

/**
 * The REST API doesn't expose pinned repositories, so read them from the
 * public profile page. Only the user's own repositories are kept.
 */
async function fetchPinnedNames(username: string): Promise<string[] | null> {
  try {
    const res = await fetch(`https://github.com/${username}`, { next: { revalidate: REVALIDATE } });
    if (!res.ok) return null;
    const html = await res.text();
    const start = html.indexOf("pinned-items");
    if (start === -1) return null;
    const rest = html.slice(start);
    const end = rest.indexOf("</ol>");
    const section = end > 0 ? rest.slice(0, end) : rest.slice(0, 60_000);
    const names = [...section.matchAll(/href="\/([^/"]+)\/([^/"#?]+)"/g)]
      .filter((m) => m[1].toLowerCase() === username.toLowerCase())
      .map((m) => m[2]);
    const unique = [...new Set(names)];
    return unique.length > 0 ? unique.slice(0, 6) : null;
  } catch {
    return null;
  }
}

export async function fetchGitHubSummary(username: string): Promise<GitHubSummary | null> {
  try {
    const scraped = await fetchPinnedNames(username);
    const names = scraped ?? PINNED_FALLBACK;

    const [user, repos] = await Promise.all([
      getJson<{ public_repos: number }>(`${GITHUB_API}/users/${username}`),
      Promise.all(
        names.map((n) =>
          getJson<GitHubRepo>(`${GITHUB_API}/repos/${username}/${n}`).catch(() => null)
        )
      ),
    ]);

    const pinned = repos.filter((r): r is GitHubRepo => r !== null);
    const counts: Record<string, number> = {};
    for (const repo of pinned) {
      if (repo.language) counts[repo.language] = (counts[repo.language] || 0) + 1;
    }

    return {
      publicRepos: user.public_repos,
      pinned,
      languages: Object.entries(counts).sort((a, b) => b[1] - a[1]),
      pinnedFromProfile: scraped !== null,
    };
  } catch {
    return null;
  }
}
