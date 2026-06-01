"use client";

import { useContent } from "@/i18n/ContentContext";
import { useState, useEffect, useRef, useCallback, memo } from "react";
import { animate } from "animejs";
import { ContactModal } from "./Contact";

// ─── Person info per variant ───────────────────────────────────────────────
const personInfo = {
  individual: { name: "Faizan", position: "MERN Developer & UX/UI Designer" },
  team: { name: "Faizan", position: "MERN Developer & UX/UI Designer" },
  de: { name: "Arne", position: "CEO" },
};

// ─── Animated counter hook ────────────────────────────────────────────────
function useCounter(target, active, duration = 1400, delay = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!active) { setValue(0); return; }
    const obj = { val: 0 };
    const a = animate(obj, {
      val: target,
      duration,
      delay,
      easing: "easeOutExpo",
      onUpdate: () => setValue(Math.floor(obj.val)),
    });
    return () => a.pause();
  }, [active, target, duration, delay]);
  return value;
}

// ─── Liquid Fill ──────────────────────────────────────────────────────────
const LiquidFill = memo(function LiquidFill({ pct, active, delay = 0, color }) {
  const liquidRef = useRef(null);
  const waveAnim = useRef(null);

  useEffect(() => {
    const el = liquidRef.current;
    if (!el) return;

    if (!waveAnim.current) {
      const path = el.querySelector("path");
      waveAnim.current = animate(path, {
        d: [
          { value: "M-10,8 C10,2 30,14 50,8 C70,2 90,14 110,8 C130,2 150,14 170,8 L170,30 L-10,30 Z" },
          { value: "M-10,8 C10,14 30,2 50,8 C70,14 90,2 110,8 C130,14 150,2 170,8 L170,30 L-10,30 Z" },
        ],
        duration: 2200,
        loop: true,
        direction: "alternate",
        easing: "easeInOutSine",
      });
    }

    if (!active) {
      el.style.height = "0%";
      return;
    }

    el.style.willChange = "height";
    const a = animate(el, {
      height: ["0%", `${pct}%`],
      duration: 1500,
      delay,
      easing: "easeOutExpo",
      complete: () => { el.style.willChange = "auto"; },
    });

    return () => a.pause();
  }, [active, pct, delay]);

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        borderRadius: "18px",
        overflow: "hidden",
      }}
    >
      <div
        ref={liquidRef}
        data-liquid
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "0%",
        }}
      >
        {/* Solid fill body — full brand color at good opacity */}
        <div style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          top: "14px", // below the wave crest
          background: `color-mix(in srgb, ${color} 100%, transparent)`,
        }} />

        {/* Wave SVG sits on top of the fill body */}
       
      </div>
    </div>
  );
});

// ─── Stat tile ────────────────────────────────────────────────────────────
const StatTile = memo(function StatTile({ stat, active, index, accentColor }) {
  const numericTarget = parseInt(stat.value.replace(/\D/g, ""), 10) || 0;
  const ringMax = numericTarget <= 10 ? 10 : numericTarget <= 30 ? 30 : 200;
  const fillPct = Math.min((numericTarget / ringMax) * 100, 100);
  const delay = index * 120;
  const count = useCounter(numericTarget, active, 1500, delay);
  const tileRef = useRef(null);

  useEffect(() => {
    const el = tileRef.current;
    if (!el) return;
    if (!active) {
      el.style.opacity = "0";
      return;
    }
    el.style.willChange = "transform, opacity";
    const a = animate(el, {
      opacity: [0, 1],
      translateY: [12, 0],
      scale: [0.92, 1],
      duration: 500,
      delay: delay + 100,
      easing: "easeOutBack",
    });
    return () => {
      a.pause();
      el.style.willChange = "auto";
    };
  }, [active, delay]);

  return (
    <div
  ref={tileRef}
  className="flex flex-col items-center gap-2 p-4 rounded-[18px] stat-tile"
  style={{
    background: "var(--color-background)",
    border: "1px solid var(--color-border)",
    position: "relative",
    overflow: "hidden",
    opacity: 0,
  }}
>
  <style>{`
    .stat-tile {
      transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1),
                  border-color 0.2s ease,
                  box-shadow 0.3s ease;
    }
    .stat-tile:hover {
      transform: translateY(-4px);
      border-color: var(--color-brand) !important;
      box-shadow: 0 8px 24px color-mix(in srgb, var(--color-brand) 20%, transparent);
    }
  `}</style>

      <LiquidFill
        pct={fillPct}
        active={active}
        delay={delay + 200}
        color={accentColor}
      />

      <span
        className="font-bebas text-[20px] leading-none"
        style={{ position: "relative", zIndex: 2, color: "var(--color-foreground)" }}
      >
        {count}<span style={{ fontSize: "12px", color: accentColor }}>+</span>
      </span>
      <span
        className="font-satoshi text-center leading-tight"
        style={{ fontSize: "11px", color: "var(--color-muted)", position: "relative", zIndex: 2 }}
      >
        {stat.label}
      </span>
    </div>
  );
});

// ─── Glitch text ──────────────────────────────────────────────────────────
const GLITCH_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%";

const GlitchText = memo(function GlitchText({ text, className, style }) {
  const ref = useRef(null);
  const intervalRef = useRef(null);

  const scramble = useCallback(() => {
    if (!ref.current) return;
    clearInterval(intervalRef.current);
    let iteration = 0;
    intervalRef.current = setInterval(() => {
      if (!ref.current) { clearInterval(intervalRef.current); return; }
      ref.current.innerText = text
        .split("")
        .map((ch, i) =>
          i < iteration
            ? text[i]
            : ch === " "
              ? " "
              : GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
        )
        .join("");
      if (iteration >= text.length) clearInterval(intervalRef.current);
      iteration += 0.5;
    }, 30);
  }, [text]);

  useEffect(() => () => clearInterval(intervalRef.current), []);

  return (
    <span ref={ref} className={className} style={style} onMouseEnter={scramble}>
      {text}
    </span>
  );
});

// ─── Flip Card ────────────────────────────────────────────────────────────
const ProfileFlipCard = memo(function ProfileFlipCard({ t, person, accentColor }) {
  const [flipped, setFlipped] = useState(false);
  const [animActive, setAnimActive] = useState(false);
  const cardRef = useRef(null);
  const wrapperRef = useRef(null);
  const flippedRef = useRef(false);

  const handleFlip = useCallback((state) => {
    flippedRef.current = state;
    setFlipped(state);
    if (state) {
      setTimeout(() => setAnimActive(true), 200);
    } else {
      setAnimActive(false);
    }
  }, []);

  const handleMouseMove = useCallback((e) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    animate(el, {
      rotateY: flippedRef.current ? 180 + x * 8 : x * 8,
      rotateX: -y * 5,
      duration: 200,
      easing: "easeOutQuad",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    handleFlip(false);
    const el = wrapperRef.current;
    if (!el) return;
    animate(el, {
      rotateY: 0,
      rotateX: 0,
      duration: 600,
      easing: "easeOutElastic(1, 0.6)",
    });
  }, [handleFlip]);

  return (
    <div
      ref={cardRef}
      className="w-full lg:w-[300px] xl:w-[320px] shrink-0"
      style={{ perspective: "1000px" }}
      onMouseEnter={() => handleFlip(true)}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <div
        ref={wrapperRef}
        style={{
          position: "relative",
          width: "100%",
          transformStyle: "preserve-3d",
          transition: "transform 0.65s cubic-bezier(0.34,1.10,0.64,1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          willChange: "transform",
        }}
      >
        {/* ── FRONT ── */}
        <div
          className="bg-secondary rounded-[24px] overflow-hidden flex flex-col"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Shimmer border */}
          <div style={{
            position: "absolute", inset: 0, borderRadius: "24px", pointerEvents: "none",
            background: "linear-gradient(135deg, rgba(232,255,87,0.15) 0%, transparent 50%, rgba(232,255,87,0.08) 100%)",
            zIndex: 1,
          }} />

          {/* Photo */}
          <div
            className="w-full overflow-hidden relative"
            style={{ height: "clamp(300px,80vw,340px)" }}
          >
            <img
              src={t.image}
              alt={t.imageAlt}
              className="w-full h-full object-cover object-center"
              loading="lazy"
              decoding="async"
            />
            <div style={{
              position: "absolute", inset: 0,
              background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
              pointerEvents: "none",
            }} />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0, height: "60px",
              background: "linear-gradient(to top, var(--color-secondary), transparent)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Name / position */}
          <div
            className="px-5 py-4 border-t border-border flex flex-col gap-0.5"
            style={{ position: "relative", zIndex: 2 }}
          >
            <GlitchText
              text={person.name}
              className="font-bebas tracking-wide text-[22px] leading-none text-foreground"
              style={{ cursor: "default", display: "block" }}
            />
            <span className="font-satoshi text-[12px] text-muted">{person.position}</span>
          </div>

          {/* Stats preview */}
          <div
            className="px-5 pb-5 flex flex-row flex-wrap gap-3"
            style={{ position: "relative", zIndex: 2 }}
          >
            {t.stats.map((stat, i) => (
              <StatPreviewTile key={i} stat={stat} accentColor={accentColor} />
            ))}
          </div>

          {/* Hover hint */}
          <div className="px-5 pb-3 flex items-center gap-2" style={{ position: "relative", zIndex: 2 }}>
            <span style={{
              fontSize: "10px",
              color: "var(--color-muted)",
              fontFamily: "monospace",
              letterSpacing: "0.1em",
            }}>
              HOVER TO EXPLORE
            </span>
            <div style={{
              width: "20px", height: "1px",
              background: "linear-gradient(to right, var(--color-brand), transparent)",
            }} />
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="rounded-[24px] overflow-hidden flex flex-col absolute inset-0"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "var(--color-secondary)",
            border: "1px solid var(--color-border)",
          }}
        >
          {/* Corner accents */}
          {CORNER_STYLES.map((s, i) => (
            <div key={i} style={{
              position: "absolute", width: "16px", height: "16px",
              pointerEvents: "none", ...s,
            }} />
          ))}

          {/* Header */}
          <div
            className="px-5 pt-5 pb-4 flex flex-col gap-0.5 relative"
            style={{ borderBottom: "1px solid var(--color-border)" }}
          >
            <div className="flex items-center justify-between">
              <span style={{
                fontFamily: "monospace",
                fontSize: "10px",
                color: "var(--color-muted)",
                letterSpacing: "0.15em",
              }}>
                SYS://PROFILE.OVERVIEW
              </span>
            </div>
            <GlitchText
              text={person.name}
              className="font-bebas tracking-wide text-[20px] leading-none"
              style={{ color: "var(--color-foreground)", cursor: "default", display: "block" }}
            />
            <span
              className="font-satoshi text-[11px]"
              style={{ color: "var(--color-muted)" }}
            >
              {person.position}
            </span>
          </div>

          {/* Stats grid */}
          <div className="flex-1 px-4 py-4 grid grid-cols-3 gap-3 relative">
            {t.stats.map((stat, i) => (
              <StatTile key={i} stat={stat} active={animActive} index={i} accentColor={accentColor} />
            ))}
          </div>

          {/* Bottom badge */}
          <div
            className="mx-4 mb-4 rounded-[14px] px-4 py-3 flex items-center justify-between relative"
            style={{
              background: "var(--color-background)",
              border: "1px solid var(--color-border)",
            }}
          >
            <span
              className="font-satoshi text-[11px]"
              style={{ color: "var(--color-muted)" }}
            >
              {t.badge}
            </span>
            <span className="font-bebas tracking-[0.1em] text-[11px] text-brand">
              {t.badgeSub}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
});

// ─── Corner accent styles ─────────────────────────────────────────────────
const CORNER_STYLES = [
  { top: 0, left: 0, borderTop: "2px solid #e8ff57", borderLeft: "2px solid #e8ff57", borderRadius: "24px 0 0 0" },
  { top: 0, right: 0, borderTop: "2px solid #e8ff57", borderRight: "2px solid #e8ff57", borderRadius: "0 24px 0 0" },
  { bottom: 0, left: 0, borderBottom: "2px solid #e8ff57", borderLeft: "2px solid #e8ff57", borderRadius: "0 0 0 24px" },
  { bottom: 0, right: 0, borderBottom: "2px solid #e8ff57", borderRight: "2px solid #e8ff57", borderRadius: "0 0 24px 0" },
];

// ─── Front stat preview tile ──────────────────────────────────────────────
const StatPreviewTile = memo(function StatPreviewTile({ stat, accentColor }) {
  return (
    <div
      className="flex flex-col gap-0.5 bg-background rounded-[14px] px-4 py-3 flex-1 min-w-[80px] cursor-default stat-preview-tile"
      style={{ border: "1px solid var(--color-border)", transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), border-color 0.2s" }}
    >
      <span className="font-bebas text-[28px] leading-none text-foreground">
        {stat.value}<span style={{ color: accentColor }}>+</span>
      </span>
      <span className="font-satoshi text-[11px] text-muted leading-tight">{stat.label}</span>

      <style>{`
        .stat-preview-tile:hover {
          transform: scale(1.06) translateY(-3px);
          border-color: var(--color-brand) !important;
        }
      `}</style>
    </div>
  );
});

// ─── Scroll reveal wrapper ────────────────────────────────────────────────
const RevealOnScroll = memo(function RevealOnScroll({ children, delay = 0, className = "" }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      el.style.willChange = "transform, opacity";
      animate(el, {
        opacity: [0, 1],
        translateY: [40, 0],
        duration: 700,
        delay,
        easing: "easeOutExpo",
        complete: () => { el.style.willChange = "auto"; },
      });
    }, { threshold: 0.15 });

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return <div ref={ref} className={className}>{children}</div>;
});

// ─── Typewriter ───────────────────────────────────────────────────────────
const Typewriter = memo(function Typewriter({ text, className, style }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerText = "";
    let intervalId = null;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      let i = 0;
      intervalId = setInterval(() => {
        if (!ref.current) { clearInterval(intervalId); return; }
        ref.current.innerText = text.slice(0, i + 1);
        i++;
        if (i >= text.length) clearInterval(intervalId);
      }, 22);
    }, { threshold: 0.5 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (intervalId) clearInterval(intervalId);
    };
  }, [text]);

  return <p ref={ref} className={className} style={style} />;
});

// ─── CTA Button ───────────────────────────────────────────────────────────
function MagneticCTA({ text, setContactOpen }) {
  return (
    <>
      <a
        href="#contact"
        onClick={() => setContactOpen(true)}
        className="magnetic-cta font-bebas tracking-widest text-[16px] lg:text-[17px] inline-flex items-center gap-3 text-brand mt-1 w-fit"
      >
        {text}
        <span className="magnetic-cta-arrow" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <style>{`
        .magnetic-cta-arrow { display: inline-flex; transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1); }
        .magnetic-cta:hover .magnetic-cta-arrow { transform: translateX(5px); }
      `}</style>
      </a>
    </>
  );
}

// ─── Quote block ──────────────────────────────────────────────────────────
const QuoteBlock = memo(function QuoteBlock({ quote, cite }) {
  return (
    <div
      className="bg-secondary rounded-[16px] px-5 py-4 relative overflow-hidden"
      style={{ borderLeft: "4px solid var(--color-brand)" }}
    >
      <p className="font-satoshi text-[13px] lg:text-[14px] text-foreground italic leading-relaxed">
        &ldquo;{quote}&rdquo;
      </p>
      <p className="font-satoshi text-[11px] text-muted mt-2">{cite}</p>
    </div>
  );
});

// ─── About ────────────────────────────────────────────────────────────────
function About() {
  const [contactOpen, setContactOpen] = useState(false)
  const t = useContent("about");

  const variant =
    t._variant ??
    (t.badge?.includes("verfügbar") || t.badge?.includes("Projekte")
      ? "de"
      : t.badge?.includes("Taking")
        ? "team"
        : "individual");

  const person = personInfo[variant] ?? personInfo.individual;
  const accentColor = "var(--color-brand)";

  return (
    <section
      id="about"
      className="flex flex-col mt-[clamp(80px,12vw,350px)] gap-12 lg:gap-20 w-full"
    >
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.65); }
        }
      `}</style>

      {/* ── Heading row ── */}
      <div className="flex flex-col md:flex-row pl-6 md:px-0 md:pl-12 lg:pl-20 items-start md:items-center justify-between gap-6 md:gap-8">
        <h1 className="font-bebas tracking-wide text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-bold leading-none shrink-0">
          {t.heading}
        </h1>
        <div className="w-[60%] h-[50px] sm:h-[70px] md:h-[90px] lg:h-[119px] border-brand border-l-[12px] sm:border-l-[20px] md:border-l-[30px] lg:border-l-[39px] border-t-[12px] sm:border-t-[20px] md:border-t-[30px] lg:border-t-[39px] border-b-[12px] sm:border-b-[20px] md:border-b-[30px] lg:border-b-[39px] rounded-l-full self-end md:self-auto" />
      </div>

      {/* ── Body ── */}
      <div className="flex flex-col lg:flex-row w-full gap-8 lg:gap-12 px-4 sm:px-6 md:px-12 lg:px-20">
        <ProfileFlipCard t={t} person={person} accentColor={accentColor} />

        {/* Right — content */}
        <div className="flex flex-col justify-center gap-6 flex-1 min-w-0">
          <RevealOnScroll delay={0}>
            <h2
              className="font-bebas tracking-wide leading-none"
              style={{ fontSize: "clamp(30px, 4vw, 52px)" }}
            >
              {t.subheading}{" "}
              <span className="text-brand">{t.subheadingAccent}</span>
            </h2>
          </RevealOnScroll>

          <RevealOnScroll delay={100}>
            <Typewriter
              text={t.description}
              className="font-satoshi text-[14px] lg:text-[15px] text-muted leading-relaxed"
            />
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <QuoteBlock quote={t.quote} cite={t.quoteCite} />
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <MagneticCTA text={t.cta} setContactOpen={setContactOpen} />
          </RevealOnScroll>
        </div>
      </div>
      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </section>
  );
}

export default About;