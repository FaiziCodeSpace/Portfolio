"use client";

import { useRef, useState, useEffect, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const COPIES = 7;                      // total cloned copies of the list
const MID    = Math.floor(COPIES / 2); // = 3  (the "real" center copy)

// ─── Component ────────────────────────────────────────────────────────────────
function ClientsExperiences() {

    const testimonials = [
        {
            CompanyName: "KhakiGemstone",
            review: "This Agency helped me to the end, I never knew I would get my project done so fast and so perfect. They were connected with me throughout the whole process, showing me everything before moving to the next step.",
            name: "Ayub Khan",
            position: "CEO of KhakiGemstone",
            logo: '/images/test.jpg'
        },
        {
            CompanyName: "StoneCraft Ltd",
            review: "Professional, fast, and highly skilled team. They understood our requirements clearly and delivered exactly what we needed without delays.",
            name: "Hassan Raza",
            position: "Managing Director",
            logo: '/images/test.jpg'
        },
        {
            CompanyName: "GemWorld Traders",
            review: "The communication was excellent and the quality of work exceeded expectations. I would definitely recommend them to anyone looking for reliable services.",
            name: "Ali Sher",
            position: "Founder",
            logo: '/images/test.jpg'
        },
        {
            CompanyName: "Precious Exports",
            review: "From design to deployment, everything was handled smoothly. The team was responsive and made sure every detail was perfect.",
            name: "Usman Tariq",
            position: "Operations Head",
            logo: '/images/test.jpg'
        }
    ];

    const COUNT = testimonials.length;

    // Extended flat list – each entry carries its real (logical) index
    const extendedList = Array.from({ length: COPIES }, (_, ci) =>
        testimonials.map((t, ti) => ({ ...t, _key: `${ci}-${ti}`, _real: ti }))
    ).flat();
    const TOTAL = extendedList.length; // COPIES * COUNT

    // ── State (React-visible) ─────────────────────────────────────────────────
    // activeReal: which of the COUNT logical cards is "centered" (drives styling)
    const [activeReal, setActiveReal] = useState(1);
    const [isDragging, setIsDragging] = useState(false);

    // ── Refs (mutation without re-render) ─────────────────────────────────────
    const containerRef    = useRef(null);
    const trackRef        = useRef(null);

    // current pixel offset of the track
    const offsetRef       = useRef(0);
    // which global index (0‥TOTAL-1) is currently centered
    const gIdxRef         = useRef(MID * COUNT + 1); // start: copy 3, card index 1

    // drag tracking
    const dragStartXRef   = useRef(0);
    const dragStartOffRef = useRef(0); // offset at the moment of pointerdown
    const draggingRef     = useRef(false);

    // raf + snap
    const rafRef          = useRef(null);
    const snapTargetRef   = useRef(null);

    // ── Geometry helpers ──────────────────────────────────────────────────────
    const getStepAndCenter = useCallback(() => {
        const el   = containerRef.current;
        const card = trackRef.current?.querySelector("[data-card]");
        if (!el || !card) return { step: 300, center: 0, cardW: 280 };
        const gap    = parseFloat(window.getComputedStyle(trackRef.current).columnGap) || 24;
        const cardW  = card.offsetWidth;
        const step   = cardW + gap;
        const center = (el.offsetWidth - cardW) / 2;
        return { step, center, cardW };
    }, []);

    const offsetForGIdx = useCallback((gIdx) => {
        const { step, center } = getStepAndCenter();
        return center - gIdx * step;
    }, [getStepAndCenter]);

    const applyOffset = useCallback((px) => {
        if (trackRef.current) trackRef.current.style.transform = `translateX(${px}px)`;
    }, []);

    // ── Silent rebase: jump gIdx back toward center copy, adjust offset so
    //    the pixel position doesn't change at all ────────────────────────────
    const rebase = useCallback(() => {
        const g = gIdxRef.current;
        const lo = COUNT;
        const hi = (COPIES - 2) * COUNT - 1;
        if (g < lo || g > hi) {
            const realCard = ((g % COUNT) + COUNT) % COUNT;
            const newG     = MID * COUNT + realCard;
            const { step } = getStepAndCenter();
            const diff     = newG - g;
            gIdxRef.current    = newG;
            offsetRef.current -= diff * step;          // compensate pixel-exactly
            if (snapTargetRef.current !== null) {
                snapTargetRef.current -= diff * step;  // keep snap target aligned too
            }
            applyOffset(offsetRef.current);
        }
    }, [COUNT, MID, COPIES, getStepAndCenter, applyOffset]);

    // ── Snap animation (lerp to pixel target) ────────────────────────────────
    const snapLoop = useCallback(() => {
        const target = snapTargetRef.current;
        if (target === null) return;
        const diff = target - offsetRef.current;
        if (Math.abs(diff) < 0.4) {
            offsetRef.current     = target;
            snapTargetRef.current = null;
            applyOffset(offsetRef.current);
            rebase();
            return;
        }
        offsetRef.current += diff * 0.12;
        applyOffset(offsetRef.current);
        rafRef.current = requestAnimationFrame(snapLoop);
    }, [applyOffset, rebase]);

    const snapTo = useCallback((gIdx) => {
        cancelAnimationFrame(rafRef.current);
        gIdxRef.current       = gIdx;
        snapTargetRef.current = offsetForGIdx(gIdx);
        rafRef.current        = requestAnimationFrame(snapLoop);
    }, [offsetForGIdx, snapLoop]);

    // ── Mount: place track immediately ───────────────────────────────────────
    useEffect(() => {
        const place = () => {
            const px = offsetForGIdx(gIdxRef.current);
            offsetRef.current = px;
            applyOffset(px);
        };
        const id = requestAnimationFrame(place);
        return () => cancelAnimationFrame(id);
    }, [offsetForGIdx, applyOffset]);

    // Re-center on resize
    useEffect(() => {
        const onResize = () => {
            cancelAnimationFrame(rafRef.current);
            snapTargetRef.current = null;
            const px = offsetForGIdx(gIdxRef.current);
            offsetRef.current = px;
            applyOffset(px);
        };
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, [offsetForGIdx, applyOffset]);

    useEffect(() => () => cancelAnimationFrame(rafRef.current), []);

    // ── Pointer handlers ──────────────────────────────────────────────────────
    const onPointerDown = useCallback((e) => {
        cancelAnimationFrame(rafRef.current);
        snapTargetRef.current  = null;
        draggingRef.current    = true;
        dragStartXRef.current  = e.clientX;
        dragStartOffRef.current = offsetRef.current;
        setIsDragging(true);
        containerRef.current?.setPointerCapture?.(e.pointerId);
    }, []);

    const onPointerMove = useCallback((e) => {
        if (!draggingRef.current) return;
        const delta = e.clientX - dragStartXRef.current;
        offsetRef.current = dragStartOffRef.current + delta;
        applyOffset(offsetRef.current);
    }, [applyOffset]);

    const onPointerUp = useCallback((e) => {
        if (!draggingRef.current) return;
        draggingRef.current = false;
        setIsDragging(false);

        const delta     = e.clientX - dragStartXRef.current;
        const { step }  = getStepAndCenter();
        const threshold = step * 0.22;

        let nextG = gIdxRef.current;
        if      (delta < -threshold) nextG += 1;
        else if (delta >  threshold) nextG -= 1;

        nextG = Math.max(0, Math.min(TOTAL - 1, nextG));

        const realIdx = ((nextG % COUNT) + COUNT) % COUNT;
        setActiveReal(realIdx);
        snapTo(nextG);
    }, [COUNT, TOTAL, getStepAndCenter, snapTo]);

    // ── Dot navigation ────────────────────────────────────────────────────────
    const goToReal = useCallback((realIdx) => {
        const cur   = ((gIdxRef.current % COUNT) + COUNT) % COUNT;
        let delta   = realIdx - cur;
        if (delta >  COUNT / 2) delta -= COUNT;
        if (delta < -COUNT / 2) delta += COUNT;
        setActiveReal(realIdx);
        snapTo(gIdxRef.current + delta);
    }, [COUNT, snapTo]);

    // ── Card click ────────────────────────────────────────────────────────────
    const onCardClick = useCallback((cardGIdx) => {
        if (draggingRef.current) return;
        const nextG   = cardGIdx;
        const realIdx = ((nextG % COUNT) + COUNT) % COUNT;
        setActiveReal(realIdx);
        snapTo(nextG);
    }, [COUNT, snapTo]);

    // ─────────────────────────────────────────────────────────────────────────
    return (
        <section className="mt-[clamp(80px,12vw,350px)] overflow-hidden">

            {/* ── Header (untouched) ── */}
            <div className="flex justify-between items-center">
                <div className="w-[20%] h-[clamp(36px,6vw,100px)] border-brand
                    border-r-[clamp(8px,1.8vw,30px)]
                    border-t-[clamp(8px,1.8vw,30px)]
                    border-b-[clamp(8px,1.8vw,30px)]
                    rounded-r-full self-end md:self-auto" />
                <p className="font-bebas text-nowrap text-[clamp(28px,7vw,104px)] leading-none px-2 text-center">
                    CLIENTS EXPERIENCES
                </p>
                <div className="w-[20%] h-[clamp(36px,6vw,100px)] border-brand
                    border-l-[clamp(8px,1.8vw,30px)]
                    border-t-[clamp(8px,1.8vw,30px)]
                    border-b-[clamp(8px,1.8vw,30px)]
                    rounded-l-full self-end md:self-auto" />
            </div>

            {/* ── Slider ── */}
            <div
                ref={containerRef}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerLeave={onPointerUp}
                className="relative mt-8 sm:mt-12 overflow-hidden"
                style={{
                    cursor: isDragging ? "grabbing" : "grab",
                    userSelect: "none",
                    touchAction: "none",
                }}
            >
                <div
                    ref={trackRef}
                    data-track
                    className="flex will-change-transform"
                    style={{ gap: "clamp(12px,2vw,28px)" }}
                >
                    {extendedList.map((testimonial, idx) => {
                        // ── KEY FIX: drive opacity/scale from React state (activeReal),
                        //    never from a ref — so it always re-renders correctly.
                        const realDist    = Math.abs(testimonial._real - activeReal);
                        const wrappedDist = Math.min(realDist, COUNT - realDist);
                        const isActive    = testimonial._real === activeReal;

                        return (
                            <div
                                key={testimonial._key}
                                data-card
                                onClick={() => onCardClick(idx)}
                                className="shrink-0 bg-card rounded-[clamp(24px,4vw,48px)] flex flex-col justify-between"
                                style={{
                                    width: "clamp(280px, 48vw, 680px)",
                                    minHeight: "clamp(280px,40vw,495px)",
                                    padding: "clamp(24px,5vw,80px)",
                                    opacity: wrappedDist === 0 ? 1 : wrappedDist === 1 ? 0.5 : 0.25,
                                    transform: `scale(${isActive ? 1 : 0.92})`,
                                    transition: "opacity 0.45s ease, transform 0.45s ease",
                                    pointerEvents: isDragging ? "none" : "auto",
                                }}
                            >
                                {/* Logo + Company */}
                                <div className="flex gap-3 items-center">
                                    <img
                                        className="w-[clamp(32px,5vw,55px)]"
                                        src={testimonial.logo}
                                        alt="company-logo"
                                        draggable={false}
                                    />
                                    <h2 className="text-[clamp(18px,3vw,34px)] font-medium leading-tight">
                                        {testimonial.CompanyName}
                                    </h2>
                                </div>

                                {/* Review */}
                                <p className="mt-6 sm:mt-10 font-medium text-[clamp(13px,1.6vw,16px)] leading-relaxed grow">
                                    {testimonial.review}
                                </p>

                                {/* Author */}
                                <div className="flex flex-col mt-6 sm:mt-8 text-[clamp(12px,1.4vw,15px)]">
                                    <p className="font-semibold">{testimonial.name}</p>
                                    <p className="opacity-60">{testimonial.position}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Dot indicators ── */}
            <div className="flex justify-center gap-2 mt-6">
                {testimonials.map((_, i) => (
                    <button
                        key={i}
                        onClick={() => goToReal(i)}
                        aria-label={`Go to testimonial ${i + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                            i === activeReal
                                ? "w-6 h-2 bg-brand"
                                : "w-2 h-2 bg-brand/30 hover:bg-brand/60"
                        }`}
                    />
                ))}
            </div>
        </section>
    );
}

export default ClientsExperiences;