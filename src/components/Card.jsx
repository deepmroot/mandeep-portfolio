import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-xl hover:shadow-indigo-500/10 ${className}`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      {children}
    </div>
  );
}
