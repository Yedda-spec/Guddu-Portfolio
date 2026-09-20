import { motion } from "framer-motion";
import profile from "../data/profile.json";

const softShadowFilter = "drop-shadow(0 12px 18px rgba(10,10,20,0.22))";

function Sticker({
  src,
  label,
  className,
  rotate = 0,
  fit = "contain",
  zoom = 1,
  grayscale = false,
  rounded = false,
  children,
  from = { x: 0, y: -120 },
  delay = 0,
}) {
  const entranceDuration = 2.2;

  return (
    <motion.div
      className={`absolute ${rounded ? "overflow-hidden rounded-[2rem]" : ""} ${className}`}
      style={{
        boxShadow: rounded
          ? "0 2px 3px rgba(10,10,20,0.28), 0 20px 22px rgba(10,10,20,0.30), 0 55px 60px rgba(10,10,20,0.24)"
          : undefined,
      }}
      initial={{ opacity: 0, x: from.x, y: from.y, rotate: rotate + (from.x < 0 ? -20 : from.x > 0 ? 20 : 0) }}
      animate={{ opacity: 1, x: 0, y: 0, rotate }}
      transition={{ duration: entranceDuration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="w-full h-full"
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 3 + (delay % 1),
          repeat: Infinity,
          ease: "easeInOut",
          delay: delay + entranceDuration,
        }}
      >
        {src ? (
          <>
            <img
              src={src}
              alt={label}
              className={`w-full h-full object-${fit} ${grayscale ? "grayscale" : ""}`}
              style={{
                filter: rounded ? undefined : softShadowFilter,
                ...(zoom !== 1 ? { transform: `scale(${zoom})` } : {}),
              }}
            />
            {children}
          </>
        ) : (
          <div className="w-full h-full min-h-16 rounded-lg border-2 border-dashed border-black/20 bg-black/[0.02] flex items-center justify-center">
            <span className="text-[10px] uppercase tracking-wide text-black/30 px-2 text-center">
              {label}
            </span>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

export default function Hero() {
  const { heroImages, heroTagline, name, role, experienceYears, location, openToWork } = profile;

  return (
    <div className="relative h-[100vh] min-h-[820px] md:min-h-[880px] hero-grid-bg overflow-hidden">
      <Sticker
        src={heroImages.cautionSign}
        label="Caution Sign"
        className="hidden md:block left-[6%] top-[10%] w-40 h-40"
        rotate={-8}
        from={{ x: -140, y: -160 }}
        delay={0}
      />
      <Sticker
        src={heroImages.photo}
        label="Portrait Photo"
        className="hidden md:block left-[12%] top-[26%] w-[300px] h-[380px]"
        rotate={-4}
        rounded
        fit="cover"
        from={{ x: -280, y: -40 }}
        delay={0.25}
      />
      <Sticker
        src={heroImages.computer}
        label="Computer"
        className="hidden md:block left-[40%] top-[8%] w-140 h-125"
        rotate={6}
        from={{ x: 40, y: -180 }}
        delay={0.5}
      />
      <Sticker
        src={heroImages.coffee}
        label="Coffee"
        className="hidden md:block left-[4%] top-[60%] w-54 h-54"
        rotate={10}
        from={{ x: -220, y: 60 }}
        delay={0.75}
      />
      <Sticker
        src={heroImages.cabinet}
        label="Filing Cabinet"
        className="hidden md:block left-[80%] top-[55%] w-28 h-28"
        rotate={-6}
        from={{ x: 240, y: 40 }}
        delay={1}
      />
      <Sticker
        src={heroImages.nameTag}
        label="Name Tag"
        className="hidden md:block left-[26%] top-[46%] w-68 h-46"
        rotate={4}
        from={{ x: -200, y: -20 }}
        delay={0.4}
      />
      <Sticker
        src={heroImages.welcomeMat}
        label="Welcome Mat"
        className="hidden md:block left-[34%] top-[55%] w-156 h-120"
        rotate={-3}
        from={{ x: -60, y: 220 }}
        delay={0.9}
      />

      <motion.div
        className="hidden md:block absolute left-[86%] top-[4%] w-40 h-50"
        initial={{ opacity: 0, x: 200, y: -160, rotate: 24 }}
        animate={{ opacity: 1, x: 0, y: 0, rotate: 3 }}
        transition={{ duration: 2.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.25, repeat: Infinity, ease: "easeInOut", delay: 1.15 }}
        >
          {heroImages.notepad ? (
            <>
              <img
                src={heroImages.notepad}
                alt="Notepad"
                className="w-full h-full object-contain"
                style={{ filter: softShadowFilter }}
              />
              <div
                className="absolute inset-0 flex flex-col justify-center gap-1 px-6 text-sm text-black/80"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                <span>Curious ✓</span>
                <span>Learning new things ✓</span>
                <span>Hired ○</span>
              </div>
            </>
          ) : (
            <div className="w-full h-full rounded-lg border-2 border-dashed border-black/20 bg-black/[0.02] flex flex-col items-center justify-center gap-1 px-4 text-center">
              <span className="text-[10px] uppercase tracking-wide text-black/30">Notepad</span>
              <div className="text-sm text-black/60" style={{ fontFamily: "'Caveat', cursive" }}>
                <div>Curious ✓</div>
                <div>Learning new things ✓</div>
                <div>Hired ○</div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-[44%] left-6 right-6 md:left-[66%] md:right-10 md:top-[30%]"
      >
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <span className="rounded-full bg-black/5 border border-black/10 px-3 py-1 text-xs font-[Inter] text-black/60">
            {location}
          </span>
          {openToWork && (
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-[Inter] text-emerald-700 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Open to Work
            </span>
          )}
        </div>
        <h1 className="font-serif text-3xl md:text-4xl font-extrabold leading-tight text-black">
          {heroTagline}
        </h1>
        <p className="mt-4 text-sm md:text-base font-[Inter] text-black/60">
          {name} &middot; {role} &middot; {experienceYears}+ years experience
        </p>
      </motion.div>
    </div>
  );
}
