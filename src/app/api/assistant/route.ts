import { NextResponse, type NextRequest } from "next/server";
import { ask, matchJob, MAX_JOB_DESCRIPTION, MAX_QUESTION } from "@/lib/assistant/engine";

export const dynamic = "force-dynamic";

// Best-effort rate limit per visitor (per server instance): 20 requests / 10 min.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 20;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // keep memory bounded
  return recent.length > LIMIT;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { kind: "error", message: "Too many questions in a short time. Please try again in a few minutes." },
      { status: 429 }
    );
  }

  let body: { mode?: unknown; text?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ kind: "error", message: "Invalid request." }, { status: 400 });
  }

  const text = typeof body.text === "string" ? body.text.trim() : "";
  if (!text) return NextResponse.json({ kind: "error", message: "Please enter some text." }, { status: 400 });

  if (body.mode === "ask") {
    if (text.length > MAX_QUESTION) {
      return NextResponse.json({ kind: "error", message: `Please keep questions under ${MAX_QUESTION} characters.` }, { status: 400 });
    }
    return NextResponse.json(await ask(text));
  }

  if (body.mode === "match") {
    if (text.length > MAX_JOB_DESCRIPTION) {
      return NextResponse.json(
        { kind: "error", message: `Please trim the job description to under ${MAX_JOB_DESCRIPTION.toLocaleString()} characters.` },
        { status: 400 }
      );
    }
    return NextResponse.json(await matchJob(text));
  }

  return NextResponse.json({ kind: "error", message: "Unknown mode." }, { status: 400 });
}
