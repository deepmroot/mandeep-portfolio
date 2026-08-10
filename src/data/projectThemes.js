export const PROJECT_THEMES = {
  inferencesaver: {
    slug: "inferencesaver",
    title: "InferenceSaver",
    tag: "AI PLATFORM & BILLING",
    subtitle: "SSR-first AI SaaS platform unlocking premium AI workflows with Stripe & WorkOS.",
    bg: "#ff3c34",
    year: "2026",
    industry: "AI SaaS & Billing",
    client: "InferenceSaver Inc.",
    href: "https://inferencesaver.com",
    thumb: "/thumbs/inferencesaver.jpg",
    video: "/media/inferencesaver-promo.mp4",
    techChips: ["Next.js 15", "React 19", "TypeScript", "Stripe", "WorkOS", "Tailwind CSS"],
    story: "InferenceSaver breaks down the barriers of fragmented AI billing models by uniting premium model access under unified server-rendered App Router workflows. Built for scale, it handles recurring Stripe subscriptions, WorkOS identity auth, dynamic model routing, and conversion-optimized growth funnels.",
    highlights: [
      "Built server-rendered App Router architecture with dynamic delivery for model freshness",
      "Integrated Stripe subscriptions checkout and WorkOS identity authentication lifecycle",
      "Created conversion-focused landing experiences, guide hubs, and affiliate funnels"
    ],
    gallery: [
      { thumb: "/thumbs/inferencesaver.jpg", caption: "SSR Landing Page & Hero Funnel" },
      { thumb: "/thumbs/becomeafish.jpg", caption: "Interactive Subscription & Pricing Tiers" }
    ]
  },
  becomeafish: {
    slug: "becomeafish",
    title: "BecomeAfish",
    tag: "BOOKING SAAS",
    subtitle: "Private swim-lesson booking platform with zone scheduling & progress tracking.",
    bg: "#0d9488",
    year: "2026",
    industry: "Booking SaaS",
    client: "BecomeAfish Swim School",
    href: "https://becomeafish.com",
    thumb: "/thumbs/becomeafish.jpg",
    video: "/media/becomeafish-promo.mp4",
    techChips: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Stripe", "PostgreSQL"],
    story: "BecomeAfish transforms private aquatic instruction booking with dynamic zone scheduling algorithms, automated recurring lesson renewals, real-time client progress portals, and integrated Stripe customer billing.",
    highlights: [
      "Architected recurring lesson schedule engine handling zone constraints",
      "Integrated Stripe checkout & customer portal for automated recurring payments",
      "Built client progress tracking portal with realtime lesson status updates"
    ],
    gallery: [
      { thumb: "/thumbs/becomeafish.jpg", caption: "Client Booking & Schedule Engine" }
    ]
  },
  rentspace: {
    slug: "rentspace",
    title: "RentSpace",
    tag: "PROPTECH & AI",
    subtitle: "Rental platform with AI tenant screening, Zillow sync, and realtime messaging.",
    bg: "#0284c7",
    year: "2025",
    industry: "PropTech SaaS",
    client: "RentSpace Platforms",
    href: "https://rentspace4u.ca/",
    thumb: "/thumbs/rentspace.jpg",
    techChips: ["Next.js 16", "TypeScript", "Supabase", "Gemini 2.0", "PostGIS", "Tailwind CSS"],
    story: "RentSpace modernizes residential property management with automated AI tenant screening algorithms, Zillow property feed synchronization, PostGIS geolocation search, and Supabase real-time messaging.",
    highlights: [
      "Integrated Zillow API for real-time rental property synchronization",
      "Architected AI agent workflow for automated tenant screening and credit scoring",
      "Implemented Supabase Realtime for instant landlord-tenant messaging",
      "Optimized geolocation search performance using PostGIS and Supabase"
    ],
    gallery: [
      { thumb: "/thumbs/rentspace.jpg", caption: "AI Tenant Screening & Property Feed" }
    ]
  },
  syntaxark: {
    slug: "syntaxark",
    title: "SyntaxArk",
    tag: "BROWSER IDE",
    subtitle: "Multi-file editing, runtime execution, and real-time collaboration in the browser.",
    bg: "#4f46e5",
    year: "2025",
    industry: "Developer Tooling",
    client: "Open Source / SyntaxArk",
    href: "https://syntaxark.vercel.app/",
    repo: "https://github.com/deepmroot/SyntaxArk",
    thumb: "/thumbs/syntaxark.jpg",
    techChips: ["React", "TypeScript", "Monaco Editor", "xterm.js", "Convex", "Zustand"],
    story: "SyntaxArk is a full-stack browser-based IDE supporting multi-file editing, Monaco editor tokenization, xterm.js terminal integration, isolated code execution pipelines, and real-time Convex collaboration.",
    highlights: [
      "Designed scalable state architecture using Zustand and Monaco worker tokenization",
      "Built runtime execution pipeline with isolated console streaming",
      "Implemented real-time multi-user collaboration using Convex backend"
    ],
    gallery: [
      { thumb: "/thumbs/syntaxark.jpg", caption: "Monaco Multi-File Editor Interface" }
    ]
  },
  promptline: {
    slug: "promptline",
    title: "PromptLine",
    tag: "RUST CLI RUNTIME",
    subtitle: "High-performance AI-native terminal runtime with multi-provider streaming.",
    bg: "#d97706",
    year: "2025",
    industry: "Rust AI Tooling",
    client: "Open Source CLI",
    href: "https://promptline-gold.vercel.app/",
    repo: "https://github.com/deepmroot/promptline-rust",
    thumb: "/thumbs/promptline.jpg",
    iframe: "https://promptline-gold.vercel.app/",
    techChips: ["Rust", "Tokio", "OpenAI API", "Ollama", "Ratatui", "Encrypted Storage"],
    story: "PromptLine delivers agentic AI capabilities directly to developer local terminals. Engineered in Rust with Tokio async concurrency, Ratatui TUI layouts, and local AES-256 encrypted API key storage.",
    highlights: [
      "Engineered safe file operation protocols for AI-driven modifications",
      "Implemented multi-provider streaming support (OpenAI & local Ollama)",
      "Designed secure API key management with local AES-256 encrypted storage"
    ],
    gallery: [
      { thumb: "/thumbs/promptline.jpg", caption: "Ratatui TUI Terminal Workflow" }
    ]
  },
  agentmemory: {
    slug: "agentmemory",
    title: "agentmemory",
    tag: "AI INFRASTRUCTURE",
    subtitle: "MCP-native persistent memory for AI coding agents — sub-50ms recall.",
    bg: "#059669",
    year: "2026",
    industry: "AI Infrastructure",
    client: "agent-memory.dev",
    href: "https://agent-memory.dev",
    repo: "https://github.com/deepmroot/agentmemory",
    thumb: "/thumbs/agentmemory.jpg",
    techChips: ["TypeScript", "MCP Protocol", "Vector DB", "Node.js", "SQLite", "JSONL"],
    story: "agentmemory equips AI coding agents with sub-50ms vector semantic memory across sessions. Built on Model Context Protocol (MCP), it records workspace activity, indexes code context, and recalls past fixes instantly.",
    highlights: [
      "Built MCP-compliant server architecture compatible with Gemini, Claude & Cursor",
      "Engineered sub-50ms vector search for semantic codebase context recall",
      "Implemented automatic session recording and workspace state tracking"
    ],
    gallery: [
      { thumb: "/thumbs/agentmemory.jpg", caption: "Vector Semantic Memory Server" }
    ]
  },
  brainrot: {
    slug: "brainrot",
    title: "brainrot",
    tag: "OPEN SOURCE HUD",
    subtitle: "Cross-agent doomscroll overlay while your AI codes — auto hides when needed.",
    bg: "#7c3aed",
    year: "2026",
    industry: "Open Source Utility",
    client: "Community OSS",
    href: "https://github.com/deepmroot/brainrot",
    thumb: "/thumbs/brainrot.jpg",
    techChips: ["TypeScript", "Electron", "React", "Tailwind CSS", "Agent Events"],
    story: "brainrot is an open-source HUD utility for AI-assisted developers that displays a lightweight short-form media feed while long-running coding agents process, automatically hiding the HUD when human input is requested.",
    highlights: [
      "Listens to agent lifecycle events to show/hide context overlays seamlessly",
      "Built zero-latency IPC communication between background worker & HUD",
      "Gained immediate open-source traction among AI-assisted developers"
    ],
    gallery: [
      { thumb: "/thumbs/brainrot.jpg", caption: "Electron HUD Overlay & Feed" }
    ]
  },
  preflight: {
    slug: "preflight",
    title: "Preflight",
    tag: "MULTIMODAL AI",
    subtitle: "Launch-readiness scanner combining vision LLMs with DOM audits.",
    bg: "#e11d48",
    year: "2026",
    industry: "AI Agent Scanner",
    client: "Amazon Nova Hackathon",
    href: "https://preflight-frontend-sepia.vercel.app",
    repo: "https://github.com/deepmroot/preflight",
    thumb: "/thumbs/preflight.jpg",
    techChips: ["Next.js", "Amazon Nova", "TypeScript", "Tailwind CSS", "Playwright"],
    story: "Preflight scans repository code alongside DOM screenshots using Amazon Nova multimodal AI models to flag visual regressions, broken routes, and performance bottlenecks prior to demo day.",
    highlights: [
      "Built for Amazon Nova Hackathon, combining vision LLMs with automated DOM audits",
      "Generates step-by-step fix recommendations and pre-launch checklists",
      "Automates screenshot capture across responsive breakpoints"
    ],
    gallery: [
      { thumb: "/thumbs/preflight.jpg", caption: "Multimodal Scanner Audit Dashboard" }
    ]
  },
  genericalternatives: {
    slug: "genericalternatives",
    title: "Generic Alternatives",
    tag: "SUPPLY CHAIN AI",
    subtitle: "Distributed sourcing platform replacing traditional agents with data workflows.",
    bg: "#2563eb",
    year: "2025",
    industry: "Supply Chain B2B",
    client: "Generic Alternatives UK",
    href: "https://genericalternatives.co.uk/",
    thumb: "/thumbs/genericalternatives.jpg",
    techChips: ["TypeScript", "React", "Node.js", "PostgreSQL", "Docker", "Job Queues"],
    story: "Generic Alternatives replaces traditional procurement intermediaries with data-driven supplier matching algorithms, automated background logistics job queues, and predictive price risk analytics.",
    highlights: [
      "Built distributed sourcing engine with AI-powered supplier matching",
      "Automated logistics workflows using background job queues",
      "Developed price prediction algorithms for supply chain risk analysis"
    ],
    gallery: [
      { thumb: "/thumbs/genericalternatives.jpg", caption: "Distributed Procurement Dashboard" }
    ]
  },
  thewanderingbar: {
    slug: "thewanderingbar",
    title: "The Wandering Bar",
    tag: "CLIENT WORK",
    subtitle: "Luxury mobile bartending service in Kamloops, BC — booking-first platform.",
    bg: "#c05621",
    year: "2026",
    industry: "Hospitality & Events",
    client: "The Wandering Bar",
    href: "https://thewanderingbar.vercel.app",
    thumb: "/thumbs/thewanderingbar.jpg",
    techChips: ["React", "TypeScript", "Tailwind CSS", "Vercel", "FormSpree"],
    story: "A conversion-focused mobile bar booking platform designed for Kamloops BC events. Features interactive package selectors, dry-hire workflows, photo gallery, and direct inquiry funnels.",
    highlights: [
      "Designed and delivered full custom brand aesthetic in 2 weeks",
      "Optimized booking request funnel increasing online inquiries by 2x",
      "Mobile-first responsive design tailored for event hosts"
    ],
    gallery: [
      { thumb: "/thumbs/thewanderingbar.jpg", caption: "Luxury Mobile Bar Landing Page" }
    ]
  },
  kamloopsdrywall: {
    slug: "kamloopsdrywall",
    title: "Kami Drywall & Renovation",
    tag: "CLIENT WORK",
    subtitle: "Conversion-focused static site for a Kamloops drywall and renovation contractor.",
    bg: "#4a5568",
    year: "2026",
    industry: "Construction & Trade",
    client: "Kami Drywall BC",
    href: "https://kamloops-drywall.vercel.app",
    thumb: "/thumbs/kamloopsdrywall.jpg",
    techChips: ["React", "TypeScript", "Tailwind CSS", "Static Generator"],
    story: "Fast static contractor site for a Kamloops drywall and renovation specialist, optimized for immediate phone quote requests and local Kamloops search dominance.",
    highlights: [
      "Zero-latency static load times for high mobile conversion",
      "Built instant phone quote request call-to-actions",
      "Structured local SEO schema for Kamloops renovation searches"
    ],
    gallery: [
      { thumb: "/thumbs/kamloopsdrywall.jpg", caption: "Contractor Quote Landing Page" }
    ]
  }
};
