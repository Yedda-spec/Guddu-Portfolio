import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import profile from "../data/profile.json";

const CalendarIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
  </svg>
);

export default function FloatingContact() {
  const [visible, setVisible] = useState(false);
  const hasShown = useRef(false);
  const nudgeTimeout = useRef(null);
  const [nudge, setNudge] = useState(false);

  useEffect(() => {
    const target = document.getElementById("experience");
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasShown.current) {
          hasShown.current = true;
          setVisible(true);
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    function scheduleNudge() {
      const delay = 4000 + Math.random() * 6000;
      nudgeTimeout.current = setTimeout(() => {
        setNudge(true);
        setTimeout(() => setNudge(false), 600);
        scheduleNudge();
      }, delay);
    }
    scheduleNudge();
    return () => clearTimeout(nudgeTimeout.current);
  }, [visible]);

  // Set profile.calendlyLink in profile.json to use Calendly instead of mailto.
  const href = profile.calendlyLink || `mailto:${profile.email}`;

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          href={href}
          target={profile.calendlyLink ? "_blank" : undefined}
          rel={profile.calendlyLink ? "noreferrer" : undefined}
          initial={{ scale: 0.4, opacity: 0, x: 40 }}
          animate={{
            scale: nudge ? [1, 1.15, 0.95, 1.05, 1] : 1,
            opacity: 1,
            x: 0,
            rotate: nudge ? [0, -8, 8, -4, 0] : 0,
          }}
          exit={{ scale: 0.4, opacity: 0, x: 40 }}
          transition={{ duration: nudge ? 0.6 : 0.4, type: nudge ? "tween" : "spring" }}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-600 shadow-lg flex items-center justify-center"
          aria-label="Book a call"
        >
          <CalendarIcon />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
