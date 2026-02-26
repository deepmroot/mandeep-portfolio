import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Command, ArrowRight, Code2 } from "lucide-react";
import { PROJECTS } from "../data/projects";

const QUERY_DEBOUNCE_MS = 200;

function normalizeSearchValue(value) {
  if (value == null) return "";
  if (Array.isArray(value)) return value.map(normalizeSearchValue).join(" ");
  if (typeof value === "object") return Object.values(value).map(normalizeSearchValue).join(" ");
  return String(value);
}

export function GlobalSearch({ renderTrigger }) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, QUERY_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [query]);

  const normalizedQuery = debouncedQuery.trim().toLowerCase();

  const results = useMemo(() => {
    if (normalizedQuery.length <= 1) return [];

    return PROJECTS.filter((project) => {
      const searchableText = [
        project.title,
        project.stack,
        project.summary,
        project.category,
        project.tags,
        project.techStack,
      ]
        .map(normalizeSearchValue)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [normalizedQuery]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const scrollToProject = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
      setQuery("");
    }
  };

  const renderDefaultTrigger = () => (
    <div className="fixed top-6 right-6 z-50">
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-3 px-4 py-2 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full text-slate-400 hover:text-white hover:border-indigo-500/50 transition-all shadow-2xl"
      >
        <Search className="w-4 h-4" />
        <span className="text-xs font-mono tracking-widest hidden sm:inline">Search Projects...</span>
        <div className="hidden md:flex items-center gap-1 bg-white/5 px-1.5 py-0.5 rounded border border-white/10">
          <Command className="w-2 h-2" />
          <span className="text-[10px]">K</span>
        </div>
      </button>
    </div>
  );

  return (
    <>
      {renderTrigger
        ? renderTrigger({
            onClick: () => setIsOpen(true),
            isOpen,
          })
        : renderDefaultTrigger()}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-start justify-center pt-[15vh] px-4 bg-[#0a0b10]/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: -20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: -20 }}
              className="w-full max-w-2xl bg-[#0d0e14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative flex items-center p-6 border-b border-white/5">
                <Search className="absolute left-8 w-5 h-5 text-indigo-500" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Query system: syntax, rust, automation..."
                  className="w-full bg-transparent pl-12 pr-12 text-lg text-white placeholder-slate-600 focus:outline-none font-mono"
                />
                <button onClick={() => setIsOpen(false)} className="absolute right-8 p-1 hover:bg-white/5 rounded">
                  <X className="w-4 h-4 text-slate-500" />
                </button>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4 custom-scrollbar">
                {results.length > 0 ? (
                  <div className="space-y-2">
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] px-4 mb-4">Matches_Found: {results.length}</p>
                    {results.map((project) => (
                      <button
                        key={project.title}
                        onClick={() => scrollToProject(project.title === "SyntaxArk" ? "flagship" : project.title)}
                        className="w-full flex items-center justify-between p-4 rounded-xl hover:bg-indigo-500/10 border border-transparent hover:border-indigo-500/20 transition-all text-left group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center text-indigo-400 group-hover:text-white transition-colors">
                            <Code2 className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white tracking-tight">{project.title}</h4>
                            <p className="text-[10px] font-mono text-slate-500 uppercase mt-1">{project.category} // {project.timeframe || "Active"}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-700 group-hover:text-indigo-500 transition-colors" />
                      </button>
                    ))}
                  </div>
                ) : normalizedQuery.length > 1 ? (
                  <div className="py-12 text-center">
                    <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">No matching clusters found for: {query}</p>
                  </div>
                ) : (
                  <div className="space-y-6 p-4">
                    <div>
                      <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.3em] mb-4">Jump_To</p>
                      <div className="grid grid-cols-2 gap-3">
                        {["SyntaxArk", "RentSpace", "Generic Alternatives", "PromptLine"].map((nav) => (
                          <button
                            key={nav}
                            onClick={() => scrollToProject(nav === "SyntaxArk" ? "flagship" : nav)}
                            className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5 hover:border-indigo-500/30 text-xs text-slate-400 hover:text-white transition-all text-left"
                          >
                            <div className="w-1 h-1 rounded-full bg-indigo-500" /> {nav}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 bg-black/20 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4 text-[10px] font-mono text-slate-600">
                  <span className="flex items-center gap-1"><kbd className="bg-white/5 px-1 rounded border border-white/10">ESC</kbd> Close</span>
                  <span className="flex items-center gap-1"><kbd className="bg-white/5 px-1 rounded border border-white/10">Enter</kbd> Select</span>
                </div>
                <div className="text-[10px] font-mono text-indigo-500/50 uppercase tracking-widest">System_Navigation_v1.0</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
