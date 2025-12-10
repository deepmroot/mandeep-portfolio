import React from 'react';

export function Footer() {
  return (
    <footer className="py-8 text-center text-slate-500 text-sm border-t border-white/5 bg-[#0a0b10]">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Mandeep Singh</p>
            <p>Built with React, Tailwind & Framer Motion</p>
        </div>
    </footer>
  );
}
