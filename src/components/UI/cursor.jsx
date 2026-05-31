"use client";

import { useEffect, useRef } from "react";

const TRAIL_COUNT = 6;
const TRAIL_LERP = [0.9, 0.7, 0.55, 0.42, 0.32, 0.24];
const LERP_RING = 0.1;

const INTERACTIVE =
  "a, button, [role=button], input, label, select, textarea";

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const trailsRef = useRef([]);

  const mouse = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });

  const trailPos = useRef(
    Array.from({ length: TRAIL_COUNT }, () => ({
      x: -200,
      y: -200,
    }))
  );

  const rafId = useRef(null);
  const idleRef = useRef(null);
  const hoverRef = useRef(false);
  const visibleRef = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const trails = trailsRef.current;

    if (!dot || !ring) return;

    const show = () => {
      visibleRef.current = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const hide = () => {
      visibleRef.current = false;

      dot.style.opacity = "0";
      ring.style.opacity = "0";

      trails.forEach((trail) => {
        if (trail) trail.style.opacity = "0";
      });
    };

    const resetIdle = () => {
      show();

      clearTimeout(idleRef.current);

      idleRef.current = setTimeout(() => {
        hide();
      }, 2200);
    };

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      resetIdle();
    };

    const onMouseOver = (e) => {
      if (!e.target.closest(INTERACTIVE)) return;

      hoverRef.current = true;

      ring.style.width = "56px";
      ring.style.height = "56px";
      ring.style.borderColor = "var(--color-foreground)";

      trails.forEach((trail) => {
        if (trail) trail.style.opacity = "0";
      });
    };

    const onMouseOut = (e) => {
      if (!e.target.closest(INTERACTIVE)) return;

      const related = e.relatedTarget;

      if (
        related &&
        e.target.closest(INTERACTIVE)?.contains(related)
      ) {
        return;
      }

      hoverRef.current = false;

      ring.style.width = "40px";
      ring.style.height = "40px";
      ring.style.borderColor = "var(--color-brand)";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    const tick = () => {
      if (visibleRef.current) {
        // Main dot
        dot.style.transform = `translate(${mouse.current.x - 5}px, ${
          mouse.current.y - 5
        }px)`;

        // Ring
        ringPos.current.x +=
          (mouse.current.x - ringPos.current.x) * LERP_RING;

        ringPos.current.y +=
          (mouse.current.y - ringPos.current.y) * LERP_RING;

        const ringOffset = hoverRef.current ? 28 : 20;

        ring.style.transform = `translate(${
          ringPos.current.x - ringOffset
        }px, ${ringPos.current.y - ringOffset}px)`;

        // Trail
        let prevX = mouse.current.x;
        let prevY = mouse.current.y;

        for (let i = 0; i < TRAIL_COUNT; i++) {
          trailPos.current[i].x +=
            (prevX - trailPos.current[i].x) * TRAIL_LERP[i];

          trailPos.current[i].y +=
            (prevY - trailPos.current[i].y) * TRAIL_LERP[i];

          const trail = trails[i];

          if (trail) {
            const size = 8 - i * 1.1;

            trail.style.transform = `translate(${
              trailPos.current[i].x - size / 2
            }px, ${
              trailPos.current[i].y - size / 2
            }px)`;

            trail.style.opacity = hoverRef.current
              ? "0"
              : String(
                  Math.max(0.01, 0.12 - i * 0.02).toFixed(2)
                );
          }

          prevX = trailPos.current[i].x;
          prevY = trailPos.current[i].y;
        }
      }

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);

      clearTimeout(idleRef.current);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      {/* Trail - Bottom Layer */}
      {Array.from({ length: TRAIL_COUNT }, (_, i) => {
        const size = 8 - i * 1.1;

        return (
          <div
            key={i}
            ref={(el) => {
              trailsRef.current[i] = el;
            }}
            className="pointer-events-none fixed left-0 top-0 z-[9997] rounded-full will-change-transform"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: "var(--color-brand)",
              opacity: 0,
              transform: "translate(-200px,-200px)",
              filter: "blur(2px)",
            }}
          />
        );
      })}

      {/* Ring - Middle Layer */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 rounded-full border-2 opacity-0 will-change-transform"
        style={{
          borderColor: "var(--color-brand)",
          backgroundColor: "transparent",
          transform: "translate(-200px,-200px)",
          boxSizing: "border-box",
          transition: [
            "width 0.25s cubic-bezier(.4,0,.2,1)",
            "height 0.25s cubic-bezier(.4,0,.2,1)",
            "border-color 0.2s ease",
            "opacity 0.4s ease",
          ].join(", "),
        }}
      />

      {/* Dot - Top Layer */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-[10px] w-[10px] rounded-full opacity-0 will-change-transform"
        style={{
          backgroundColor: "var(--color-brand)",
          transform: "translate(-200px,-200px)",
          transition:
            "width 0.2s ease, height 0.2s ease, opacity 0.4s ease",
        }}
      />
    </>
  );
}