import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  SiPython,
  SiPandas,
  SiNumpy,
  SiPostgresql,
  SiMysql,
  SiSnowflake,
  SiGooglesheets,
  SiScikitlearn,
  SiJavascript,
  SiReact,
  SiRedux,
  SiNodedotjs,
  SiFirebase,
  SiVite,
  SiC,
  SiCplusplus,
  SiOpenjdk,
  SiPlotly,
} from "react-icons/si";
import {
  FaDatabase,
  FaChartPie,
  FaChartBar,
  FaChartLine,
  FaChartArea,
  FaChartSimple,
  FaFileExcel,
  FaFileWord,
  FaTableColumns,
  FaBroom,
  FaShuffle,
  FaCss3Alt,
  FaPlane,
  FaAddressBook,
  FaLanguage,
} from "react-icons/fa6";

export const TECH_COLORS = [
  { bg: "bg-emerald-50", text: "text-emerald-600" },
  { bg: "bg-blue-50", text: "text-blue-600" },
  { bg: "bg-amber-50", text: "text-amber-600" },
  { bg: "bg-purple-50", text: "text-purple-600" },
  { bg: "bg-rose-50", text: "text-rose-600" },
  { bg: "bg-neutral-100", text: "text-neutral-600" },
];

export function toneFor(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) % TECH_COLORS.length;
  return TECH_COLORS[hash];
}

const ICON_MAP = [
  { test: /scikit/i, icon: SiScikitlearn },
  { test: /numpy/i, icon: SiNumpy },
  { test: /pandas/i, icon: SiPandas },
  { test: /python/i, icon: SiPython },
  { test: /postgres/i, icon: SiPostgresql },
  { test: /mysql/i, icon: SiMysql },
  { test: /snowflake/i, icon: SiSnowflake },
  { test: /google sheets/i, icon: SiGooglesheets },
  { test: /javascript/i, icon: SiJavascript },
  { test: /redux/i, icon: SiRedux },
  { test: /node/i, icon: SiNodedotjs },
  { test: /firebase/i, icon: SiFirebase },
  { test: /vite/i, icon: SiVite },
  { test: /^react$/i, icon: SiReact },
  { test: /css/i, icon: FaCss3Alt },
  { test: /power\s?bi/i, icon: FaChartPie },
  { test: /tableau/i, icon: FaChartBar },
  { test: /matplotlib/i, icon: FaChartLine },
  { test: /seaborn/i, icon: FaChartArea },
  { test: /plotly/i, icon: SiPlotly },
  { test: /excel/i, icon: FaFileExcel },
  { test: /office/i, icon: FaFileWord },
  { test: /pivot|charts/i, icon: FaTableColumns },
  { test: /statistical/i, icon: FaChartSimple },
  { test: /clean/i, icon: FaBroom },
  { test: /wrangl/i, icon: FaShuffle },
  { test: /c\+\+/i, icon: SiCplusplus },
  { test: /java/i, icon: SiOpenjdk },
  { test: /^c$/i, icon: SiC },
  { test: /sql/i, icon: FaDatabase },
  { test: /amadeus|gds|travel/i, icon: FaPlane },
  { test: /crm/i, icon: FaAddressBook },
  { test: /english|language|ielts/i, icon: FaLanguage },
];

export function iconFor(name) {
  const match = ICON_MAP.find((m) => m.test.test(name));
  return match ? match.icon : null;
}

export function TechBadge({ name }) {
  const tone = toneFor(name);
  const Icon = iconFor(name);
  const initials = name.replace(/[^A-Za-z0-9]/g, "").slice(0, 2).toUpperCase();

  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-black/5 bg-white px-6 py-6 shadow-sm shrink-0 w-32">
      <div className={`w-6 h-6 sm:w-12 sm:h-12 rounded-xl ${tone.bg} ${tone.text} flex items-center justify-center`}>
        {Icon ? <Icon className="text-xs sm:text-[22px]" /> : <span className="text-[8px] sm:text-sm font-bold">{initials}</span>}
      </div>
      <span className="text-xs text-black/60 text-center leading-tight">{name}</span>
    </div>
  );
}

export function TechStackMarquee({ tools }) {
  const trackRef = useRef(null);
  const [loopWidth, setLoopWidth] = useState(0);

  useEffect(() => {
    if (trackRef.current) {
      setLoopWidth(trackRef.current.scrollWidth / 2);
    }
  }, [tools]);

  const doubled = [...tools, ...tools];

  return (
    <div className="overflow-hidden">
      <motion.div
        ref={trackRef}
        className="flex gap-4 w-max"
        animate={loopWidth ? { x: [0, -loopWidth] } : undefined}
        transition={{ duration: tools.length * 2.2, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((t, i) => (
          <TechBadge key={`${t}-${i}`} name={t} />
        ))}
      </motion.div>
    </div>
  );
}
