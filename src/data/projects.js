import { Github, ExternalLink } from "lucide-react";

export const LINKS = {
  github: "https://github.com/deepmroot",
  linkedin: "https://www.linkedin.com/in/mandeep-singh-b855972a7/",
  email: "mailto:mandeepsinghwani@gmail.com",
  resume: "/resume.pdf", 
};

export const PROJECTS = [
  {
    title: "SyntaxArk",
    category: "flagship",
    timeframe: "2025",
    summary: "A full-stack browser-based IDE supporting multi-file editing, runtime execution, challenge testing, and real-time collaboration.",
    techStack: {
      frontend: "React, TypeScript, Vite, Tailwind",
      state: "Zustand",
      editor: "Monaco",
      terminal: "xterm.js",
      backend: "Convex",
      deployment: "Vercel + CI/CD Workflow"
    },
    highlights: [
      "Designed scalable state architecture using Zustand",
      "Built runtime execution pipeline with console streaming",
      "Implemented real-time collaboration using Convex",
      "Added CI/CD pipeline with deploy lint gate and smoke tests",
      "Structured project for production deployment on Vercel",
      "Optimized Monaco Editor performance with worker-based tokenization"
    ],
    links: [
      { label: "Live Demo", href: "https://syntaxark.vercel.app/" }, 
      { label: "GitHub Repo", href: "https://github.com/deepmroot/SyntaxArk" },
    ],
  },
  {
    title: "RentSpace",
    category: "selected",
    timeframe: "2025",
    summary: "Modern rental property platform featuring AI-powered automated screening and real-time property synchronization.",
    theme: "orange",
    techStack: {
      frontend: "Next.js 16, TypeScript, Tailwind",
      backend: "Supabase (Auth, DB, Storage)",
      ai: "Google Gemini 2.0 (LLM Agents)",
      realtime: "Supabase Realtime / Webhooks",
      integrations: "Zillow Property API",
      deployment: "Vercel"
    },
    highlights: [
      "Integrated Zillow API for real-time rental property synchronization",
      "Architected AI agent workflow for automated tenant screening and scoring",
      "Implemented Supabase Realtime for instant landlord-tenant messaging",
      "Engineered secure file processing pipeline for rental documentation",
      "Designed comprehensive dashboard for multi-property management",
      "Optimized geolocation search performance using PostGIS and Supabase"
    ],
    links: [
      { label: "Live Demo", href: "https://rentspace4u.ca/" }, 
      { label: "GitHub Repo", href: "https://github.com/deepmroot/RentSpace" },
    ],
  },
  {
    title: "Generic Alternatives",
    category: "selected",
    timeframe: "2025",
    summary: "AI-powered global supply chain automation and distributed sourcing platform. Replaces traditional agents with data-driven workflows.",
    theme: "olive",
    techStack: {
      frontend: "TypeScript, React, Manrope",
      backend: "Node.js, Express, PostgreSQL",
      automation: "AI Agents, Job Queues",
      devops: "Docker, CI/CD, Microservices",
      intelligence: "Web Scraping, Price Prediction",
      brand: "Manrope + DM Serif Display"
    },
    highlights: [
      "Built distributed sourcing engine with AI-powered supplier matching",
      "Automated logistics workflows using background job processing",
      "Containerized microservices architecture for scalable deployment",
      "Implemented high-weight geometric sans visual language",
      "Developed price prediction algorithms for supply chain risk",
      "Preserved production palette system: Olive/Lime contrast"
    ],
    links: [
      { label: "Live Demo", href: "https://genericalternatives.co.uk/" },
      { label: "GitHub Repo", href: "https://github.com/matthewdonsemail-lab/GenericAlternatives.git" },
    ],
  },
  {
    title: "PromptLine",
    category: "core",
    asciiLogo: `   ____  ____   ___  __  __ ____ _____ _     ___ _   _ _____ 
  |  _ \\|  _ \\ / _ \\|  \\/  |  _ \\_   _| |   |_ _| \\ | | ____|
  | |_) | |_) | | | | |\\/| | |_) || | | |    | ||  \\| |  _|  
  |  __/|  _ <| |_| | |  | |  __/ | | | |___ | || |\\  | |___ 
  |_|   |_| \\_\\___/|_|  |_|_|    |_| |_____|___|_| \\_|_____|`,
    summary: "High-performance AI-Native Runtime Terminal interface built in Rust. Bringing agentic AI capabilities directly to the local dev environment.",
    stack: "Rust, OpenAI API, Ollama, CLI Architectures, Tokio",
    highlights: [
      "Engineered safe file operation protocols for AI-driven modifications",
      "Implemented multi-provider support (OpenAI & Ollama)",
      "Optimized terminal UI performance using Rust's concurrency model",
      "Built custom project scaffolding engine for rapid prototyping",
      "Designed secure API key management with local encrypted storage",
      "Implemented asynchronous streaming for real-time AI responses"
    ],
    links: [
        { label: "Live Demo", href: "https://promptline-gold.vercel.app/" },
        { label: "GitHub Repo", href: "https://github.com/deepmroot/promptline-rust" }
    ],
  },
  {
    title: "Project_Genesis [WIP]",
    category: "core",
    isWIP: true,
    summary: "A next-generation distributed systems monitoring tool designed for high-throughput microservice architectures. Currently in the architectural design phase.",
    stack: "Go, gRPC, Prometheus, Kubernetes, Redis",
    highlights: [
      "Defining high-availability consensus protocols",
      "Designing zero-copy data transfer pipelines",
      "Architecting distributed trace aggregation",
      "Implementing custom eBPF kernel probes",
      "Optimizing time-series indexing for scale",
      "Drafting technical whitepaper for v1.0 release"
    ],
    links: [
        { label: "Status: Research", href: "#" },
    ],
  },
  {
    title: "InferenceSaver",
    category: "selected",
    timeframe: "2026",
    theme: "rose",
    summary: "SSR-first AI SaaS platform for unlocking premium AI workflows across flagship models, with subscription billing, checkout flows, and conversion-focused product marketing.",
    techStack: {
      frontend: "Next.js 15, React 19, TypeScript, Tailwind",
      backend: "Server-rendered App Router architecture",
      billing: "Stripe subscriptions and checkout",
      auth: "WorkOS identity flows",
      growth: "Affiliate, guides, partnerships, funnel pages",
      deployment: "Production-ready SSR delivery"
    },
    highlights: [
      "Built a server-rendered Next.js platform with dynamic no-store delivery for production freshness",
      "Created subscription and checkout flows for monetized access to premium AI tooling",
      "Positioned the product around many flagship AI models instead of a single assistant experience",
      "Structured auth lifecycle routes including signup, login, verification, and password recovery",
      "Designed conversion-focused landing experiences with pricing, FAQ, guides, partnerships, and affiliate funnels",
      "Organized scalable App Router architecture across product, content, and checkout journeys"
    ],
    links: [
      { label: "Live Demo", href: "https://inferencesaver.com" }
    ],
  },
  {
    title: "QuickTest AI",
    category: "additional",
    summary: "Exam system with automatic question generation using LLMs.",
    stack: "React, Node.js, MongoDB, Stripe",
    links: [{ label: "Site", href: "https://quicktest-ai-374261b0a08e.herokuapp.com/" }, { label: "GitHub", href: "https://github.com/deepmroot/QuickTest.ai" }],
  },
  {
    title: "Hypershape Canada",
    category: "additional",
    summary: "Shopify storefront for 3D-printed décor with NFC integration.",
    stack: "Shopify, NFC, 3D Design",
    links: [{ label: "Site", href: "https://hypershape.ca" }],
  },
  {
    title: "BudgetBuddy",
    category: "additional",
    summary: "Android expense tracker with Firebase sync and biometrics.",
    stack: "Java, Android SDK, Firebase",
    links: [{ label: "GitHub", href: "https://github.com/deepmroot/BudgetBuddy.git" }],
  },
  {
    title: "Terra Mare Education",
    category: "additional",
    summary: "Custom WordPress/CMS build for an international school.",
    stack: "WordPress, CMS, Accessibility",
    links: [{ label: "Site", href: "https://www.terramareeducation.com/" }],
  },
];

export const SKILLS = [
  {
    category: "Frontend",
    items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion", "Zustand"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Express", "PostgreSQL", "Supabase", "Convex", "Firebase"],
  },
  {
    category: "Tools",
    items: ["Git", "Docker", "Figma", "Rust CLI", "Vite", "Monaco Editor"],
  },
  {
    category: "DevOps",
    items: ["CI/CD Workflows", "Vercel", "AWS (CCP)", "Deployment Monitoring", "Production Debugging", "System Orchestration"],
  },
];