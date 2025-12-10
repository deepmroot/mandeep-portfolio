import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Layers } from "lucide-react";

export function ProjectCard({ project }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="relative h-80 w-full cursor-pointer perspective-1000 group"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      onClick={handleFlip} // For mobile tap
    >
      <motion.div
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
        className="relative h-full w-full preserve-3d"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT SIDE */}
        <div className="absolute inset-0 h-full w-full backface-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-xl flex flex-col justify-between overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent opacity-50" />
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
                <Layers className="w-6 h-6 text-indigo-400" />
                {project.featured && (
                    <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/20 rounded-full">
                        Featured
                    </span>
                )}
            </div>
            <h3 className="text-2xl font-bold text-white mt-4">{project.title}</h3>
            <p className="text-sm text-indigo-200 mt-2 font-mono">{project.timeframe}</p>
          </div>

          <div className="relative z-10 mt-auto">
             <p className="text-slate-400 text-sm line-clamp-3">
                {project.summary}
             </p>
             <div className="mt-4 flex items-center text-xs text-slate-500 font-medium uppercase tracking-widest">
                Hover to reveal details <span className="ml-2">→</span>
             </div>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute inset-0 h-full w-full backface-hidden rounded-2xl border border-white/10 bg-slate-900/90 p-6 shadow-2xl flex flex-col rotate-y-180 overflow-hidden"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <div className="absolute inset-0 bg-gradient-to-tl from-fuchsia-500/10 via-transparent to-transparent" />
          
          <div className="relative z-10 h-full flex flex-col">
            <h4 className="text-lg font-bold text-white mb-4">Tech Stack</h4>
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium text-fuchsia-200 bg-fuchsia-500/10 rounded-md border border-fuchsia-500/20"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-auto space-y-3">
              {project.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 transition-all group/link"
                >
                  <span className="text-sm font-medium text-slate-200">{link.label}</span>
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover/link:text-white" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}