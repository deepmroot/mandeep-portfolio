import React, { useEffect, useRef, useState } from "react";
import { motion, MotionConfig, useInView, animate, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight, ArrowDownRight, ArrowDown, Mail } from "lucide-react";
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
    title: "BecomeAfish",
    type: "Booking SaaS",
    year: "2026",
    blurb: "Private swim-lesson booking platform — zone scheduling, recurring lessons, progress tracking.",
    href: "https://becomeafish.com",
    thumb: "/thumbs/becomeafish.jpg",
    video: "/media/becomeafish-promo.mp4",
    span: "md:col-span-2",
    aspect: "aspect-video",
  },
  {
    title: "RentSpace",
    type: "PropTech",
    year: "2025",
    blurb: "Rental platform with AI tenant screening, Zillow sync and realtime messaging.",
    href: "https://rentspace4u.ca/",
    thumb: "/thumbs/rentspace.jpg",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    title: "SyntaxArk",
    type: "Browser IDE",
    year: "2025",
    blurb: "Multi-file editing, runtime execution and real-time collaboration — in the browser.",
    href: "https://syntaxark.vercel.app/",
    repo: "https://github.com/deepmroot/SyntaxArk",
    thumb: "/thumbs/syntaxark.jpg",
    span: "",
    aspect: "aspect-[646/989]",
  },
  {
    title: "PromptLine",
    type: "Rust CLI",
    year: "2025",
    blurb: "AI-native terminal runtime — multi-provider, async streaming, encrypted key storage.",
    href: "https://promptline-gold.vercel.app/",
    repo: "https://github.com/deepmroot/promptline-rust",
    thumb: "/thumbs/promptline.jpg",
    span: "",
    aspect: "aspect-[4/3]",
  },
  {
    title: "Generic Alternatives",
    type: "Supply Chain AI",
    year: "2025",
    blurb: "Distributed sourcing platform replacing traditional agents with data-driven workflows.",
    href: "https://genericalternatives.co.uk/",
    thumb: "/thumbs/genericalternatives.jpg",
    span: "md:col-span-2",
    aspect: "aspect-[21/9]",
  },
];

const SEE_MORE_ITEMS = [
  { thumb: "/thumbs/becomeafish.jpg", tilt: -6 },
  { thumb: "/thumbs/rentspace.jpg", tilt: 9 },
  { thumb: "/thumbs/inferencesaver.jpg", tilt: -5 },
  { thumb: "/thumbs/syntaxark.jpg", tilt: 7 },
  { thumb: "/thumbs/promptline.jpg", tilt: -8 },
  { thumb: "/thumbs/genericalternatives.jpg", tilt: 6 },
];

const SHIPS = [
  {
    no: "01",
    title: "Product engineering, end to end.",
    body: "From empty repo to production URL. I design the architecture, build the interface, wire the backend and ship it — React, Next.js and TypeScript doing the heavy lifting.",
    highlights: ["Component architecture that survives feature creep", "API design shared cleanly between web and mobile", "CI checks that catch regressions before users do"],
    chips: ["React", "Next.js 15", "TypeScript", "Tailwind", "Zustand"],
  },
  {
    no: "02",
    title: "AI that does real work.",
    body: "Not chatbots bolted on for show. Agent workflows that screen tenants, generate exams and match suppliers — with the prompt engineering, fallbacks and cost control that production demands.",
    highlights: ["Multi-provider fallbacks so one outage doesn't take down the product", "Structured output parsing instead of hopeful regex", "Token spend tracked per feature, not guessed at"],
    chips: ["LLM Agents", "Gemini", "OpenAI", "Ollama", "RAG"],
  },
  {
    no: "03",
    title: "SaaS infrastructure that takes money.",
    body: "Subscriptions, checkout, auth lifecycles, webhooks. Two of my products run real billing in production — Stripe events, WorkOS identity and all the edge cases in between.",
    highlights: ["Webhook handling that survives retries and duplicate events", "Auth flows covering invites, roles and session edge cases", "Billing states reconciled instead of trusted blindly"],
    chips: ["Stripe", "WorkOS", "Supabase", "Convex", "PostgreSQL"],
  },
  {
    no: "04",
    title: "Systems and tooling.",
    body: "Below the web layer: a Rust terminal runtime with async streaming, CI/CD pipelines with deploy gates, and the DevOps glue that keeps everything live.",
    highlights: ["Async streaming without blocking the main thread", "Deploy gates that stop bad builds before prod", "Infra glue documented well enough to hand off"],
    chips: ["Rust", "Tokio", "GitHub Actions", "Docker", "Vercel"],
  },
];

const KPIS = [
  { value: 7, format: (n) => String(Math.round(n)).padStart(2, "0"), label: "products live" },
  { value: 2, format: (n) => String(Math.round(n)).padStart(2, "0"), label: "with real billing" },
  { value: 4.0, format: (n) => n.toFixed(1), label: "CGPA at TRU" },
];

const TICKER_ITEMS = ["SyntaxArk", "InferenceSaver", "RentSpace", "BecomeAfish", "PromptLine", "React", "Next.js", "Rust", "Convex", "Stripe", "Supabase"];

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
        <div
          id="site-bg-overlay"
          className="fixed inset-0 z-30 pointer-events-none bg-[#171412] opacity-0"
          aria-hidden="true"
        />
        <Header />
        <SideNav />
        <CornerName />
        <ScrollProgress />
        <FloatingContact />
        <Hero />
        <Ticker />
        <VideoShowcase
          src="/media/inferencesaver-promo.mp4"
          poster="/media/inferencesaver-poster.png"
          title="InferenceSaver"
          href="https://inferencesaver.com"
          label="Featured work"
        />
        <WorksIntro />
        <Works />
        <SeeMoreWork />
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
          Get in touch
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
  { src: "/marks/merritt.png", alt: "City of Merritt", size: "h-10 sm:h-12", href: "https://www.merritt.ca/" },
  { src: "/marks/becomeafish.png", alt: "BecomeAfish", size: "h-9 sm:h-10", href: "https://becomeafish.com" },
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
                  loading="eager"
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
          className="mt-14 sm:mt-20 text-2xl sm:text-3xl md:text-[2.25rem] text-[#171412] max-w-3xl leading-snug [text-wrap:balance]"
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
            className="block w-10 h-10 rounded-full overflow-hidden ring-2 ring-[#171412]/10 hover:scale-110 transition-transform"
          >
            <img src="/avatar.jpg" alt="Mandeep Singh" className="w-full h-full object-cover" />
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

// Cinematic showcase — reusable full-screen product video with a scroll-scrubbed entrance.
function VideoShowcase({ src, poster, title, href, label }) {
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
    <section id="video-showcase" ref={sectionRef} className="relative h-[100svh] overflow-hidden flex items-center justify-center">
      <div
        ref={frameRef}
        className="group relative h-full aspect-video max-w-full overflow-hidden shadow-2xl [will-change:transform]"
      >
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${title} product video`}
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Caption + link, reference-style corners */}
          <div className={`${MONO} absolute bottom-4 left-5 text-[10px] uppercase tracking-[0.2em] text-white/60`}>
            Case study — {title} © 2026
          </div>
          <a
            href={href}
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

function FloatingContact() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: "#video-showcase",
      start: "bottom top",
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });
    return () => st.kill();
  }, []);

  return (
    <div className="hidden md:block fixed z-50 bottom-5 left-1/2 -translate-x-1/2">
      <motion.a
        href={LINKS.email}
        initial={false}
        animate={visible ? { y: 0, opacity: 1 } : { y: 24, opacity: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT }}
        style={{ pointerEvents: visible ? "auto" : "none" }}
        className="flex items-center gap-8 rounded-full bg-[#fbf9ef]/95 backdrop-blur-md text-[#171412] pl-7 pr-2 py-2 shadow-2xl ring-1 ring-[#171412]/10"
      >
        <span className={`${DISPLAY} text-sm font-semibold whitespace-nowrap`}>Have a product to ship?</span>
        <span className={`${MONO} inline-flex items-center gap-2 rounded-full bg-[#171412] text-[#fbf9ef] text-[10px] font-bold uppercase tracking-[0.14em] px-5 py-3 transition-colors hover:bg-[#ff3c34]`}>
          Start a conversation <Mail className="w-3.5 h-3.5" />
        </span>
      </motion.a>
    </div>
  );
}

function ProjectShowcase({ work, index }) {
  const cardRef = useRef(null);
  const mediaRef = useRef(null);

  useEffect(() => {
    // Video cards render full-frame with no overscan (see below), so there's
    // no slack to pan into — parallax is image-only.
    if (!mediaRef.current) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const ctx = gsap.context(() => {
      gsap.fromTo(mediaRef.current, { yPercent: -5 }, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  return (
    <motion.a
      ref={cardRef}
      href={work.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: EASE_OUT }}
      className={`project-showcase group block ${work.span}`}
    >
      <div
        className={`relative overflow-hidden rounded-[1.25rem] sm:rounded-[2rem] bg-[#282421] ${work.aspect || (work.video ? "aspect-video" : "aspect-[16/10]")}`}
      >
        {work.video ? (
          // Container is aspect-video to match the source exactly — object-cover
          // then has nothing to crop, so on-screen text/UI in the footage stays intact.
          <video
            src={work.video}
            poster={work.thumb}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`${work.title} — ${work.type} promo video`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />
        ) : (
          <img
            ref={mediaRef}
            src={work.thumb}
            alt={`${work.title} — ${work.type}`}
            loading="lazy"
            decoding="async"
            className="absolute -inset-y-[6%] left-0 w-full h-[112%] object-cover object-top scale-[1.02] transition-transform duration-700 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]"
          />
        )}
        <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between gap-3 bg-[#171412]/80 backdrop-blur-md px-4 sm:px-5 py-3 sm:py-4 [clip-path:inset(0_calc(100%-11rem)_0_0)] group-hover:[clip-path:inset(0_0_0_0)] transition-[clip-path,background-color,padding] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[#ff3c34]/90 group-hover:py-5 sm:group-hover:py-6">
          <div className="flex items-stretch gap-2.5">
            <span className={`${DISPLAY} text-white font-extrabold text-sm sm:text-base tracking-tight leading-tight self-center`}>
              {work.title}
            </span>
            <span className={`${MONO} flex flex-col justify-center gap-0.5 border-l border-white/20 pl-2.5 text-[8px] sm:text-[9px] uppercase tracking-[0.14em] text-white/60 leading-tight`}>
              <span>{work.type}</span>
              <span>{work.year}</span>
            </span>
          </div>
          <div className="grid grid-cols-[0fr] group-hover:grid-cols-[1fr] transition-[grid-template-columns] duration-500 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]">
            <span className={`${MONO} flex items-center gap-1.5 overflow-hidden whitespace-nowrap text-[8px] sm:text-[9px] font-semibold uppercase tracking-[0.16em] text-white self-center`}>
              Discover live <ArrowUpRight className="w-3 h-3 shrink-0" />
            </span>
          </div>
        </div>
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-[inherit]" />
      </div>
    </motion.a>
  );
}

function WorksIntro() {
  return (
    <section className="bg-[#fbf9ef] text-[#171412] px-5 sm:px-8 py-24 sm:py-36 flex flex-col items-center text-center">
      <h2 className={`${DISPLAY} font-extrabold tracking-[-0.055em] leading-[0.85] text-[clamp(3.5rem,11vw,9rem)]`}>
        <Reveal>Featured</Reveal>
        <Reveal delay={0.12}>
          <span className="text-[#8e827c]">work</span>
        </Reveal>
      </h2>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-10 mb-10"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}>
          <ArrowDown className="w-6 h-6 text-[#171412]" strokeWidth={1.5} />
        </motion.div>
      </motion.div>

      <motion.p
        {...fadeUp}
        className="max-w-lg sm:max-w-2xl text-2xl sm:text-3xl text-[#171412] leading-snug"
      >
        I build products end to end — interfaces, backends and the AI in between, designed to ship and stay live.
      </motion.p>
    </section>
  );
}

function Works() {
  const blocks = [];
  let pair = [];
  WORKS.forEach((work) => {
    if (work.span) {
      if (pair.length) {
        blocks.push({ type: "pair", items: pair });
        pair = [];
      }
      blocks.push({ type: "full", item: work });
    } else {
      pair.push(work);
    }
  });
  if (pair.length) blocks.push({ type: "pair", items: pair });

  return (
    <section id="works" className="bg-[#fbf9ef] text-[#171412] px-5 sm:px-8 md:pl-24 md:pr-8 pb-10 sm:pb-14">
      <div className="max-w-[92rem] mx-auto flex flex-col gap-y-5">
        {blocks.map((block, bi) =>
          block.type === "full" ? (
            <ProjectShowcase key={block.item.title} work={block.item} index={bi} />
          ) : (
            <div key={`pair-${bi}`} className="grid md:grid-cols-2 items-start gap-x-5">
              <div className="flex flex-col gap-y-5">
                {block.items
                  .filter((_, i) => i % 2 === 0)
                  .map((w, i) => (
                    <ProjectShowcase key={w.title} work={w} index={i} />
                  ))}
              </div>
              <div className="flex flex-col gap-y-5">
                {block.items
                  .filter((_, i) => i % 2 === 1)
                  .map((w, i) => (
                    <ProjectShowcase key={w.title} work={w} index={i} />
                  ))}
              </div>
            </div>
          )
        )}
      </div>
    </section>
  );
}

function SeeMoreWork() {
  const ringRef = useRef(null);
  const sectionRef = useRef(null);
  const [squeeze, setSqueeze] = useState(false);

  useEffect(() => {
    if (!ringRef.current) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const BASE_SPEED = 0.12;
    let rotation = 0;
    let speed = BASE_SPEED;
    let lastY = window.scrollY;

    const onTick = () => {
      const y = window.scrollY;
      const dy = y - lastY;
      lastY = y;
      speed += dy * 0.012;
      const floor = Math.sign(speed) * BASE_SPEED || BASE_SPEED;
      speed = speed + (floor - speed) * 0.03;
      rotation = (rotation + speed) % 360;
      gsap.set(ringRef.current, { rotation, transformOrigin: "50% 50%" });
    };

    gsap.ticker.add(onTick);
    return () => gsap.ticker.remove(onTick);
  }, []);

  useEffect(() => {
    if (!sectionRef.current) return undefined;
    const overlay = document.getElementById("site-bg-overlay");
    if (!overlay) return undefined;

    let inT = 0;
    let outT = 0;
    const apply = () => {
      const t = Math.min(1, Math.max(0, inT - outT));
      overlay.style.opacity = String(t);
    };

    const fadeIn = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 90%",
      end: "top 55%",
      scrub: 0.3,
      onUpdate: (self) => {
        inT = self.progress;
        apply();
      },
    });

    const fadeOut = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "bottom 70%",
      end: "bottom 35%",
      scrub: 0.3,
      onUpdate: (self) => {
        outT = self.progress;
        apply();
      },
    });

    return () => {
      fadeIn.kill();
      fadeOut.kill();
      overlay.style.opacity = "0";
    };
  }, []);

  const angleStep = 360 / SEE_MORE_ITEMS.length;

  return (
    <section
      ref={sectionRef}
      data-dark-section
      className="relative z-40 overflow-hidden min-h-[900px] sm:min-h-[1080px] flex items-center"
    >
      <div className="relative z-10 mx-auto h-px w-px flex items-center justify-center">
        <div ref={ringRef} className="absolute top-1/2 left-1/2">
          {SEE_MORE_ITEMS.map((item, i) => {
            const angle = angleStep * i;
            const radius = squeeze ? "70px" : "min(33vw, 380px)";
            return (
              <div
                key={item.thumb}
                className="absolute w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10 transition-transform duration-700"
                style={{
                  transitionTimingFunction: "cubic-bezier(0.22,1,0.36,1)",
                  transform: `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}) rotate(${-angle + item.tilt}deg)`,
                }}
              >
                <img src={item.thumb} alt="" className="w-full h-full object-cover" />
              </div>
            );
          })}
        </div>
        <h2 className="relative z-10">
          <a
            href="/work"
            onMouseEnter={() => setSqueeze(true)}
            onMouseLeave={() => setSqueeze(false)}
            className={`${DISPLAY} block text-center font-extrabold text-[clamp(3.5rem,9vw,8rem)] leading-[0.9] tracking-[-0.04em] whitespace-nowrap cursor-pointer transition-colors duration-500 ${squeeze ? "text-white" : "text-[#8e827c]"}`}
          >
            See more
            <br />
            work
          </a>
        </h2>
      </div>
    </section>
  );
}

const SHIP_COLORS = [
  { bg: "#ff3c34", text: "#fbf9ef", sub: "#fbf9ef99", chipBorder: "#fbf9ef40" },
  { bg: "#171412", text: "#fbf9ef", sub: "#fbf9ef99", chipBorder: "#fbf9ef30" },
  { bg: "#ffc765", text: "#171412", sub: "#17141299", chipBorder: "#17141230" },
  { bg: "#282421", text: "#fbf9ef", sub: "#fbf9ef99", chipBorder: "#fbf9ef30" },
];

function Ships() {
  const stackRef = useRef(null);
  const cardEls = useRef([]);

  useEffect(() => {
    if (!stackRef.current) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const cards = cardEls.current.filter(Boolean);
    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: stackRef.current,
        start: "top top",
        end: () => `+=${cards.length * 100}%`,
        pin: true,
        scrub: 0.7,
        onUpdate: (self) => {
          const total = cards.length;
          const raw = self.progress * total;
          cards.forEach((card, i) => {
            const localT = gsap.utils.clamp(0, 1, raw - i);
            gsap.set(card, {
              rotateX: localT * 60,
              y: localT * 900,
              scale: 1 - localT * 0.08,
              transformOrigin: "top center",
            });
          });
        },
      });
      return () => st.kill();
    }, stackRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" className="bg-[#f2f0e7] border-y border-[#171412]/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 md:px-24 pt-20 sm:pt-28">
        <h2 className={`${DISPLAY} font-extrabold tracking-[-0.02em] text-[clamp(2rem,5vw,3.5rem)] mb-10`}>
          <Reveal onView>
            <span>
              What I ship<span className="text-[#ff3c34]">.</span>
            </span>
          </Reveal>
        </h2>
      </div>
      <div ref={stackRef} className="relative h-screen [perspective:2200px] overflow-hidden">
        {SHIPS.map((ship, i) => {
          const colors = SHIP_COLORS[i % SHIP_COLORS.length];
          return (
            <div
              key={ship.no}
              ref={(el) => (cardEls.current[i] = el)}
              className="absolute inset-0 flex items-center justify-center px-5 sm:px-8 md:px-24 [transform-style:preserve-3d] [backface-visibility:hidden] [will-change:transform]"
              style={{ zIndex: SHIPS.length - i }}
            >
              <div
                className="relative w-full max-w-7xl rounded-[1.75rem] sm:rounded-[2.5rem] p-10 sm:p-16 md:p-20 shadow-2xl"
                style={{ backgroundColor: colors.bg, color: colors.text }}
              >
                <span className={`${MONO} absolute top-8 right-8 sm:top-12 sm:right-12 text-sm`} style={{ color: colors.sub }}>
                  ({ship.no})
                </span>
                <h3 className={`${DISPLAY} font-extrabold tracking-[-0.02em] text-[clamp(2.4rem,5.5vw,4.25rem)] leading-[1.02] max-w-2xl`}>
                  {ship.title}
                </h3>
                <p className="mt-7 text-lg sm:text-xl leading-relaxed max-w-2xl" style={{ color: colors.sub }}>
                  {ship.body}
                </p>
                <ul className="mt-8 flex flex-col gap-3 max-w-xl">
                  {ship.highlights.map((line) => (
                    <li key={line} className="flex items-start gap-3 text-base sm:text-lg leading-snug">
                      <span
                        className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0"
                        style={{ backgroundColor: colors.text }}
                      />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-2.5 mt-9">
                  {ship.chips.map((chip) => (
                    <span
                      key={chip}
                      className={`${MONO} text-xs uppercase tracking-[0.1em] rounded-full px-4 py-1.5`}
                      style={{ border: `1px solid ${colors.chipBorder}` }}
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
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
      <div className="mt-16">
        {[
          {
            tag: "Now",
            role: "Systems Analyst",
            org: "City of Merritt",
            time: "June 2026 — present",
            note: "Municipal IT systems — analysis, operations and tooling for city services.",
          },
          {
            tag: "Education",
            role: "BCS, Computing Science",
            org: "Thompson Rivers University",
            time: "expected 2026",
            note: "CGPA 4.0 — shipping products the whole way through.",
          },
        ].map((item) => (
          <motion.div
            {...fadeUp}
            key={item.role}
            className="grid sm:grid-cols-[7rem_1fr_auto] items-baseline gap-x-8 gap-y-1 border-t border-[#171412] py-6"
          >
            <span className={`${MONO} text-[10px] uppercase tracking-[0.25em] text-[#ff3c34]`}>
              {item.tag}
            </span>
            <div>
              <h3 className={`${DISPLAY} text-xl sm:text-2xl font-bold tracking-tight`}>
                {item.role} · <span className="text-[#171412]/60">{item.org}</span>
              </h3>
              <p className="text-[#171412]/60 text-sm mt-1">{item.note}</p>
            </div>
            <span className={`${MONO} text-xs text-[#8e827c]`}>{item.time}</span>
          </motion.div>
        ))}
      </div>
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
