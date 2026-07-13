# AGENTS.md — mandeep-portfolio

Design spec + working rules. Follow always, no need to re-ask.

## Design system (brandappart.com-inspired, warm editorial — NOT dark neon)

- Colors: paper `#fbf9ef`, panel `#f2f0e7`, ink `#171412`, warm gray `#8e827c`, red accent `#ff3c34`, amber `#ffc765`.
- Fonts: display = Bricolage Grotesque, mono = IBM Plex Mono, body = Roboto.
- Active theme: `src/appart-theme/Portfolio.jsx` (single file, all sections). Old cyan/neon theme deleted — don't resurrect.
- Rail nav: `.rail` classes in `src/index.css`, dock-magnify hover, `font-size: clamp(15px,1.1vw,19px)` drives whole scale. Icons: Phosphor Fill (`weight="fill"`), not lucide (too thin).
- Project cards: corner badge top-left, `bg-[#171412]/80 backdrop-blur-md`, title bold white + type/year stacked mono white/60.
- Motion: Lenis smooth scroll + GSAP ScrollTrigger. `Reveal` component has two modes — `onView` (IntersectionObserver, scroll-triggered) and default (mount-triggered). **Prefer mount-triggered for anything rendered right after a GSAP `pin:true` section** — `onView` reveals reliably fail to fire there (timing race), text stays clipped invisible.

## Known CSS/JS traps (don't reintroduce)

- **Aspect-ratio + max-height/width collision**: never set both an explicit cross-axis size (`max-h-[100svh]`) and `aspect-video` — pick ONE authoritative axis (`h-full` + `aspect-video` + `max-w-full`), else browser resolves both and `object-cover` crops content.
- **Marquee logos**: use real transparent-bg assets (source from each product's own repo), never grayscale/multiply-blend a logo with baked-in opaque background — turns solid black.
- **Marquee loop snap**: all marquee images `loading="eager"`, never `lazy` — lazy-loading the duplicated half mid-cycle shifts track width and breaks the `-50%` wrap point.
- **Verification**: never trust artificially tall headless-window screenshots (e.g. `--window-size=1440,14000`) to check GSAP pin sections — tall viewports break percentage-based `end: "+=120%"` pin math and produce false blank screenshots. Use Playwright with real incremental `page.mouse.wheel()` scroll + `window.scrollY` polling instead (see scratchpad `scroll-shot*.js` pattern).

## Deploy

- GitHub Actions → Vercel, project `mandeeps-projects-3d1f5aae/mandeep-portfolio`.
- **Always `git push origin main` explicitly** — local `main` tracks a different remote (`new-origin` → deepmroot/portfolio), bare `git push` goes to the wrong place.
- No `pnpm-lock.yaml` in repo — npm/package-lock.json is canonical; a stray pnpm lockfile breaks `vercel build` (`spawn pnpm ENOENT`).
- Verify deploys with `gh run watch`, not just "it built locally."

## Content facts (don't invent)

- User: Mandeep Singh, Systems Analyst at City of Merritt (started June 1 2026), alongside BCS Computing Science at TRU (expected 2026, CGPA 4.0).
- Real products live: InferenceSaver, RentSpace, SyntaxArk, Generic Alternatives, PromptLine, QuickTest AI, BecomeAfish.
- City of Merritt "NOW" row description text is a placeholder guess — confirm real duties with user before treating as fact.
