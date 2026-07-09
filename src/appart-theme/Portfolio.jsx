import React, { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useInView, animate } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, House, Boxes, UserRound, FileText, Mail } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { LINKS } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

// Palette (inspired by warm editorial studio design)
// paper #fbf9ef · panel #f2f0e7 · ink #171412 · warm gray #8e827c · red #ff3c34 · amber #ffc765

const DISPLAY = "[font-family:'Bricolage_Grotesque','Inter',sans-serif]";
const MONO = "[font-family:'IBM_Plex_Mono',monospace]";

const EASE_OUT = [0.22, 1, 0.36, 1];

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
  { value: 6, format: (n) => String(Math.round(n)).padStart(2, "0"), label: "products live" },
  { value: 2, format: (n) => String(Math.round(n)).padStart(2, "0"), label: "with real billing" },
  { value: 4.0, format: (n) => n.toFixed(1), label: "CGPA at TRU" },
];

const TICKER_ITEMS = ["SyntaxArk", "InferenceSaver", "RentSpace", "PromptLine", "React", "Next.js", "Rust", "Convex", "Stripe", "Supabase"];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.55, ease: EASE_OUT },
};

// Masked line reveal — text slides up from behind an overflow clip.
function Reveal({ children, delay = 0, onView = false, className = "" }) {
  const anim = { y: "0%" };
  const start = { y: "115%" };
  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={start}
        {...(onView
          ? { whileInView: anim, viewport: { once: true, margin: "-60px" } }
          : { animate: anim })}
        transition={{ duration: 0.8, ease: EASE_OUT, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

// Count-up number that runs once when scrolled into view.
function CountUp({ value, format }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState(format(0));

  useEffect(() => {
    if (!inView) return undefined;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: EASE_OUT,
      onUpdate: (latest) => setDisplay(format(latest)),
    });
    return () => controls.stop();
  }, [inView, value, format]);

  return <span ref={ref}>{display}</span>;
}

// Smooth scroll (Lenis) driving GSAP ScrollTrigger, with anchor handling.
function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (event) => {
      const anchor = event.target.closest('a[href^="#"]');
      if (!anchor) return;
      const target = anchor.getAttribute("href");
      if (target.length < 2) return;
      const el = document.querySelector(target);
      if (!el) return;
      event.preventDefault();
      lenis.scrollTo(el, { offset: -64 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}

export default function Portfolio() {
  useSmoothScroll();
  return (
    <MotionConfig reducedMotion="user">
      <main className="min-h-screen bg-[#fbf9ef] text-[#171412]">
        <Header />
        <SideNav />
        <Hero />
        <Ticker />
        <Works />
        <Ships />
        <Kpis />
        <Contact />
        <Footer />
      </main>
    </MotionConfig>
  );
}

function Header() {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className="fixed inset-x-0 top-0 z-40 pointer-events-none"
    >
      <div className="px-4 sm:px-6 h-20 flex items-center justify-between">
        <motion.a
          whileHover={{ scale: 1.06, rotate: -6 }}
          whileTap={{ scale: 0.95 }}
          href="#top"
          aria-label="Back to top"
          className={`${DISPLAY} pointer-events-auto flex items-center justify-center w-12 h-12 rounded-full bg-[#171412] text-[#fbf9ef] font-extrabold text-lg tracking-tight shadow-lg`}
        >
          M<span className="text-[#ff3c34]">.</span>
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          href={LINKS.email}
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-[#171412] text-[#fbf9ef] text-xs font-bold uppercase tracking-[0.12em] px-5 py-3 hover:bg-[#ff3c34] transition-colors shadow-lg"
        >
          Email me now
        </motion.a>
      </div>
    </motion.header>
  );
}

const NAV_ITEMS = [
  { label: "Home", href: "#top", icon: House },
  { label: "Works", href: "#works", icon: Boxes },
  { label: "About", href: "#about", icon: UserRound },
  { label: "Resume", href: LINKS.resume, icon: FileText, external: true },
  { label: "Contact", href: "#contact", icon: Mail },
];

function SideNav() {
  return (
    <>
      {/* Desktop: left rail, vertically centered */}
      <motion.nav
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
        aria-label="Site"
        className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group relative flex items-center justify-center w-11 h-11 rounded-xl border border-[#171412]/10 bg-[#f2f0e7] text-[#171412]/70 shadow-sm transition-all duration-300 hover:bg-[#171412] hover:text-[#fbf9ef] hover:border-[#171412] hover:-translate-y-0.5"
            >
              <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
              <span
                className={`${MONO} absolute left-full ml-3 px-2.5 py-1 rounded-md bg-[#171412] text-[#fbf9ef] text-[10px] uppercase tracking-[0.15em] whitespace-nowrap opacity-0 -translate-x-1 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0`}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </motion.nav>

      {/* Mobile: bottom dock */}
      <motion.nav
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
        aria-label="Site"
        className="md:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-40 flex gap-1.5 p-1.5 rounded-2xl border border-[#171412]/10 bg-[#fbf9ef]/90 backdrop-blur shadow-xl"
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={item.label}
              className="flex items-center justify-center w-11 h-11 rounded-xl text-[#171412]/70 transition-colors active:bg-[#171412] active:text-[#fbf9ef]"
            >
              <Icon className="w-5 h-5" strokeWidth={1.8} />
            </a>
          );
        })}
      </motion.nav>
    </>
  );
}

function Hero() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.to(innerRef.current, {
        y: -90,
        opacity: 0.25,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="top" className="max-w-6xl mx-auto px-5 sm:px-8 pt-28 sm:pt-36 pb-16">
      <div ref={innerRef}>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className={`${MONO} text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8e827c] mb-6`}
      >
        Kamloops, BC
      </motion.p>
      <h1 className={`${DISPLAY} font-extrabold tracking-[-0.03em] leading-[0.95] text-[clamp(3rem,9vw,7.5rem)]`}>
        <Reveal delay={0.1}>
          <span>
            The developer<sup className="text-[0.35em] align-super text-[#ff3c34]">©</sup>
          </span>
        </Reveal>
        <Reveal delay={0.22}>who ships</Reveal>
        <Reveal delay={0.34}>real products.</Reveal>
      </h1>
      <div className="mt-10 flex flex-col md:flex-row md:items-end gap-8 md:gap-16">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.55 }}
          className="text-lg sm:text-xl text-[#171412]/70 max-w-xl leading-relaxed"
        >
          Full-stack developer building AI products end to end — browser IDEs, subscription billing,
          realtime sync. Six of them live in production right now.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.7 }}
          className="flex flex-wrap gap-3 shrink-0"
        >
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href={LINKS.email}
            className="group inline-flex items-center gap-2 rounded-full bg-[#ff3c34] text-[#fbf9ef] font-semibold px-7 py-3.5 hover:bg-[#171412] transition-colors"
          >
            Start a conversation
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href={LINKS.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[#171412]/20 font-semibold px-7 py-3.5 hover:border-[#171412] transition-colors"
          >
            Resume
          </motion.a>
        </motion.div>
      </div>
      </div>
    </section>
  );
}

function Ticker() {
  const row = TICKER_ITEMS.map((item, i) => (
    <span key={i} className="inline-flex items-center">
      <span className={`${MONO} text-sm uppercase tracking-[0.2em] px-6`}>{item}</span>
      <span className="ticker-star inline-block text-[#ff3c34] font-bold">*</span>
    </span>
  ));
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="border-y border-[#171412] py-4 overflow-hidden"
      aria-hidden="true"
    >
      <div className="ticker-track whitespace-nowrap w-max">
        {row}
        {row}
      </div>
    </motion.div>
  );
}

function Works() {
  return (
    <section id="works" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
      <div className="flex items-end justify-between mb-10">
        <h2 className={`${DISPLAY} font-extrabold tracking-[-0.02em] text-[clamp(2rem,5vw,3.5rem)]`}>
          <Reveal onView>Featured work</Reveal>
        </h2>
        <motion.span {...fadeUp} className={`${MONO} text-xs text-[#8e827c] uppercase tracking-[0.2em] pb-2`}>
          ({String(WORKS.length).padStart(2, "0")})
        </motion.span>
      </div>

      <div className="border-t border-[#171412]">
        {WORKS.map((work, i) => {
          const RowTag = work.href ? "a" : "div";
          const rowProps = work.href
            ? { href: work.href, target: "_blank", rel: "noopener noreferrer" }
            : {};
          return (
            <motion.div
              key={work.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: (i % 3) * 0.08 }}
            >
              <RowTag
                {...rowProps}
                className={`group grid grid-cols-[2.5rem_1fr_auto] sm:grid-cols-[3.5rem_1fr_10rem_5rem_3rem] items-baseline sm:items-center gap-x-4 border-b border-[#171412] py-6 sm:py-7 px-2 sm:px-4 transition-colors duration-300 ${
                  work.href ? "cursor-pointer hover:bg-[#171412] hover:text-[#fbf9ef]" : "opacity-60"
                }`}
              >
                <span className={`${MONO} text-xs text-[#8e827c] group-hover:text-[#ffc765] transition-colors`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <h3
                    className={`${DISPLAY} font-bold tracking-[-0.02em] text-2xl sm:text-4xl transition-transform duration-300 group-hover:translate-x-2`}
                  >
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
                  <ArrowUpRight className="hidden sm:block w-6 h-6 justify-self-end text-[#171412]/30 transition-all duration-300 group-hover:text-[#ffc765] group-hover:translate-x-1 group-hover:-translate-y-1" />
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
        <h2 className={`${DISPLAY} font-extrabold tracking-[-0.02em] text-[clamp(2rem,5vw,3.5rem)] mb-14`}>
          <Reveal onView>
            <span>
              What I ship<span className="text-[#ff3c34]">.</span>
            </span>
          </Reveal>
        </h2>
        <div className="grid md:grid-cols-2 gap-x-14 gap-y-14">
          {SHIPS.map((ship, shipIndex) => (
            <motion.div
              key={ship.no}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: (shipIndex % 2) * 0.12 }}
              className="border-t border-[#171412] pt-6"
            >
              <span className={`${MONO} text-xs text-[#ff3c34]`}>({ship.no})</span>
              <h3 className={`${DISPLAY} font-bold tracking-[-0.01em] text-2xl sm:text-[1.7rem] mt-3 mb-4`}>
                {ship.title}
              </h3>
              <p className="text-[#171412]/70 leading-relaxed mb-6">{ship.body}</p>
              <div className="flex flex-wrap gap-2">
                {ship.chips.map((chip, chipIndex) => (
                  <motion.span
                    key={chip}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.2 + chipIndex * 0.05 }}
                    className={`${MONO} text-[11px] uppercase tracking-[0.1em] border border-[#171412]/20 rounded-full px-3 py-1 hover:border-[#ff3c34] hover:text-[#ff3c34] transition-colors cursor-default`}
                  >
                    {chip}
                  </motion.span>
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
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-10">
        {KPIS.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: i * 0.1 }}
            className="border-t border-[#171412] pt-5"
          >
            <div className={`${DISPLAY} font-extrabold text-5xl sm:text-6xl tracking-[-0.03em] tabular-nums`}>
              <CountUp value={kpi.value} format={kpi.format} />
            </div>
            <div className={`${MONO} text-[11px] uppercase tracking-[0.2em] text-[#8e827c] mt-2`}>
              {kpi.label}
            </div>
          </motion.div>
        ))}
      </div>
      <motion.p {...fadeUp} className="mt-14 text-[#171412]/70 max-w-2xl leading-relaxed">
        Currently: Bachelor of Computing Science at Thompson Rivers University, expected 2026.
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
        <h2 className={`${DISPLAY} font-extrabold tracking-[-0.03em] leading-[0.98] text-[clamp(2.5rem,7vw,5.5rem)] mb-12`}>
          <Reveal onView>Make every sprint</Reveal>
          <Reveal onView delay={0.12}>
            <span>
              pay for itself<span className="text-[#ff3c34]">.</span>
            </span>
          </Reveal>
        </h2>
        <motion.div {...fadeUp} className="flex flex-wrap items-center gap-4">
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href={LINKS.email}
            className="group inline-flex items-center gap-2 rounded-full bg-[#ff3c34] text-[#fbf9ef] font-semibold px-8 py-4 hover:bg-[#ffc765] hover:text-[#171412] transition-colors"
          >
            mandeepsinghwani@gmail.com
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
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
  const footerRef = useRef(null);
  const wordmarkRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordmarkRef.current,
        { yPercent: 45 },
        {
          yPercent: 0,
          ease: "none",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top bottom",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-[#171412] text-[#fbf9ef] overflow-hidden">
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
        ref={wordmarkRef}
        aria-hidden="true"
        className={`${DISPLAY} font-extrabold text-center tracking-[-0.04em] leading-[0.75] text-[#fbf9ef]/10 select-none text-[clamp(4.5rem,17vw,16rem)] translate-y-[0.18em]`}
      >
        MANDEEP
      </div>
    </footer>
  );
}
