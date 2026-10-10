"use client";

import type { AskResult, MatchResult } from "./engine";

// Response shapes from /api/assistant (engine results, plus transport errors).
type TransportError = { kind: "error"; message: string };
export type AskResponse = AskResult | TransportError;
export type MatchResponse = MatchResult | TransportError;

async function post<T>(mode: "ask" | "match", text: string): Promise<T> {
  try {
    const res = await fetch("/api/assistant", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode, text }),
    });
    return (await res.json()) as T;
  } catch {
    return { kind: "error", message: "Couldn't reach the assistant. Check your connection and try again." } as T;
  }
}

export const askPortfolio = (question: string) => post<AskResponse>("ask", question);
export const matchJobDescription = (jd: string) => post<MatchResponse>("match", jd);
