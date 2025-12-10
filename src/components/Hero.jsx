import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, BadgeCheck, Github, Linkedin, Mail } from "lucide-react";
import { LINKS } from "../data/projects";

const HERO_IMAGE = "/hero.jpg"; // Keeping the existing reference

export function Hero() {
  return (
    <section className="relative pt-20 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
         <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px]" />
         <div className="absolute bottom-20 right-10 w-80 h-80 bg-fuchsia-600/20 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Available for work
            </div>

            <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white mb-6">
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">
                Mandeep Singh.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-xl mb-8">
              A Product-Focused Software Engineer combining technical expertise with business strategy. 
              I build scalable, revenue-generating platforms using Next.js, AI, and modern cloud solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-white text-slate-900 px-6 py-3 text-sm font-semibold hover:bg-slate-200 transition-colors"
              >
                View Projects <ArrowRight className="w-4 h-4" />
              </a>
              <div className="flex gap-2">
                <SocialLink href={LINKS.github} icon={<Github className="w-5 h-5" />} />
                <SocialLink href={LINKS.linkedin} icon={<Linkedin className="w-5 h-5" />} />
                <SocialLink href={LINKS.email} icon={<Mail className="w-5 h-5" />} />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative lg:ml-auto"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 mx-auto lg:mx-0">
                {/* Glowing border effect */}
                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-[2rem] opacity-30 blur-2xl animate-pulse" />
                
                <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/10 bg-slate-800 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                         <img 
                                            src={HERO_IMAGE} 
                                            alt="Mandeep Singh" 
                                            className="w-full h-full object-cover brightness-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />                </div>
            </div>
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
