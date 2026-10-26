import { motion } from "framer-motion";
import { TechStackMarquee } from "../lib/techStack";

const CodeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="m8 6-6 6 6 6M16 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M7 15 11 10l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 20V10M18 20V4M6 20v-4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const FlaskIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 2v6L3.5 18a2 2 0 0 0 1.8 3h13.4a2 2 0 0 0 1.8-3L15 8V2M9 2h6M8 14h8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const SKILL_GROUPS = [
  {
    title: "Programming & Querying",
    icon: CodeIcon,
    tone: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200" },
    items: ["Python", "SQL", "PostgreSQL", "Snowflake", "CTEs & Window Functions", "C", "C++", "Java (coursework)"],
  },
  {
    title: "Data & ML Libraries",
    icon: ChartIcon,
    tone: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200" },
    items: ["pandas", "NumPy", "scikit-learn", "Matplotlib", "Seaborn", "Plotly"],
  },
  {
    title: "BI & Visualisation",
    icon: BarChartIcon,
    tone: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200" },
    items: ["Power BI (DAX)", "Tableau", "Excel (Pivot Tables, Dashboards)", "Google Sheets"],
  },
  {
    title: "Methods",
    icon: FlaskIcon,
    tone: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200" },
    items: ["Data Cleaning", "Exploratory Data Analysis", "Time-Series Analysis", "Regression", "Statistical Analysis"],
  },
];

const MARQUEE_TOOLS = [
  "Python",
  "SQL",
  "PostgreSQL",
  "Snowflake",
  "C",
  "C++",
  "Java",
  "pandas",
  "NumPy",
  "scikit-learn",
  "Matplotlib",
  "Seaborn",
  "Plotly",
  "Power BI",
  "Tableau",
  "Excel",
  "Google Sheets",
];

function SkillCard({ group, index }) {
  const Icon = group.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-9 h-9 rounded-lg ${group.tone.bg} ${group.tone.text} flex items-center justify-center`}>
          <Icon />
        </div>
        <h3 className="font-serif text-lg">{group.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className={`text-xs font-medium ${group.tone.text} ${group.tone.bg} border ${group.tone.border} rounded-full px-3 py-1.5`}
          >
            {item}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <div className="py-24 px-6 md:px-16">
      <div className="max-w-2xl mx-auto text-center mb-16">
        <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-3">
          <span>&#9670;</span>
          <span>Skills</span>
        </div>
        <h2 className="font-serif text-4xl md:text-5xl mb-4">What I bring to the table</h2>
        <p className="text-black/50 font-[Inter]">
          The languages, libraries and tools behind every dashboard and dataset.
        </p>
      </div>

      <div className="mb-14">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-emerald-600 mb-6">
          <span>&#9670;</span>
          <span>Tech Stack</span>
        </div>
        <TechStackMarquee tools={MARQUEE_TOOLS} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {SKILL_GROUPS.map((group, i) => (
          <SkillCard key={group.title} group={group} index={i} />
        ))}
      </div>
    </div>
  );
}
