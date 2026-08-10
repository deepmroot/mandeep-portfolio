import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { ArrowUpRight as PhosphorArrowUpRight, GithubLogo as PhosphorGithubLogo } from "@phosphor-icons/react";
import { PROJECT_THEMES } from "../data/projectThemes.js";

const DISPLAY = "[font-family:'Bricolage_Grotesque','Inter',sans-serif]";
const MONO = "[font-family:'IBM_Plex_Mono',monospace]";
const EASE_OUT = [0.22, 1, 0.36, 1];

export default function ProjectCaseStudy({ projectSlug, onBack }) {
  const project = PROJECT_THEMES[projectSlug] || PROJECT_THEMES.inferencesaver;
  const containerRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [projectSlug]);

  return (
    <div ref={containerRef} className="min-h-screen relative text-white transition-colors duration-700 overflow-x-hidden" style={{ backgroundColor: project.bg }}>
      {/* Top Floating Navigation Header */}
      <header className="sticky top-0 z-50 px-4 sm:px-12 py-4 sm:py-6 flex items-center justify-between gap-3 backdrop-blur-md bg-black/20">
        <button
          onClick={onBack}
          type="button"
          className={`${MONO} inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-white/10 hover:bg-white text-white hover:text-[#171412] backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-bold uppercase tracking-[0.14em] transition-all cursor-pointer shadow-lg shrink-0`}
        >
          <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span>Back to Works</span>
        </button>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${DISPLAY} inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2 sm:py-2.5 rounded-full bg-white text-[#171412] hover:bg-[#171412] hover:text-white transition-colors text-[10px] sm:text-xs font-extrabold uppercase tracking-[0.14em] shadow-xl shrink-0`}
        >
          <span>Visit Live Site</span>
          <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </a>
      </header>

      {/* Hero Section: Brand Color Banner */}
      <section className="px-5 sm:px-12 pt-8 sm:pt-12 pb-20 sm:pb-24 flex flex-col items-center justify-center text-center min-h-[70vh]">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE_OUT }}
          className={`${MONO} text-[10px] sm:text-sm font-extrabold uppercase tracking-[0.22em] text-white/90 bg-black/25 px-3.5 sm:px-4 py-1.5 rounded-full backdrop-blur-sm mb-6 sm:mb-8`}
        >
          {project.tag}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className={`${DISPLAY} font-extrabold tracking-[-0.045em] leading-[0.88] text-[clamp(2.5rem,11vw,10rem)] text-white max-w-6xl drop-shadow-sm break-words`}
        >
          {project.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE_OUT }}
          className="mt-8 text-xl sm:text-2xl md:text-3xl text-white/90 max-w-3xl leading-snug font-medium"
        >
          {project.subtitle}
        </motion.p>

        {/* Meta details strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-3 gap-8 text-left border-t border-white/20 pt-8 w-full max-w-4xl"
        >
          <div>
            <span className={`${MONO} block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1`}>
              YEAR
            </span>
            <span className={`${DISPLAY} font-extrabold text-lg sm:text-xl text-white`}>
              {project.year}
            </span>
          </div>

          <div>
            <span className={`${MONO} block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1`}>
              INDUSTRY
            </span>
            <span className={`${DISPLAY} font-extrabold text-lg sm:text-xl text-white`}>
              {project.industry}
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className={`${MONO} block text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1`}>
              CLIENT / PRODUCT
            </span>
            <span className={`${DISPLAY} font-extrabold text-lg sm:text-xl text-white`}>
              {project.client}
            </span>
          </div>
        </motion.div>
      </section>

      {/* Main Content Section: Transitions from Brand Color to Clean Paper #fbf9ef */}
      <section className="bg-[#fbf9ef] text-[#171412] px-6 sm:px-12 py-20 sm:py-32 rounded-t-[3rem] sm:rounded-t-[4rem] shadow-2xl -mt-10 relative z-20">
        <div className="max-w-5xl mx-auto space-y-20 sm:space-y-32">
          {/* Main Hero Video / Poster Banner */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-video rounded-[2rem] sm:rounded-[2.5rem] overflow-hidden bg-[#282421] shadow-2xl border border-[#171412]/10"
          >
            {project.iframe ? (
              <iframe
                src={project.iframe}
                title={`${project.title} Live Preview`}
                className="w-full h-full border-0 rounded-[2rem] sm:rounded-[2.5rem]"
                loading="lazy"
              />
            ) : project.video ? (
              <video
                src={project.video}
                poster={project.thumb}
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src={project.thumb}
                alt={project.title}
                className="w-full h-full object-cover object-top"
              />
            )}
          </motion.div>

          {/* Narrative Story Section */}
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className={`${MONO} text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff3c34]`}>
                PRODUCT STORY
              </span>
              <h2 className={`${DISPLAY} text-3xl sm:text-4xl font-extrabold tracking-tight mt-2 text-[#171412]`}>
                Engineering & Design Scope
              </h2>
            </div>

            <div className="md:col-span-8 space-y-6 text-lg sm:text-xl text-[#171412]/80 leading-relaxed font-normal">
              <p>{project.story}</p>
            </div>
          </div>

          {/* Tech Stack Specs Grid */}
          <div className="border-t border-[#171412]/10 pt-16">
            <span className={`${MONO} text-xs font-extrabold uppercase tracking-[0.2em] text-[#8e827c] block mb-6`}>
              TECHNOLOGY MATRIX
            </span>
            <div className="flex flex-wrap gap-3">
              {project.techChips.map((chip) => (
                <span
                  key={chip}
                  className={`${MONO} text-xs sm:text-sm uppercase tracking-[0.1em] px-5 py-2.5 rounded-2xl bg-[#f2f0e7] text-[#171412] font-bold border border-[#171412]/10 shadow-sm`}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>

          {/* Key Achievements & Engineering Outcomes */}
          {project.highlights && (
            <div className="border-t border-[#171412]/10 pt-16">
              <span className={`${MONO} text-xs font-extrabold uppercase tracking-[0.2em] text-[#ff3c34] block mb-8`}>
                KEY OUTCOMES & HIGHLIGHTS
              </span>
              <div className="grid sm:grid-cols-3 gap-8">
                {project.highlights.map((item, idx) => (
                  <div key={idx} className="bg-[#f2f0e7] p-8 rounded-3xl border border-[#171412]/10 flex flex-col justify-between">
                    <span className={`${MONO} text-2xl font-extrabold text-[#ff3c34] mb-4`}>
                      0{idx + 1}
                    </span>
                    <p className="text-base sm:text-lg font-medium text-[#171412] leading-snug">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action Footer */}
          <div className="border-t border-[#171412]/10 pt-16 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h3 className={`${DISPLAY} text-2xl sm:text-3xl font-extrabold tracking-tight text-[#171412]`}>
                Ready to experience {project.title}?
              </h3>
              <p className={`${MONO} text-xs sm:text-sm text-[#8e827c] mt-1`}>
                Explore the live production application
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${DISPLAY} inline-flex items-center gap-2 rounded-full bg-[#171412] text-[#fbf9ef] text-sm font-extrabold uppercase tracking-[0.14em] px-8 py-4 hover:bg-[#ff3c34] transition-colors shadow-xl`}
              >
                Launch Live Site <PhosphorArrowUpRight className="w-5 h-5" />
              </a>

              {project.repo && (
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${MONO} inline-flex items-center gap-2 rounded-full border border-[#171412]/20 text-[#171412] text-xs font-bold uppercase tracking-[0.14em] px-6 py-4 hover:bg-[#171412] hover:text-[#fbf9ef] transition-colors`}
                >
                  GitHub <PhosphorGithubLogo className="w-5 h-5" weight="fill" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
