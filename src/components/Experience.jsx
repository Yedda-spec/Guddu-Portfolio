import { motion } from "framer-motion";

const experience = [
  {
    company: "Indira Gandhi National Open University (IGNOU)",
    title: "Bachelor's Program",
    date: "Jan 2022 — Dec 2024",
    position: "top",
    logoClass: "bg-neutral-700",
    logo: "I",
    bullets: [
      "Built a foundation in **statistics and data analysis** through the degree program.",
      "Developed strong **analytical thinking** and structured problem-solving skills.",
    ],
  },
  {
    company: "Accenture",
    title: "Technical Associate",
    date: "2024",
    position: "bottom",
    logoClass: "bg-purple-700",
    logo: "A",
    bullets: [
      "Collaborated on **end-to-end resolution** of technical support tickets, contributing to workflow documentation.",
      "Diagnosed **system issues** and managed client data with internal tools, while contributing to process improvement.",
      "Streamlined **ticket handling and escalation processes**, leading to faster resolution times and improved efficiency.",
    ],
  },
  {
    company: "WebAccuracy",
    title: "Data Analyst",
    date: "Jul 2025 — Dec 2025",
    position: "top",
    logoClass: "bg-emerald-600",
    logo: "W",
    bullets: [
      "Analyzed and cleaned **large datasets** to identify trends, patterns, and inconsistencies for reporting.",
      "Built and maintained **reports and dashboards** to track key metrics for internal stakeholders.",
      "Used **SQL and Excel** to query, organize, and summarize data for accurate, timely decision-making.",
    ],
  },
  {
    company: "Certifications",
    title: "Achievements",
    date: "Dec 2024",
    position: "bottom",
    logoClass: "bg-neutral-800",
    logo: "C",
    bullets: [
      "**SQL Certification** — Certified in SQL for data querying and analysis.",
      "**Experience Certificate** — Awarded by WebAccuracy for role as Data Analyst.",
    ],
  },
];

function renderBold(text) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-semibold text-black">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function ExperienceCard({ entry, index = 0, showDate = false }) {
  const pivot = entry.position === "top" ? "bottom center" : "top center";
  return (
    <motion.div
      animate={{ rotate: [-4, 4, -4], x: [-6, 6, -6] }}
      transition={{
        duration: 4 + (index % 3) * 0.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: index * 0.5,
      }}
      style={{ transformOrigin: pivot }}
      className="w-full rounded-2xl bg-white shadow-md border border-black/5 p-6"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-9 h-9 rounded-lg ${entry.logoClass} text-white flex items-center justify-center font-serif font-semibold shrink-0`}>
          {entry.logo}
        </div>
        <div>
          <p className="font-semibold text-sm leading-tight">{entry.title}</p>
          <p className="text-xs text-black/50">{entry.company}</p>
        </div>
      </div>
      {showDate && (
        <div className="rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium px-4 py-1.5 w-fit mb-3">
          {entry.date}
        </div>
      )}
      <ul className="space-y-2">
        {entry.bullets.map((b, i) => (
          <li key={i} className="text-xs text-black/60 leading-relaxed flex gap-2">
            <span className="text-emerald-600 mt-0.5">&bull;</span>
            <span>{renderBold(b)}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function DatePill({ date }) {
  return (
    <div className="rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-medium px-4 py-1.5 w-fit">
      {date}
    </div>
  );
}

function HangingTimeline() {
  return (
    <div
      className="grid gap-x-6"
      style={{
        gridTemplateColumns: `repeat(${experience.length}, 1fr)`,
        gridTemplateRows: "auto auto auto auto auto",
      }}
    >
      {experience.map((entry, i) => (
        <div key={entry.company} style={{ gridColumn: i + 1, gridRow: 1 }} className="flex items-end justify-center px-1 pb-6">
          {entry.position === "top" ? <ExperienceCard entry={entry} index={i} /> : <DatePill date={entry.date} />}
        </div>
      ))}
      {experience.map((_, i) => (
        <div key={`c1-${i}`} style={{ gridColumn: i + 1, gridRow: 2 }} className="h-6 flex justify-center">
          <div className="w-px bg-neutral-300 h-full" />
        </div>
      ))}
      <div style={{ gridColumn: "1 / -1", gridRow: 3 }} className="relative h-px bg-neutral-300">
        {experience.map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 border-emerald-500"
            style={{ left: `calc(${(i + 0.5) * (100 / experience.length)}% - 6px)` }}
          />
        ))}
      </div>
      {experience.map((_, i) => (
        <div key={`c2-${i}`} style={{ gridColumn: i + 1, gridRow: 4 }} className="h-6 flex justify-center">
          <div className="w-px bg-neutral-300 h-full" />
        </div>
      ))}
      {experience.map((entry, i) => (
        <div key={`${entry.company}-b`} style={{ gridColumn: i + 1, gridRow: 5 }} className="flex items-start justify-center px-1 pt-6">
          {entry.position === "bottom" ? <ExperienceCard entry={entry} index={i} /> : <DatePill date={entry.date} />}
        </div>
      ))}
    </div>
  );
}

export default function Experience() {
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
          <span>Experience</span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl mb-4">The journey so far</h2>
        <p className="text-black/50 font-[Inter]">
          A few years, a lot of queries, and dashboards that people actually check.
        </p>
      </div>

      <div className="hidden lg:block max-w-7xl mx-auto">
        <HangingTimeline />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:hidden max-w-3xl mx-auto gap-6">
        {experience.map((entry, i) => (
          <ExperienceCard key={entry.company} entry={entry} index={i} showDate />
        ))}
      </div>
    </motion.div>
  );
}
