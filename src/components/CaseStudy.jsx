"use client";
import { useState, useEffect, useRef } from "react";
import { useContent } from "@/i18n/ContentContext";

function CaseStudy() {
  const t = useContent("caseStudy");
  const projects = t.projects;

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);
  const [transitioning, setTransitioning] = useState(false);
  const [direction, setDirection] = useState("next");
  const [animKey, setAnimKey] = useState(0);
  const timeoutRef = useRef(null);

  const goTo = (index, dir = "next") => {
    if (transitioning || index === current) return;
    setDirection(dir);
    setPrev(current);
    setTransitioning(true);
    setCurrent(index);
    setAnimKey((k) => k + 1);
    timeoutRef.current = setTimeout(() => {
      setPrev(null);
      setTransitioning(false);
    }, 600);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const next = () => goTo((current + 1) % projects.length, "next");
  const prevSlide = () =>
    goTo((current - 1 + projects.length) % projects.length, "prev");

  const project = projects[current];

  return (
    <section className="case-study-section">
      <div>

        <div className="case-study-header">
          <h2 className="text-brand font-bold case-study-eyebrow">{t.eyebrow}</h2>
          <h2 className="text-muted font-bebas font-medium case-study-heading">
            {t.heading}
          </h2>
        </div>

        <div className="case-study-body font-satoshi pr-6 md:pr-0 mt-5 md:mt-0">

          <div
            key={animKey}
            className="case-study-left"
            style={{
              animation: `slideInContent 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
            }}
          >

            <p className="font-bold case-study-title">{project.title}</p>

            <div className="case-study-tags">
              {project.tags.map((tag) => (
                <p
                  key={tag.label}
                  className="rounded-full text-white case-study-tag"
                  style={{ backgroundColor: tag.color }}
                >
                  {tag.label}
                </p>
              ))}
            </div>

            <div className="w-full">
              <p className="case-study-desc">{project.description}</p>
              <div className="case-study-stats">
                <div>
                  <p className="stat-label">{t.stats.timeLabel}</p>
                  <h2 className="stat-value">{project.hours} {t.stats.timeUnit}</h2>
                </div>
                <div>
                  <p className="stat-label">
                    {project?.components ? t.stats.componentsLabel : t.stats.pagesLabel}
                  </p>
                  <h2 className="stat-value">{project?.pages}{project?.components}</h2>
                </div>
                <div>
  <p className="stat-label">{t.stats.visitLive}</p>
  <a
    href={project.liveUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="stat-value hover:underline cursor-pointer block"
  >
    Live Preview
  </a>
</div>
<div>
  <p className="stat-label">{t.stats.repoLabel}</p>
  
  <a  href={project.repoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="stat-value hover:underline cursor-pointer block"
  >
    {t.stats.repoLink}
  </a>
</div>
              </div>
            </div>
          </div>

          <div className="case-study-image-wrap">

            {prev !== null && (
              <img
                key={`img-out-${prev}`}
                src={projects[prev].image}
                alt=""
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  animation: `imgSlideOut${
                    direction === "next" ? "Left" : "Right"
                  } 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                  zIndex: 1,
                }}
              />
            )}

            <img
              key={`img-in-${current}`}
              src={project.image}
              alt="Case study"
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                animation: `imgSlideIn${
                  direction === "next" ? "Right" : "Left"
                } 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards`,
                zIndex: 2,
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                height: "120px",
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)",
                zIndex: 3,
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                display: "flex",
                gap: "10px",
                zIndex: 4,
              }}
            >
              {[
                { label: "Previous", onClick: prevSlide, path: "M10 12L6 8L10 4" },
                { label: "Next",     onClick: next,      path: "M6 4L10 8L6 12"  },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.onClick}
                  disabled={transitioning}
                  aria-label={btn.label}
                  style={{
                    width: "44px",
                    height: "44px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.12)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    border: "1px solid rgba(255,255,255,0.25)",
                    color: "white",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background 0.2s, transform 0.15s",
                    flexShrink: 0,
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.25)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "rgba(255,255,255,0.12)")
                  }
                  onMouseDown={(e) =>
                    (e.currentTarget.style.transform = "scale(0.93)")
                  }
                  onMouseUp={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d={btn.path}
                      stroke="white"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              ))}
            </div>

            <style>{`
              /* ── Layout ── */
              .case-study-section {
                margin-top: clamp(80px, 12vw, 350px);
                margin-left: clamp(12px, 2.5vw, 40px);
                margin-right: clamp(12px, 2.5vw, 40px);
                padding-top: clamp(24px, 6vw, 100px);
                padding-bottom: clamp(24px, 6vw, 100px);
                background: var(--color-secondary, #18181b);
                border-radius: clamp(20px, 4vw, 56px);
              }

              .case-study-header {
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                align-items: flex-top;
                gap: 8px;
                padding-left: clamp(16px, 4vw, 64px);
                padding-right: clamp(16px, 4vw, 64px);
                margin-bottom: 0;
              }

              .case-study-eyebrow {
                font-size: clamp(13px, 1.5vw, 24px);
                letter-spacing: 0.05em;
              }

              .case-study-heading {
                font-size: clamp(32px, 6vw, 80px);
                line-height: 0.8;
              }

              .case-study-body {
                display: flex;
                flex-direction: column;
                gap: clamp(24px, 3vw, 40px);
                padding-left: clamp(16px, 4vw, 64px);
              }

              @media (min-width: 768px) {
                .case-study-body {
                  flex-direction: row;
                  align-items: flex-start;
                }
              }

              /* ── Left panel ── */
              .case-study-left {
                width: 100%;
                display: flex;
                flex-direction: column;
              }

              @media (min-width: 768px) {
                .case-study-left {
                  width: 55%;
                }
              }

              .case-study-title {
                font-size: clamp(20px, 3.5vw, 56px);
                line-height: 1.1;
                min-height: unset;
              }

              @media (min-width: 768px) {
                .case-study-title {
                  min-height: 150px;
                }
              }

              @media (min-width: 1200px) {
                .case-study-title {
                  min-height: 190px;
                }
              }

              /* ── Tags ── */
              .case-study-tags {
                display: flex;
                flex-wrap: wrap;
                gap: clamp(8px, 1vw, 16px);
                margin-top: clamp(16px, 2vw, 48px);
                margin-bottom: clamp(16px, 2vw, 48px);
              }

              .case-study-tag {
                padding: clamp(8px, 1vw, 16px) clamp(12px, 1.5vw, 26px);
                font-size: clamp(11px, 1.1vw, 15px);
                white-space: nowrap;
              }

              /* ── Description ── */
              .case-study-desc {
                font-size: clamp(13px, 1.2vw, 16px);
                font-weight: 300;
              }

              /* ── Stats row ── */
              .case-study-stats {
                display: flex;
                flex-wrap: wrap;
                gap: clamp(16px, 2vw, 24px);
                justify-content: space-between;
                margin-top: clamp(16px, 2vw, 36px);
              }

              .stat-label {
                font-size: clamp(11px, 1.1vw, 16px);
                font-weight: 300;
              }

              .stat-value {
                font-size: clamp(18px, 2.2vw, 32px);
                font-weight: 700;
                line-height: 1.2;
              }

              /* ── Image panel ── */
              .case-study-image-wrap {
                position: relative;
                width: 100%;
                height: clamp(200px, 40vw, 329px);
                border-radius: clamp(12px, 1.5vw, 22px) 0 0 clamp(12px, 1.5vw, 22px);
                overflow: hidden;
                background: #27272A;
              }

              @media (max-width: 767px) {
                .case-study-image-wrap {
                  border-radius: clamp(12px, 3vw, 22px);
                  margin-right: clamp(16px, 4vw, 64px);
                }
              }

              @media (min-width: 768px) {
                .case-study-image-wrap {
                  width: 45%;
                  margin-top: clamp(24px, 4vw, 56px);
                  height: clamp(220px, 24vw, 329px);
                  flex-shrink: 0;
                }
              }

              /* ── Keyframes ── */
              @keyframes slideInContent {
                from { opacity: 0; transform: translateY(18px); }
                to   { opacity: 1; transform: translateY(0); }
              }
              @keyframes imgSlideInRight {
                from { transform: translateX(100%); }
                to   { transform: translateX(0); }
              }
              @keyframes imgSlideInLeft {
                from { transform: translateX(-100%); }
                to   { transform: translateX(0); }
              }
              @keyframes imgSlideOutLeft {
                from { transform: translateX(0); }
                to   { transform: translateX(-100%); }
              }
              @keyframes imgSlideOutRight {
                from { transform: translateX(0); }
                to   { transform: translateX(100%); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CaseStudy;
