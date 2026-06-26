export interface LinkItem {
  label: string;
  href: string;
}

export interface ProofMetric {
  value: string;
  label: string;
  detail: string;
}

export interface Project {
  title: string;
  eyebrow: string;
  year: string;
  status: string;
  summary: string;
  role: string;
  image?: {
    src: string;
    alt: string;
  };
  impact: string[];
  stack: string[];
  links: LinkItem[];
  accent: "leaf" | "sun" | "coral" | "sky" | "lilac";
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  period: string;
  summary: string;
  bullets: string[];
}

export interface SocialProfile {
  platform: string;
  handle: string;
  href: string;
  detail: string;
}

export interface Achievement {
  title: string;
  value: string;
  detail: string;
}

export const profile = {
  name: "Dimosthenis Gkontolias",
  shortName: "Dimosthenis",
  location: "Athens, Greece",
  email: "dgodolias18@gmail.com",
  resumeHref: "/assets/DIMOSTHENIS_GKONTOLIAS_CV.pdf",
  githubHref: "https://github.com/dgodolias",
  linkedinHref: "https://www.linkedin.com/in/dimosthenis-gkontolias-3024b9349/",
  headline:
    "I build software that gets past the demo: QR menus in cafes, GCP data pipelines, RAG dashboards, and the content that helps people use them.",
  intro:
    "EU citizen and final-year Informatics student at AUEB with a 9.1/10 GPA, founder of Quar.gr, Erasmus+ data intern at TrackSights, and creator behind Demos Vibes. My best work sits where code, product sense, data, and distribution meet.",
  availability:
    "Open to software engineering or AI/data engineering roles where I can ship, learn fast, and stay close to users.",
};

export const proofMetrics: ProofMetric[] = [
  {
    value: "9.1/10",
    label: "AUEB GPA",
    detail: "Final-year BSc Informatics student at AUEB.",
  },
  {
    value: "3+",
    label: "cafes in production",
    detail: "Quar.gr is live with QR menus, admin editing, and analytics.",
  },
  {
    value: "785k",
    label: "training listings",
    detail: "TrackSights model work used 71 automotive features.",
  },
  {
    value: "30+",
    label: "projects shipped",
    detail: "Web apps, data pipelines, AI tools, mobile apps, and games across 3+ years.",
  },
];

export const focusAreas = [
  {
    title: "Product engineering",
    detail:
      "I like owning the parts people often skip: data model, deploys, edge cases, onboarding, and feedback.",
  },
  {
    title: "AI and data products",
    detail:
      "RAG, LLM APIs, scraping pipelines, canonical schemas, model checks, and cloud data workflows.",
  },
  {
    title: "Distribution and education",
    detail:
      "Demos Vibes makes me explain tools in Greek, publish companion files, and see what actually helps people.",
  },
];

export const achievements: Achievement[] = [
  {
    title: "Panhellenic exams",
    value: "19,150/20,000",
    detail: "National exam score in 2021-2022, before entering AUEB Informatics.",
  },
  {
    title: "Model school finish",
    value: "19.3/20",
    detail: "Graduated from Anavrita Model Public High School with a 19.3/20 grade.",
  },
  {
    title: "Hackathon finals",
    value: "2x finalist",
    detail: "Finalist at Hamburg ChefTreff Hackathon and Athens AceIn AI Hackathon.",
  },
];

export const featuredProjects: Project[] = [
  {
    title: "Quar.gr",
    eyebrow: "Founder / production SaaS",
    year: "2025 - Present",
    status: "Live in production",
    summary:
      "A QR menu platform for cafes with admin editing, media management, multilingual menus, and analytics.",
    role:
      "Designed and built the product end-to-end: React/TypeScript frontend, Fastify backend, Firebase data layer, admin flows, deployments, and customer-facing UX.",
    image: {
      src: "/images/projects/quar.webp",
      alt: "Quar.gr product homepage showing a QR menu phone preview",
    },
    impact: [
      "Serving 3+ cafes in production, with 276+ commits behind the product.",
      "Admin panel supports drag-and-drop menu editing, images, multilingual content, and GA4 analytics.",
      "Real business constraints: onboarding, reliability, content updates, and support for non-technical owners.",
    ],
    stack: ["React", "TypeScript", "Fastify", "Firebase", "GA4", "Tailwind"],
    links: [
      { label: "Live", href: "https://quar.gr/" },
      { label: "GitHub", href: "https://github.com/dgodolias/QuaR" },
    ],
    accent: "leaf",
  },
  {
    title: "TrackSights OEM data pipeline",
    eyebrow: "Erasmus+ data internship",
    year: "Feb - Jun 2026",
    status: "Cloud data pipeline",
    summary:
      "Provider-based data collection for official car configurator data and a depreciation model for automotive pricing.",
    role:
      "Built brand providers, normalized messy OEM data into a canonical schema, and helped turn raw JSON into warehouse-ready datasets.",
    impact: [
      "Covered Audi, Hyundai, and Mercedes-Benz across 8 European markets.",
      "Pipeline used Cloud Run Jobs, Docker, GCS, BigQuery, Dataform, Secret Manager, Terraform, and data-quality assertions.",
      "Modeled depreciation on roughly 785k listings with 71 features using CatBoost, LightGBM, and Optuna.",
    ],
    stack: ["Python", "Pydantic", "GCP", "BigQuery", "Dataform", "Terraform", "CatBoost"],
    links: [],
    accent: "sky",
  },
  {
    title: "DataViz",
    eyebrow: "Gen AI economic insight platform",
    year: "2026",
    status: "Live demo",
    summary:
      "A full-stack RAG chatbot for economic data exploration with streaming answers and chart generation.",
    role:
      "Built the FastAPI + React/TypeScript application, connected Gemini 2.5 Pro, and designed the data-to-chart interaction model.",
    image: {
      src: "/images/projects/dataviz.webp",
      alt: "DataViz Talk To Greek Data landing screen",
    },
    impact: [
      "Works over 23,000 data points and 207 metrics.",
      "Streams responses with SSE and can render 12 chart types.",
      "Turns static economic datasets into an interactive analysis surface.",
    ],
    stack: ["FastAPI", "React", "TypeScript", "Gemini", "RAG", "SSE"],
    links: [{ label: "Live", href: "https://data-viz-one-kappa.vercel.app" }],
    accent: "sun",
  },
  {
    title: "Demos Vibes",
    eyebrow: "Content creator + resource hub",
    year: "2026",
    status: "Active channel",
    summary:
      "A Greek AI tools and workflows channel paired with a static resource hub for every video.",
    role:
      "Created the content architecture, the demosvibes.gr site, searchable resource pages, SEO metadata, JSON-LD, and the short-form education loop around it.",
    image: {
      src: "/images/projects/demosvibes.webp",
      alt: "Demos Vibes resource hub with Greek AI workflow pages",
    },
    impact: [
      "25 recent Instagram reels and 21 TikTok videos around practical AI tools and workflows.",
      "Companion hub is data-driven: one typed resource object powers routes, cards, SEO, sitemap, and JSON-LD.",
      "Shows an ability recruiters rarely see in junior engineers: build the product and explain why it matters.",
    ],
    stack: ["React", "TypeScript", "Vite SSG", "SEO", "JSON-LD", "Content architecture"],
    links: [
      { label: "Hub", href: "https://demosvibes.gr/" },
      { label: "GitHub", href: "https://github.com/dgodolias/demosvibes.gr" },
    ],
    accent: "coral",
  },
  {
    title: "CSEventFinder",
    eyebrow: "AI/event discovery engine",
    year: "2026",
    status: "Private repo",
    summary:
      "A high-recall tracker for computer science, startup, fintech, AI, developer, conference, and hackathon events in Greece.",
    role:
      "Built the crawl, extraction, scoring, review-label, SQLite, FastAPI, and Vite app loop.",
    impact: [
      "Extracts candidates from JSON-LD, feeds, ICS links, anchors, and broad discovery queries.",
      "Scores relevance, date confidence, location, source quality, and learned label signals.",
      "Designed for reviewability: false positives are acceptable if evidence is explainable.",
    ],
    stack: ["Python", "FastAPI", "SQLite", "Vite", "TypeScript", "Crawling"],
    links: [],
    accent: "lilac",
  },
  {
    title: "QR Style Studio",
    eyebrow: "Privacy-first browser tool",
    year: "2026",
    status: "Open source",
    summary:
      "A client-side QR style generator with custom shapes, frames, logos, export options, and scannability safeguards.",
    role:
      "Built the browser-only generator, export pipeline, logo sanitization, SVG escaping, and security-focused UI.",
    impact: [
      "No backend, accounts, tracking, cookies, or runtime external origins.",
      "Validates logo uploads with type allow-lists, magic-byte checks, size limits, and canvas re-encoding.",
      "Exports PNG, JPEG, and SVG while warning about dangerous payloads.",
    ],
    stack: ["TypeScript", "React", "SVG", "Canvas", "CSP", "DOMPurify"],
    links: [{ label: "GitHub", href: "https://github.com/dgodolias/QRCodeStyleGen" }],
    accent: "leaf",
  },
];

export const projectShelf: Project[] = [
  {
    title: "BoomAI",
    eyebrow: "AI code review CLI",
    year: "2026",
    status: "Open source experiment",
    summary:
      "AI-powered code-review and auto-fixing CLI for C#/Unity projects using static analysis plus LLM patch planning.",
    role:
      "Combined Semgrep, DevSkim, Roslyn-style checks, Gitleaks, chunked review planning, and patch application into one CLI flow.",
    impact: [
      "Targets bugs such as resource leaks, async pitfalls, null refs, race conditions, and security issues.",
      "Designed around exact code replacements and auditable diffs.",
    ],
    stack: ["Python", "Gemini", "Static analysis", "C#", "Unity"],
    links: [{ label: "GitHub", href: "https://github.com/dgodolias/BoomAI" }],
    accent: "sky",
  },
  {
    title: "Nero Website",
    eyebrow: "Hospitality frontend",
    year: "2026",
    status: "Public GitHub Pages",
    summary:
      "A polished cafe/bar/restaurant website for Nero in Neo Irakleio, built around real venue photography, fast menu/map actions, and QuaR-backed menu paths.",
    role:
      "Designed and built the React/Vite/TypeScript experience, structured data, image gallery, language picker, motion layer, and Playwright QA around verified venue facts.",
    image: {
      src: "/images/projects/nero.webp",
      alt: "Nero Website hero section with real daytime lounge photography",
    },
    impact: [
      "Published on GitHub Pages with direct QuaR menu, map, call, hours, and social paths.",
      "Uses sourced and refined real Nero assets instead of generated imagery, with image preview and mobile swipe interactions.",
      "Protected by Playwright checks for overflow, structured data, favicon, image loading, accessibility labels, and external-link rel hygiene.",
    ],
    stack: ["React", "TypeScript", "Vite", "Playwright", "SEO", "GitHub Pages"],
    links: [
      { label: "Live", href: "https://dgodolias.github.io/NeroWebsite/" },
      { label: "GitHub", href: "https://github.com/dgodolias/NeroWebsite" },
    ],
    accent: "coral",
  },
  {
    title: "AthensSecret VR/MR backend",
    eyebrow: "Game backend",
    year: "2025",
    status: "Client/team project",
    summary:
      "Backend API for a multiplayer VR/MR game set around Athens secrets.",
    role:
      "Worked on authentication and backend services connecting the game experience to persistent data.",
    impact: [
      "Built with ASP.NET Core, JWT authentication, PostgreSQL, and Dockerized services.",
      "Connected Unity/game work with web/backend infrastructure.",
    ],
    stack: ["ASP.NET Core", "C#", "JWT", "PostgreSQL", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/dgodolias/AthensSecret_VR-MR_Game" }],
    accent: "sun",
  },
];

export const experiences: Experience[] = [
  {
    company: "TrackSights ApS",
    role: "Data Analyst Intern",
    location: "Denmark / Erasmus+",
    period: "Feb 2026 - Jun 2026",
    summary:
      "Worked in the data team on automotive OEM collection and depreciation modeling.",
    bullets: [
      "Reverse-engineered configurator data for Audi, Hyundai, and Mercedes-Benz across BE, DE, DK, ES, FR, IT, NL, and SE.",
      "Built provider-pattern scrapers and canonical Pydantic schemas, then moved JSON through GCS, BigQuery, and Dataform.",
      "Added warehouse assertions and worked on a depreciation model trained over roughly 785k listings and 71 features.",
    ],
  },
  {
    company: "Quar.gr",
    role: "Founder / Full-stack Engineer",
    location: "Athens",
    period: "Jun 2025 - Present",
    summary:
      "Building a production QR menu platform for real cafes and non-technical operators.",
    bullets: [
      "Designed the product, admin UX, data model, deployments, and customer support loop.",
      "Built multilingual menus, drag-and-drop editing, media handling, and analytics.",
      "Learned to balance engineering polish with the messy reality of real users.",
    ],
  },
  {
    company: "Dalia Labs FZE LLC",
    role: "Software Developer Intern",
    location: "Dubai",
    period: "Jul 2025 - Oct 2025",
    summary:
      "Worked on dashboard frontend components and production UI features.",
    bullets: [
      "Implemented frontend components and UI improvements for dashboard workflows.",
      "Collaborated inside a fast-moving software team and shipped reviewed code.",
      "Strengthened habits around component quality, visual polish, and maintainability.",
    ],
  },
  {
    company: "Freelance / Medical sector",
    role: "Website and app developer",
    location: "Remote",
    period: "May 2024 - May 2025",
    summary:
      "Built professional websites for healthcare practitioners and a Flutter patient-record app.",
    bullets: [
      "Delivered client websites for doctors and medical professionals.",
      "Built karteles_asthenwn, a Flutter app for patient medical records.",
      "Handled requirements, delivery, support, and non-technical stakeholder communication.",
    ],
  },
];

export const socialProfiles: SocialProfile[] = [
  {
    platform: "Instagram",
    handle: "@demos.vibes",
    href: "https://www.instagram.com/demos.vibes/",
    detail: "Greek AI tool and workflow demos; 25 recent reels.",
  },
  {
    platform: "TikTok",
    handle: "@demos.vibes",
    href: "https://www.tiktok.com/@demos.vibes",
    detail: "Short-form AI demos paired with reusable resources.",
  },
  {
    platform: "X",
    handle: "@demosvibes",
    href: "https://x.com/demosvibes",
    detail: "AI tools, build notes, and product experiments.",
  },
  {
    platform: "Threads",
    handle: "@demos.vibes",
    href: "https://www.threads.com/@demos.vibes",
    detail: "Creator channel presence for Greek AI education.",
  },
];

export const skillGroups = [
  {
    title: "Languages",
    skills: ["Python", "TypeScript", "JavaScript", "Java", "C#", "C++", "SQL", "R", "Dart"],
  },
  {
    title: "Frontend",
    skills: ["React", "Next.js", "Tailwind CSS", "shadcn/ui", "Vite", "Framer Motion"],
  },
  {
    title: "Backend and data",
    skills: ["FastAPI", "Node/Express", "Django", "Flask", "ASP.NET Core", "PostgreSQL", "BigQuery", "Redis"],
  },
  {
    title: "AI and automation",
    skills: [
      "RAG",
      "LLM APIs",
      "PyTorch",
      "scikit-learn",
      "Playwright",
      "Selenium",
      "AI coding agents",
      "Cursor",
      "GitHub Copilot",
    ],
  },
  {
    title: "Cloud and ops",
    skills: ["Docker", "Terraform", "GCP", "Firebase", "Git", "CI/CD", "Dataform"],
  },
];
