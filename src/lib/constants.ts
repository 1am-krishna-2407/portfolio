// ─── Personal Info ───────────────────────────────────────────────────────────
export const PERSONAL = {
  name: "Krishna Kumar Jha",
  initials: "KKJ",
  title: "Machine Learning Engineer",
  roles: [
    "Machine Learning Engineer",
    "Computer Vision Engineer",
    "Backend Developer",
  ],
  description:
    "Building production-ready AI systems, computer vision solutions, and scalable backend platforms.",
  taglines: [
    "Training models. Designing systems. Shipping products.",
    "From Computer Vision to Cloud Deployment.",
    "Transforming ideas into production-ready intelligent software.",
  ],
  email: "krishnajha2004@gmail.com",
  github: "1am-krishna-2407",
  linkedin: "https://www.linkedin.com/in/krishnaaa-here/",
  leetcode: "https://leetcode.com/u/Krishna_17/",
  resumeUrl: "/My_resume.pdf",
};

// ─── Boot Sequence ───────────────────────────────────────────────────────────
export const BOOT_MESSAGES = [
  { text: "Initializing Neural Engine...", delay: 400 },
  { text: "Loading Model Registry...", delay: 350 },
  { text: "Connecting Compute Cluster...", delay: 300 },
  { text: "Mounting Data Pipeline...", delay: 250 },
  { text: "Calibrating Vision Systems...", delay: 250 },
  { text: "Deploying Backend Services...", delay: 200 },
  { text: "Launching Portfolio...", delay: 400 },
];

// ─── Recruiter Snapshot Cards ────────────────────────────────────────────────
export const SNAPSHOT_CARDS = [
  {
    icon: "Brain",
    title: "Machine Learning",
    description:
      "Developing predictive models and intelligent decision systems.",
    color: "#3B82F6",
  },
  {
    icon: "Eye",
    title: "Computer Vision",
    description: "YOLO, OpenCV, image processing, object detection.",
    color: "#06B6D4",
  },
  {
    icon: "Server",
    title: "Backend Engineering",
    description: "Spring Boot, REST APIs, Security, Scalable Architecture.",
    color: "#8B5CF6",
  },
  {
    icon: "Container",
    title: "DevOps",
    description: "Docker, Kubernetes, CI/CD pipelines.",
    color: "#22C55E",
  },
  {
    icon: "Network",
    title: "System Design",
    description: "Distributed thinking and scalable engineering practices.",
    color: "#F59E0B",
  },
  {
    icon: "Code",
    title: "Problem Solving",
    description: "250+ LeetCode problems solved.",
    color: "#EF4444",
  },
];

// ─── Timeline ────────────────────────────────────────────────────────────────
export const TIMELINE = [
  {
    year: "2022",
    title: "Started Computer Science Engineering",
    description:
      "Began the journey into algorithms, data structures, and systems thinking.",
  },
  {
    year: "2024",
    title: "Machine Learning Internship",
    description:
      "Built real-world ML pipelines and predictive models at CodSoft.",
  },
  {
    year: "2025",
    title: "AI & Backend Projects",
    description:
      "Shipped production-grade computer vision and full-stack systems.",
  },
  {
    year: "2026",
    title: "Seeking SWE / ML Roles",
    description:
      "Looking for opportunities to build intelligent systems at scale.",
  },
];

// ─── Projects ────────────────────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  problem: string;
  approach: string;
  impact: string;
  metrics: { label: string; value: string }[];
  tech: string[];
  architecture: string[];
  github?: string;
  color: string;
}

export const PROJECTS: Project[] = [
  {
    id: "seal-detection",
    title: "Seal & Signature Detection System",
    subtitle: "Computer Vision • Document AI",
    description:
      "End-to-end document analysis system that detects seals and signatures with high precision using custom-trained YOLOv8 models.",
    problem:
      "Manual document verification is slow, error-prone, and doesn't scale. Organizations need automated seal and signature detection for legal document processing.",
    approach:
      "Trained a YOLOv8 model on 4,902 annotated documents augmented with 3,000 synthetic samples. Built a Streamlit interface for real-time inference and batch processing.",
    impact:
      "Achieved 97.1% mAP@50 with 95.4% precision, enabling automated document verification at scale.",
    metrics: [
      { label: "mAP@50", value: "97.1%" },
      { label: "Annotated Docs", value: "4,902" },
      { label: "Synthetic Samples", value: "3,000" },
      { label: "Precision", value: "95.4%" },
      { label: "Recall", value: "92.6%" },
    ],
    tech: ["YOLOv8", "OpenCV", "Python", "Streamlit"],
    architecture: [
      "Document Input",
      "Preprocessing",
      "YOLOv8 Inference",
      "Detection Overlay",
      "Results Dashboard",
    ],
    github: "https://github.com/krishnakumarjha/seal-signature-detection",
    color: "#3B82F6",
  },
  {
    id: "devflow",
    title: "DevFlow",
    subtitle: "Backend Engineering • Full Stack",
    description:
      "Enterprise-grade project management platform with JWT authentication, role-based access control, and Redis caching.",
    problem:
      "Teams need a secure, scalable project management tool that integrates authentication, task tracking, and real-time collaboration.",
    approach:
      "Designed a layered Spring Boot architecture with 15+ REST APIs, JWT auth, RBAC, Redis caching, and Docker containerization.",
    impact:
      "Production-ready backend serving as a foundation for team collaboration, with enterprise security and caching patterns.",
    metrics: [
      { label: "REST APIs", value: "15+" },
      { label: "Auth", value: "JWT + RBAC" },
      { label: "Caching", value: "Redis" },
      { label: "Deployment", value: "Docker" },
    ],
    tech: ["Spring Boot", "MongoDB", "Docker", "Redis", "JWT"],
    architecture: [
      "Frontend Client",
      "API Gateway",
      "Auth Service",
      "Task Service",
      "Redis Cache",
      "MongoDB",
      "Docker Container",
    ],
    github: "https://github.com/krishnakumarjha/devflow",
    color: "#8B5CF6",
  },
  {
    id: "heart-disease",
    title: "Heart Disease Prediction Dashboard",
    subtitle: "Machine Learning • Healthcare",
    description:
      "Interactive ML-powered dashboard for predicting heart disease risk using patient clinical data.",
    problem:
      "Early detection of heart disease can save lives. Clinicians need data-driven tools to assess patient risk quickly.",
    approach:
      "Built an end-to-end ML pipeline with data preprocessing, feature engineering, model comparison, and an interactive Streamlit dashboard.",
    impact:
      "Deployed a predictive analytics dashboard that processes patient data in real-time for clinical decision support.",
    metrics: [
      { label: "ML Pipeline", value: "End-to-End" },
      { label: "Models", value: "Multi-Model" },
      { label: "Interface", value: "Interactive" },
      { label: "Data", value: "Real-time" },
    ],
    tech: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    architecture: [
      "Patient Data",
      "Preprocessing",
      "Feature Engineering",
      "Model Training",
      "Evaluation",
      "Prediction Dashboard",
    ],
    github: "https://github.com/krishnakumarjha/heart-disease-prediction",
    color: "#22C55E",
  },
];

// ─── Architecture Diagrams ───────────────────────────────────────────────────
export const ARCHITECTURES = [
  {
    id: "ml-pipeline",
    title: "ML Pipeline",
    nodes: [
      "Raw Data",
      "Preprocessing",
      "Feature Engineering",
      "Training",
      "Evaluation",
      "Deployment",
      "Monitoring",
    ],
    color: "#3B82F6",
  },
  {
    id: "backend",
    title: "Backend Architecture",
    nodes: [
      "Client",
      "Controller",
      "Service",
      "Repository",
      "Database",
      "Cache",
      "Docker",
    ],
    color: "#8B5CF6",
  },
  {
    id: "cv-pipeline",
    title: "Computer Vision Pipeline",
    nodes: [
      "Dataset",
      "Annotation",
      "Training",
      "Inference",
      "Deployment",
      "Visualization",
    ],
    color: "#06B6D4",
  },
];

// ─── Tech Stack ──────────────────────────────────────────────────────────────
export interface TechItem {
  name: string;
  description: string;
  projects: string[];
}

export interface TechCategory {
  category: string;
  icon: string;
  color: string;
  items: TechItem[];
}

export const TECH_STACK: TechCategory[] = [
  {
    category: "Programming",
    icon: "Terminal",
    color: "#3B82F6",
    items: [
      {
        name: "Python",
        description: "ML, CV, data pipelines",
        projects: ["Seal Detection", "Heart Disease"],
      },
      {
        name: "Java",
        description: "Backend services, Spring Boot",
        projects: ["DevFlow"],
      },
      {
        name: "C++",
        description: "Systems programming, DSA",
        projects: ["Competitive Programming"],
      },
      {
        name: "JavaScript",
        description: "Web development, Node.js",
        projects: ["Portfolio"],
      },
    ],
  },
  {
    category: "Machine Learning",
    icon: "Brain",
    color: "#06B6D4",
    items: [
      {
        name: "Scikit-Learn",
        description: "Classical ML models",
        projects: ["Heart Disease"],
      },
      {
        name: "TensorFlow",
        description: "Deep learning frameworks",
        projects: ["Research"],
      },
      {
        name: "OpenCV",
        description: "Computer vision processing",
        projects: ["Seal Detection"],
      },
      {
        name: "YOLOv8",
        description: "Object detection models",
        projects: ["Seal Detection"],
      },
    ],
  },
  {
    category: "Backend",
    icon: "Server",
    color: "#8B5CF6",
    items: [
      {
        name: "Spring Boot",
        description: "Enterprise Java framework",
        projects: ["DevFlow"],
      },
      {
        name: "Spring Security",
        description: "Authentication & authorization",
        projects: ["DevFlow"],
      },
      {
        name: "Hibernate",
        description: "ORM framework",
        projects: ["DevFlow"],
      },
      {
        name: "REST APIs",
        description: "API design & implementation",
        projects: ["DevFlow"],
      },
    ],
  },
  {
    category: "Databases",
    icon: "Database",
    color: "#22C55E",
    items: [
      {
        name: "MongoDB",
        description: "NoSQL document store",
        projects: ["DevFlow"],
      },
      {
        name: "PostgreSQL",
        description: "Relational database",
        projects: ["Backend Projects"],
      },
      {
        name: "Redis",
        description: "In-memory caching",
        projects: ["DevFlow"],
      },
    ],
  },
  {
    category: "Cloud & DevOps",
    icon: "Cloud",
    color: "#F59E0B",
    items: [
      {
        name: "Docker",
        description: "Containerization",
        projects: ["DevFlow"],
      },
      {
        name: "Kubernetes",
        description: "Container orchestration",
        projects: ["Infrastructure"],
      },
      {
        name: "AWS",
        description: "Cloud services",
        projects: ["Deployment"],
      },
      {
        name: "CI/CD",
        description: "Automated pipelines",
        projects: ["All Projects"],
      },
    ],
  },
  {
    category: "Tools",
    icon: "Wrench",
    color: "#EF4444",
    items: [
      {
        name: "Git & GitHub",
        description: "Version control",
        projects: ["All Projects"],
      },
      {
        name: "Postman",
        description: "API testing",
        projects: ["DevFlow"],
      },
      {
        name: "Maven/Gradle",
        description: "Build automation",
        projects: ["DevFlow"],
      },
      {
        name: "GitHub Actions",
        description: "CI/CD workflows",
        projects: ["DevFlow"],
      },
    ],
  },
];

// ─── Experience ──────────────────────────────────────────────────────────────
export const EXPERIENCE = [
  {
    company: "CodSoft",
    role: "Machine Learning Intern",
    period: "2024",
    problem:
      "Needed to develop predictive analytics solutions for real-world healthcare data.",
    approach:
      "Built end-to-end ML pipelines for heart disease prediction with data preprocessing, feature engineering, and model evaluation.",
    technology: ["Python", "Scikit-Learn", "Pandas", "Streamlit"],
    impact:
      "Delivered a fully functional prediction dashboard with real-time patient risk assessment capabilities.",
    highlights: [
      "Built Heart Disease Prediction Dashboard",
      "Implemented complete ML pipeline",
      "Practiced real-world data preprocessing",
      "Delivered production-ready Streamlit interface",
    ],
  },
];

// ─── Achievements ────────────────────────────────────────────────────────────
export const ACHIEVEMENTS = [
  {
    title: "LeetCode Problems",
    value: 250,
    suffix: "+",
    description: "Data structures & algorithms mastery",
    icon: "Code",
    color: "#F59E0B",
  },
  {
    title: "Infineon Hackathon",
    value: 1,
    suffix: "",
    label: "Qualifier",
    description: "National-level hackathon qualification",
    icon: "Trophy",
    color: "#3B82F6",
  },
  {
    title: "Coursera Certifications",
    value: 3,
    suffix: "+",
    description: "Machine learning & deep learning specializations",
    icon: "GraduationCap",
    color: "#22C55E",
  },
  {
    title: "ML Projects",
    value: 5,
    suffix: "+",
    description: "End-to-end machine learning projects shipped",
    icon: "Rocket",
    color: "#8B5CF6",
  },
];

// ─── Terminal Commands ───────────────────────────────────────────────────────
export const TERMINAL_COMMANDS: Record<string, string> = {
  help: `Available commands:
  about       - Learn about Krishna
  projects    - View featured projects
  skills      - List technical skills
  experience  - Work experience
  resume      - Download resume
  github      - GitHub profile
  contact     - Get in touch
  opensource  - Open source contributions
  clear       - Clear terminal`,

  about: `╔══════════════════════════════════════════╗
║  Krishna Kumar Jha                       ║
║  Machine Learning Engineer               ║
║  Computer Vision Engineer                ║
║  Backend Developer                       ║
╚══════════════════════════════════════════╝

Building production-ready AI systems,
computer vision solutions, and scalable
backend platforms.

Focus areas:
  → Solving real-world problems
  → Engineering mindset
  → Building systems end-to-end`,

  projects: `Featured Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  [1] Seal & Signature Detection System
      → 97.1% mAP@50 | YOLOv8 + OpenCV
      
  [2] DevFlow
      → 15+ APIs | Spring Boot + Redis
      
  [3] Heart Disease Prediction Dashboard
      → ML Pipeline | Scikit-Learn
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  skills: `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Languages : Python, Java, C++, JS
  ML/AI     : Scikit-Learn, TensorFlow, OpenCV
  Backend   : Spring Boot, REST, Hibernate
  Databases : MongoDB, PostgreSQL, Redis
  DevOps    : Docker, Kubernetes, AWS
  Tools     : Git, GitHub Actions, Postman
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  experience: `Work Experience:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  CodSoft | ML Intern | 2024
  → Built Heart Disease Prediction Dashboard
  → End-to-end ML pipeline development
  → Real-world data preprocessing
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,

  resume: `Downloading resume...
  → Opening resume.pdf`,

  github: `GitHub: github.com/krishnakumarjha
  → Opening GitHub profile...`,

  contact: `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  Email    : krishnakumarjha@email.com
  LinkedIn : linkedin.com/in/krishnakumarjha
  GitHub   : github.com/krishnakumarjha
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  Status: 🟢 Open to opportunities`,

  opensource: `Open Source Contributions:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  All projects are open source on GitHub.
  → Seal & Signature Detection System
  → DevFlow Project Management
  → Heart Disease Prediction Dashboard
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
};

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];
