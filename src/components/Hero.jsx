import React, { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { LINKS } from "../data/projects";

const HERO_IMAGE = "/hero.jpg";
const SYSTEM_LOG_ENTRIES = [
  { tone: "text-emerald-500", marker: "[OK]", message: "[SYSTEM] Production cluster initialized." },
  { tone: "text-indigo-500", marker: "[->]", message: "[AUTH] OAuth2 handshake successful." },
  { tone: "text-indigo-500", marker: "[->]", message: "[DB] PostgreSQL connection pool active." },
  { tone: "text-fuchsia-500", marker: "[!!]", message: "[CI/CD] Deployment lint gate passed." },
  { tone: "text-indigo-500", marker: "[->]", message: "[ARK] Streaming vector-clock: 0x4f3" },
  { tone: "text-indigo-500", marker: "[->]", message: "[CACHE] Redis hit rate: 99.2%" },
  { tone: "text-indigo-500", marker: "[->]", message: "[NET] Traffic routed to Vercel Edge." },
  { tone: "text-indigo-500", marker: "[->]", message: "[OPS] 4 worker nodes at 12% load." },
  { tone: "text-emerald-500", marker: "[OK]", message: "[SYNC] Real-time state synchronized." },
  { tone: "text-fuchsia-500", marker: "[!!]", message: "[API] Endpoint /v1/health: 200 OK" },
];

export function Hero({ onOpenResume }) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1024px)");
    const handleDeviceChange = () => setIsMobileDevice(mobileQuery.matches);
    handleDeviceChange();

    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", handleDeviceChange);
    } else {
      mobileQuery.addListener(handleDeviceChange);
    }

    return () => {
      if (typeof mobileQuery.removeEventListener === "function") {
        mobileQuery.removeEventListener("change", handleDeviceChange);
      } else {
        mobileQuery.removeListener(handleDeviceChange);
      }
    };
  }, []);

  const lowMotionMode = prefersReducedMotion || isMobileDevice;
  const pipelineConfigs = lowMotionMode
    ? [
        { d: "M -100 100 C 200 100 400 200 800 380", duration: 6, delay: 0 },
        { d: "M 1300 350 C 1100 350 950 400 860 380", duration: 6, delay: 1 },
        { d: "M 800 -100 C 800 100 850 200 840 375", duration: 8.5, delay: 3.5 },
      ]
    : [
        { d: "M -100 100 C 200 100 400 200 800 380", duration: 6, delay: 0 },
        { d: "M -100 300 C 150 300 350 350 820 400", duration: 7, delay: 1.5 },
        { d: "M -100 500 C 200 500 400 500 810 420", duration: 5, delay: 3 },
        { d: "M -100 700 C 250 700 450 650 830 410", duration: 8, delay: 0.5 },
        { d: "M 1300 150 C 1000 150 900 250 850 350", duration: 7.5, delay: 4 },
        { d: "M 1300 350 C 1100 350 950 400 860 380", duration: 6, delay: 1 },
        { d: "M 1300 550 C 1100 550 1000 520 870 400", duration: 5.5, delay: 2.5 },
        { d: "M 400 -100 C 400 100 600 200 810 370", duration: 9, delay: 5 },
        { d: "M 800 -100 C 800 100 850 200 840 375", duration: 8.5, delay: 3.5 },
      ];

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden py-20">
      {/* Background Elements */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        {/* Engineering Grid Overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        {/* Intense Animated Pipelines - Fixed Coordinates */}
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="pipeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
              <stop offset="10%" stopColor="#6366f1" stopOpacity="0.8" />
              <stop offset="90%" stopColor="#d946ef" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#d946ef" stopOpacity="0" />
            </linearGradient>
          </defs>

          {pipelineConfigs.map((pathConfig) => (
            <PipelinePath
              key={pathConfig.d}
              d={pathConfig.d}
              duration={pathConfig.duration}
              delay={pathConfig.delay}
              staticMode={lowMotionMode}
            />
          ))}
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={lowMotionMode ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={lowMotionMode ? { duration: 0 } : { duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className={`${lowMotionMode ? "" : "animate-ping"} absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75`} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500" />
              </span>
              Available for work
            </div>

            <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tighter text-white mb-8 leading-none">
              Hi, I&apos;m <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">
                Mandeep Singh.
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-xl mb-10 font-medium">
              I build full-stack web applications, developer tools, and scalable systems with a focus on clean architecture and production readiness.
            </p>

            {/* Infinite Systems Log Stream */}
            <div className="mb-12 p-5 rounded-2xl bg-black/60 border border-white/10 font-mono text-[10px] text-indigo-400/70 max-w-lg overflow-hidden h-32 relative shadow-2xl backdrop-blur-md group">
              <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-black to-transparent z-10" />

              {lowMotionMode ? (
                <div className="space-y-2">
                  {SYSTEM_LOG_ENTRIES.slice(0, 6).map((entry, index) => (
                    <p key={index} className="flex items-center gap-2">
                      <span className={entry.tone}>{entry.marker}</span> {entry.message}
                    </p>
                  ))}
                </div>
              ) : (
                <motion.div
                  animate={{ y: ["0%", "-50%"] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="space-y-2"
                >
                  {[0, 1].map((loopIndex) => (
                    <React.Fragment key={loopIndex}>
                      {SYSTEM_LOG_ENTRIES.map((entry, index) => (
                        <p key={`${entry.message}-${loopIndex}-${index}`} className="flex items-center gap-2">
                          <span className={entry.tone}>{entry.marker}</span> {entry.message}
                        </p>
                      ))}
                    </React.Fragment>
                  ))}
                </motion.div>
              )}

              <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-black to-transparent z-10" />
            </div>

            <div className="flex flex-wrap gap-8 items-center">
              <div className="relative group perspective-1000">
                <motion.div
                  whileHover={lowMotionMode ? undefined : { translateZ: 20, rotateX: -5, rotateY: 5 }}
                  className="transform-style-3d"
                >
                  <button
                    onClick={onOpenResume}
                    className="relative flex items-center gap-3 px-10 py-5 bg-white text-slate-900 rounded-xl shadow-[0_8px_0_rgb(203,213,225)] transition-all active:shadow-none active:translate-y-[8px] transform-style-3d -rotate-x-6 rotate-y-6"
                  >
                    <span className="text-sm font-black uppercase tracking-widest">
                      View Resume
                    </span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </motion.div>
              </div>

              <div className="flex gap-5">
                <SocialLink href={LINKS.github} icon={<Github className="w-6 h-6" />} />
                <SocialLink href={LINKS.linkedin} icon={<Linkedin className="w-6 h-6" />} />
                <SocialLink href={LINKS.email} icon={<Mail className="w-6 h-6" />} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={lowMotionMode ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={lowMotionMode ? { duration: 0 } : { duration: 1, delay: 0.2 }}
            className="relative lg:ml-auto perspective-2000"
          >
            <motion.div
              whileHover={lowMotionMode ? undefined : { rotateY: -10, rotateX: 5 }}
              transition={lowMotionMode ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
              className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto lg:mx-0 transform-style-3d -rotate-y-12 rotate-x-6 shadow-2xl"
            >
              {/* 3D Depth Layers */}
              <div className="absolute inset-0 bg-indigo-500/10 translate-z-[-20px] rounded-3xl blur-md" />

              {/* Main Photo Slab */}
              <div className="relative h-full w-full bg-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-[30px_30px_60px_rgba(0,0,0,0.6)]">
                <img
                  src={HERO_IMAGE}
                  alt="Mandeep Singh"
                  width="768"
                  height="768"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-transparent to-white/5" />
              </div>

              {/* Floating Tech Label */}
              <div className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl translate-z-50 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-emerald-500 ${lowMotionMode ? "" : "animate-pulse"}`} />
                  <div className="text-[11px] font-mono text-indigo-300 font-black tracking-[0.25em] uppercase">
                    M.Singh // DEV_CORE
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-3 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
    >
      {icon}
    </a>
  );
}

function PipelinePath({ d, duration, delay, staticMode }) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion || staticMode) {
    return (
      <path
        d={d}
        fill="transparent"
        stroke="url(#pipeline-gradient)"
        strokeWidth="1"
        opacity="0.15"
      />
    );
  }

  return (
    <g>
      <motion.path
        d={d}
        fill="transparent"
        stroke="url(#pipeline-gradient)"
        strokeWidth="1"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          delay,
        }}
      />
      {[0, 1, 2].map((i) => (
        <motion.circle
          key={i}
          r="1.5"
          fill="#818cf8"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 1, 1, 0],
            offsetDistance: ["0%", "100%"],
          }}
          style={{ offsetPath: `path("${d}")` }}
          transition={{
            duration: duration * 0.6,
            repeat: Infinity,
            ease: "linear",
            delay: delay + (i * (duration * 0.1)),
          }}
          className="shadow-[0_0_8px_#818cf8]"
        />
      ))}
    </g>
  );
}
