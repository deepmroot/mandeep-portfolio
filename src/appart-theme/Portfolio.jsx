import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { LINKS } from "../data/projects";

// Palette (inspired by warm editorial studio design)
// paper #fbf9ef · panel #f2f0e7 · ink #171412 · warm gray #8e827c · red #ff3c34 · amber #ffc765

const DISPLAY = "[font-family:'Bricolage_Grotesque','Inter',sans-serif]";
const MONO = "[font-family:'IBM_Plex_Mono',monospace]";

const WORKS = [
  {
    title: "SyntaxArk",
    type: "Browser IDE",
    year: "2025",
    blurb: "Multi-file editing, runtime execution and real-time collaboration — in the browser.",
    href: "https://syntaxark.vercel.app/",
    repo: "https://github.com/deepmroot/SyntaxArk",
  },
  {
    title: "InferenceSaver",
    type: "AI SaaS",
    year: "2026",
    blurb: "Premium AI access platform with Stripe subscriptions, WorkOS auth and SSR delivery.",
    href: "https://inferencesaver.com",
  },
  {
    title: "RentSpace",
    type: "PropTech",
    year: "2025",
    blurb: "Rental platform with AI tenant screening, Zillow sync and realtime messaging.",
    href: "https://rentspace4u.ca/",
  },
  {
    title: "Generic Alternatives",
    type: "Supply Chain AI",
    year: "2025",
    blurb: "Distributed sourcing platform replacing traditional agents with data-driven workflows.",
    href: "https://genericalternatives.co.uk/",
  },
  {
    title: "PromptLine",
    type: "Rust CLI",
    year: "2025",
    blurb: "AI-native terminal runtime — multi-provider, async streaming, encrypted key storage.",
    href: "https://promptline-gold.vercel.app/",
    repo: "https://github.com/deepmroot/promptline-rust",
  },
  {
    title: "QuickTest AI",
    type: "EdTech",
    year: "2024",
    blurb: "Exam system with automatic question generation using LLMs.",
    href: "https://quicktest-ai-374261b0a08e.herokuapp.com/",
    repo: "https://github.com/deepmroot/QuickTest.ai",
  },
  {
    title: "Project Genesis",
    type: "Distributed Systems",
    year: "WIP",
    blurb: "High-throughput microservice monitoring — Go, gRPC, eBPF. In architectural design.",
  },
];

const SHIPS = [
  {
    no: "01",
    title: "Product engineering, end to end.",
    body: "From empty repo to production URL. I design the architecture, build the interface, wire the backend and ship it — React, Next.js and TypeScript doing the heavy lifting.",
    chips: ["React", "Next.js 15", "TypeScript", "Tailwind", "Zustand"],
  },
  {
    no: "02",
    title: "AI that does real work.",
    body: "Not chatbots bolted on for show. Agent workflows that screen tenants, generate exams and match suppliers — with the prompt engineering, fallbacks and cost control that production demands.",
    chips: ["LLM Agents", "Gemini", "OpenAI", "Ollama", "RAG"],
  },
  {
    no: "03",
    title: "SaaS infrastructure that takes money.",
    body: "Subscriptions, checkout, auth lifecycles, webhooks. Two of my products run real billing in production — Stripe events, WorkOS identity and all the edge cases in between.",
    chips: ["Stripe", "WorkOS", "Supabase", "Convex", "PostgreSQL"],
  },
  {
    no: "04",
    title: "Systems and tooling.",
    body: "Below the web layer: a Rust terminal runtime with async streaming, CI/CD pipelines with deploy gates, and the DevOps glue that keeps everything live.",
    chips: ["Rust", "Tokio", "GitHub Actions", "Docker", "Vercel"],
  },
];

const KPIS = [
  { value: "06", label: "products live" },
  { value: "02", label: "with real billing" },
  { value: "4.0", label: "CGPA at TRU" },
  { value: "'26", label: "co-op ready" },
];

const TICKER_ITEMS = ["SyntaxArk", "InferenceSaver", "RentSpace", "PromptLine", "React", "Next.js", "Rust", "Convex", "Stripe", "Supabase"];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-[#fbf9ef] text-[#171412]">
      <Header />
      <Hero />
      <Ticker />
      <Works />
      <Ships />
      <Kpis />
      <Contact />
      <Footer />
    </main>
  );
}

function Header() {
  const nav = [
    { label: "Works", href: "#works" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
  ];
  return (
    <header className="sticky top-0 z-40 bg-[#fbf9ef]/90 backdrop-blur border-b border-[#171412]/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className={`${DISPLAY} font-bold text-lg tracking-tight`}>
          Mandeep Singh<span className="text-[#ff3c34]">.</span>
        </a>
        <nav className="hidden sm:flex items-center gap-7">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#171412]/70 hover:text-[#171412] transition-colors"
            >
              {item.label}
            </a>
          ))}
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[#171412]/70 hover:text-[#171412] transition-colors"
          >
            Resume
          </a>
        </nav>
        <a
          href={LINKS.email}
          className="inline-flex items-center gap-2 rounded-full bg-[#171412] text-[#fbf9ef] text-sm font-semibold px-5 py-2.5 hover:bg-[#ff3c34] transition-colors"
        >
          Email me
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-16">
      <motion.p {...fadeUp} className={`${MONO} text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8e827c] mb-6`}>
        Kamloops, BC — open to software co-op, 2026
      </motion.p>
      <motion.h1
        {...fadeUp}
        className={`${DISPLAY} font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(3rem,9vw,7.5rem)] [text-wrap:balance]`}
      >
        The developer<sup className="text-[0.35em] align-super text-[#ff3c34]">©</sup> who ships
        <br />
        real products.
      </motion.h1>
      <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
        <motion.p {...fadeUp} className="text-lg sm:text-xl text-[#171412]/70 max-w-xl leading-relaxed">
          Full-stack developer building AI products end to end — browser IDEs, subscription billing,
          realtime sync. Six of them live in production right now.
        </motion.p>
        <motion.div {...fadeUp} className="flex flex-wrap gap-3 shrink-0">
          <a
            href={LINKS.email}
            className="inline-flex items-center gap-2 rounded-full bg-[#ff3c34] text-[#fbf9ef] font-semibold px-7 py-3.5 hover:bg-[#171412] transition-colors"
          >
            Start a conversation <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#171412]/20 font-semibold px-7 py-3.5 hover:border-[#171412] transition-colors"
          >
            Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Ticker() {
  const row = TICKER_ITEMS.map((item, i) => (
    <span key={i} className="inline-flex items-center">
      <span className={`${MONO} text-sm uppercase tracking-[0.2em] px-6`}>{item}</span>
      <span className="text-[#ff3c34] font-bold">*</span>
    </span>
  ));
  return (
    <div className="border-y border-[#171412] py-4 overflow-hidden" aria-hidden="true">
      <div className="ticker-track whitespace-nowrap w-max">
        {row}
        {row}
      </div>
    </div>
  );
}

function Works() {
  return (
    <section id="works" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <motion.div {...fadeUp} className="flex items-end justify-between mb-10">
        <h2 className={`${DISPLAY} font-extrabold tracking-[-0.02em] text-[clamp(2rem,5vw,3.5rem)]`}>
          Featured work
        </h2>
        <span className={`${MONO} text-xs text-[#8e827c] uppercase tracking-[0.2em] pb-2`}>
          ({String(WORKS.length).padStart(2, "0")})
        </span>
      </motion.div>

      <div className="border-t border-[#171412]">
        {WORKS.map((work, i) => {
          const RowTag = work.href ? "a" : "div";
          const rowProps = work.href
            ? { href: work.href, target: "_blank", rel: "noopener noreferrer" }
            : {};
          return (
            <motion.div {...fadeUp} key={work.title}>
              <RowTag
                {...rowProps}
                className={`group grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3.5rem_1fr_10rem_5rem_3rem] items-baseline sm:items-center gap-x-4 border-b border-[#171412] py-6 sm:py-7 px-2 sm:px-4 transition-colors ${
                  work.href ? "cursor-pointer hover:bg-[#171412] hover:text-[#fbf9ef]" : "opacity-60"
                }`}
              >
                <span className={`${MONO} text-xs text-[#8e827c] group-hover:text-[#ffc765] transition-colors`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3 className={`${DISPLAY} font-bold tracking-[-0.02em] text-2xl sm:text-4xl`}>
                    {work.title}
                  </h3>
                  <p className="text-sm text-[#171412]/60 group-hover:text-[#fbf9ef]/60 mt-1 max-w-lg transition-colors">
                    {work.blurb}
                  </p>
                </div>
                <span className={`${MONO} hidden sm:block text-xs uppercase tracking-[0.15em] text-[#8e827c] group-hover:text-[#fbf9ef]/70 transition-colors`}>
                  {work.type}
                </span>
                <span className={`${MONO} hidden sm:block text-xs text-[#8e827c] group-hover:text-[#fbf9ef]/70 transition-colors`}>
                  {work.year}
                </span>
                {work.href ? (
                  <ArrowUpRight className="hidden sm:block w-6 h-6 justify-self-end text-[#171412]/30 group-hover:text-[#ffc765] transition-colors" />
                ) : (
                  <span className={`${MONO} hidden sm:block text-[10px] uppercase justify-self-end text-[#8e827c]`}>
                    WIP
                  </span>
                )}
              </RowTag>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function Ships() {
  return (
    <section id="about" className="bg-[#f2f0e7] border-y border-[#171412]/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <motion.h2
          {...fadeUp}
          className={`${DISPLAY} font-extrabold tracking-[-0.02em] text-[clamp(2rem,5vw,3.5rem)] mb-14 [text-wrap:balance]`}
        >
          What I ship<span className="text-[#ff3c34]">.</span>
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-14">
          {SHIPS.map((ship) => (
            <motion.div {...fadeUp} key={ship.no} className="border-t border-[#171412] pt-6">
              <span className={`${MONO} text-xs text-[#ff3c34]`}>({ship.no})</span>
              <h3 className={`${DISPLAY} font-bold tracking-[-0.01em] text-2xl sm:text-[1.7rem] mt-3 mb-4`}>
                {ship.title}
              </h3>
              <p className="text-[#171412]/70 leading-relaxed mb-6">{ship.body}</p>
              <div className="flex flex-wrap gap-2">
                {ship.chips.map((chip) => (
                  <span
                    key={chip}
                    className={`${MONO} text-[11px] uppercase tracking-[0.1em] border border-[#171412]/20 rounded-full px-3 py-1`}
                  >
                    {chip}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Kpis() {
  return (
    <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
        {KPIS.map((kpi) => (
          <motion.div {...fadeUp} key={kpi.label} className="border-t border-[#171412] pt-5">
            <div className={`${DISPLAY} font-extrabold text-5xl sm:text-6xl tracking-[-0.03em] tabular-nums`}>
              {kpi.value}
            </div>
            <div className={`${MONO} text-[11px] uppercase tracking-[0.2em] text-[#8e827c] mt-2`}>
              {kpi.label}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p {...fadeUp} className="mt-14 text-[#171412]/70 max-w-2xl leading-relaxed">
        Currently: Bachelor of Computing Science at Thompson Rivers University, expected 2026.
        Looking for a co-op where shipping is the culture, not the exception.
      </motion.p>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-[#171412] text-[#fbf9ef]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-24 sm:py-32">
        <motion.p {...fadeUp} className={`${MONO} text-xs uppercase tracking-[0.25em] text-[#ffc765] mb-6`}>
          Contact
        </motion.p>
        <motion.h2
          {...fadeUp}
          className={`${DISPLAY} font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(2.5rem,7vw,5.5rem)] [text-wrap:balance] mb-12`}
        >
          Make every sprint
          <br />
          pay for itself<span className="text-[#ff3c34]">.</span>
        </motion.h2>
        <motion.div {...fadeUp} className="flex flex-wrap items-center gap-4">
          <a
            href={LINKS.email}
            className="inline-flex items-center gap-2 rounded-full bg-[#ff3c34] text-[#fbf9ef] font-semibold px-8 py-4 hover:bg-[#ffc765] hover:text-[#171412] transition-colors"
          >
            mandeepsinghwani@gmail.com <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href={LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`${MONO} text-sm uppercase tracking-[0.15em] text-[#fbf9ef]/70 hover:text-[#fbf9ef] transition-colors px-3 py-2`}
          >
            LinkedIn
          </a>
          <a
            href={LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`${MONO} text-sm uppercase tracking-[0.15em] text-[#fbf9ef]/70 hover:text-[#fbf9ef] transition-colors px-3 py-2`}
          >
            GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-[#171412] text-[#fbf9ef] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="flex items-center justify-between border-t border-[#fbf9ef]/15 py-5">
          <span className={`${MONO} text-[11px] uppercase tracking-[0.2em] text-[#fbf9ef]/50`}>
            © 2026 Mandeep Singh
          </span>
          <span className={`${MONO} text-[11px] uppercase tracking-[0.2em] text-[#fbf9ef]/50 inline-flex items-center gap-1.5`}>
            Kamloops, BC <ArrowDownRight className="w-3 h-3 text-[#ff3c34]" />
          </span>
        </div>
      </div>
      <div
        aria-hidden="true"
        className={`${DISPLAY} font-extrabold text-center tracking-[-0.04em] leading-[0.75] text-[#fbf9ef]/10 select-none text-[clamp(4.5rem,17vw,16rem)] translate-y-[0.18em]`}
      >
        MANDEEP
      </div>
    </footer>
  );
}
