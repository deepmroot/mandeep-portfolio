import React, { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useInView, animate, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, Mail } from "lucide-react";
import {
  HouseIcon,
  SquaresFourIcon,
  UserIcon,
  ReadCvLogoIcon,
  EnvelopeSimpleIcon,
} from "@phosphor-icons/react";
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
    thumb: "/thumbs/syntaxark.jpg",
    span: "md:col-span-3",
    aspect: "aspect-[16/10]",
  },
  {
    title: "RentSpace",
    type: "PropTech",
    year: "2025",
    blurb: "Rental platform with AI tenant screening, Zillow sync and realtime messaging.",
    href: "https://rentspace4u.ca/",
    thumb: "/thumbs/rentspace.jpg",
    span: "md:col-span-3",
    aspect: "aspect-[16/10]",
  },
  {
    title: "Generic Alternatives",
    type: "Supply Chain AI",
    year: "2025",
    blurb: "Distributed sourcing platform replacing traditional agents with data-driven workflows.",
    href: "https://genericalternatives.co.uk/",
    thumb: "/thumbs/genericalternatives.jpg",
    span: "md:col-span-2",
    aspect: "aspect-[4/3]",
  },
  {
    title: "PromptLine",
    type: "Rust CLI",
    year: "2025",
    blurb: "AI-native terminal runtime — multi-provider, async streaming, encrypted key storage.",
    href: "https://promptline-gold.vercel.app/",
    repo: "https://github.com/deepmroot/promptline-rust",
    thumb: "/thumbs/promptline.jpg",
    span: "md:col-span-2",
    aspect: "aspect-[4/3]",
  },
  {
    title: "QuickTest AI",
    type: "EdTech",
    year: "2024",
    blurb: "Exam system with automatic question generation using LLMs.",
    href: "https://quicktest-ai-374261b0a08e.herokuapp.com/",
    repo: "https://github.com/deepmroot/QuickTest.ai",
    thumb: "/thumbs/quicktest.jpg",
    span: "md:col-span-2",
    aspect: "aspect-[4/3]",
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
        <CornerName />
        <ScrollProgress />
        <Hero />
        <Ticker />
        <VideoShowcase />
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
  { label: "Home", href: "#top", icon: HouseIcon },
  { label: "Works", href: "#works", icon: SquaresFourIcon },
  { label: "About", href: "#about", icon: UserIcon },
  { label: "Resume", href: LINKS.resume, icon: ReadCvLogoIcon, external: true },
  { label: "Contact", href: "#contact", icon: EnvelopeSimpleIcon },
];

function SideNav() {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const darkSections = document.querySelectorAll("[data-dark-section]");
    if (!darkSections.length || !("IntersectionObserver" in window)) return undefined;

    // Rail is vertically centered, so flip theme when a dark section
    // crosses the viewport's center line.
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setOnDark(visible.size > 0);
      },
      { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
    );
    darkSections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop: left rail, vertically centered. Outer div owns the centering
          transform — framer's entrance animation would overwrite it on the same node. */}
      <div className="hidden md:block fixed left-4 top-1/2 -translate-y-1/2 z-40">
      <motion.nav
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT, delay: 0.3 }}
        aria-label="Site"
        className={`rail flex flex-col gap-2 ${onDark ? "rail-dark" : ""}`}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.label}
              href={item.href}
              {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="rail-link"
            >
              <span className="rail-inner">
                <Icon className="rail-icon" weight="fill" />
                <span className="rail-dot" />
              </span>
              <span className={`${DISPLAY} rail-tag text-[11px] font-extrabold uppercase tracking-[0.08em]`}>
                {item.label}
              </span>
            </a>
          );
        })}
      </motion.nav>
      </div>

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
              <Icon className="w-5 h-5" weight="fill" />
            </a>
          );
        })}
      </motion.nav>
    </>
  );
}

// Persistent name wordmark, bottom-left like the rail — flips cream over dark sections.
function CornerName() {
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const darkSections = document.querySelectorAll("[data-dark-section]");
    if (!darkSections.length || !("IntersectionObserver" in window)) return undefined;

    // Wordmark sits in the bottom corner: watch the bottom 15% of the viewport.
    const visible = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target);
          else visible.delete(entry.target);
        });
        setOnDark(visible.size > 0);
      },
      { rootMargin: "-85% 0px 0px 0px", threshold: 0 }
    );
    darkSections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.1 }}
      aria-hidden="true"
      className={`${DISPLAY} hidden md:block fixed bottom-6 left-6 z-40 pointer-events-none font-extrabold text-2xl leading-[0.95] tracking-tight transition-colors duration-500 ${
        onDark ? "text-[#fbf9ef]" : "text-[#171412]"
      }`}
    >
      Mandeep
      <br />
      Singh
    </motion.div>
  );
}

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-CA", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/Vancouver",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);
  return <>{time}</>;
}

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const top = useTransform(scrollYProgress, [0, 1], ["0%", "97%"]);
  return (
    <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 h-64 w-px bg-[#171412]/15 z-30" aria-hidden="true">
      <motion.div style={{ top }} className="absolute -left-[3.5px] w-2 h-2 rounded-full bg-[#171412]" />
    </div>
  );
}

const HERO_LOGOS = [
  { src: "/logo.png", alt: "SyntaxArk", size: "h-10 sm:h-11", href: "https://syntaxark.vercel.app/" },
  { src: "/marks/inferencesaver.svg", alt: "InferenceSaver", size: "h-8 sm:h-9", href: "https://inferencesaver.com" },
  { src: "/marks/rentspace.png", alt: "RentSpace", size: "h-11 sm:h-14", extra: "-translate-y-3", href: "https://rentspace4u.ca/" },
  { src: "/marks/genericalternatives.svg", alt: "Generic Alternatives", size: "h-10 sm:h-11", href: "https://genericalternatives.co.uk/" },
  { src: "/promptLine.png", alt: "PromptLine", size: "h-8 sm:h-9", raw: true, extra: "rounded-lg", href: "https://promptline-gold.vercel.app/" },
];

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
    <section ref={sectionRef} id="top" className="relative min-h-[100svh] flex flex-col overflow-hidden">
      <div ref={innerRef} className="flex-grow flex flex-col items-center justify-center text-center px-5 sm:px-8 pt-24 pb-24">
        <h1 className={`${DISPLAY} font-extrabold tracking-[-0.035em] leading-[0.92] text-[clamp(3rem,10.5vw,8.75rem)]`}>
          <Reveal delay={0.1}>
            <span>
              The developer<span className="text-[#ff3c34] text-[0.85em] align-baseline">©</span>
            </span>
          </Reveal>
          <Reveal delay={0.22}>who ships real</Reveal>
          <Reveal delay={0.34}>products</Reveal>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.7 }}
          className="mt-14 sm:mt-20 w-full max-w-xl overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_18%,black_82%,transparent)]"
        >
          <div className="logo-marquee flex items-center w-max">
            {[...HERO_LOGOS, ...HERO_LOGOS].map((logo, i) => (
              <a
                key={`${logo.alt}-${i}`}
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-hidden={i >= HERO_LOGOS.length}
                tabIndex={i >= HERO_LOGOS.length ? -1 : 0}
                aria-label={i < HERO_LOGOS.length ? `Visit ${logo.alt}` : undefined}
                className="shrink-0"
              >
                <img
                  src={logo.src}
                  alt={i < HERO_LOGOS.length ? logo.alt : ""}
                  loading="lazy"
                  decoding="async"
                  className={`${logo.size} ${logo.extra ?? ""} w-auto object-contain mx-7 transition-all duration-300 ${
                    logo.raw
                      ? "opacity-80 hover:opacity-100"
                      : "grayscale opacity-50 mix-blend-multiply hover:grayscale-0 hover:opacity-100"
                  }`}
                />
              </a>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.85 }}
          className="mt-14 sm:mt-20 text-xl sm:text-2xl text-[#171412]/80 max-w-xl leading-snug"
        >
          Full-stack developer shipping AI products end to end — browser IDEs, subscription billing, realtime sync.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 1 }}
          className="mt-8 flex items-center justify-center gap-3"
        >
          <a
            href={LINKS.email}
            className={`${DISPLAY} text-sm font-extrabold uppercase tracking-[0.06em] hover:text-[#ff3c34] transition-colors`}
          >
            Start a conversation
          </a>
          <a
            href={LINKS.email}
            aria-label="Email Mandeep"
            className={`${DISPLAY} flex items-center justify-center w-10 h-10 rounded-full bg-[#ff3c34] text-[#fbf9ef] font-extrabold text-sm hover:scale-110 transition-transform`}
          >
            M
          </a>
          <a
            href={LINKS.email}
            aria-label="Email Mandeep"
            className="flex items-center justify-center w-10 h-10 rounded-full bg-[#171412] text-[#fbf9ef] hover:scale-110 transition-transform"
          >
            <Mail className="w-4 h-4" strokeWidth={2} />
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.1 }}
        className="hidden md:block absolute bottom-6 right-6 text-sm text-[#8e827c]"
      >
        Kamloops, BC <span className="text-[#171412] font-semibold"><Clock /></span>
      </motion.div>
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

// Cinematic showcase — full-screen rounded ink frame with the InferenceSaver
// promo video, scroll-scrubbed entrance and a center sound toggle.
function VideoShowcase() {
  const sectionRef = useRef(null);
  const frameRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      // Pin the section and scrub the frame from a rounded card up to true
      // fullscreen; it holds there while scrolling on, reverses scrolling back.
      gsap.fromTo(
        frameRef.current,
        { scale: 0.86, borderRadius: "2.5rem" },
        {
          scale: 1,
          borderRadius: "0rem",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "+=120%",
            scrub: true,
            pin: true,
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[100svh] overflow-hidden flex items-center justify-center">
      <div
        ref={frameRef}
        className="group relative w-full aspect-video max-h-[100svh] overflow-hidden shadow-2xl [will-change:transform]"
      >
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src="/media/inferencesaver-promo.mp4"
            poster="/media/inferencesaver-poster.png"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="InferenceSaver promo video"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Title, quiet corner tag */}
          <div className="absolute top-5 left-5 sm:top-7 sm:left-7">
            <span className={`${MONO} block text-[10px] uppercase tracking-[0.25em] text-[#171412]/60`}>
              Latest ship
            </span>
            <h2 className={`${DISPLAY} mt-1 text-lg sm:text-xl font-bold tracking-tight text-[#171412]`}>
              InferenceSaver
            </h2>
          </div>

          {/* Caption + link, reference-style corners */}
          <div className={`${MONO} absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.2em] text-white/60`}>
            Promo — InferenceSaver © 2026
          </div>
          <a
            href="https://inferencesaver.com"
            target="_blank"
            rel="noopener noreferrer"
            className={`${MONO} absolute bottom-4 right-5 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/70 hover:text-white transition-colors`}
          >
            Discover live <ArrowUpRight className="w-3 h-3 text-[#ff3c34]" />
          </a>
        </div>
      </div>
    </section>
  );
}

function Works() {
  return (
    <section id="works" className="max-w-6xl mx-auto px-5 sm:px-8 md:px-24 py-20 sm:py-28">
      <div className="flex items-end justify-between mb-10">
        <h2 className={`${DISPLAY} font-extrabold tracking-[-0.02em] text-[clamp(2rem,5vw,3.5rem)]`}>
          <Reveal onView>Featured work</Reveal>
        </h2>
        <motion.span {...fadeUp} className={`${MONO} text-xs text-[#8e827c] uppercase tracking-[0.2em] pb-2`}>
          ({String(WORKS.length).padStart(2, "0")})
        </motion.span>
      </div>

      <div className="grid md:grid-cols-6 gap-4 sm:gap-5">
        {WORKS.map((work, i) => (
          <motion.a
            key={work.title}
            href={work.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65, ease: EASE_OUT, delay: (i % 2) * 0.1 }}
            className={`group block rounded-2xl border border-[#171412]/10 bg-[#f2f0e7] p-3 sm:p-4 transition-colors duration-500 hover:bg-[#171412] ${work.span}`}
          >
            <div className="flex items-start justify-between gap-4 px-1 pt-1 pb-4">
              <div className="min-w-0">
                <h3 className={`${DISPLAY} font-bold tracking-[-0.02em] text-xl sm:text-2xl transition-colors duration-500 group-hover:text-[#fbf9ef]`}>
                  {work.title}
                </h3>
                <p className="text-[13px] text-[#171412]/60 mt-0.5 transition-colors duration-500 group-hover:text-[#fbf9ef]/60 line-clamp-1">
                  {work.blurb}
                </p>
              </div>
              <div className="shrink-0 text-right">
                <span className={`${MONO} block text-[10px] uppercase tracking-[0.15em] text-[#8e827c] transition-colors duration-500 group-hover:text-[#ffc765]`}>
                  {work.type}
                </span>
                <span className={`${MONO} block text-[10px] text-[#8e827c] mt-0.5 transition-colors duration-500 group-hover:text-[#fbf9ef]/60`}>
                  {work.year}
                </span>
              </div>
            </div>
            <div className={`relative overflow-hidden rounded-xl ${work.aspect}`}>
              {work.video ? (
                <video
                  src={work.video}
                  poster={work.poster}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  aria-label={`${work.title} — ${work.type} promo video`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.96] group-hover:rounded-lg"
                />
              ) : (
              <img
                src={work.thumb}
                alt={`${work.title} — ${work.type}`}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[0.96] group-hover:rounded-lg"
              />
              )}
              <span
                className={`${MONO} absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-[#fbf9ef]/95 text-[#171412] text-[10px] font-semibold uppercase tracking-[0.15em] px-3 py-1.5 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0`}
              >
                Discover live <ArrowUpRight className="w-3 h-3 text-[#ff3c34]" />
              </span>
            </div>
          </motion.a>
        ))}
      </div>

      <motion.div
        {...fadeUp}
        className={`${MONO} mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 border border-dashed border-[#171412]/25 rounded-2xl px-5 py-4 text-[11px] uppercase tracking-[0.15em] text-[#8e827c]`}
      >
        <span className="text-[#ff3c34]">In the lab:</span>
        <span className="text-[#171412]/80">Project Genesis</span>
        <span>— distributed systems monitoring · Go · gRPC · eBPF · WIP</span>
      </motion.div>
    </section>
  );
}

function Ships() {
  return (
    <section id="about" className="bg-[#f2f0e7] border-y border-[#171412]/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-24 py-20 sm:py-28">
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
    <section className="max-w-6xl mx-auto px-5 sm:px-8 md:px-24 py-20 sm:py-24">
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
    <section id="contact" data-dark-section className="bg-[#171412] text-[#fbf9ef]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-24 py-24 sm:py-32">
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
    <footer ref={footerRef} data-dark-section className="bg-[#171412] text-[#fbf9ef] overflow-hidden">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-24">
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
