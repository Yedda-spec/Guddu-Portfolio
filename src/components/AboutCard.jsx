import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

const BG_IMAGE =
  "https://res.cloudinary.com/im8pkdqg/image/upload/v1789886762/ChatGPT_Image_Sep_20_2026_12_15_32_PM.png";

const paragraphs = [
  "Detail-oriented Data Analyst with hands-on experience turning raw data into clear, actionable insights.",
  "Skilled in SQL, Excel, and data visualization, with a strong foundation in statistical analysis and reporting.",
  "I've spent my time at WebAccuracy analyzing and cleaning large datasets, building dashboards, and delivering reports that stakeholders actually rely on.",
  "Committed to accuracy, structured problem-solving, and delivering data-driven recommendations that support business decisions.",
];

function AboutText() {
  return (
    <div className="relative z-10 max-w-3xl mx-auto px-6 text-center flex flex-col gap-6">
      {paragraphs.map((p, i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6, delay: i * 0.2 }}
          className={
            i === 0
              ? "font-[Playfair_Display] text-3xl md:text-5xl italic text-white leading-snug"
              : "text-base md:text-lg text-white/70 font-[Inter]"
          }
        >
          {p}
        </motion.p>
      ))}
    </div>
  );
}

export default function AboutCard() {
  const wrapperRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.85, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [32, 0]);

  if (reduceMotion) {
    return (
      <div className="relative h-screen overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BG_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55" />
        <div className="absolute inset-0 grain-overlay" />
        <div className="relative h-full flex items-center">
          <AboutText />
        </div>
      </div>
    );
  }

  return (
    <div ref={wrapperRef} style={{ height: "220vh" }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${BG_IMAGE})`, scale, borderRadius: radius }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55" />
        <div className="absolute inset-0 grain-overlay" />
        <div className="relative h-full flex items-center">
          <AboutText />
        </div>
      </div>
    </div>
  );
}
