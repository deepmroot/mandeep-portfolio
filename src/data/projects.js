import { Github, ExternalLink } from "lucide-react";

export const LINKS = {
  github: "https://github.com/deepmroot",
  linkedin: "https://www.linkedin.com/in/mandeep-singh-b855972a7/",
  email: "mailto:mandeepsinghwani@gmail.com",
};

export const PROJECTS = [
  {
    title: "RentSpace – Modern Rental Platform",
    timeframe: "2025",
    summary:
      "A full-featured rental property platform built with Next.js 16 & Supabase. Features AI-powered chat (Gemini 2.0), real-time messaging, Zillow property syncing, and a comprehensive landlord/tenant dashboard.",
    tags: ["Next.js 16", "Supabase", "TypeScript", "Tailwind", "AI Agents", "Google Maps"],
    links: [
      { label: "Live Demo", href: "https://rent-space-iota.vercel.app/" }, 
      { label: "GitHub", href: "https://github.com/deepmroot/RentSpace" },
    ],
    featured: true,
  },
  {
    title: "PromptLine – AI Agent CLI",
    timeframe: "2025",
    summary:
      "A Rust-based CLI tool that brings agentic AI capabilities to your terminal. Supports OpenAI & Ollama, safe file operations, and intelligent project scaffolding.",
    tags: ["Rust", "CLI", "AI Agents", "OpenAI", "Ollama"],
    links: [
        { label: "Website", href: "https://promptline-gold.vercel.app/" },
        { label: "GitHub", href: "https://github.com/deepmroot/promptline-rust" }
    ],
    featured: true,
  },
  {
    title: "BudgetBuddy – Mobile Finance App",
    timeframe: "2024 – Present",
    summary:
      "Student‑first expense tracker with Google Sign‑In, biometrics, SQLite + Firebase sync, and polished UI.",
    tags: ["Android", "Java", "SQLite", "Firebase", "Auth"],
    links: [
      { label: "Repo", href: LINKS.github },
      { label: "Demo", href: "#" },
    ],
  },
  {
    title: "Hypershape Canada – 3D Printing Store",
    timeframe: "2024 – Present",
    summary:
      "Shopify storefront for 3D‑printed décor; designed interactive assets and embedded NFC for post‑purchase experiences.",
    tags: ["Shopify", "NFC", "Brand", "3D Print"],
    links: [
      { label: "Store", href: "#" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    title: "Freelance – School & CMS Sites",
    timeframe: "2022 – Present",
    summary:
      "Custom WordPress/CMS builds including a Croatian school site (Tara One); trained staff to self‑publish content.",
    tags: ["WordPress", "CMS", "Accessibility"],
    links: [{ label: "Live Example", href: "#" }],
  },
  {
    title: "VR Indoor Tour (TRU)",
    timeframe: "2023 – Current",
    summary:
      "Immersive 360° exploration using React + A‑Frame/Three.js; supports guided learning and discovery.",
    tags: ["React", "A‑Frame", "Three.js", "UX"],
    links: [{ label: "Repo", href: "#" }],
  },
  {
    title: "AI Image → 3D Conversion",
    timeframe: "2025",
    summary:
      "Pipeline that turns 2D images into printable 3D meshes (Hanyuan3D wrapper). Targeted ~92% match on test set.",
    tags: ["AI", "3D Mesh", "Python"],
    links: [
      { label: "Demo", href: "#" },
      { label: "Write‑up", href: "#" },
    ],
  },
];

export const SKILLS = [
  {
    category: "Languages & Frameworks",
    items: ["TypeScript", "JavaScript", "Rust", "Java", "Python", "React", "Next.js", "Node.js"],
  },
  {
    category: "Backend & Cloud",
    items: ["Supabase", "Firebase", "PostgreSQL", "AWS (CCP)", "Vercel", "Docker"],
  },
  {
    category: "Tools & Design",
    items: ["Git", "Figma", "Tailwind CSS", "Framer Motion", "Three.js", "A-Frame"],
  },
  {
    category: "Other",
    items: ["AI/LLM Integration", "CI/CD", "Agile", "System Design"],
  },
];
