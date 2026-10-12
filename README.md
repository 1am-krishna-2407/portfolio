# Krishna Kumar Jha — Portfolio

**AI Engineer · Machine Learning Engineer · Computer Vision Engineer · Full-Stack & Backend Developer**

Live: **https://portfolio-alpha-sage-21.vercel.app**

A recruiter-focused portfolio designed as an *annotated engineering document*: a precise, paper-like layout where Krishna's own seal-and-signature detector "reads" the page, drawing detection boxes around key content. Every claim on the site links to evidence: case studies, measured metrics, source code.

---

## Highlights

- **Role editions.** One site, ordered for the reader:
  - `/?role=ai` leads with AI / ML work and the AI resume
  - `/?role=fullstack` leads with full-stack and backend work and the full-stack resume
  - `/` is the general edition
  Editions are prebuilt pages (served through a Next.js proxy rewrite), so there's no layout flicker.
- **Ask the portfolio.** A grounded LLM assistant (Google Gemini) that answers recruiters' questions **only** from the portfolio's content, cites the section behind every claim, and replies with a fixed "not available, contact Krishna" message for anything outside it.
- **Job-description matching.** Paste a JD to get a fit report: fit score, matching skills, relevant projects, supporting experience, gaps and interview talking points, each with sources.
- **Case studies in two domains.** *AI, ML & computer vision* and *full-stack & backend*, each with problem → constraints → approach → architecture → results → next steps.
- **Live GitHub references.** The repositories pinned on the GitHub profile, refreshed hourly.
- **Recruiter shortcuts.** TL;DR one-page brief, resume picker (AI / ML or full-stack PDF), skills as a list or a domains × projects grid, light/dark themes.
- **Easter egg.** Press <kbd>`</kbd> for a terminal (`help`, `ask <question>`, `sudo hire krishna`).

## Featured projects

| Code | Project | Domain | Headline result |
|---|---|---|---|
| A.1 | [AI Support Ticket Resolution](https://github.com/1am-krishna-2407/ai-support-ticket-resolution) | RAG · NLP | 0.956 Hit@5 on a 51-case benchmark |
| A.2 | [Seal & Signature Detection](https://github.com/1am-krishna-2407/Computer-Vision-Based-Seal-and-Signature-Detection-for-Legal-Documents) | Computer vision | 97.1% mAP@50 (YOLOv8) |
| A.3 | [Heart Disease Prediction](https://github.com/1am-krishna-2407/heart-disease) | Machine learning | Real-time Streamlit dashboard |
| B.1 | CodeFlow — Secure Code Execution | Backend | Docker-sandboxed async jobs in 3 languages |
| B.2 | [DevFlow](https://github.com/1am-krishna-2407/dev-flow) | Full-stack | Spring Boot + live GitHub activity |
| B.3 | [Personal Expense Tracking System](https://github.com/1am-krishna-2407/Expense-Traq) | Full-stack | JWT rotation, SQL-backed reports |

## Tech stack

- **Framework:** Next.js 16 (App Router, ISR, Proxy), React 19, TypeScript
- **Styling:** Tailwind CSS v4, Newsreader + IBM Plex type, custom design tokens (light/dark)
- **Motion:** `motion` (respects `prefers-reduced-motion`)
- **AI:** Google Gemini (`generateContent` with JSON-schema output), server-side only
- **Data:** GitHub REST API (cached hourly), EmailJS for the contact form
- **Hosting:** Vercel

## Project structure

```
src/
  app/
    page.tsx              General edition
    for/[role]/page.tsx   Role editions (ai, fullstack)
    api/assistant/        Assistant API route (ask + job matching)
  proxy.ts                Rewrites /?role=… to the matching edition
  components/             Page sections (hero, work, systems, stack, …)
  lib/
    constants.ts          ← all site content lives here
    assistant/            Prompt, citation catalog, profile builder, client
    github.ts             Pinned-repository fetcher
scripts/
  assistant-eval.mjs      Evaluation harness for the assistant
  assistant-cases.json    32 test cases (facts, refusals, injections, JD matching)
public/                   Photo and the two resume PDFs
```

**Editing content:** almost everything (roles, projects, skills, experience, certifications, editions) is in [`src/lib/constants.ts`](src/lib/constants.ts). The assistant's knowledge is generated from the same file, so the site and the assistant never drift apart.

## Running locally

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev                  # http://localhost:3000
```

Other scripts:

```bash
npm run build            # production build
npm run lint             # ESLint
npm run eval:assistant   # run the assistant evaluation (site must be running)
```

## Environment variables

See [`.env.example`](.env.example). None are required to build; features degrade gracefully without them.

| Variable | Purpose | Without it |
|---|---|---|
| `GEMINI_API_KEY` | Portfolio assistant | Assistant shows relevant sections instead of answers |
| `GEMINI_MODEL` / `GEMINI_BACKUP_MODEL` | Override models (defaults: `gemini-3.5-flash-lite`, backup `gemini-3.6-flash`) | Defaults used |
| `GITHUB_TOKEN` | Higher GitHub API rate limit | Works at 60 requests/hour |
| `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`, `EMAILJS_PUBLIC_KEY` (the `NEXT_PUBLIC_` versions also work) | Contact form delivery | Form shows an "email me directly" fallback |
| `HF_API_KEY`, `HF_EMBEDDING_MODEL` | Reserved for future retrieval (Qwen3-Embedding) | Not used yet |

Never commit `.env.local`; it's ignored by git.

## How the assistant stays accurate

1. **Whole-profile context, no retrieval.** The profile is small enough to send in full, so nothing can be missed by search.
2. **Structured output.** Gemini returns JSON matching a fixed schema at temperature 0.
3. **Server-side grounding gates.** Every citation must match a real section; answers without valid citations become the fixed "not available" reply, and unsupported "met" requirements are downgraded.
4. **Hygiene.** HTML is stripped, links not found in the profile are removed, inputs are length-capped and rate-limited, and pasted job descriptions are treated as data, never instructions.
5. **Evaluated.** `npm run eval:assistant` runs 32 cases, covering facts, formatting, refusals, prompt injection and JD matching. Current result: 32/32.

## Contact

- Email: krishnajha2004@gmail.com
- LinkedIn: https://www.linkedin.com/in/krishnaaa-here/
- GitHub: https://github.com/1am-krishna-2407
- LeetCode: https://leetcode.com/u/Krishna_17/
