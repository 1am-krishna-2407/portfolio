"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { GitBranch, Star, GitFork, ExternalLink } from "lucide-react";
import {
  fetchGitHubUser,
  fetchGitHubRepos,
  fetchLanguages,
  type GitHubUser,
  type GitHubRepo,
} from "@/lib/github";
import { PERSONAL } from "@/lib/constants";

const LANG_COLORS: Record<string, string> = {
  Python: "#3572A5",
  Java: "#B07219",
  JavaScript: "#F1E05A",
  TypeScript: "#3178C6",
  "C++": "#F34B7D",
  HTML: "#E34C26",
  CSS: "#563D7C",
  Jupyter: "#DA5B0B",
  Shell: "#89E051",
};

export default function GitHubDashboard() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [languages, setLanguages] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const [u, r, l] = await Promise.all([
        fetchGitHubUser(PERSONAL.github),
        fetchGitHubRepos(PERSONAL.github),
        fetchLanguages(PERSONAL.github),
      ]);
      setUser(u);
      setRepos(r);
      setLanguages(l);
      setLoading(false);
    }
    load();
  }, []);

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);
  const totalLangCount = Object.values(languages).reduce((s, v) => s + v, 0);

  return (
    <section id="github" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-3 py-1 rounded-full text-xs font-mono text-accent-cyan glass mb-4">
            LIVE DATA
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            GitHub <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-text-muted max-w-lg mx-auto">
            Real-time engineering analytics powered by the GitHub API.
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-text-dim">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass font-mono text-sm">
              <span className="w-2 h-2 rounded-full bg-accent-blue animate-pulse" />
              Fetching GitHub data...
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {[
                {
                  label: "Repositories",
                  value: user?.public_repos || repos.length,
                  icon: GitBranch,
                  color: "#3B82F6",
                },
                {
                  label: "Stars",
                  value: totalStars,
                  icon: Star,
                  color: "#F59E0B",
                },
                {
                  label: "Forks",
                  value: totalForks,
                  icon: GitFork,
                  color: "#22C55E",
                },
                {
                  label: "Languages",
                  value: Object.keys(languages).length,
                  icon: () => <span className="text-lg">💻</span>,
                  color: "#8B5CF6",
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="p-4 rounded-xl bg-bg-card border border-border-subtle text-center"
                >
                  <stat.icon
                    className="w-5 h-5 mx-auto mb-2"
                    style={{ color: stat.color }}
                  />
                  <div
                    className="text-2xl font-bold font-mono"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-xs text-text-dim uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Languages */}
            {Object.keys(languages).length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="p-5 rounded-xl bg-bg-card border border-border-subtle"
              >
                <h3 className="text-sm font-mono text-text-dim uppercase tracking-wider mb-4">
                  Top Languages
                </h3>

                {/* Language bar */}
                <div className="flex rounded-full overflow-hidden h-3 mb-4">
                  {Object.entries(languages)
                    .sort((a, b) => b[1] - a[1])
                    .map(([lang, count]) => (
                      <div
                        key={lang}
                        className="transition-all duration-500"
                        style={{
                          width: `${(count / totalLangCount) * 100}%`,
                          background:
                            LANG_COLORS[lang] || "#64748B",
                        }}
                        title={`${lang}: ${count} repos`}
                      />
                    ))}
                </div>

                {/* Language labels */}
                <div className="flex flex-wrap gap-4">
                  {Object.entries(languages)
                    .sort((a, b) => b[1] - a[1])
                    .map(([lang, count]) => (
                      <div key={lang} className="flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{
                            background:
                              LANG_COLORS[lang] || "#64748B",
                          }}
                        />
                        <span className="text-xs text-text-muted">
                          {lang}{" "}
                          <span className="text-text-dim">
                            {((count / totalLangCount) * 100).toFixed(0)}%
                          </span>
                        </span>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Repositories */}
            {repos.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-sm font-mono text-text-dim uppercase tracking-wider mb-4">
                  Recent Repositories
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {repos.slice(0, 6).map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-4 rounded-xl bg-bg-card border border-border-subtle card-hover"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm font-semibold text-accent-blue group-hover:text-accent-cyan transition-colors truncate">
                          {repo.name}
                        </h4>
                        <ExternalLink className="w-3.5 h-3.5 text-text-dim flex-shrink-0 mt-0.5" />
                      </div>
                      {repo.description && (
                        <p className="text-xs text-text-muted line-clamp-2 mb-3">
                          {repo.description}
                        </p>
                      )}
                      <div className="flex items-center gap-4 text-xs text-text-dim">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2.5 h-2.5 rounded-full"
                              style={{
                                background:
                                  LANG_COLORS[repo.language] || "#64748B",
                              }}
                            />
                            {repo.language}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star className="w-3 h-3" />
                            {repo.stargazers_count}
                          </span>
                        )}
                        {repo.forks_count > 0 && (
                          <span className="flex items-center gap-1">
                            <GitFork className="w-3 h-3" />
                            {repo.forks_count}
                          </span>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </motion.div>
            )}

            {/* View on GitHub */}
            <div className="text-center pt-4">
              <a
                href={`https://github.com/${PERSONAL.github}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg glass text-text-muted hover:text-accent-blue transition-colors text-sm font-medium"
              >
                View Full GitHub Profile
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
