import React from "react";
import { PROJECTS } from "../data/projects";
import { Hero } from "../components/Hero";
import { Skills } from "../components/Skills";
import { Footer } from "../components/Footer";
import { ProjectCard } from "../components/ProjectCard";
import { Card } from "../components/Card";

export default function Portfolio() {
  return (
    <main className="min-h-screen bg-[#0a0b10] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Global Background Noise/Grain */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

      <Hero />

      <section id="projects" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
                <h2 className="text-3xl font-bold text-white mb-4">Featured Projects</h2>
                <p className="text-slate-400 max-w-xl">
                    A collection of applications, tools, and experiments I've built.
                </p>
            </div>
          </div>
          
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
      </section>

      <Skills />

      <section id="education" className="py-20 relative z-10 bg-[#0a0b10]">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-white mb-12">Education</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <h3 className="text-xl font-bold text-slate-100">Bachelor of Computing Science</h3>
                <p className="text-indigo-400 mb-4">Thompson Rivers University • 2023 – Present</p>
                <p className="text-slate-400 text-sm mb-4">
                    Focusing on Software Architecture, Human-Computer Interaction, and Web Technologies.
                    Active participant in the Co-op program.
                </p>
            </Card>
            <Card>
                <h3 className="text-xl font-bold text-slate-100">Certifications</h3>
                <ul className="mt-4 space-y-3 text-sm text-slate-400">
                    <li className="flex items-center gap-3">
                        <span className="h-px w-4 bg-indigo-500/50"></span>
                        AWS Cloud Practitioner (2021)
                    </li>
                    <li className="flex items-center gap-3">
                        <span className="h-px w-4 bg-indigo-500/50"></span>
                        CompTIA Security+ (2019)
                    </li>
                </ul>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}