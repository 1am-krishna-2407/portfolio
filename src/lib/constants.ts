// All portfolio content lives here. Lines marked "REVIEW" are copy written
// during the redesign — check them against the facts before publishing.

// ─── Personal ────────────────────────────────────────────────────────────────
export const PERSONAL = {
  name: "Krishna Kumar Jha",
  initials: "KKJ",
  revision: "2026.10",
  roles: [
    "AI Engineer",
    "Machine Learning Engineer",
    "Computer Vision Engineer",
    "Full-Stack & Backend Developer",
  ],
  thesis:
    "I build AI and machine-learning systems, and the backends that put them in production.",
  abstract:
    "Computer-science engineer working where models meet infrastructure. I build retrieval-augmented LLM applications, train and evaluate vision and ML models, and design the APIs, queues and containers that let them run reliably. Currently open to AI, machine-learning and software-engineering roles.",
  email: "krishnajha2004@gmail.com",
  github: "1am-krishna-2407",
  githubUrl: "https://github.com/1am-krishna-2407",
  linkedin: "https://www.linkedin.com/in/krishnaaa-here/",
  leetcode: "https://leetcode.com/u/Krishna_17/",
  photo: "/instant.jpeg",
  openTo: [
    "AI Engineering",
    "Machine Learning",
    "Software Engineering",
    "Backend Engineering",
  ],
};

// ─── Resumes & role editions ─────────────────────────────────────────────────
// A recruiter can open a role-specific edition of the site with
// /?role=ai or /?role=fullstack (also /for/ai, /for/fullstack). The edition
// reorders the page around that role and makes the matching resume the default.
export type RoleId = "ai" | "fullstack";

export interface Resume {
  role: RoleId;
  label: string;
  short: string; // e.g. on the one-click button: "Resume · AI / ML"
  summary: string;
  href: string;
}

export const RESUMES: Resume[] = [
  {
    role: "ai",
    label: "AI / ML Engineer",
    short: "AI / ML",
    summary: "LLMs, RAG, computer vision, machine learning",
    href: "/Krishna-Kumar-Jha-AI-ML-Engineer.pdf",
  },
  {
    role: "fullstack",
    label: "Full-Stack / Software Engineer",
    short: "Full-Stack",
    summary: "React, FastAPI, Spring Boot, PostgreSQL, Docker",
    href: "/Krishna-Kumar-Jha-Full-Stack-Engineer.pdf",
  },
];

export const resumeFor = (role: RoleId) => RESUMES.find((r) => r.role === role)!;

export interface Edition {
  id: RoleId;
  name: string; // shown in the hero overline
  title: string; // page <title>
  roles: string[];
  thesis: string;
  abstract: string;
  domainOrder: ("ai" | "web")[];
  firstSchematic: string; // Systems tab opened first
  tldrProjects: string[]; // project ids, in order
  tldrStack: string[];
}

export const EDITIONS: Record<RoleId, Edition> = {
  ai: {
    id: "ai",
    name: "AI / ML edition",
    title: "Krishna Kumar Jha — AI & Machine Learning Engineer",
    roles: ["AI Engineer", "Machine Learning Engineer", "Computer Vision Engineer", "Full-Stack & Backend Developer"],
    thesis: "I build AI and machine-learning systems, and the backends that put them in production.",
    abstract:
      "Engineer working where models meet infrastructure. I build retrieval-augmented LLM applications with measured evaluation, train and ship computer-vision and ML models, and design the APIs and containers that let them run reliably. Currently open to AI and machine-learning engineering roles.",
    domainOrder: ["ai", "web"],
    firstSchematic: "ai",
    tldrProjects: ["ai-support", "seal-detection", "heart-disease", "codeflow"],
    tldrStack: ["Python", "RAG", "pgvector", "LLM evaluation", "YOLOv8", "OpenCV", "Scikit-Learn", "PyTorch", "FastAPI", "PostgreSQL", "Docker"],
  },
  fullstack: {
    id: "fullstack",
    name: "Full-stack edition",
    title: "Krishna Kumar Jha — Full-Stack & Software Engineer",
    roles: ["Software Engineer", "Full-Stack & Backend Developer", "AI Systems Engineer"],
    thesis: "I build full-stack and backend systems, and the AI features that run on them.",
    abstract:
      "Software engineer who builds full-stack and backend systems: React and TypeScript front ends over FastAPI, Express and Spring Boot services, PostgreSQL and Redis for data, Docker for isolation and deployment. Async job processing, authentication and API security are recurring themes. Currently open to software-engineering, full-stack and backend roles.",
    domainOrder: ["web", "ai"],
    firstSchematic: "backend",
    tldrProjects: ["codeflow", "expense-tracker", "devflow", "ai-support"],
    tldrStack: ["TypeScript", "React", "Node.js", "Express", "FastAPI", "Spring Boot", "PostgreSQL", "Redis", "Prisma", "Docker", "JWT"],
  },
};

/** Accepted ?role= values and what they map to. */
export const ROLE_ALIASES: Record<string, RoleId> = {
  ai: "ai",
  ml: "ai",
  "ai-ml": "ai",
  aiml: "ai",
  "machine-learning": "ai",
  fullstack: "fullstack",
  "full-stack": "fullstack",
  backend: "fullstack",
  swe: "fullstack",
  software: "fullstack",
  web: "fullstack",
};

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Work", href: "#work", number: "02" },
  { label: "Systems", href: "#systems", number: "03" },
  { label: "Stack", href: "#stack", number: "04" },
  { label: "Experience", href: "#experience", number: "05" },
  { label: "Contact", href: "#contact", number: "08" },
];

// ─── 01 Capabilities ────────────────────────────────────────────────────────
export type Focus = "ai" | "web" | "both";

export const CAPABILITIES: {
  label: string;
  domain: Focus;
  description: string;
  evidence: { text: string; href: string };
}[] = [
  {
    label: "AI Engineering",
    domain: "ai",
    description: "RAG pipelines, hybrid retrieval, LLM evaluation and guardrails.",
    evidence: { text: "AI Support Ticket Resolution", href: "#work-ai-support" },
  },
  {
    label: "Machine Learning",
    domain: "ai",
    description: "Predictive models, feature engineering and honest evaluation.",
    evidence: { text: "Heart Disease Prediction", href: "#work-heart-disease" },
  },
  {
    label: "Computer Vision",
    domain: "ai",
    description: "Object detection with YOLO and OpenCV image pipelines.",
    evidence: { text: "Seal & Signature Detection", href: "#work-seal-detection" },
  },
  {
    label: "Backend Engineering",
    domain: "web",
    description: "Async job processing, REST design, authentication and rate limiting.",
    evidence: { text: "CodeFlow", href: "#work-codeflow" },
  },
  {
    label: "Full-Stack Development",
    domain: "web",
    description: "React and TypeScript front ends over layered, typed APIs.",
    evidence: { text: "Expense Tracking System", href: "#work-expense-tracker" },
  },
  {
    label: "Problem Solving",
    domain: "both",
    description: "250+ data-structures and algorithms problems solved.",
    evidence: { text: "LeetCode profile", href: "https://leetcode.com/u/Krishna_17/" },
  },
];

// ─── 02 Projects ────────────────────────────────────────────────────────────
export interface Metric {
  label: string;
  value: string;
  verified?: boolean; // measured result, gets the VERIFIED stamp
}

export interface ChartBar {
  label: string;
  value: number; // 0–100, sets the bar length
  display: string; // what is printed, e.g. "0.956" or "97.1%"
}

export type DomainId = "ai" | "web";

export const DOMAINS: { id: DomainId; letter: string; title: string; summary: string }[] = [
  {
    id: "ai",
    letter: "A",
    title: "AI, machine learning & computer vision",
    summary: "LLM applications, trained models and the evaluation that keeps them honest.",
  },
  {
    id: "web",
    letter: "B",
    title: "Full-stack & backend engineering",
    summary: "Services, queues and interfaces built to stay correct under real use.",
  },
];

export interface Project {
  id: string;
  domain: DomainId;
  title: string;
  short: string; // compact label, e.g. for the skills grid
  kind: string;
  outcome: string;
  year: string;
  description: string;
  problem: string[];
  constraints: string[];
  approach: string[];
  architecture: string[];
  architectureNote?: string;
  results: string[];
  chart?: { bars: ChartBar[]; caption: string };
  next: string[];
  metrics: Metric[];
  tech: string[];
  figure: "detection" | "lifecycle" | "flow" | "rag" | "sandbox";
  figureCaption: string;
  github?: string;
}

export const PROJECTS: Project[] = [
  // ── Domain A ──
  {
    id: "ai-support",
    domain: "ai",
    title: "AI Support Ticket Resolution System",
    short: "AI Support",
    kind: "Retrieval-augmented generation · NLP · Backend",
    outcome:
      "Retrieves technical documentation, classifies incoming tickets and drafts evidence-backed resolutions using hybrid search and LLMs.",
    year: "2026",
    description:
      "A support assistant over 217 GitLab documentation sources that connects each ticket to relevant evidence and produces structured, reviewable resolution drafts instead of ungrounded answers.",
    problem: [
      "Technical support teams spend considerable time identifying ticket categories, searching internal documentation and composing responses to recurring issues. Basic LLM solutions can produce plausible but unsupported answers, overlook relevant documentation, or refuse tickets they could have resolved.",
      "The objective was a support assistant that connects incoming tickets to relevant technical evidence and produces structured, reviewable resolution drafts rather than relying on ungrounded generation.",
    ],
    constraints: [
      "Relevant information is spread across documentation and must be retrieved accurately from a searchable knowledge base.",
      "Semantic similarity alone can miss exact error messages, identifiers and technical phrases.",
      "Retrieved evidence does not guarantee a correct or sufficiently grounded answer.",
      "Out-of-scope requests, malformed outputs and prompt-injection attempts need explicit handling.",
      "Answer quality must be evaluated independently of retrieval quality.",
    ],
    approach: [
      "Built an end-to-end RAG pipeline over 217 GitLab documentation sources, processed into roughly 4,600 chunks. Qwen3 embeddings support semantic retrieval, while PostgreSQL with pgvector combines HNSW vector search, full-text search and exact-phrase matching through Reciprocal Rank Fusion (RRF).",
      "Nemotron-120B generates structured resolution drafts from the retrieved evidence. A FastAPI backend coordinates retrieval, generation and validation; a React interface supports ticket review; Docker Compose keeps the environment reproducible. Retrieval is kept separate from generation, and the evidence stays available for human inspection before a resolution is accepted.",
    ],
    architecture: [
      "Ticket input",
      "Classification",
      "Hybrid retrieval",
      "Evidence assembly",
      "LLM draft",
      "Output validation",
      "Human review",
    ],
    architectureNote:
      "Complementary search methods improve discovery and ranking; validation and human review guard against unsupported answers.",
    results: [
      "Evaluated on a 51-case benchmark covering retrieval relevance, ranking quality, ticket classification, grounded generation, refusal behaviour, schema validity and prompt-injection handling.",
      "Achieved 0.956 Hit@5, 0.783 Recall@5, 0.813 MRR and 0.933 category accuracy. All evaluated out-of-scope, schema-validity and prompt-injection cases passed.",
      "The grounded-answer rate was 0.595, with a 19% false-refusal rate and roughly 58-second median latency — the remaining gap between finding the right documentation and consistently producing grounded, useful resolutions.",
    ],
    chart: {
      bars: [
        { label: "Hit@5", value: 95.6, display: "0.956" },
        { label: "Category acc.", value: 93.3, display: "0.933" },
        { label: "MRR", value: 81.3, display: "0.813" },
        { label: "Recall@5", value: 78.3, display: "0.783" },
        { label: "Grounded", value: 59.5, display: "0.595" },
      ],
      caption: "51-case benchmark. Retrieval is strong; grounded generation is the open gap.",
    },
    next: [
      "Improve evidence-grounding checks and reduce unsupported resolution claims.",
      "Reduce inference latency through model-call optimisation, asynchronous processing and targeted profiling.",
      "Expand the benchmark with harder tickets, adversarial cases and human-judged resolution quality.",
    ],
    metrics: [
      { label: "Hit@5", value: "0.956", verified: true },
      { label: "Recall@5", value: "0.783", verified: true },
      { label: "MRR", value: "0.813", verified: true },
      { label: "Category acc.", value: "0.933", verified: true },
      { label: "Grounded answers", value: "0.595", verified: true },
    ],
    tech: [
      "Python",
      "FastAPI",
      "React",
      "PostgreSQL",
      "pgvector",
      "Qwen3 Embeddings",
      "Nemotron-120B",
      "Hybrid Retrieval",
      "RRF",
      "Docker Compose",
    ],
    figure: "rag",
    figureCaption:
      "Hybrid retrieval: vector, full-text and exact-phrase results fused with RRF before the LLM drafts a resolution.",
    github: "https://github.com/1am-krishna-2407/ai-support-ticket-resolution",
  },
  {
    id: "seal-detection",
    domain: "ai",
    title: "Seal & Signature Detection System",
    short: "Seal Detection",
    kind: "Computer vision · Document AI",
    outcome:
      "Automated verification of seals and signatures on legal documents at 97.1% mAP@50.",
    year: "2025",
    description:
      "End-to-end document analysis system that detects seals and signatures using a custom-trained YOLOv8 model.",
    problem: [
      "Manual document verification is slow, error-prone and doesn't scale. Legal workflows need seals and signatures located automatically before a human signs off.",
    ],
    constraints: [
      "Seals are often faint, rotated or partially overlapping printed text.", // REVIEW
      "Signatures vary widely in stroke, size and placement.", // REVIEW
      "Real labelled documents are limited, so data had to be stretched.", // REVIEW
    ],
    approach: [
      "Trained YOLOv8 on 4,902 annotated documents, with a synthetic document-generation pipeline adding 3,000 training samples to improve generalisation across layouts. Wrapped inference in a Streamlit interface for single-document checks and batch processing.",
    ],
    architecture: [
      "Document input",
      "Preprocessing",
      "YOLOv8 inference",
      "Detection overlay",
      "Results dashboard",
    ],
    results: [
      "97.1% mAP@50 with 95.4% precision and 92.6% recall on held-out documents.",
    ],
    chart: {
      bars: [
        { label: "mAP@50", value: 97.1, display: "97.1%" },
        { label: "Precision", value: 95.4, display: "95.4%" },
        { label: "Recall", value: 92.6, display: "92.6%" },
      ],
      caption: "Detection quality on held-out documents.",
    },
    next: [
      "Add a signature-verification stage, not just localisation.", // REVIEW
      "Serve the model behind an API with batched GPU inference.", // REVIEW
      "Track drift on new document templates.", // REVIEW
    ],
    metrics: [
      { label: "mAP@50", value: "97.1%", verified: true },
      { label: "Precision", value: "95.4%", verified: true },
      { label: "Recall", value: "92.6%", verified: true },
      { label: "Annotated docs", value: "4,902" },
      { label: "Synthetic samples", value: "3,000" },
    ],
    tech: ["Python", "YOLOv8", "OpenCV", "Streamlit"],
    figure: "detection",
    figureCaption: "Detector output on a sample document: seal and signature regions with class scores.",
    github:
      "https://github.com/1am-krishna-2407/Computer-Vision-Based-Seal-and-Signature-Detection-for-Legal-Documents",
  },
  {
    id: "heart-disease",
    domain: "ai",
    title: "Heart Disease Prediction Dashboard",
    short: "Heart Disease",
    kind: "Machine learning · Healthcare · CodSoft internship",
    outcome: "An interactive dashboard that estimates cardiovascular risk from clinical metrics in real time.",
    year: "2024",
    description:
      "ML-powered dashboard for predicting heart-disease risk from patient health metrics, built during the CodSoft internship.",
    problem: [
      "Early detection of heart disease saves lives. Clinicians need quick, data-driven risk estimates.",
    ],
    constraints: [
      "Small tabular dataset with mixed numeric and categorical features.", // REVIEW
      "Predictions must be explainable to a non-technical user.", // REVIEW
    ],
    approach: [
      "Performed data preprocessing, feature scaling, exploratory analysis and supervised model training, then integrated the trained model into an interactive Streamlit application for real-time inference.",
    ],
    architecture: [
      "Patient data",
      "Preprocessing",
      "Feature engineering",
      "Model training",
      "Evaluation",
      "Dashboard",
    ],
    results: ["A deployed risk-assessment dashboard supporting real-time inference from user-provided health metrics."],
    next: [
      "Calibrate predicted probabilities.", // REVIEW
      "Add per-prediction feature attributions.", // REVIEW
    ],
    metrics: [
      { label: "Pipeline", value: "End-to-end" },
      { label: "Inference", value: "Real-time" },
      { label: "Interface", value: "Streamlit" },
    ],
    tech: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    figure: "flow",
    figureCaption: "Pipeline stages from raw clinical records to the prediction dashboard.",
    github: "https://github.com/1am-krishna-2407/heart-disease",
  },

  // ── Domain B ──
  {
    id: "codeflow",
    domain: "web",
    title: "CodeFlow — Secure Code Execution Platform",
    short: "CodeFlow",
    kind: "Backend · Distributed job processing · Docker sandboxing",
    outcome:
      "Runs Python, Java and C++ programs through asynchronous jobs in isolated Docker environments, with persistent history and detailed results.",
    year: "2026",
    description:
      "A full-stack execution platform where users submit code, track status and inspect past runs, while untrusted code stays isolated from the main application.",
    problem: [
      "Executing user-submitted code takes more than compiling or interpreting it. A production-oriented execution service must handle long-running processes, infinite loops, excessive memory use, runtime errors and potentially malicious code without affecting other executions or exposing the host.",
      "The objective was a platform where users can submit code, track execution status, retrieve results and inspect previous runs through one interface, with execution kept isolated from the main application.",
    ],
    constraints: [
      "Code must run independently of the API request lifecycle so slow programs don't block request handling.",
      "Untrusted programs need execution-time limits, memory constraints, output limits and network isolation.",
      "Concurrent jobs must not interfere with one another or mix their outputs.",
      "Execution state and results must persist so users can inspect completed and failed runs.",
      "The system must distinguish success, runtime errors, timeouts and resource failures across languages.",
    ],
    approach: [
      "Built a React interface and a backend API for authentication, execution submission, job tracking and result retrieval, with language-specific runtimes for Python, Java and C++.",
      "Job submission is separated from processing: REST requests enqueue jobs in Redis, dedicated workers pick them up and execute them inside isolated Docker containers (no network, 128 MB memory, CPU quotas, 10-second timeout, capped I/O), and results are finalised with stdout, stderr, exit code and metadata. PostgreSQL stores application and execution records; JWT authentication and rate-limited APIs protect the service.",
    ],
    architecture: [
      "Code editor",
      "REST API",
      "Job queue",
      "Execution worker",
      "Docker sandbox",
      "Result persistence",
      "Dashboard",
    ],
    architectureNote:
      "The API records state; a worker runs the job in a constrained container; results reach the frontend through status polling.",
    results: [
      "Validated across Python, Java and C++, including successful programs, runtime failures, timeouts, memory-related termination, network isolation and concurrent processing.",
      "Five concurrent jobs ran without output mixing. Timeouts produced a clear status at the 10-second limit, memory-related termination surfaced as exit code 137, and output is capped at 512 KB.",
      "These tests demonstrate functional isolation and failure handling; they don't by themselves establish production-scale throughput, maximum concurrency or a latency benchmark.",
    ],
    next: [
      "Add job recovery and retry policies for workers that crash mid-job.",
      "Introduce automated load testing for queue wait, execution latency, throughput and resource use.",
      "Harden operations with migrations, pre-pulled runtime images, monitoring and execution audit logs.",
    ],
    metrics: [
      { label: "Languages", value: "3" },
      { label: "Concurrent jobs", value: "5, no mixing", verified: true },
      { label: "Timeout", value: "10 s" },
      { label: "Memory cap", value: "128 MB" },
      { label: "Output cap", value: "512 KB" },
    ],
    tech: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Redis", "Docker", "Python", "Java", "C++", "JWT"],
    figure: "sandbox",
    figureCaption: "Submission is decoupled from execution: queued jobs run in a locked-down container, results are persisted.",
  },
  {
    id: "devflow",
    domain: "web",
    title: "DevFlow",
    short: "DevFlow",
    kind: "Full-stack · Developer workflow platform",
    outcome:
      "Project and task management combined with live GitHub repository activity — repositories, commits and pull requests.",
    year: "2025",
    description:
      "A developer workflow platform with a React client over a layered Spring Boot backend, JWT authentication and containerised deployment.",
    problem: [
      "Developers juggle project boards and repository activity in separate tools. Teams need one secure place to manage projects and tasks alongside what's actually happening in their code.",
    ],
    constraints: [
      "Every endpoint must enforce authentication and per-role permissions.", // REVIEW
      "Repository activity comes from an external API and must not slow the app down.", // REVIEW
      "The service has to run identically on any machine.", // REVIEW
    ],
    approach: [
      "Designed a layered Controller → Service → Repository Spring Boot backend with REST APIs and JWT-based authentication and authorisation, PostgreSQL persistence and Redis caching, behind a React client. Integrated live GitHub repository activity, then containerised the application with Docker for consistent deployment.",
    ],
    architecture: [
      "React client",
      "REST controllers",
      "Service layer",
      "Repositories",
      "Redis cache",
      "PostgreSQL",
      "Docker",
    ],
    results: [
      "A full-stack platform that brings project management and repository activity together, with layered, testable backend code and a reproducible container setup.",
    ],
    next: [
      "Add integration tests against containerised PostgreSQL and Redis.", // REVIEW
      "Introduce rate limiting on the GitHub-facing endpoints.", // REVIEW
      "Publish an OpenAPI specification.", // REVIEW
    ],
    metrics: [
      { label: "REST APIs", value: "15+" },
      { label: "Auth", value: "JWT" },
      { label: "Integration", value: "GitHub" },
      { label: "Cache", value: "Redis" },
      { label: "Deploy", value: "Docker" },
    ],
    tech: ["Java", "Spring Boot", "Spring Security", "React", "PostgreSQL", "Redis", "Docker"],
    figure: "lifecycle",
    figureCaption: "Request lifecycle: authenticate, authorise, serve from cache or fall through to PostgreSQL.",
    github: "https://github.com/1am-krishna-2407/dev-flow",
  },
  {
    id: "expense-tracker",
    domain: "web",
    title: "Personal Expense Tracking System",
    short: "Expense Tracker",
    kind: "Full-stack · Financial data · API security",
    outcome:
      "A secure finance platform for recording expenses, organising spending, managing budgets and reading consolidated dashboards and reports.",
    year: "2026",
    description:
      "A three-tier application — React UI, Express API, Prisma and PostgreSQL — built around private, consistent financial records and efficient aggregation.",
    problem: [
      "Tracking personal finances across transactions, categories and monthly budgets gets difficult without a centralised system. Poorly structured records make it harder to understand spending, monitor budgets and produce meaningful summaries.",
      "The objective was a reliable expense application that pairs an intuitive interface with a secure backend, consistent records and efficient data aggregation.",
    ],
    constraints: [
      "Financial records must stay private to their owners, with ownership enforced at the backend.",
      "Creating and updating expenses must keep the database consistent, especially across related records.",
      "Amounts and date ranges must be handled consistently to avoid incorrect totals.",
      "APIs must validate input and handle invalid requests, auth failures and database errors predictably.",
      "Dashboard summaries must stay efficient as transaction history grows.",
    ],
    approach: [
      "Built with React and TypeScript over a Node.js and Express API, with Prisma and PostgreSQL for persistence and a layered backend separating routes, controllers, services and data access. Covers expenses, categories, budgets, dashboards, reports and exports.",
      "Authentication uses short-lived JWT access tokens with refresh-token rotation, HTTP-only Secure SameSite cookies and bcrypt password hashing. Further safeguards: request validation, user-scoped queries, centralised error handling, CORS, rate limiting, database transactions, pagination, sorting, composite indexes, and SQL aggregation so summaries never load the full history.",
    ],
    architecture: [
      "React frontend",
      "Express API",
      "Auth & validation",
      "Controllers",
      "Services",
      "Prisma ORM",
      "PostgreSQL",
    ],
    architectureNote:
      "Middleware authenticates and validates before controllers delegate to services; reports aggregate in the database.",
    results: [
      "An end-to-end financial application combining authenticated API access, persistent transaction management, budget workflows and aggregated reporting.",
      "Its main engineering outcomes are a layered, maintainable backend, explicit ownership checks, transactional operations and security controls suited to sensitive data. Throughput, latency, coverage and usage haven't been measured yet, so none are claimed.",
    ],
    next: [
      "Add integration and security tests for transaction consistency, authorisation boundaries, token rotation and concurrent updates.",
      "Introduce repeatable load tests for expense creation, history queries and dashboard aggregation.",
      "Add exports, recurring-expense workflows and richer spending insights, with clear validation and audit rules.",
    ],
    metrics: [
      { label: "Auth", value: "JWT + rotation" },
      { label: "Passwords", value: "bcrypt" },
      { label: "Data", value: "Prisma · PG" },
      { label: "Reports", value: "SQL aggregates" },
    ],
    tech: ["React", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL", "JWT", "bcrypt", "REST APIs"],
    figure: "flow",
    figureCaption: "Layered request path from the React client down to PostgreSQL.",
    github: "https://github.com/1am-krishna-2407/Expense-Traq",
  },
];

/** Case-study codes in page order: "A.1", "A.2", … "B.3". */
export const CASE_CODES: Record<string, string> = Object.fromEntries(
  DOMAINS.flatMap((d) =>
    PROJECTS.filter((p) => p.domain === d.id).map((p, i) => [p.id, `${d.letter}.${i + 1}`])
  )
);

// ─── 03 Architecture schematics ─────────────────────────────────────────────
export interface SchematicNode {
  label: string;
  note: string; // REVIEW
}

export interface Schematic {
  id: string;
  title: string;
  caption: string;
  nodes: SchematicNode[];
}

export const SCHEMATICS: Schematic[] = [
  {
    id: "ai",
    title: "AI pipeline",
    caption: "Retrieval-augmented generation with evaluation built in, as used in the support-ticket system.",
    nodes: [
      { label: "Ingest", note: "Pull documentation sources in and keep track of where every passage came from." },
      { label: "Chunk", note: "Split into ~4,600 passages, each small enough to retrieve and still cite." },
      { label: "Embed", note: "Qwen3 embeddings capture meaning, so paraphrased questions still match." },
      { label: "Index", note: "PostgreSQL + pgvector: an HNSW vector index and full-text search in one database." },
      { label: "Retrieve", note: "Fuse vector, full-text and exact-phrase hits with RRF, so exact error strings aren't lost." },
      { label: "Generate", note: "The LLM drafts a structured resolution from retrieved evidence only." },
      { label: "Validate", note: "Schema checks, grounding checks and prompt-injection screening before anything ships." },
      { label: "Evaluate", note: "A 51-case benchmark scores retrieval and answer quality separately." },
    ],
  },
  {
    id: "ml",
    title: "ML pipeline",
    caption: "Supervised learning workflow, from raw data to monitored deployment.",
    nodes: [
      { label: "Raw data", note: "Version the dataset so every model can be traced to the data it saw." },
      { label: "Preprocessing", note: "Fit scalers and encoders on the training split only, to avoid leakage." },
      { label: "Features", note: "Engineer features from domain knowledge before reaching for bigger models." },
      { label: "Training", note: "Compare several model families on the same folds, not one tuned favourite." },
      { label: "Evaluation", note: "Report precision and recall, not just accuracy, when classes are imbalanced." },
      { label: "Deployment", note: "Ship the model with its preprocessing as one artifact." },
      { label: "Monitoring", note: "Watch input drift; a model is only as good as last month's data." },
    ],
  },
  {
    id: "backend",
    title: "Backend architecture",
    caption: "Layered service with async work offloaded to queues, as in DevFlow and CodeFlow.",
    nodes: [
      { label: "Client", note: "Stateless: every request carries its JWT." },
      { label: "Controller", note: "Thin controllers: validate input, map DTOs, delegate." },
      { label: "Service", note: "Business rules and permission checks live here, in one place." },
      { label: "Queue", note: "Slow work goes onto a Redis queue so requests return immediately." },
      { label: "Cache", note: "Redis in front of hot reads cuts repeat queries." },
      { label: "Repository", note: "Repositories keep queries out of business logic." },
      { label: "Database", note: "PostgreSQL keeps users, projects and records consistent with transactions." },
      { label: "Container", note: "Docker images make every environment identical." },
    ],
  },
  {
    id: "cv",
    title: "CV pipeline",
    caption: "Object-detection workflow behind the seal & signature detector.",
    nodes: [
      { label: "Dataset", note: "4,902 real documents, plus 3,000 synthetic samples for rare layouts." },
      { label: "Annotation", note: "Tight, consistent boxes matter more than box count." },
      { label: "Training", note: "YOLOv8 fine-tuned with document-specific augmentation." },
      { label: "Inference", note: "OpenCV preprocessing normalises scans before detection." },
      { label: "Deployment", note: "Streamlit front-end for single and batch processing." },
      { label: "Visualisation", note: "Overlay boxes with scores so reviewers can trust the output." },
    ],
  },
];

// ─── 04 Stack ───────────────────────────────────────────────────────────────
// level: 1 = Working, 2 = Proficient, 3 = Production-used   (REVIEW levels)
export const PROFICIENCY = ["Working", "Proficient", "Production-used"] as const;

export interface StackItem {
  name: string;
  level: 1 | 2 | 3;
  usedIn: { text: string; href?: string }[];
}

export interface StackGroup {
  group: string;
  domain: Focus;
  items: StackItem[];
}

const AI_SUPPORT = { text: "AI Support", href: "#work-ai-support" };
const SEAL = { text: "Seal Detection", href: "#work-seal-detection" };
const HEART = { text: "Heart Disease", href: "#work-heart-disease" };
const CODEFLOW = { text: "CodeFlow", href: "#work-codeflow" };
const DEVFLOW = { text: "DevFlow", href: "#work-devflow" };
const EXPENSE = { text: "Expense Tracker", href: "#work-expense-tracker" };

// Near-duplicates are merged into one entry (e.g. RAG, embeddings, semantic
// search and vector databases → "RAG & hybrid retrieval"); the case studies
// carry the finer detail.
export const STACK: StackGroup[] = [
  {
    group: "Programming",
    domain: "both",
    items: [
      { name: "Python", level: 3, usedIn: [AI_SUPPORT, SEAL, CODEFLOW] },
      { name: "Java", level: 3, usedIn: [DEVFLOW] },
      { name: "TypeScript & JavaScript", level: 3, usedIn: [CODEFLOW, EXPENSE] },
      { name: "SQL", level: 3, usedIn: [EXPENSE] },
      { name: "C++", level: 2, usedIn: [{ text: "DSA practice" }] },
    ],
  },
  {
    group: "Generative AI & LLMs",
    domain: "ai",
    items: [
      { name: "RAG & hybrid retrieval", level: 3, usedIn: [AI_SUPPORT] },
      { name: "LLMs & prompt engineering", level: 3, usedIn: [AI_SUPPORT] },
      { name: "LLM evaluation & grounding", level: 3, usedIn: [AI_SUPPORT] },
      { name: "LangChain & LangGraph", level: 2, usedIn: [] },
      { name: "Hugging Face", level: 2, usedIn: [] },
    ],
  },
  {
    group: "Machine Learning",
    domain: "ai",
    items: [
      { name: "Scikit-Learn, Pandas & NumPy", level: 3, usedIn: [HEART] },
      { name: "Supervised ML & evaluation", level: 3, usedIn: [HEART, SEAL] },
      { name: "Deep learning · PyTorch, TensorFlow, Keras", level: 2, usedIn: [{ text: "TensorFlow certificate" }] },
    ],
  },
  {
    group: "Computer Vision",
    domain: "ai",
    items: [
      { name: "YOLOv8 & object detection", level: 3, usedIn: [SEAL] },
      { name: "OpenCV, image processing & augmentation", level: 3, usedIn: [SEAL] },
    ],
  },
  {
    group: "Backend",
    domain: "web",
    items: [
      { name: "FastAPI", level: 3, usedIn: [AI_SUPPORT, CODEFLOW] },
      { name: "Spring Boot, Security & JPA", level: 3, usedIn: [DEVFLOW] },
      { name: "Node.js, Express & Prisma", level: 3, usedIn: [EXPENSE] },
      { name: "REST APIs & JWT auth", level: 3, usedIn: [CODEFLOW, DEVFLOW, EXPENSE] },
    ],
  },
  {
    group: "Frontend",
    domain: "web",
    items: [
      { name: "React, HTML & CSS", level: 3, usedIn: [AI_SUPPORT, CODEFLOW, EXPENSE] },
      { name: "Streamlit", level: 3, usedIn: [SEAL, HEART] },
    ],
  },
  {
    group: "Databases",
    domain: "web",
    items: [
      { name: "PostgreSQL & pgvector", level: 3, usedIn: [AI_SUPPORT, CODEFLOW, EXPENSE] },
      { name: "Redis", level: 3, usedIn: [CODEFLOW, DEVFLOW] },
      { name: "MongoDB", level: 2, usedIn: [] },
    ],
  },
  {
    group: "Cloud & DevOps",
    domain: "web",
    items: [
      { name: "Docker & Docker Compose", level: 3, usedIn: [CODEFLOW, DEVFLOW, AI_SUPPORT] },
      { name: "GitHub Actions", level: 2, usedIn: [] },
      { name: "Kubernetes", level: 1, usedIn: [{ text: "Docker & Kubernetes certificate" }] },
      { name: "AWS", level: 1, usedIn: [{ text: "Self-study" }] },
    ],
  },
  {
    group: "Engineering practice",
    domain: "web",
    items: [
      { name: "Async processing & distributed systems", level: 3, usedIn: [CODEFLOW] },
      { name: "API design, validation & error handling", level: 3, usedIn: [CODEFLOW, EXPENSE] },
      { name: "Auth, authorisation & rate limiting", level: 3, usedIn: [EXPENSE, CODEFLOW, DEVFLOW] },
      { name: "Testing", level: 2, usedIn: [AI_SUPPORT, CODEFLOW] },
    ],
  },
  {
    group: "Tools",
    domain: "both",
    items: [
      { name: "Git & GitHub", level: 3, usedIn: [{ text: "All projects" }] },
      { name: "Postman", level: 2, usedIn: [DEVFLOW] },
      { name: "Maven / Gradle", level: 2, usedIn: [DEVFLOW] },
    ],
  },
];

// ─── 05 Experience & timeline ───────────────────────────────────────────────
export const EXPERIENCE = [
  {
    company: "CodSoft",
    role: "Machine Learning Intern",
    period: "May – Jul 2024",
    context:
      "Develop predictive-analytics solutions on real-world healthcare data.",
    built:
      "End-to-end ML pipelines for heart-disease prediction: preprocessing, feature scaling, exploratory analysis and supervised model training, served through a Streamlit dashboard.",
    impact:
      "Delivered a working prediction dashboard with real-time patient risk assessment.",
    technology: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    highlights: [
      "Built the Heart Disease Prediction Dashboard",
      "Implemented the complete ML pipeline",
      "Cleaned and prepared real-world clinical data",
      "Delivered a usable Streamlit interface",
    ],
  },
];

// From the resumes; shown in the assistant's knowledge and the timeline.
export const EDUCATION = [
  {
    institution: "Lovely Professional University, Jalandhar",
    degree: "B.Tech in Computer Science & Engineering",
    period: "2022 – 2026",
    result: "CGPA 7.49 / 10",
  },
  {
    institution: "H.M. Education Center, West Bengal",
    degree: "Higher Secondary (Senior Secondary Certificate)",
    period: "2020 – 2022",
    result: "80.3%", // REVIEW: the AI resume says 81%, the full-stack resume says 80.3%
  },
];

export const TIMELINE = [
  { year: "2022", title: "Began B.Tech, Computer Science", note: "Lovely Professional University." },
  { year: "2024", title: "ML internship · CodSoft", note: "Real-world ML pipelines." },
  { year: "2025", title: "CV & backend projects", note: "Seal detection, DevFlow." },
  { year: "2026", title: "AI & full-stack systems", note: "RAG support assistant, CodeFlow. Open to roles.", current: true },
];

// ─── 06 Record ──────────────────────────────────────────────────────────────
export interface Achievement {
  value: number | null;
  display?: string; // shown instead of an animated number
  suffix?: string;
  label: string;
  detail: string;
  date: string;
  link?: { text: string; href: string };
}

export const ACHIEVEMENTS: Achievement[] = [
  {
    value: 250,
    suffix: "+",
    label: "LeetCode problems solved",
    detail: "Data structures & algorithms",
    date: "Ongoing",
    link: { text: "Profile", href: "https://leetcode.com/u/Krishna_17/" },
  },
  {
    value: null,
    display: "Qualifier",
    label: "Infineon Hackathon",
    detail: "Qualifying team · adaptive decision-making solution",
    date: "—", // REVIEW: add the year
  },
  {
    value: 5,
    suffix: "+",
    label: "ML projects shipped",
    detail: "End-to-end, from data to interface",
    date: "2024–26",
    link: { text: "GitHub", href: "https://github.com/1am-krishna-2407" },
  },
];

export interface Certification {
  name: string;
  issuer: string;
  platform: string;
  year: string;
}

// Most recent first. Older entries came from the previous site.
export const CERTIFICATIONS: Certification[] = [
  {
    name: "TensorFlow Developer Professional Certificate",
    issuer: "DeepLearning.AI",
    platform: "Coursera",
    year: "2026",
  },
  {
    name: "Oracle Agentic AI Foundations Associate",
    issuer: "Oracle",
    platform: "Oracle University",
    year: "2026",
  },
  {
    name: "Docker and Kubernetes",
    issuer: "Udemy",
    platform: "Udemy",
    year: "2026",
  },
  {
    name: "Dynamic Programming, Greedy Algorithms",
    issuer: "University of Colorado Boulder",
    platform: "Coursera",
    year: "—", // REVIEW: add the year
  },
  {
    name: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    platform: "Coursera",
    year: "—", // REVIEW: add the year
  },
];

// ─── GitHub ──────────────────────────────────────────────────────────────────
// Used only if the pinned list can't be read from the GitHub profile page.
export const PINNED_FALLBACK = [
  "heart-disease",
  "resume_ai_analyzer",
  "Computer-Vision-Based-Seal-and-Signature-Detection-for-Legal-Documents",
  "phishing_detection",
  "Electricity-Demand-Forecasting",
  "Expense-Traq",
];

// ─── TL;DR brief ─────────────────────────────────────────────────────────────
// One-line metric per project for the brief; editions pick the order.
export const TLDR_METRICS: Record<string, string> = {
  "ai-support": "0.956 Hit@5 · RAG",
  "seal-detection": "97.1% mAP@50",
  "heart-disease": "Real-time ML dashboard",
  codeflow: "Sandboxed async execution",
  devflow: "Spring Boot · GitHub integration",
  "expense-tracker": "JWT rotation · SQL reports",
};

export const TLDR_DEFAULT = {
  projects: ["ai-support", "seal-detection", "codeflow", "expense-tracker"],
  stack: ["Python", "TypeScript", "Java", "RAG", "pgvector", "YOLOv8", "Scikit-Learn", "FastAPI", "Spring Boot", "React", "PostgreSQL", "Redis", "Docker"],
};

/** Stable sort that puts items for the edition's focus first. */
export function focusFirst<T extends { domain: Focus | "ai" | "web" }>(items: T[], role: RoleId | null): T[] {
  if (!role) return items;
  const lead = role === "ai" ? "ai" : "web";
  const rank = (d: T["domain"]) => (d === lead ? 0 : d === "both" ? 1 : 2);
  return [...items].sort((x, y) => rank(x.domain) - rank(y.domain));
}

// ─── Terminal ────────────────────────────────────────────────────────────────
export const TERMINAL_COMMANDS: Record<string, string> = {
  help: `Available commands
  about       who this is
  projects    selected work
  skills      technical stack
  experience  work history
  resume      resume options (resume ai / resume fullstack)
  github      open GitHub
  contact     how to reach me
  ask <q>     ask the portfolio assistant
  clear       clear the screen`,

  about: `Krishna Kumar Jha
AI · Machine Learning · Computer Vision · Full-stack

I build AI and machine-learning systems, and
the backends that put them in production.`,

  projects: `A  AI, ML & computer vision
   A.1  AI Support Ticket Resolution  0.956 Hit@5
   A.2  Seal & Signature Detection    97.1% mAP@50
   A.3  Heart Disease Prediction      Streamlit
B  Full-stack & backend
   B.1  CodeFlow                      Docker sandboxes
   B.2  DevFlow                       Spring Boot · GitHub
   B.3  Expense Tracking System       Express · Prisma`,

  skills: `Languages   Python, TypeScript, Java, SQL, C++
GenAI       RAG, embeddings, hybrid retrieval, LLM eval
ML / CV     Scikit-Learn, PyTorch, YOLOv8, OpenCV
Backend     FastAPI, Spring Boot, Node.js, Express
Data        PostgreSQL, pgvector, Redis
DevOps      Docker, Docker Compose`,

  experience: `2024  CodSoft · Machine Learning Intern
      Heart-disease prediction pipeline and dashboard`,

  github: `Opening github.com/1am-krishna-2407…`,

  contact: `Email     krishnajha2004@gmail.com
LinkedIn  linkedin.com/in/krishnaaa-here
GitHub    github.com/1am-krishna-2407

Status    open to opportunities`,
};
