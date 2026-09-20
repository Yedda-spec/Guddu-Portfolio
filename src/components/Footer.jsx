import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import profile from "../data/profile.json";

const rotatingWords = ["analyze", "visualize", "decide"];

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

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m2 6 10 7 10-7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FileIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
  </svg>
);

export default function Footer() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % rotatingWords.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  const firstName = profile.name.split(" ")[0];
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-emerald-700">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://res.cloudinary.com/im8pkdqg/image/upload/v1789829015/Gemini_Generated_Image_wessecwessecwess.png)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(16,90,60,0.15), rgba(16,90,60,0.35), rgba(6,60,40,0.55), rgba(4,40,28,0.75))",
        }}
      />

      <div className="relative z-10 px-6 md:px-16 pt-24 pb-10">
        <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight max-w-3xl">
          lets{" "}
          <span
            className="inline-block relative align-baseline overflow-hidden"
            style={{ width: "5.5ch", height: "1.1em" }}
          >
            <AnimatePresence mode="popLayout">
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 italic"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </span>{" "}
          incredible work together.
        </h2>

        <div className="mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wide mb-2">Email</p>
            <a href={`mailto:${profile.email}`} className="text-white text-lg font-[Inter] hover:underline">
              {profile.email}
            </a>
          </div>
          <div>
            <p className="text-white/60 text-xs uppercase tracking-wide mb-3">Social</p>
            <div className="flex items-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="LinkedIn"
              >
                <LinkedInIcon />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="GitHub"
              >
                <GithubIcon />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center hover:scale-105 transition-transform"
                aria-label="Email"
              >
                <MailIcon />
              </a>
              {profile.resumeLink && (
                <a
                  href={profile.resumeLink}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-white text-emerald-700 flex items-center justify-center hover:scale-105 transition-transform"
                  aria-label="Resume"
                >
                  <FileIcon />
                </a>
              )}
            </div>
          </div>
        </div>

        <p className="mt-16 text-white/50 text-xs font-[Inter]">
          &copy; {year} {profile.name}
        </p>
      </div>

      <div className="relative z-10 pb-4 overflow-hidden">
        <p
          className="text-white/25 uppercase font-serif font-bold text-center leading-none select-none"
          style={{ fontSize: "clamp(5rem, 18vw, 14rem)", mixBlendMode: "overlay" }}
        >
          {firstName}
        </p>
      </div>
    </footer>
  );
}
