import React from "react";
import { SKILLS } from "../../data/projects";
import {
  Monitor,
  Terminal,
  Settings,
  Server,
  Code2,
} from "lucide-react";

const SKILL_ICON_MAP = {
  React: { type: "remote", value: "react" },
  TypeScript: { type: "remote", value: "typescript" },
  "Next.js": { type: "remote", value: "nextjs" },
  "Tailwind CSS": { type: "remote", value: "tailwind" },
  JavaScript: { type: "remote", value: "javascript" },
  Zustand: { type: "remote", value: "redux" },
  "Node.js": { type: "remote", value: "nodejs" },
  Express: { type: "remote", value: "express" },
  PostgreSQL: { type: "remote", value: "postgres" },
  Supabase: { type: "remote", value: "supabase" },
  Convex: { type: "local", value: "/convex-logo.png" },
  Firebase: { type: "remote", value: "firebase" },
  Git: { type: "remote", value: "git" },
  Docker: { type: "remote", value: "docker" },
  Figma: { type: "remote", value: "figma" },
  Rust: { type: "remote", value: "rust" },
  Vite: { type: "remote", value: "vite" },
  "VS Code": { type: "remote", value: "vscode" },
  "GitHub Actions": { type: "remote", value: "githubactions" },
  Vercel: { type: "remote", value: "vercel" },
  AWS: { type: "remote", value: "aws" },
  Linux: { type: "remote", value: "linux" },
  Kubernetes: { type: "remote", value: "kubernetes" },
  Bash: { type: "remote", value: "bash" },
};

function getSkillIconUrl(item) {
  const iconConfig = SKILL_ICON_MAP[item];
  if (!iconConfig) return null;
  if (iconConfig.type === "local") return iconConfig.value;
  return `https://skillicons.dev/icons?i=${iconConfig.value}&theme=dark`;
}

const SKILL_FALLBACK_MAP = {
  Convex: "CX",
};

function getSkillFallback(item) {
  if (SKILL_FALLBACK_MAP[item]) return SKILL_FALLBACK_MAP[item];

  return item
    .split(/[\s()/.-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function SkillGlyph({ item }) {
  const iconUrl = getSkillIconUrl(item);

  if (iconUrl) {
    return (
      <img
        src={iconUrl}
        alt={item}
        width="28"
        height="28"
        loading="lazy"
        decoding="async"
        className="w-7 h-7 rounded-md object-contain"
      />
    );
  }

  return (
    <div className="w-7 h-7 rounded-md border border-white/10 bg-white/[0.04] flex items-center justify-center text-[9px] font-black uppercase tracking-wide text-slate-300">
      {getSkillFallback(item)}
    </div>
  );
}

export function Skills() {
  const getIcon = (category) => {
    switch (category) {
      case "Frontend": return <Monitor className="w-4 h-4" />;
      case "Backend": return <Server className="w-4 h-4" />;
      case "Tools": return <Terminal className="w-4 h-4" />;
      case "DevOps": return <Settings className="w-4 h-4" />;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-24 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col mb-16 items-center gap-3">
          <span className="text-sky-400 font-mono text-[10px] uppercase tracking-[0.35em]">Technical Stack</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Stack</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skillGroup) => (
            <div key={skillGroup.category} className="group relative bg-[#0d1320] border border-white/10 rounded-2xl p-5 sm:p-8 overflow-hidden hover:border-sky-400/30 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-sky-400/20 to-transparent" />

              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-lg bg-sky-400/5 border border-sky-400/10 text-sky-400 group-hover:bg-sky-400/10 transition-colors">
                  {getIcon(skillGroup.category)}
                </div>
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-[0.2em]">
                  {skillGroup.category}
                </h3>
              </div>

              <div className="grid gap-3">
                {skillGroup.items.map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] px-3 py-2.5 group/item hover:border-white/10 transition-all">
                    <SkillGlyph item={item} />
                    <span className="text-[11px] font-mono text-slate-400 group-hover/item:text-slate-200 transition-colors leading-relaxed">
                      {item}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="text-[8px] font-mono text-slate-700 uppercase tracking-widest">Status: Optimized</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
