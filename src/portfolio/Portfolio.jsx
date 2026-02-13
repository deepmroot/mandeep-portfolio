import React, { useEffect, useState } from "react";
import { PROJECTS, LINKS } from "../data/projects";
import { Hero } from "../components/Hero";
import { Skills } from "../components/Skills";
import { Footer } from "../components/Footer";
import { ProjectCard } from "../components/ProjectCard";
import { Card } from "../components/Card";
import { LiquidBackground } from "../components/LiquidBackground";
import { ResumeModal } from "../components/ResumeModal";
import { GlobalSearch } from "../components/GlobalSearch";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowUpRight, 
  Mail, 
  Linkedin, 
  Globe, 
  Cpu, 
  Terminal, 
  Cloud, 
  Database, 
  Zap,
  Layout,
  ShieldCheck,
  Server,
  Palette,
  Type
} from "lucide-react";

export default function Portfolio() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    const timer = setTimeout(() => window.scrollTo(0, 0), 100);
    return () => clearTimeout(timer);
  }, []);

  const flagship = PROJECTS.find(p => p.category === "flagship");
  const selectedProjects = PROJECTS.filter(p => p.category === "selected");
  const coreProjects = PROJECTS.filter(p => p.category === "core");
  const additionalProjects = PROJECTS.filter(p => p.category === "additional");

  return (
    <main className="min-h-screen bg-[#0a0b10] text-slate-200 font-sans selection:bg-indigo-500/30 relative">
      <LiquidBackground />
      <GlobalSearch />

      <div className="relative z-10">
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* PROJECTS HEADER */}
        <section className="pt-24 pb-12 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col">
              <span className="text-indigo-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block animate-pulse">Initializing Projects_DB...</span>
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase">
                Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Works</span>
              </h2>
            </div>
          </div>
        </section>

        {/* FLAGSHIP: SyntaxArk */}
        {flagship && (
          <section id="flagship" className="pb-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-indigo-500/[0.01] -z-10" />
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex flex-col mb-16">
                <div className="flex items-center gap-4 mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest w-fit">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                    Flagship Platform
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-400 text-[10px] font-bold uppercase tracking-widest">
                    Beta Release 1.0
                  </div>
                </div>

                <div className="inline-flex items-center mb-8 group/brand">
                  <div className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 shrink-0 relative z-10">
                    <img
                      src="/logo.png"
                      alt="SyntaxArk"
                      className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover/brand:scale-110"
                    />
                  </div>
                  <span className="inline-flex items-baseline gap-0 font-extrabold leading-none tracking-[-0.04em] text-[40px] md:text-[72px] text-white [font-family:'Sora','Space_Grotesk','Segoe_UI',sans-serif] -ml-2 md:-ml-4 relative z-0">
                    <span>Syntax</span>
                    <span className="text-[#60a5fa] [text-shadow:0_0_30px_rgba(59,130,246,0.5)]">Ark</span>
                  </span>
                </div>

                <p className="text-xl text-slate-400 max-w-3xl leading-relaxed font-medium">
                  {flagship.summary}
                </p>
              </div>

              <div className="grid lg:grid-cols-12 gap-12 items-stretch">
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="lg:col-span-5 space-y-8 flex flex-col"
                >
                  <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d0e14] to-[#050608] overflow-hidden group relative shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
                    <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-500/5 blur-[60px] rounded-full" />
                    
                    <div className="flex justify-between items-start mb-10 relative z-10">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-1 h-1 rounded-full bg-indigo-500" />
                          <h3 className="text-[10px] font-bold text-indigo-400 uppercase tracking-[0.4em]">Node Topology</h3>
                        </div>
                        <p className="text-[7px] text-slate-600 font-mono tracking-[0.2em]">PROTOCOL: SYNC_V2.4 // ENCRYPTED_STREAM</p>
                      </div>
                      <div className="bg-black/40 px-3 py-1.5 rounded-lg border border-white/5 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                          <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                          <span className="text-[8px] text-emerald-500 font-mono font-bold">STABLE</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="relative flex items-center justify-between gap-1 h-28 px-6 bg-black/60 rounded-2xl border border-white/5 shadow-inner group-hover:border-indigo-500/20 transition-colors duration-500">
                      <ArchitectureNode label="Client" icon={<Layout className="w-5 h-5" />} />
                      <ArchitectureLine />
                      <ArchitectureNode label="State" icon={<Cpu className="w-5 h-5" />} highlight />
                      <ArchitectureLine />
                      <ArchitectureNode label="Runner" icon={<Zap className="w-5 h-5" />} />
                      <ArchitectureLine />
                      <ArchitectureNode label="Backend" icon={<Cloud className="w-5 h-5" />} highlight />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6 flex-grow">
                    <div className="bg-gradient-to-b from-[#0d0e14] to-black border border-white/10 rounded-2xl p-7 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                      <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500/20 group-hover:bg-indigo-500 transition-colors duration-500" />
                      <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center justify-between">
                        <span>Core Capabilities</span>
                        <Terminal className="w-3 h-3 text-indigo-500/50" />
                      </h3>
                      <ul className="space-y-5">
                        {flagship.highlights.map((h, i) => (
                          <li key={i} className="group/item flex items-start gap-4">
                            <span className="text-[9px] font-mono text-indigo-500/40 bg-indigo-500/5 w-5 h-5 flex items-center justify-center rounded border border-indigo-500/10 shrink-0">{i+1}</span>
                            <span className="text-slate-400 text-[11px] leading-relaxed group-hover/item:text-slate-200 transition-colors">{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-gradient-to-b from-[#0d0e14] to-black border border-white/10 rounded-2xl p-7 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                       <div className="absolute top-0 right-0 w-1 h-full bg-fuchsia-500/20 group-hover:bg-fuchsia-500 transition-colors duration-500" />
                       <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center justify-between">
                        <span>Tech Matrix</span>
                        <Database className="w-3 h-3 text-fuchsia-500/50" />
                      </h3>
                      <div className="space-y-5">
                        {Object.entries(flagship.techStack).map(([key, value]) => (
                          <div key={key} className="group/stack">
                             <div className="text-[8px] uppercase tracking-[0.2em] text-slate-600 font-bold mb-1.5 group-hover/stack:text-fuchsia-400 transition-colors">{key}</div>
                             <div className="text-[11px] text-slate-300 font-mono tracking-tight bg-white/5 p-2 rounded border border-white/5">{value}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 pt-8">
                    {flagship.links.map((link) => (
                      <div key={link.label} className="perspective-1000">
                        <motion.div whileHover={{ translateZ: 15, rotateX: -5, rotateY: 5 }} className="transform-style-3d">
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`relative flex items-center gap-3 px-8 py-4 rounded-lg font-black uppercase tracking-widest text-sm transition-all active:shadow-none active:translate-y-[8px] -rotate-x-12 rotate-y-12 ${
                              link.label === "Live Demo" 
                              ? "bg-[#60a5fa] text-white shadow-[0_8px_0_rgb(30,58,138)]" 
                              : "bg-slate-800 text-slate-300 border border-white/10 shadow-[0_8px_0_rgb(15,23,42)]"
                            }`}
                          >
                            {link.label} <ArrowUpRight className="w-4 h-4" />
                          </a>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div 
                   initial={{ opacity: 0, x: 20 }}
                   whileInView={{ opacity: 1, x: 0 }}
                   viewport={{ once: true }}
                   className="lg:col-span-7 relative group flex flex-col"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl opacity-20 blur-xl" />
                  <div className="relative rounded-2xl border border-white/10 overflow-hidden bg-[#0d0e14] shadow-2xl flex-grow flex flex-col min-h-[500px] lg:min-h-[600px]">
                     <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 shrink-0">
                        <div className="flex gap-1.5">
                           <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                           <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                           <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                        </div>
                        <div className="mx-auto w-1/2 h-5 bg-white/5 rounded-md border border-white/5 flex items-center justify-center relative">
                           <span className="text-[10px] text-slate-500 font-mono truncate px-2">{flagship.links.find(l => l.label === "Live Demo")?.href}</span>
                           <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                              <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                              <span className="text-[8px] text-emerald-500/70 font-bold uppercase tracking-tighter">Live</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex-grow relative bg-[#0a0b10]">
                        <iframe 
                          src={flagship.links.find(l => l.label === "Live Demo")?.href} 
                          className="absolute inset-0 w-full h-full border-none grayscale-[0.2] contrast-[1.1] hover:grayscale-0 transition-all duration-700"
                          title="SyntaxArk Live Preview"
                          loading="lazy"
                          tabIndex="-1"
                        />
                        <div className="absolute bottom-4 right-4 pointer-events-none">
                           <div className="px-3 py-1.5 rounded-lg bg-indigo-500/20 border border-indigo-500/30 backdrop-blur-md text-indigo-300 text-[10px] font-bold uppercase tracking-widest shadow-xl">
                              Beta Version 1.0
                           </div>
                        </div>
                     </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        )}

        {/* 2.5️⃣ SELECTED PROJECTS (Secondary Flagships) */}
        {selectedProjects.map((project, index) => {
          const isRentSpace = project.title === "RentSpace";
          const isInverted = isRentSpace; // RentSpace on Left, GenericAlt on Right
          const isOlive = project.theme === "olive";
          const brandColor = isOlive ? "#d3f54c" : "#e86a4a";
          const secondaryColor = isOlive ? "#282a1e" : "#7d6650";
          const wordmarkColor = isOlive ? "#fdfff9" : "#724B1D";
          const shadowColor = isOlive ? "rgba(211, 245, 76, 0.4)" : "rgba(132, 45, 22, 0.4)";
          
          return (
            <div key={project.title} id={project.title}>
              {/* Data Bridge Transition */}
              <div className="relative py-24 flex justify-center items-center overflow-hidden">
                <div className={`absolute h-full w-px bg-gradient-to-b ${isRentSpace ? 'from-indigo-500/50 to-[#e86a4a]/50' : 'from-[#e86a4a]/50 to-[#d3f54c]/50'}`} />
                <div className="relative z-10 p-6 rounded-full border border-white/10 bg-[#0d0e14] backdrop-blur-xl group shadow-[0_0_50px_rgba(255,255,255,0.05)]">
                  <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center relative">
                    {isOlive ? <Palette className="w-5 h-5" style={{ color: brandColor }} /> : <Database className="w-5 h-5 text-indigo-400" />}
                  </div>
                </div>
              </div>

              <section className="py-32 relative overflow-hidden border-t border-white/5" style={{ backgroundColor: isOlive ? 'rgba(40, 42, 30, 0.05)' : 'rgba(232, 106, 74, 0.01)' }}>
                <div className="max-w-7xl mx-auto px-6">
                  <div className={`flex flex-col mb-16 ${isInverted ? 'items-start text-left' : 'items-end text-right'}`}>
                    <div className="flex items-center gap-4 mb-8">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-bold uppercase tracking-widest w-fit`} style={{ color: brandColor }}>
                        <span className={`w-1.5 h-1.5 rounded-full animate-pulse`} style={{ backgroundColor: brandColor }} />
                        Selected Platform
                      </div>
                      <div className="rounded-full bg-white/5 border border-white/10 px-4 py-1 w-fit" style={{ backgroundColor: `${brandColor}10`, borderColor: `${brandColor}30` }}>
                        <span className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2" style={{ color: brandColor }}>
                          <ShieldCheck className="w-3 h-3" /> System Verified
                        </span>
                      </div>
                    </div>

                    <div className={`inline-flex items-center mb-8 group/brand ${isInverted ? '' : 'flex-row-reverse'}`}>
                      {isOlive ? (
                        <div className={`flex flex-col ${isInverted ? 'items-start' : 'items-end'}`}>
                           <img
                            src="/generic-alternatives-wordmark.svg"
                            alt="Generic Alternatives"
                            className="h-20 md:h-28 w-auto drop-shadow-2xl transition-transform duration-500 group-hover/brand:scale-105"
                          />
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center justify-center w-32 h-32 md:w-40 md:h-40 shrink-0 relative z-10 -ml-4 md:-ml-6 -mt-4">
                            <img
                              src="/RentSpace.png"
                              alt="RentSpace"
                              className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover/brand:scale-110"
                            />
                          </div>
                          <span className={`inline-flex items-baseline gap-0 font-bold leading-none tracking-tight text-[40px] md:text-[72px] relative z-0 font-['Inter',sans-serif]`} style={{ color: wordmarkColor }}>
                            {project.title}
                          </span>
                        </>
                      )}
                    </div>

                    <p className="text-xl text-slate-400 max-w-3xl leading-relaxed font-medium">
                      {project.summary}
                    </p>
                  </div>

                  <div className="grid lg:grid-cols-12 gap-16 items-stretch">
                    {/* Live Preview Frame */}
                    <motion.div 
                       initial={{ opacity: 0, x: isInverted ? -30 : 30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       className={`lg:col-span-7 relative group flex flex-col ${isInverted ? 'order-2 lg:order-1' : 'order-1 lg:order-2'}`}
                    >
                      <div className={`absolute -inset-1 rounded-2xl opacity-20 blur-xl group-hover:opacity-30 transition-opacity`} style={{ background: `linear-gradient(to right, ${brandColor}, ${secondaryColor})` }} />
                      <div className={`relative rounded-2xl border border-white/10 overflow-hidden ${isOlive ? 'bg-[#1a1c14]' : 'bg-[#0d1410]'} shadow-2xl flex-grow flex flex-col min-h-[500px] lg:min-h-[600px]`}>
                         <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 shrink-0">
                            <div className="flex gap-1.5">
                               <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/40" />
                               <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                               <div className="w-2.5 h-2.5 rounded-full bg-green-500/20 border border-green-500/40" />
                            </div>
                            <div className="mx-auto w-1/2 h-5 bg-white/5 rounded-md border border-white/5 flex items-center justify-center relative">
                               <span className="text-[10px] text-slate-500 font-mono truncate px-2">
                                 {project.links.find(l => l.label === "Live Demo")?.href || "rentspace.app"}
                               </span>
                            </div>
                         </div>
                         <div className="flex-grow relative bg-[#0a0b10]">
                            <iframe 
                              src={project.links.find(l => l.label === "Live Demo")?.href} 
                              className="absolute inset-0 w-full h-full border-none grayscale-[0.1] contrast-[1.05] hover:grayscale-0 transition-all duration-700"
                              title={`${project.title} Preview`}
                              loading="lazy"
                              tabIndex="-1"
                            />
                         </div>
                      </div>
                    </motion.div>

                    {/* Technical Specs Content */}
                    <motion.div 
                      initial={{ opacity: 0, x: isInverted ? 30 : -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className={`lg:col-span-5 space-y-8 flex flex-col ${isInverted ? 'order-1 lg:order-2' : 'order-2 lg:order-1'}`}
                    >
                      <div className="p-8 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d0e14] to-black overflow-hidden group relative shadow-2xl">
                        <div className={`absolute top-0 left-0 w-full h-px`} style={{ background: `linear-gradient(to right, transparent, ${brandColor}, transparent)` }} />
                        
                        <div className="flex justify-between items-start mb-10 relative z-10">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <div className={`w-1.5 h-1.5 rounded-full`} style={{ backgroundColor: brandColor }} />
                              <h3 className={`text-[10px] font-bold uppercase tracking-[0.4em]`} style={{ color: brandColor }}>{isOlive ? 'Process Flow' : 'Service Mesh'}</h3>
                            </div>
                            <p className="text-[7px] text-slate-600 font-mono tracking-[0.2em]">TYPE: {isOlive ? 'SUPPLY_CHAIN_AI' : 'SAAS_UTILITY'} // {isOlive ? 'DISTRIBUTED_SOURCING' : 'AI_AGENT_SCREENING'}</p>
                          </div>
                        </div>
                        
                        <div className="relative flex items-center justify-between gap-1 h-28 px-6 bg-black/60 rounded-2xl border border-white/5 shadow-inner transition-colors duration-500">
                          {isOlive ? (
                            <>
                              <ArchitectureNode label="Source" icon={<Globe className="w-5 h-5" />} color="olive" />
                              <ArchitectureLine color="olive" />
                              <ArchitectureNode label="Agent" icon={<Cpu className="w-5 h-5" />} highlight color="olive" />
                              <ArchitectureLine color="olive" />
                              <ArchitectureNode label="Logic" icon={<Zap className="w-5 h-5" />} />
                              <ArchitectureLine color="olive" />
                              <ArchitectureNode label="Fulfillment" icon={<Database className="w-5 h-5" />} highlight color="olive" />
                            </>
                          ) : (
                            <>
                              <ArchitectureNode label="UI" icon={<Layout className="w-5 h-5" />} color="orange" />
                              <ArchitectureLine color="orange" />
                              <ArchitectureNode label="Auth" icon={<ShieldCheck className="w-5 h-5" />} highlight color="orange" />
                              <ArchitectureLine color="orange" />
                              <ArchitectureNode label="AI" icon={<Cpu className="w-5 h-5" />} color="orange" />
                              <ArchitectureLine color="orange" />
                              <ArchitectureNode label="DB" icon={<Database className="w-5 h-5" />} highlight color="orange" />
                            </>
                          )}
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6 flex-grow">
                        <div className="bg-gradient-to-b from-[#0d0e14] to-black border border-white/10 rounded-2xl p-7 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                          <div className={`absolute top-0 left-0 w-1 h-full opacity-20 group-hover:opacity-100 transition-colors duration-500`} style={{ backgroundColor: brandColor }} />
                          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center justify-between">
                            <span>Capabilities</span>
                            <Zap className={`w-3 h-3`} style={{ color: `${brandColor}80` }} />
                          </h3>
                          <ul className="space-y-5">
                            {project.highlights.map((highlight, i) => (
                              <li key={i} className="group/item flex items-start gap-4">
                                <span className={`text-[9px] font-mono w-5 h-5 flex items-center justify-center rounded border shrink-0 transition-colors`} style={{ color: `${brandColor}80`, backgroundColor: `${brandColor}10`, borderColor: `${brandColor}20` }}>
                                  {i+1}
                                </span>
                                <span className="text-slate-400 text-[11px] leading-relaxed group-hover/item:text-slate-200 transition-colors">
                                  {highlight}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-gradient-to-b from-[#0d0e14] to-black border border-white/10 rounded-2xl p-7 relative overflow-hidden group hover:border-white/20 transition-all duration-500">
                           <div className={`absolute top-0 right-0 w-1 h-full opacity-20 group-hover:opacity-100 transition-colors duration-500`} style={{ backgroundColor: isOlive ? "#fdfff9" : "#7d6650" }} />
                           <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-8 flex items-center justify-between">
                            <span>Platform Stack</span>
                            <Globe className={`w-3 h-3 text-slate-500`} />
                          </h3>
                          <div className="space-y-5">
                            {Object.entries(project.techStack).map(([key, value]) => (
                              <div key={key} className="group/stack">
                                 <div className={`text-[8px] uppercase tracking-[0.2em] text-slate-600 font-bold mb-1.5 transition-colors group-hover/stack:text-white`}>{key}</div>
                                 <div className="text-[11px] text-slate-300 font-mono tracking-tight bg-white/5 p-2 rounded border border-white/5">
                                   {value}
                                 </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-6 pt-8">
                        {project.links.map((link) => (
                          <div key={link.label} className="perspective-1000">
                            <motion.div
                              whileHover={{ translateZ: 15, rotateX: -5, rotateY: 5 }}
                              className="transform-style-3d"
                            >
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`relative flex items-center gap-3 px-8 py-4 rounded-lg font-black uppercase tracking-widest text-sm transition-all active:shadow-none active:translate-y-[8px] -rotate-x-12 rotate-y-12 ${
                                  link.label.includes('Demo') || link.label === 'Site'
                                  ? `text-white shadow-lg`
                                  : "bg-slate-800 text-slate-300 border border-white/10 shadow-[0_8px_0_rgb(15,23,42)]"
                                }`}
                                style={{ 
                                  backgroundColor: (link.label.includes('Demo') || link.label === 'Site') ? brandColor : undefined,
                                  boxShadow: (link.label.includes('Demo') || link.label === 'Site') ? `0 8px 0 ${shadowColor}` : undefined,
                                  color: (isOlive && (link.label.includes('Demo') || link.label === 'Site')) ? '#282a1e' : undefined
                                }}
                              >
                                {link.label} <ArrowUpRight className="w-4 h-4" />
                              </a>
                            </motion.div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>
            </div>
          );
        })}

        <section id="core-projects" className="py-24 border-t border-white/5 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col mb-16">
              <span className="text-indigo-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block animate-pulse">Scanning Advanced_Systems...</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
                Core <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Engineering</span>
              </h2>
            </div>
            
            <div className="grid gap-12 lg:grid-cols-2">
              {coreProjects.map((project) => (
                <div key={project.title} id={project.title}>
                  <ProjectCard project={project} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="additional-projects" className="py-24 border-t border-white/5">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col mb-16">
              <span className="text-fuchsia-500 font-mono text-[10px] uppercase tracking-[0.5em] mb-4 block animate-pulse">Loading Laboratory_Assets...</span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase">
                Dev <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-500">Laboratory</span>
              </h2>
            </div>
            
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {additionalProjects.map((project) => (
                <CompactProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

        <Skills />

        <section id="education" className="py-12 border-t border-white/5 bg-black/40">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="shrink-0">
                <div className="flex flex-col">
                  <span className="text-indigo-500 font-mono text-[8px] uppercase tracking-[0.4em] mb-1">Academic_Node</span>
                  <h2 className="text-xl font-black text-white tracking-tighter uppercase">Education</h2>
                </div>
              </div>
              <div className="flex-grow w-full bg-white/[0.03] border border-white/10 rounded-2xl p-5 md:p-6 flex items-center gap-6 group hover:border-indigo-500/30 transition-all duration-500">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/5 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shrink-0 shadow-inner group-hover:bg-indigo-500/10 transition-colors">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-base font-bold text-white tracking-tight">BCS @ Thompson Rivers University</h3>
                    <p className="text-emerald-500 text-[10px] font-mono uppercase tracking-widest mt-0.5 animate-pulse">Seeking Co-op Opportunities</p>
                  </div>
                  <div className="md:text-right shrink-0">
                    <div className="text-white font-black text-[11px] uppercase tracking-widest">Expected 2026</div>
                    <div className="text-indigo-400 font-mono text-[10px] mt-0.5 opacity-80">CGPA: 4.0 / 4.33</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 border-t border-white/5 bg-indigo-600/5">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase">
              Ready for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-400">Next Sprint</span>
            </h2>
            <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-medium">
              I'm looking for Software Developer Co-op opportunities where I can contribute to high-performance systems.
            </p>
            <div className="flex flex-wrap justify-center gap-12">
              <div className="perspective-1000">
                <motion.div whileHover={{ translateZ: 20, rotateX: -10, rotateY: 10 }} className="transform-style-3d">
                  <a 
                    href={LINKS.email}
                    className="relative flex items-center gap-4 px-12 py-6 bg-white text-slate-900 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-[0_12px_0_rgb(203,213,225)] transition-all active:shadow-none active:translate-y-[12px] -rotate-x-12 rotate-y-12"
                  >
                    <Mail className="w-5 h-5" /> Initialize Connection
                  </a>
                </motion.div>
              </div>
              <div className="perspective-1000">
                <motion.div whileHover={{ translateZ: 20, rotateX: -10, rotateY: 10 }} className="transform-style-3d">
                  <a 
                    href={LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex items-center gap-4 px-12 py-6 bg-slate-800 text-white border border-white/10 rounded-2xl font-black uppercase tracking-[0.2em] text-sm shadow-[0_12px_0_rgb(15,23,42)] transition-all active:shadow-none active:translate-y-[12px] -rotate-x-12 rotate-y-12"
                  >
                    <Linkedin className="w-5 h-5" /> LinkedIn_Node
                  </a>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
      
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </main>
  );
}

function FocusCard({ title, description }) {
  return (
    <div className="p-8 rounded-2xl border border-white/5 bg-white/[0.01] hover:border-indigo-500/30 transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
        <div className="w-12 h-12 border border-white/20 rounded-lg flex items-center justify-center font-mono text-[8px] uppercase tracking-tighter">
          MTBF: 99.9%
        </div>
      </div>
      <h3 className="text-xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors flex items-center gap-2">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
      
      <div className="mt-6 flex gap-1 items-end h-4">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ height: [4, 8, 4, 12, 4] }}
            transition={{ duration: 2 + Math.random(), repeat: Infinity, delay: i * 0.1 }}
            className="w-1 bg-indigo-500/20 rounded-full"
          />
        ))}
      </div>
    </div>
  );
}

function CompactProjectCard({ project }) {
  return (
    <div className="p-6 rounded-2xl border border-white/5 bg-[#0d0e14] hover:border-white/20 transition-all duration-500 group flex flex-col h-full relative overflow-hidden shadow-xl">
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors tracking-tight">{project.title}</h3>
      <p className="text-[11px] text-slate-500 mb-6 line-clamp-3 flex-grow font-medium leading-relaxed">{project.summary}</p>
      
      <div className="flex flex-col gap-4 mt-auto">
        <div className="space-y-1.5">
          <span className="text-[8px] font-bold text-slate-600 uppercase tracking-widest">Stack_Ref</span>
          <div className="text-[10px] font-mono text-indigo-400/80 bg-indigo-500/5 px-2 py-1 rounded border border-indigo-500/10 truncate">
            {project.stack}
          </div>
        </div>
        
        <div className="flex gap-3 pt-4 border-t border-white/5">
          {project.links.map((link) => (
            <div key={link.label} className="perspective-1000">
              <motion.div whileHover={{ translateZ: 5, rotateX: -5, rotateY: 5 }} className="transform-style-3d">
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[9px] font-black uppercase tracking-wider text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded border border-white/5 shadow-[0_3px_0_rgba(0,0,0,0.3)] active:shadow-none active:translate-y-[3px]"
                >
                  {link.label} <ArrowUpRight className="w-2.5 h-2.5" />
                </a>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ArchitectureNode({ label, icon, highlight, color = "indigo" }) {
  const colorMap = {
    indigo: "bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_25px_rgba(99,102,241,0.2)] text-indigo-400",
    emerald: "bg-emerald-500/10 border-emerald-500/50 shadow-[0_0_25px_rgba(16,185,129,0.2)] text-emerald-400",
    orange: "bg-[#e86a4a]/10 border-[#e86a4a]/50 shadow-[0_0_25px_rgba(232,106,74,0.2)] text-[#e86a4a]",
    olive: "bg-[#d3f54c]/10 border-[#d3f54c]/50 shadow-[0_0_25px_rgba(211,245,76,0.2)] text-[#d3f54c]",
  };

  const glowMap = {
    indigo: "bg-indigo-500/20",
    emerald: "bg-emerald-500/20",
    orange: "bg-[#e86a4a]/20",
    olive: "bg-[#d3f54c]/20",
  };

  return (
    <div className="relative z-10 flex flex-col items-center gap-3">
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all duration-700 relative group/node ${
        highlight 
        ? colorMap[color]
        : "bg-white/5 border-white/10 text-slate-500 group-hover:border-white/20 group-hover:text-slate-300"
      }`}>
        {highlight && (
          <div className={`absolute inset-0 ${glowMap[color]} blur-xl rounded-full animate-pulse -z-10`} />
        )}
        {icon}
      </div>
      <span className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">{label}</span>
    </div>
  );
}

function ArchitectureLine({ color = "indigo" }) {
  const pulseMap = {
    indigo: "bg-indigo-400 shadow-[0_0_8px_#818cf8]",
    emerald: "bg-emerald-400 shadow-[0_0_8px_#34d399]",
    orange: "bg-[#e86a4a] shadow-[0_0_8px_#e86a4a]",
    olive: "bg-[#d3f54c] shadow-[0_0_8px_#d3f54c]",
  };

  return (
    <div className="flex-grow h-px relative min-w-[30px] mx-1">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      {[0, 1].map((i) => (
        <motion.div 
          key={i}
          initial={{ x: "-10%", opacity: 0 }}
          animate={{ 
            x: ["0%", "100%"], 
            opacity: [0, 1, 1, 0] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut", 
            delay: i * 0.75
          }}
          className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 flex items-center justify-center"
        >
          <div className={`w-1 h-1 rounded-full ${pulseMap[color]}`} />
        </motion.div>
      ))}
    </div>
  );
}