import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import profile from "../data/profile.json";

const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.34-.02-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.96V21H9z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z"/>
  </svg>
);

const links = (resumeLink) => [
  { href: "#about", label: "About" },
  { href: "#craft", label: "Craft" },
  { href: "#experience", label: "Experience" },
  ...(resumeLink ? [{ href: resumeLink, label: "Portfolio", external: true }] : []),
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const navLinks = links(profile.resumeLink);

  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 md:px-8 h-16 flex items-center justify-between">
        <a href="#hero" className="font-serif text-2xl font-semibold tracking-tight">
          {profile.name.split(" ")[0]}
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-[Inter] text-black/70">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noreferrer" : undefined}
              className="hover:text-black transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a href={`tel:${profile.phone}`} className="text-black/60 hover:text-black transition-colors" aria-label="Phone">
            <PhoneIcon />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="text-black/60 hover:text-black transition-colors"
            aria-label="LinkedIn"
          >
            <LinkedInIcon />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="text-black/60 hover:text-black transition-colors"
            aria-label="GitHub"
          >
            <GithubIcon />
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-black text-white text-sm font-medium px-5 py-2.5 hover:bg-black/85 transition-colors"
          >
            Let&rsquo;s talk
          </a>
        </div>

        <button
          className="md:hidden p-2 -mr-2"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <div className="w-6 flex flex-col gap-1.5">
            <span className={`h-0.5 bg-black transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`h-0.5 bg-black transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`h-0.5 bg-black transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-black/5 bg-white"
          >
            <div className="flex flex-col px-5 py-4 gap-4 text-sm">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="text-black/70"
                >
                  {l.label}
                </a>
              ))}
              <a href={`tel:${profile.phone}`} className="text-black/70">Call</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="text-black/70">
                LinkedIn
              </a>
              <a href={profile.github} target="_blank" rel="noreferrer" className="text-black/70">
                GitHub
              </a>
              <a href={`mailto:${profile.email}`} className="text-black/70">Email</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
