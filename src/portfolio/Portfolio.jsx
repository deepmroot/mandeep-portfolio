import React from "react";
import { motion } from "framer-motion";
import { Github, Mail, Link as LinkIcon, ExternalLink, ArrowRight, BadgeCheck } from "lucide-react";

const HERO="/hero.jpg";
const LINKS={ github:"https://github.com/deepmroot", linkedin:"https://www.linkedin.com/in/mandeep-singh-b855972a7/", email:"mailto:mandeepsinghwani@gmail.com"};

function Card({children,className=""}){
  return(<div className={`group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md shadow-[0_0_0_1px_rgba(255,255,255,0.04)] ${className}`}>
    <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    {children}
  </div>);
}

const projects=[
 {title:"BudgetBuddy – Mobile Finance App",timeframe:"2024 – Present",summary:"Student‑first expense tracker (Android/Java) with Google Sign‑In, biometrics, SQLite + Firebase sync, and polished UI.",tags:["Android","Java","SQLite","Firebase","Auth"],links:[{label:"Repo",href:LINKS.github},{label:"Demo",href:"#"}]},
 {title:"Hypershape Canada – 3D Printing & E‑commerce",timeframe:"2024 – Present",summary:"Shopify storefront for 3D‑printed décor; designed interactive assets and embedded NFC for post‑purchase experiences.",tags:["Shopify","NFC","Brand","3D Print"],links:[{label:"Store",href:"#"}, {label:"Instagram",href:"#"}]},
 {title:"Freelance Web – School & Community Sites",timeframe:"2022 – Present",summary:"Custom WordPress/CMS builds incl. a Croatian school site (Tara One); trained staff to self‑publish multimedia content.",tags:["WordPress","CMS","Accessibility"],links:[{label:"Live Example",href:"#"}]},
 {title:"VR Indoor Tour Website (TRU – COMP 2920)",timeframe:"2023 – Current",summary:"Immersive 360° exploration using React + A‑Frame/Three.js; supports guided learning and discovery.",tags:["React","A‑Frame","Three.js","UX"],links:[{label:"Repo",href:"#"}]},
 {title:"AI Image → 3D Conversion Prototype",timeframe:"2025",summary:"Pipeline that turns 2D images into printable 3D meshes (Hanyuan3D wrapper). Targeted ~92% match on test set.",tags:["AI","3D Mesh","Python"],links:[{label:"Demo",href:"#"}, {label:"Write‑up",href:"#"}]},
];

const skills=[["Moodle","WordPress","MediaWiki","Kaltura","Pressbooks"],["HTML/CSS","PHP","Java","JavaScript","Android (Java)","SQLite","Firebase"],["Photoshop","Canva","OBS","VR/AR (A‑Frame, Three.js)","Bambu Lab (3D Print)"],["AWS CCP","Firebase Hosting","Basic CI/CD","CompTIA Security+"]];

export default function Portfolio(){
  return(<main className="min-h-screen bg-[#0a0b10] text-slate-200">
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="absolute -top-32 -left-24 h-96 w-96 rounded-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.35),transparent_60%)] blur-3xl" />
      <div className="absolute -bottom-24 -right-24 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.35),transparent_60%)] blur-3xl" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06]" />
    </div>

    <header className="mx-auto max-w-7xl px-6 py-6 flex items-center justify-between">
      <a href="#" className="text-sm font-semibold tracking-wide text-slate-300">Mandeep Singh</a>
      <nav className="hidden sm:flex gap-6 text-sm text-slate-400">
        <a href="#projects" className="hover:text-white">Projects</a>
        <a href="#skills" className="hover:text-white">Skills</a>
        <a href="#education" className="hover:text-white">Education</a>
      </nav>
      <div className="flex gap-3">
        <a href={LINKS.email} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"><Mail className="h-4 w-4" /> Contact</a>
        <a href={LINKS.github} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-gradient-to-r from-indigo-500/80 to-fuchsia-500/80 px-4 py-2 text-sm font-medium text-white shadow hover:from-indigo-400/90 hover:to-fuchsia-400/90"><Github className="h-4 w-4" /> GitHub</a>
      </div>
    </header>

    <section className="mx-auto max-w-7xl px-6 pb-10 pt-8">
      <div className="grid gap-10 lg:grid-cols-2 items-center">
        <div>
          <motion.h1 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.6}} className="text-5xl sm:text-6xl font-bold tracking-tight">
            Hello, I’m <span className="bg-gradient-to-r from-indigo-400 via-sky-300 to-fuchsia-400 bg-clip-text text-transparent">Mandeep</span>.
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.05}} className="mt-4 text-lg text-slate-300/90">
            A Computing Science student at TRU building user‑centered tools for learning — from mobile apps and CMS sites to VR experiences and AI‑assisted 3D workflows.
          </motion.p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#projects" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium hover:bg-white/10">Explore Projects <ArrowRight className="h-4 w-4"/></a>
            <a href="#education" className="inline-flex items-center gap-2 rounded-2xl border border-white/10 px-5 py-2.5 text-sm font-medium bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow hover:from-indigo-400 hover:to-fuchsia-400">Resume Highlights <BadgeCheck className="h-4 w-4"/></a>
          </div>
        </div>

        <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} transition={{duration:0.7}} className="relative h-80 w-full flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-[conic-gradient(from_180deg_at_50%_50%,#7c3aed33,#22d3ee33,#ec489933,#7c3aed33)] blur-2xl"/>
            <div className="relative rounded-[1.75rem] border border-white/15 bg-white/5 p-1 backdrop-blur-md shadow-2xl">
              <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-white/10"/>
              <div className="relative overflow-hidden rounded-[1.5rem] transform-gpu will-change-transform transition hover:rotate-[-1deg] hover:scale-[1.01]">
                <img src={HERO} alt="Mandeep Singh hiking portrait" loading="lazy" className="h-72 w-72 object-cover select-none"/>
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/30 to-transparent"/>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"/>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    <section id="projects" className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <a className="text-sm text-slate-400 hover:text-white" href={LINKS.github}>See all on GitHub</a>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map(p=> (<Card key={p.title}>
          <div className="flex items-baseline justify-between"><h3 className="text-lg font-semibold">{p.title}</h3><span className="text-xs text-slate-400">{p.timeframe}</span></div>
          <p className="mt-2 text-sm text-slate-300/90">{p.summary}</p>
          <div className="mt-3 flex flex-wrap gap-2">{p.tags.map(t=> (<span key={t} className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs text-slate-300">{t}</span>))}</div>
          <div className="mt-4 flex flex-wrap gap-3 text-sm">{p.links.map(l=> (<a key={l.label} href={l.href} className="inline-flex items-center gap-1 text-slate-300 hover:text-white"><ExternalLink className="h-3 w-3"/> {l.label}</a>))}</div>
        </Card>))}
      </div>
    </section>

    <section id="skills" className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="text-2xl font-semibold">Skills</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {skills.map((col,i)=> (<Card key={i}><ul className="space-y-2 text-sm text-slate-300">{col.map(s=> (<li key={s} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-slate-400"/> {s}</li>))}</ul></Card>))}
      </div>
    </section>

    <section id="education" className="mx-auto max-w-7xl px-6 py-10">
      <h2 className="text-2xl font-semibold">Education & Certifications</h2>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Card><h3 className="text-lg font-semibold">Bachelor of Computing Science (BCompSc)</h3><p className="mt-1 text-sm text-slate-400">Thompson Rivers University — 2023–Present</p><ul className="mt-3 space-y-1 text-sm text-slate-300"><li>Relevant: HCI, Software Architecture & Design, Web Dev, Databases, Digital Media, Educational Technology</li><li>Co‑op Program Participant</li></ul></Card>
        <Card><h3 className="text-lg font-semibold">Certifications</h3><ul className="mt-3 space-y-1 text-sm text-slate-300"><li>AWS Cloud Practitioner (2021)</li><li>CompTIA Security+ (2019)</li></ul></Card>
      </div>
    </section>

    <footer className="mx-auto max-w-7xl px-6 pb-16 pt-4">
      <Card className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div><div className="text-lg font-semibold">Let’s collaborate</div><p className="text-sm text-slate-400">Open to co‑op, internships, and freelance work in learning tech & web/mobile dev.</p></div>
        <div className="flex flex-wrap gap-3">
          <a href={LINKS.email} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"><Mail className="h-4 w-4"/> Email</a>
          <a href={LINKS.github} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"><Github className="h-4 w-4"/> GitHub</a>
          <a href={LINKS.linkedin} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm hover:bg-white/10"><LinkIcon className="h-4 w-4"/> LinkedIn</a>
        </div>
      </Card>
      <p className="mt-6 text-center text-xs text-slate-500">© {new Date().getFullYear()} Mandeep Singh. Built with React • Tailwind • Framer Motion.</p>
    </footer>
  </main>);
}