import React from "react";
import { ExternalLink } from "lucide-react";
import { Card } from "./Card";

export function ProjectCard({ project }) {
  return (
    <Card className="flex flex-col h-full hover:-translate-y-1 transition-transform duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
            {project.title}
          </h3>
          <span className="text-xs font-mono text-slate-500 mt-1 block">
            {project.timeframe}
          </span>
        </div>
        {project.featured && (
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-300 bg-indigo-500/10 rounded-full border border-indigo-500/20">
                Featured
            </span>
        )}
      </div>

      <p className="text-sm text-slate-400 mb-6 flex-grow leading-relaxed">
        {project.summary}
      </p>

      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs font-medium text-slate-300 bg-white/5 rounded-md border border-white/5"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex flex-wrap gap-4 pt-2 border-t border-white/5">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-300 hover:text-white transition-colors group/link"
            >
              <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </Card>
  );
}
