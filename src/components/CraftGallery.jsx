import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
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

function CaseStudyCard({ item, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        to={`/craft/${item.id}`}
        className="block text-left w-full rounded-2xl overflow-hidden bg-white border border-black/10 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all"
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
          <p className="font-serif text-2xl leading-tight mb-0.5">{item.title}</p>
          {item.subtitle && <p className="text-xs text-black/40 mb-3">{item.subtitle}</p>}
          {item.summary && (
            <p className="text-sm text-black/60 leading-relaxed mb-3 line-clamp-2">{item.summary}</p>
          )}
          <span className="text-xs font-medium text-emerald-700 inline-flex items-center gap-1">
            View case study
            <span aria-hidden>&rarr;</span>
          </span>
        </div>
      </Link>
    </motion.div>
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

  const scrollRef = useRef(null);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const [maxScroll, setMaxScroll] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start 15%", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxScroll]);

  useEffect(() => {
    const GAP = 32;

    const update = () => {
      if (!wrapperRef.current || !trackRef.current) return;

      const isMd = window.matchMedia("(min-width: 768px)").matches;
      const isLg = window.matchMedia("(min-width: 1024px)").matches;
      const padding = isMd ? 64 : 24;
      const visibleCards = isLg ? 3 : isMd ? 2 : 1;
      const wrapperWidth = wrapperRef.current.clientWidth;
      const nextCardWidth = Math.max(
        0,
        (wrapperWidth - padding * 2 - GAP * (visibleCards - 1)) / visibleCards
      );
      setCardWidth(nextCardWidth);

      requestAnimationFrame(() => {
        if (trackRef.current && wrapperRef.current) {
          setMaxScroll(Math.max(0, trackRef.current.scrollWidth - wrapperRef.current.clientWidth));
        }
      });
    };

    update();
    window.addEventListener("resize", update);

    let observer;
    if (typeof ResizeObserver !== "undefined" && trackRef.current) {
      observer = new ResizeObserver(update);
      observer.observe(trackRef.current);
    }

    document.fonts?.ready?.then(update);

    return () => {
      window.removeEventListener("resize", update);
      observer?.disconnect();
    };
  }, []);

  return (
    <div className="relative py-12 hero-grid-bg">
      <div
        aria-hidden
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-160 h-160 rounded-full bg-emerald-200/25 blur-[110px] pointer-events-none"
      />
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="font-serif text-4xl md:text-7xl px-6 md:px-16 mb-1"
      >
        Craft I&rsquo;m proud of
      </motion.h2>

      <div className="hidden sm:block">
        <div
          ref={scrollRef}
          style={{ height: `calc(85vh + ${maxScroll}px)` }}
          className="relative"
        >
          <div ref={wrapperRef} className="sticky top-[15vh] h-[85vh] flex items-center overflow-hidden">
            <motion.div
              ref={trackRef}
              style={{ x }}
              className="flex gap-8 px-6 md:px-16 shrink-0"
            >
              {profile.craftItems.map((item, i) => (
                <div
                  key={item.id}
                  className="shrink-0"
                  style={{ width: cardWidth ? `${cardWidth}px` : undefined }}
                >
                  {item.type === "case-study" ? (
                    <CaseStudyCard item={item} index={i} />
                  ) : (
                    <PosterCard item={item} index={i} onOpen={setActive} />
                  )}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      <div className="sm:hidden overflow-x-auto snap-x snap-mandatory px-6 pb-1">
        <div className="flex gap-4 w-max">
          {profile.craftItems.map((item, i) => (
            <div key={item.id} className="shrink-0 w-[78vw] max-w-xs snap-start">
              {item.type === "case-study" ? (
                <CaseStudyCard item={item} index={i} />
              ) : (
                <PosterCard item={item} index={i} onOpen={setActive} />
              )}
            </div>
          ))}
        </div>
      </div>
      <CraftModal item={active} onClose={() => setActive(null)} />
    </div>
  );
}
