import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import profile from "../data/profile.json";
import { driveEmbedUrl } from "../lib/drive";

const rotations = [-3, 2, -2, 3];

function PaperclipIcon() {
  return (
    <svg width="22" height="34" viewBox="0 0 22 34" fill="none" stroke="currentColor" strokeWidth="1.6" className="text-black/30">
      <path d="M17 8v14a6 6 0 0 1-12 0V6a4 4 0 0 1 8 0v14a2 2 0 0 1-4 0V9" strokeLinecap="round" />
    </svg>
  );
}

function TestimonialModal({ item, onClose }) {
  if (!item) return null;
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
          className="w-[90vw] max-w-sm aspect-[9/16] bg-black rounded-xl overflow-hidden relative"
        >
          {item.link ? (
            <iframe src={driveEmbedUrl(item.link)} className="w-full h-full" allow="autoplay" title={item.name} />
          ) : item.photo ? (
            <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/60 text-sm px-6 text-center">
              Video for {item.name} coming soon.
            </div>
          )}
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center text-black">
            ×
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

function TestimonialRow({ item, index, onOpen }) {
  const rotate = rotations[index % rotations.length];
  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 p-6 rounded-3xl bg-neutral-50 border border-black/5">
      <button onClick={() => onOpen(item)} className="shrink-0 relative" style={{ transformOrigin: "top center" }}>
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <PaperclipIcon />
        </div>
        <motion.div
          animate={{ rotate: [rotate - 3, rotate + 3, rotate - 3] }}
          transition={{
            duration: 4.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.6,
          }}
          style={{ transformOrigin: "top center" }}
        >
          <div className="w-28 h-40 rounded-lg overflow-hidden shadow-lg bg-white border border-black/5">
            {item.link ? (
              <iframe
                src={driveEmbedUrl(item.link)}
                className="w-full h-full pointer-events-none"
                tabIndex={-1}
                title={item.name}
              />
            ) : item.photo ? (
              <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[10px] text-black/30 text-center px-2">
                Video coming soon
              </div>
            )}
          </div>
          <p className="mt-2 text-center text-lg" style={{ fontFamily: "'Caveat', cursive" }}>
            {item.name}
          </p>
          <p className="text-center text-xs text-black/40">{item.role}</p>
        </motion.div>
      </button>

      <div className="flex-1 rounded-2xl bg-white shadow-sm border border-black/5 p-6">
        <p className="text-xl sm:text-2xl text-black/80" style={{ fontFamily: "'Caveat', cursive" }}>
          &ldquo;{item.quote}&rdquo;
        </p>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="py-24 px-6 md:px-16"
    >
      <div className="max-w-2xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-3">
          <span>&#9670;</span>
          <span>Testimonials</span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl mb-4">What people say about me</h2>
        <p className="text-black/50 font-[Inter]">
          A few words from people I&rsquo;ve turned data into decisions for.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {profile.testimonials.map((item, i) => (
          <TestimonialRow key={item.id} item={item} index={i} onOpen={setActive} />
        ))}
      </div>

      <TestimonialModal item={active} onClose={() => setActive(null)} />
    </motion.div>
  );
}
