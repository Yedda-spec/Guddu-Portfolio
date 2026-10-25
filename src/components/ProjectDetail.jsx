import { useParams, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import profile from "../data/profile.json";
import { TechStackMarquee } from "../lib/techStack";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="shrink-0 mt-0.5">
    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
    <path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function ProjectImage({ src, alt, placeholder }) {
  return (
    <div className="w-full aspect-video rounded-2xl overflow-hidden border border-black/10 bg-neutral-50 shadow-sm">
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover object-top" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <span className="text-xs uppercase tracking-wide text-black/30 px-4 text-center">
            {placeholder || "Add screenshot"}
          </span>
        </div>
      )}
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const item = profile.craftItems.find((c) => c.id === id);

  if (!item) return <Navigate to="/#craft" replace />;

  return (
    <div className="px-4 md:px-6 py-12 md:py-16 max-w-[90rem] mx-auto">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Link
          to="/#craft"
          className="inline-flex items-center gap-1.5 text-sm text-black/50 hover:text-black transition-colors mb-10"
        >
          <ArrowLeftIcon />
          Back to Projects
        </Link>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          {item.category && (
            <span className="text-xs font-medium text-black/60 border border-black/15 rounded-full px-3 py-1">
              {item.category}
            </span>
          )}
          {item.status && (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {item.status}
            </span>
          )}
        </div>

        <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-8">{item.title}</h1>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {item.role && (
            <div>
              <p className="text-xs uppercase tracking-wide text-black/40 mb-1">Role</p>
              <p className="text-sm font-medium">{item.role}</p>
            </div>
          )}
          {item.category && (
            <div>
              <p className="text-xs uppercase tracking-wide text-black/40 mb-1">Category</p>
              <p className="text-sm font-medium">{item.category}</p>
            </div>
          )}
          {item.status && (
            <div>
              <p className="text-xs uppercase tracking-wide text-black/40 mb-1">Status</p>
              <p className="text-sm font-medium text-emerald-700">{item.status}</p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3 mb-10">
          {item.liveLink && (
            <a
              href={item.liveLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium bg-black text-white rounded-full px-6 py-3 hover:bg-black/85 transition-colors"
            >
              Live Demo
            </a>
          )}
          {item.github && (
            <a
              href={item.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium border border-black/15 rounded-full px-6 py-3 hover:border-black/40 transition-colors"
            >
              <GithubIcon />
              View Code
            </a>
          )}
        </div>

        {item.summary && (
          <p className="text-base text-black/70 leading-relaxed max-w-2xl mb-14">{item.summary}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <ProjectImage src={item.image} alt={item.title} />
      </motion.div>

      {item.bullets && item.bullets.length > 0 && (
        <div className="mb-16">
          <p className="text-xs uppercase tracking-wide text-black/40 mb-1">Overview</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-6">Key features</h2>
          <div className="grid gap-3">
            {item.bullets.map((b, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex gap-3 items-start border border-black/10 rounded-xl px-5 py-4 bg-neutral-50"
              >
                <span className="text-emerald-600">
                  <CheckIcon />
                </span>
                <span className="text-sm text-black/70 leading-relaxed">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6 }}
        className="mb-16 max-w-4xl mx-auto"
      >
        <ProjectImage src={item.image2} alt={`${item.title} detail`} placeholder="More screenshots coming soon" />
      </motion.div>

      {item.tools && item.tools.length > 0 && (
        <div className="mb-24 md:mb-32 max-w-4xl mx-auto">
          <p className="text-xs uppercase tracking-wide text-black/40 mb-1">Built with</p>
          <h2 className="font-serif text-2xl md:text-3xl mb-6">Tech stack</h2>
          <TechStackMarquee tools={item.tools} />
        </div>
      )}
    </div>
  );
}
