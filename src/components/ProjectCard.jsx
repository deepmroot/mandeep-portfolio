import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight, Zap } from "lucide-react";

export function ProjectCard({ project }) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const isWideLogo = project.title === "Generic Alternatives";

  const handleMouseMove = (e) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleFocus}
      onMouseLeave={handleBlur}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0d0e14] px-8 py-10 shadow-2xl transition-all duration-500 ${project.isWIP ? 'opacity-60 grayscale-[50%]' : 'hover:border-indigo-500/30'}`}
    >
      {/* WIP Overlay */}
      {project.isWIP && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] pointer-events-none">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">
            <Zap className="w-3 h-3" />
            BETA VERSION RELEASING SOON
          </div>
        </div>
      )}

      {/* Industrial Accents */}
      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/10 group-hover:bg-indigo-500 transition-colors duration-500" />
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <div className="w-1 h-1 rounded-full bg-white animate-pulse" />
      </div>

      {/* Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.08), transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6">
          {project.asciiLogo ? (
            <pre className="font-['Courier_New',Consolas,monospace] whitespace-pre leading-[1.1] text-[clamp(8px,1.2vw,12px)] text-[#0ea5e9] bg-[#0b1220] p-4 rounded-xl border border-white/5 overflow-x-auto mb-4 tracking-normal" aria-label={`${project.title} logo`}>
              {project.asciiLogo}
            </pre>
          ) : project.logo && (
            <div className={`${isWideLogo ? "w-40 h-12" : "w-12 h-12"} shrink-0 bg-white/5 rounded-xl border border-white/10 p-2 group-hover:border-indigo-500/30 transition-colors mb-4`}>
              <img src={project.logo} alt={project.title} className="w-full h-full object-contain object-left" />
            </div>
          )}
          <h3 className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors duration-300 tracking-tight">
            {project.title}
          </h3>
        </div>

        <p className="text-sm leading-relaxed text-slate-400 mb-8 font-medium">
          {project.summary}
        </p>

        <div className="space-y-6 mb-8 flex-grow">
          <div>
            <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
              <span className="w-1 h-2 bg-indigo-500/50" />
              Environment_Stack
            </h4>
            <div className="text-[11px] text-slate-300 font-mono bg-white/5 p-3 rounded border border-white/5 tracking-tight leading-relaxed">
              {project.stack}
            </div>
          </div>

          {project.highlights && (
            <div>
              <h4 className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                <span className="w-1 h-2 bg-fuchsia-500/50" />
                Engineering_Logs
              </h4>
              <ul className="space-y-3">
                {project.highlights.map((h, i) => (
                  <li key={i} className="group/item flex items-start gap-3">
                    <span className="text-[9px] font-mono text-indigo-500/40 mt-1">[{i+1}]</span>
                    <span className="text-slate-400 text-[11px] leading-relaxed group-hover/item:text-slate-200 transition-colors">
                      {h}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-auto">
          {/* Links */}
          <div className="flex flex-wrap items-center gap-4 pt-6 border-t border-white/5">
            {project.links.map((link) => (
              <div key={link.label} className="perspective-1000">
                <motion.div
                  whileHover={{ translateZ: 10, rotateX: -5, rotateY: 5 }}
                  className="transform-style-3d"
                >
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all active:shadow-none active:translate-y-[5px] -rotate-x-12 rotate-y-12 ${
                      link.label.includes('Demo') || link.label === 'Site'
                      ? "bg-indigo-600 text-white shadow-[0_5px_0_rgb(49,46,129)]"
                      : "bg-slate-800 text-slate-300 border border-white/5 shadow-[0_5px_0_rgb(15,23,42)]"
                    }`}
                  >
                    {link.label}
                    <ArrowUpRight className="h-3 w-3" />
                  </a>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
