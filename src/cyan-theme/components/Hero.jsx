import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react";
import { LINKS, PROJECTS, SKILLS } from "../../data/projects";

const HERO_IMAGE = "/hero.jpg";
const DEFAULT_CLI_SUGGESTIONS = ["help", "list", "inspect syntaxark", "inspect inferencesaver", "resume", "contact"];

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
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-sky-400/30 bg-sky-400/10 text-sky-300 text-xs font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className={`${lowMotionMode ? "" : "animate-ping"} absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75`} />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-400" />
              </span>
              Available for work
            </div>

            <h1 className="text-6xl sm:text-8xl font-extrabold tracking-tighter text-white mb-8 leading-none">
              Hi, I&apos;m <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-300 to-violet-400">
                Mandeep Singh.
              </span>
            </h1>

            <p className="text-xl text-slate-400 leading-relaxed max-w-xl mb-10 font-medium">
              I build full-stack web applications, developer tools, and scalable systems with a focus on clean architecture and production readiness.
            </p>

            <PortfolioCLI onOpenResume={onOpenResume} />

            <div className="flex flex-wrap gap-8 items-center mt-10">
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
              <div className="absolute inset-0 bg-sky-400/10 translate-z-[-20px] rounded-3xl blur-md" />

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
                <div className="absolute inset-0 bg-gradient-to-tr from-sky-400/20 via-transparent to-white/5" />
              </div>

              <div className="absolute -bottom-6 -left-6 bg-slate-900/90 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl translate-z-50 shadow-2xl">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full bg-emerald-500 ${lowMotionMode ? "" : "animate-pulse"}`} />
                  <div className="text-[11px] font-mono text-sky-300 font-black tracking-[0.25em] uppercase">
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

function PortfolioCLI({ onOpenResume }) {
  const projectIndex = useMemo(() => {
    const selected = ["SyntaxArk", "InferenceSaver", "RentSpace", "Generic Alternatives", "PromptLine"];
    return PROJECTS.filter((project) => selected.includes(project.title)).map((project) => ({
      ...project,
      alias: project.title.toLowerCase().replace(/[^a-z0-9]+/g, ""),
      inspectName: project.title === "Generic Alternatives" ? "generic" : project.title.toLowerCase().split(" ")[0],
      architecture:
        project.title === "SyntaxArk"
          ? ["Editor", "Runtime", "Sync"]
          : project.title === "InferenceSaver"
            ? ["Models", "Billing", "Access"]
            : project.title === "RentSpace"
              ? ["Listings", "Screening", "Messaging"]
              : project.title === "Generic Alternatives"
                ? ["Source", "Matching", "Fulfillment"]
                : ["CLI", "Providers", "Runtime"],
    }));
  }, []);

  const [input, setInput] = useState("");
  const [history, setHistory] = useState(() => [
    { type: "output", lines: ["Portfolio CLI ready.", "Type 'help' or inspect a project."] },
  ]);
  const outputRef = useRef(null);

  const commandSuggestions = useMemo(() => {
    const baseCommands = [
      "help",
      "list",
      "projects",
      "resume",
      "contact",
      "clear",
      ...projectIndex.flatMap((project) => [
        `inspect ${project.inspectName}`,
        `inspect ${project.alias}`,
      ]),
    ];

    const uniqueCommands = [...new Set(baseCommands)];
    const normalizedInput = input.trim().toLowerCase();

    if (!normalizedInput) return DEFAULT_CLI_SUGGESTIONS;

    return uniqueCommands
      .filter((command) => command.includes(normalizedInput))
      .slice(0, 6);
  }, [input, projectIndex]);

  useEffect(() => {
    if (!outputRef.current) return;
    outputRef.current.scrollTo({ top: outputRef.current.scrollHeight, behavior: "smooth" });
  }, [history]);

  const executeCommand = (rawCommand) => {
    const command = rawCommand.trim();
    if (!command) return;

    const normalized = command.toLowerCase();
    setHistory((previous) => {
      const next = [...previous, { type: "command", value: command }];

      if (normalized === "clear") {
        return [{ type: "output", lines: ["Console cleared."] }];
      }

      if (normalized === "help") {
        next.push({
          type: "output",
          lines: [
            "Commands:",
            "help — show commands",
            "list — list featured projects",
            "inspect <project> — view project breakdown",
            "resume — open resume",
            "contact — jump to contact",
            "clear — reset console",
          ],
        });
        return next;
      }

      if (normalized === "list" || normalized === "projects") {
        next.push({
          type: "output",
          lines: [
            "Featured projects:",
            ...projectIndex.map((project) => `- ${project.inspectName} :: ${project.summary}`),
          ],
        });
        return next;
      }

      if (normalized === "resume") {
        onOpenResume();
        next.push({ type: "output", lines: ["Opening resume viewer..."] });
        return next;
      }

      if (normalized === "contact") {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        next.push({ type: "output", lines: ["Jumping to contact section..."] });
        return next;
      }

      if (normalized.startsWith("inspect ")) {
        const target = normalized.replace("inspect ", "").replace(/[^a-z0-9]/g, "");
        const project = projectIndex.find((entry) => entry.alias === target || entry.inspectName === target);

        if (!project) {
          next.push({ type: "output", lines: [`Project not found: ${target}`, "Try: inspect syntaxark"] });
          return next;
        }

        next.push({
          type: "output",
          lines: [
            `PROJECT :: ${project.title}`,
            `CATEGORY :: ${project.category.toUpperCase()}`,
            `YEAR :: ${project.timeframe || "ACTIVE"}`,
            "",
            `SUMMARY :: ${project.summary}`,
            `FLOW :: ${project.architecture.join(" -> ")}`,
            `STACK :: ${project.stack || Object.values(project.techStack || {}).join(" | ")}`,
            "",
            ...((project.highlights || []).slice(0, 4).map((item, index) => `${index + 1}. ${item}`)),
          ],
          projectId: project.title === "SyntaxArk" ? "flagship" : project.title,
          demo: project.links?.find((link) => link.label.toLowerCase().includes("demo") || link.label.toLowerCase() === "site")?.href,
        });
        return next;
      }

      next.push({ type: "output", lines: [`Unknown command: ${command}`, "Type 'help' to view commands."] });
      return next;
    });

    setInput("");
  };

  return (
    <div className="mb-12 max-w-2xl rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(16,18,27,0.98),rgba(8,9,14,0.98))] shadow-[0_20px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(217,70,239,0.1),transparent_28%)] pointer-events-none" />

      <div className="relative flex items-center justify-between px-5 py-4 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 shadow-[0_0_12px_rgba(239,68,68,0.35)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 shadow-[0_0_12px_rgba(234,179,8,0.28)]" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 shadow-[0_0_12px_rgba(16,185,129,0.28)]" />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-[10px] font-mono uppercase tracking-[0.32em] text-slate-400">Portfolio CLI</span>
            <span className="text-[10px] text-slate-500">Interactive project inspector</span>
          </div>
        </div>
        <div className="text-[10px] font-mono uppercase tracking-[0.28em] text-sky-300/80 border border-sky-400/20 bg-sky-400/10 px-2.5 py-1 rounded-md">live</div>
      </div>

      <div className="relative p-5 md:p-6 font-mono text-[11px] text-slate-300">
        <div ref={outputRef} className="space-y-3 max-h-[320px] overflow-y-auto pr-1 rounded-2xl border border-white/5 bg-black/20 p-4">
          {history.map((entry, index) => (
            <div key={`${entry.type}-${index}`} className="space-y-1">
              {entry.type === "command" ? (
                <div className="flex items-center gap-2 text-sky-300">
                  <span className="text-slate-500">mandeep@portfolio:~$</span>
                  <span className="text-slate-100">{entry.value}</span>
                </div>
              ) : (
                <>
                  {entry.lines.map((line, lineIndex) => (
                    <p key={`${index}-${lineIndex}`} className={`${line ? "" : "h-2"} leading-relaxed text-slate-300/95`}>
                      {line.startsWith("PROJECT ::") || line.startsWith("CATEGORY ::") || line.startsWith("YEAR ::") || line.startsWith("SUMMARY ::") || line.startsWith("FLOW ::") || line.startsWith("STACK ::")
                        ? <span className="text-white">{line}</span>
                        : line === "Commands:" || line === "Featured projects:"
                          ? <span className="text-sky-300">{line}</span>
                          : line}
                    </p>
                  ))}
                  {entry.projectId && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => document.getElementById(entry.projectId)?.scrollIntoView({ behavior: "smooth" })}
                        className="px-3 py-2 rounded-lg bg-sky-500 text-slate-950 border border-sky-300/40 shadow-[0_6px_0_rgb(12,74,110)] hover:brightness-110 active:translate-y-[2px] active:shadow-none text-[10px] uppercase tracking-[0.2em]"
                      >
                        Jump to section
                      </button>
                      {entry.demo && (
                        <a
                          href={entry.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-lg bg-slate-800 text-slate-200 border border-white/10 shadow-[0_6px_0_rgb(15,23,42)] hover:border-white/20 hover:bg-slate-700 active:translate-y-[2px] active:shadow-none text-[10px] uppercase tracking-[0.2em]"
                        >
                          Open demo
                        </a>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <form
          onSubmit={(event) => {
            event.preventDefault();
            executeCommand(input);
          }}
          className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]"
        >
          <span className="text-slate-500 shrink-0">mandeep@portfolio:~$</span>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Tab" && commandSuggestions.length > 0) {
                event.preventDefault();
                setInput(commandSuggestions[0]);
              }
            }}
            placeholder="Try: help, list, inspect syntaxark"
            className="flex-1 bg-transparent text-slate-100 placeholder:text-slate-600 outline-none"
          />
          <button
            type="submit"
            className="shrink-0 px-3 py-2 rounded-lg bg-sky-500 text-slate-950 border border-sky-300/40 text-[10px] uppercase tracking-[0.2em] shadow-[0_6px_0_rgb(12,74,110)] hover:brightness-110 active:translate-y-[2px] active:shadow-none"
          >
            Run
          </button>
          {input.trim() && commandSuggestions.length > 0 && (
            <button
              type="button"
              onClick={() => setInput(commandSuggestions[0])}
              className="shrink-0 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 text-[10px] uppercase tracking-[0.2em]"
            >
              Tab
            </button>
          )}
        </form>

        <div className="mt-4">
          <p className="mb-2 text-[10px] font-mono uppercase tracking-[0.24em] text-slate-500">Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {commandSuggestions.map((command) => (
              <button
                key={command}
                type="button"
                onClick={() => setInput(command)}
                className="px-3 py-2 rounded-lg bg-sky-400/10 border border-sky-400/20 text-sky-200 hover:text-white hover:border-sky-300/40 text-[10px] uppercase tracking-[0.18em] transition-all"
              >
                {command}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
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
