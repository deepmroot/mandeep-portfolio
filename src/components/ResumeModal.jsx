import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Send, FileText } from "lucide-react";
import { LINKS } from "../data/projects";

export function ResumeModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 bg-[#0a0b10]/90 backdrop-blur-xl"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-5xl h-full bg-[#0d0e14] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-black/20">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">MANDEEP_SINGH_RESUME.pdf</h3>
                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Type: Technical_Profile // Version: 2025.1</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <a 
                  href={LINKS.resume} 
                  download
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all text-xs font-bold"
                >
                  <Download className="w-3.5 h-3.5" /> Download
                </a>
                <a 
                  href={`mailto:?subject=Mandeep Singh - Software Engineer Resume&body=Hi,%0D%0A%0D%0AI thought you might be interested in Mandeep Singh's technical profile. You can view his full portfolio here: ${window.location.origin}%0D%0A%0D%0ADirect Resume Link: ${window.location.origin}${LINKS.resume}`}
                  className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-500 transition-all text-xs font-bold"
                >
                  <Send className="w-3.5 h-3.5" /> Forward
                </a>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-white/5 text-slate-400 hover:text-white transition-all ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* PDF Viewer Body */}
            <div className="flex-grow bg-[#050608] relative overflow-hidden flex items-center justify-center">
              <iframe 
                src={`${LINKS.resume}#view=FitH&scrollbar=1&toolbar=1&navpanes=0`}
                className="absolute inset-0 w-full h-full border-none bg-white"
                title="Mandeep Singh Resume"
              />
              <div className="absolute inset-0 flex items-center justify-center -z-10">
                <div className="flex flex-col items-center gap-4">
                  <div className="w-12 h-12 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin" />
                  <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">Initialising_PDF_Stream...</p>
                </div>
              </div>
            </div>

            {/* Mobile Footer Actions */}
            <div className="sm:hidden grid grid-cols-2 gap-2 p-4 border-t border-white/10 bg-black/40">
                <a 
                  href={LINKS.resume} 
                  download
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-bold"
                >
                  <Download className="w-4 h-4" /> Download
                </a>
                <a 
                  href={`mailto:?subject=Mandeep Singh - Software Engineer Resume&body=Direct Resume Link: ${window.location.origin}${LINKS.resume}`}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white text-xs font-bold"
                >
                  <Send className="w-4 h-4" /> Forward
                </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
