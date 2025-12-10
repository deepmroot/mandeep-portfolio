import { Github, ExternalLink } from "lucide-react";

export const LINKS = {
  github: "https://github.com/deepmroot",
  linkedin: "https://www.linkedin.com/in/mandeep-singh-b855972a7/",
  email: "mailto:mandeepsinghwani@gmail.com",
};

export const PROJECTS = [
  {
    title: "Generic Alternatives",
    timeframe: "2025",
    summary:
      "A distributed sourcing, automation, and logistics enablement platform that replaces traditional sourcing agents with a data-driven, AI-powered workflow for global supply chains.",
    tags: ["Distributed Sourcing", "Automation", "Logistics", "AI Agents", "Microservices", "TypeScript", "React", "Express", "PostgreSQL", "Docker", "CI/CD", "Scraping"],
    links: [
      { label: "Visit Site", href: "https://genericalternatives.co.uk/" },
      { label: "GitHub", href: "https://github.com/matthewdonsemail-lab/GenericAlternatives.git" },
    ],
    featured: true,
  },
  {
    title: "RentSpace – Modern Rental Platform",
    timeframe: "2025",
    summary:
      "A full-featured rental property platform built with Next.js 16 & Supabase. Features AI-powered chat (Gemini 2.0), real-time messaging, Zillow property syncing, and a comprehensive landlord/tenant dashboard.",
    tags: ["Next.js 16", "Supabase", "TypeScript", "Tailwind", "AI Agents", "Google Maps"],
    links: [
      { label: "Visit Site", href: "https://rent-space-iota.vercel.app/" }, 
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
        { label: "Visit Site", href: "https://promptline-gold.vercel.app/" },
        { label: "GitHub", href: "https://github.com/deepmroot/promptline-rust" }
    ],
    featured: true,
  },
  {
    title: "Hypershape Canada – 3D Printing Store",
    timeframe: "2024 – Present",
    summary:
      "Shopify storefront for 3D‑printed décor; designed interactive assets and embedded NFC for post‑purchase experiences.",
    tags: ["Shopify", "NFC", "Brand", "3D Print"],
    links: [
      { label: "Visit Site", href: "https://hypershape.ca" },
      { label: "Instagram", href: "#" },
    ],
  },
  {
    title: "QuickTest AI",
    timeframe: "2025",
    summary:
      "A comprehensive exam system featuring automatic question generation and answer checking using an LLM. Supports source material upload (.txt, .docx, .pptx) and various question types.",
    tags: ["React", "Node.js", "Express", "MongoDB", "AI Agents", "Stripe", "MUI"],
    links: [
      { label: "Visit Site", href: "https://quicktest-ai-374261b0a08e.herokuapp.com/" },
      { label: "GitHub", href: "https://github.com/deepmroot/QuickTest.ai" },
    ],
    featured: true,
  },
  {
    title: "Terra Mare Education",
    timeframe: "2022 – Present",
    summary:
      "Custom WordPress/CMS builds including a Croatian school site; trained staff to self‑publish content.",
    tags: ["WordPress", "CMS", "Accessibility"],
    links: [{ label: "Visit Site", href: "https://www.terramareeducation.com/" }],
  },
  {
    title: "BudgetBuddy – Mobile Finance App",
    timeframe: "2024 – Present",
    summary:
      "Student‑first expense tracker with Google Sign‑In, biometrics, SQLite + Firebase sync, and polished UI.",
    tags: ["Android", "Java", "SQLite", "Firebase", "Auth"],
    links: [], // No links yet
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