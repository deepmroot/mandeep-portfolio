import React from "react";
import { SKILLS } from "../data/projects";
import { 
  Monitor, 
  Database, 
  Terminal, 
  Settings, 
  Layers,
  ShieldCheck,
  Server,
  Code2
} from "lucide-react";

export function Skills() {
  const getIcon = (category) => {
    switch (category) {
      case 'Frontend': return <Monitor className="w-4 h-4" />;
      case 'Backend': return <Server className="w-4 h-4" />;
      case 'Tools': return <Terminal className="w-4 h-4" />;
      case 'DevOps': return <Settings className="w-4 h-4" />;
      default: return <Code2 className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-24 border-t border-white/5 bg-black/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col mb-16 items-center">
          <span className="text-indigo-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block">Analyzing System_Capabilities...</span>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
            Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Stack</span>
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((skillGroup) => (
            <div key={skillGroup.category} className="group relative bg-[#0d0e14] border border-white/10 rounded-2xl p-8 overflow-hidden hover:border-indigo-500/30 transition-all duration-500">
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />
              
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2.5 rounded-lg bg-indigo-500/5 border border-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                  {getIcon(skillGroup.category)}
                </div>
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-[0.2em]">
                  {skillGroup.category}
                </h3>
              </div>

              <div className="space-y-3">
                {skillGroup.items.map((item) => (
                  <div key={item} className="flex items-center justify-between group/item">
                    <span className="text-[11px] font-mono text-slate-500 group-hover/item:text-slate-300 transition-colors">{item}</span>
                    <div className="h-px flex-grow mx-3 bg-white/5" />
                    <div className="w-1 h-1 rounded-full bg-indigo-500/20 group-hover/item:bg-indigo-500 transition-colors" />
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
