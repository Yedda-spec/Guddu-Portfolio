import { motion } from "framer-motion";
import profile from "../data/profile.json";

const GithubIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
);

function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="rounded-2xl bg-white shadow-md border border-black/5 overflow-hidden flex flex-col"
    >
      <div className="w-full aspect-video bg-neutral-100">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-black/15">
            <span className="text-xs uppercase tracking-wide text-black/30 px-4 text-center">
              Add screenshot
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="font-serif text-xl mb-1">{project.title}</p>
        <p className="text-xs text-black/40 mb-4">{project.subtitle}</p>

        <ul className="space-y-2 mb-4 flex-1">
          {project.bullets.map((b, i) => (
            <li key={i} className="text-sm text-black/60 leading-relaxed flex gap-2">
              <span className="text-emerald-600 mt-1">&bull;</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.tools.map((t) => (
            <span
              key={t}
              className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1"
            >
              {t}
            </span>
          ))}
        </div>

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-black hover:text-emerald-700 transition-colors w-fit"
          >
            <GithubIcon />
            View on GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <div className="py-24 px-6 md:px-16">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-3">
          <span>&#9670;</span>
          <span>Projects</span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl mb-4">Things I&rsquo;ve built</h2>
        <p className="text-black/50 font-[Inter]">
          Independent projects exploring data analysis, machine learning, and visualization.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {profile.projects.map((project, i) => (
          <ProjectCard key={project.id} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
