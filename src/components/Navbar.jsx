"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ThemeToggle from "./UI/ThemeToggle";
import { ContactModal } from './Contact';

const navLinks = [
    { id: "services", label: "Services" },
    { id: "process", label: "Process" },
    { id: "pricing", label: "Pricing" },
    { id: "contact", label: "Contact" },
];

function Navbar() {
    const [active, setActive] = useState("");
    const [contactOpen, setContactOpen] = useState(false);

    useEffect(() => {
        const observers = [];

        navLinks.forEach(({ id }) => {
            if (id === "contact") return; // no section to observe
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

    const handleScroll = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <nav className="fixed top-0 inset-x-0 z-50 mx-4 md:mx-8 flex justify-between items-center px-6 md:px-10 py-4 md:py-6 md:rounded-b-[40px] bg-secondary/80 backdrop-blur-md shadow-lg border border-white/10">
                <Link href="/">
                    <img src="/Logo/Logo-dark.svg" alt="Company Logo" className="h-7 md:h-8 w-auto block dark:hidden" />
                    <img src="/Logo/Logo-light.svg" alt="Company Logo" className="h-7 md:h-8 w-auto hidden dark:block" />
                </Link>

                <ul className="hidden sm:flex gap-8">
                    {navLinks.map(({ id, label }) => (
                        <li key={id}>

                            <a href={id === "contact" ? undefined : `#${id}`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (id === "contact") setContactOpen(true);
                                    else handleScroll(e, id);
                                }}
                                className={`cursor-pointer font-bold hover:text-primary transition-colors ${active === id ? "text-text-primary" : "text-muted"
                                    }`}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>

                 <ThemeToggle />
            </nav>

            {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
        </>
    );
}

export default Navbar;