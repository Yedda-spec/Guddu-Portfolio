import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import profile from "../data/profile.json";
import { driveEmbedUrl, driveThumbnailUrl } from "../lib/drive";

const rotations = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5];

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
      <path d="M8 5v14l11-7-11-7z" />
    </svg>
  );
}

const GithubIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
);

function CaseStudyCard({ item, index, onOpen }) {
  return (
    <motion.button
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="text-left w-full rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
    >
      <div className="w-full aspect-video bg-neutral-50 flex items-center justify-center">
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center border-b border-black/10">
            <span className="text-xs uppercase tracking-wide text-black/30 px-4 text-center">
              Add screenshot
            </span>
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="font-serif text-lg leading-tight mb-0.5">{item.title}</p>
        {item.subtitle && <p className="text-xs text-black/40 mb-3">{item.subtitle}</p>}
        {item.summary && (
          <p className="text-sm text-black/60 leading-relaxed mb-3 line-clamp-2">{item.summary}</p>
        )}
        <span className="text-xs font-medium text-emerald-700 inline-flex items-center gap-1">
          View case study
          <span aria-hidden>&rarr;</span>
        </span>
      </div>
    </motion.button>
  );
}

function PosterCard({ item, index, onOpen }) {
  const rotate = rotations[index % rotations.length];
  const thumb = item.link ? driveThumbnailUrl(item.link) : "";

  return (
    <motion.button
      onClick={() => onOpen(item)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="text-left w-full"
      style={{
        transform: `rotate(${rotate}deg)`,
      }}
    >
      <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden shadow-lg relative bg-neutral-100 transition-transform hover:-translate-y-1">
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center border-2 border-dashed border-black/15">
            <span className="text-xs uppercase tracking-wide text-black/30 px-4 text-center">
              {item.title}
            </span>
          </div>
        )}
        {thumb && (
          <div className="absolute top-3 left-3 right-3 aspect-video rounded-lg overflow-hidden shadow-md">
            <img src={thumb} alt="" className="w-full h-full object-cover" />
            {item.type === "video" && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-10 h-10 rounded-full bg-black/50 flex items-center justify-center">
                  <PlayIcon />
                </div>
              </div>
            )}
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white font-serif text-lg leading-tight">{item.title}</p>
          {item.subtitle && <p className="text-white/70 text-xs mt-0.5">{item.subtitle}</p>}
        </div>
      </div>
    </motion.button>
  );
}

function CaseStudyModal({ item, onClose }) {
  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.9, opacity: 0 }}
      onClick={(e) => e.stopPropagation()}
      className="w-[92vw] max-w-lg max-h-[85vh] overflow-y-auto bg-white rounded-2xl relative"
    >
      <div className="w-full aspect-video bg-neutral-100">
        {item.image ? (
          <img src={item.image} alt={item.title} className="w-full h-full object-cover object-top" />
        ) : (
          <div className="w-full h-full flex items-center justify-center border-b border-black/10">
            <span className="text-xs uppercase tracking-wide text-black/30">Add screenshot</span>
          </div>
        )}
      </div>

      <div className="p-6 md:p-8">
        <p className="font-serif text-2xl mb-1">{item.title}</p>
        {item.subtitle && <p className="text-xs text-black/40 mb-4">{item.subtitle}</p>}

        {item.summary && (
          <p className="text-sm text-black/70 leading-relaxed mb-5">{item.summary}</p>
        )}

        {item.bullets && (
          <ul className="space-y-2 mb-5">
            {item.bullets.map((b, i) => (
              <li key={i} className="text-sm text-black/60 leading-relaxed flex gap-2">
                <span className="text-emerald-600 mt-1">&bull;</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        )}

        {item.tools && (
          <div className="flex flex-wrap gap-2 mb-6">
            {item.tools.map((t) => (
              <span
                key={t}
                className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1"
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {item.github && (
          <a
            href={item.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium bg-black text-white rounded-full px-5 py-2.5 hover:bg-black/85 transition-colors"
          >
            <GithubIcon />
            View on GitHub
          </a>
        )}
      </div>

      <button
        onClick={onClose}
        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-black"
      >
        ×
      </button>
    </motion.div>
  );
}

function CraftModal({ item, onClose }) {
  if (!item) return null;

  if (item.type === "case-study") {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
        >
          <CaseStudyModal item={item} onClose={onClose} />
        </motion.div>
      </AnimatePresence>
    );
  }

  const hasLink = Boolean(item.link);
  const isVertical = item.vertical !== false;

  let boxClass = "w-[90vw] max-w-sm aspect-[9/16]";
  if (item.type === "pdf") boxClass = "w-[90vw] max-w-md aspect-[3/4]";
  else if (!isVertical) boxClass = "w-[90vw] max-w-3xl aspect-video";

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] bg-black/80 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className={`${boxClass} bg-black rounded-xl overflow-hidden relative`}
        >
          {hasLink ? (
            <iframe
              src={driveEmbedUrl(item.link)}
              className="w-full h-full"
              allow="autoplay"
              title={item.title}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/60 text-sm px-6 text-center">
              Coming soon.
            </div>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-black"
          >
            ×
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function CraftGallery() {
  const [active, setActive] = useState(null);

  return (
    <div className="relative py-20">
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-4xl md:text-7xl px-6 md:px-16 mb-10"
      >
        Craft I&rsquo;m proud of
      </motion.h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-6 md:px-16">
        {profile.craftItems.map((item, i) =>
          item.type === "case-study" ? (
            <CaseStudyCard key={item.id} item={item} index={i} onOpen={setActive} />
          ) : (
            <PosterCard key={item.id} item={item} index={i} onOpen={setActive} />
          )
        )}
      </div>
      <CraftModal item={active} onClose={() => setActive(null)} />
    </div>
  );
}
