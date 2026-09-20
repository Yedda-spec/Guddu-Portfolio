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
          <p className="text-white font-serif text-lg">{item.title}</p>
        </div>
      </div>
    </motion.button>
  );
}

function CraftModal({ item, onClose }) {
  if (!item) return null;
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
        {profile.craftItems.map((item, i) => (
          <PosterCard key={item.id} item={item} index={i} onOpen={setActive} />
        ))}
      </div>
      <CraftModal item={active} onClose={() => setActive(null)} />
    </div>
  );
}
