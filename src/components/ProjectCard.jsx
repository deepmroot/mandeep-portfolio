import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";

export function ProjectCard({ project }) {
  const divRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

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
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 px-6 py-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-white/20"
    >
      {/* Spotlight Gradient */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(99, 102, 241, 0.15), transparent 40%)`,
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors duration-300">
              {project.title}
            </h3>
            <p className="mt-1 text-xs font-medium text-slate-500 font-mono uppercase tracking-wider">
              {project.timeframe}
            </p>
          </div>
          {project.featured && (
            <span className="flex items-center gap-1 rounded-full bg-indigo-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-indigo-400 ring-1 ring-inset ring-indigo-500/20">
              Featured
            </span>
          )}
        </div>

        <p className="mb-6 flex-grow text-sm leading-relaxed text-slate-400">
          {project.summary}
        </p>

        <div className="mt-auto">
          {/* Tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-slate-800/80 px-2 py-1 text-xs font-medium text-slate-300 ring-1 ring-inset ring-white/10 transition-colors group-hover:text-indigo-300 group-hover:ring-indigo-500/30"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-4 pt-4 border-t border-white/5">
            {project.links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-1.5 text-sm font-semibold text-slate-300 transition-colors hover:text-white"
              >
                {link.label}
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
