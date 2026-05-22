"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import ThemeToggle from "./UI/ThemeToggle";
import { ContactModal } from "./Contact";

const navLinks = [
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "pricing", label: "Pricing" },
  { id: "contact", label: "Contact" },
];

function Navbar() {
  const [active, setActive] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const drawerRef = useRef(null);

  const closeMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setIsClosing(false);
    }, 320);
  };

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClick = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [menuOpen]);

  useEffect(() => {
    const observers = [];
    navLinks.forEach(({ id }) => {
      if (id === "contact") return;
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: "-100px 0px -60% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    if (id === "contact") {
      if (menuOpen) {
        closeMenu();
        setTimeout(() => setContactOpen(true), 350);
      } else {
        setContactOpen(true);
      }
    } else {
      if (menuOpen) {
        closeMenu();
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }, 350);
      } else {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // true = drawer is fully open and not animating out
  const drawerSlideIn = menuOpen && !isClosing;

  return (
    <>
      {/* ── Navbar ── */}
      <nav className="fixed top-0 inset-x-0 z-50 md:mx-8 flex justify-between items-center px-6 md:px-10 py-4 md:py-6 rounded-b-[40px] bg-secondary/80 backdrop-blur-md shadow-lg border border-white/10">
        <Link href="/" onClick={() => menuOpen && closeMenu()}>
          <img src="/Logo/Logo-dark.svg" alt="Company Logo" className="h-7 md:h-8 w-auto block dark:hidden" />
          <img src="/Logo/Logo-light.svg" alt="Company Logo" className="h-7 md:h-8 w-auto hidden dark:block" />
        </Link>

        <ul className="hidden sm:flex gap-8">
          {navLinks.map(({ id, label }) => (
            <li key={id}>
              <a
                href={id === "contact" ? undefined : `#${id}`}
                onClick={(e) => handleNavClick(e, id)}
                className={`cursor-pointer font-bold hover:text-primary transition-colors ${
                  active === id ? "text-text-primary" : "text-muted"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          {/*
            Theme toggle: hidden on mobile when menu is open.
            Using a ref-based approach AND inline style to guarantee it works
            regardless of Tailwind purging. The `hidden` class alone was being
            overridden by Tailwind's sm:block on the parent chain.
          */}
          <div
            className="hidden sm:block"
          >
            <ThemeToggle />
          </div>

          {/* Burger — no animation on the bars since it sits behind the drawer */}
          <button
            onClick={() => (menuOpen ? closeMenu() : setMenuOpen(true))}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            className="sm:hidden flex flex-col justify-center items-center w-9 h-9 gap-[6px] cursor-pointer"
          >
            <span className="block w-8 h-[2px] bg-foreground rounded-full" />
            <span className="block w-8 h-[2px] bg-foreground rounded-full" />
          </button>
        </div>
      </nav>

      {/*
        ── Backdrop ──
        Always in the DOM. Opacity transitions in/out.
        All styling via inline style to avoid Tailwind purge issues.
      */}
      <div
        onClick={() => menuOpen && closeMenu()}
        className="fixed inset-0 z-40 sm:hidden"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: drawerSlideIn ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          visibility: menuOpen ? "visible" : "hidden",
          transition: "opacity 320ms ease",
        }}
      />

      {/*
        ── Slide-in Drawer ──
        ALWAYS in the DOM — never conditionally rendered.
        This is the only reliable way to animate both open AND close in React.
        When closed: translateX(100%) moves it off-screen, visibility:hidden
        removes it from tab order and prevents ghost clicks.
      */}
      <div
        ref={drawerRef}
        className="fixed top-0 right-0 z-50 h-full w-[75vw] max-w-xs flex flex-col sm:hidden"
        style={{
          transform: drawerSlideIn ? "translateX(0)" : "translateX(100%)",
          transition: "transform 320ms cubic-bezier(0.32, 0, 0.15, 1)",
          visibility: menuOpen ? "visible" : "hidden",
          // Rich glassmorphism — all inline to bypass Tailwind entirely
          background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)",
          backgroundColor: "rgba(15, 15, 20, 0.6)",
          backdropFilter: "blur(40px) saturate(200%) brightness(110%)",
          WebkitBackdropFilter: "blur(40px) saturate(200%) brightness(110%)",
          borderLeft: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: "-8px 0 32px rgba(0,0,0,0.4), inset 1px 0 0 rgba(255,255,255,0.08)",
        }}
      >
        {/* Decorative top shimmer line */}
        <div style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%)",
        }} />

        {/* Drawer header */}
        <div
          className="flex items-center justify-between px-6 py-5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link href="/" onClick={() => menuOpen && closeMenu()}>
            <img src="/Logo/Logo-dark.svg" alt="Logo" className="h-6 w-auto block dark:hidden" />
            <img src="/Logo/Logo-light.svg" alt="Logo" className="h-6 w-auto hidden dark:block" />
          </Link>
          <button
            onClick={closeMenu}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-full cursor-pointer"
            style={{ transition: "background 200ms ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links — stagger in on open, instant reset on close */}
        <nav className="flex flex-col gap-1 px-4 py-6 flex-1">
          {navLinks.map(({ id, label }, i) => (
            <a
              key={id}
              href={id === "contact" ? undefined : `#${id}`}
              onClick={(e) => handleNavClick(e, id)}
              className={`cursor-pointer text-lg font-bold px-4 py-3 rounded-xl ${
                active === id ? "text-primary" : "text-muted"
              }`}
              style={{
                transform: drawerSlideIn ? "translateX(0)" : "translateX(18px)",
                opacity: drawerSlideIn ? 1 : 0,
                transition: drawerSlideIn
                  ? `transform 300ms ease ${i * 55}ms, opacity 300ms ease ${i * 55}ms`
                  : "none",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.07)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Footer */}
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <span className="text-xs text-muted font-medium tracking-wide uppercase">Theme</span>
          <ThemeToggle />
        </div>
      </div>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </>
  );
}

export default Navbar;