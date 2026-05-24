'use client';

import Link from "next/link";
import { useContent } from "@/i18n/ContentContext";

export default function Footer() {
    const t = useContent("footer");

    const handleScroll = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <footer className="w-full bg-secondary border-t border-border flex flex-col mt-[clamp(80px,12vw,350px)]">
            
            <div className="w-full h-1.5 bg-brand" />

            <div className="w-full px-8 sm:px-16 lg:px-32 py-14 flex flex-col gap-16 lg:gap-24">
                
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
                    <h2 className="text-brand font-bebas font-medium leading-none text-5xl sm:text-6xl lg:text-7xl max-w-xl">
                        {t.cta}
                    </h2>
                    <p className="text-muted font-satoshi text-sm sm:text-base leading-relaxed max-w-sm lg:max-w-xs xl:max-w-sm">
                        {t.description}
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-10">
                    <div className="flex items-center gap-0 shrink-0">
                        <Link
                            className="flex items-center gap-2 font-bold text-[20px] text-foreground"
                            href="hero"
                            onClick={(e) => handleScroll(e, 'hero')}
                        >
                            <img src="/Logo/Logo-dark.svg"  alt="Company Logo" className="h-7 md:h-8 w-auto block dark:hidden" />
                            <img src="/Logo/Logo-light.svg" alt="Company Logo" className="h-7 md:h-8 w-auto hidden dark:block" />
                            <p>Good Developer</p>
                        </Link>
                    </div>

                    <nav className="flex flex-wrap gap-10 sm:gap-16 lg:gap-20 opacity-80">
                        <div className="flex flex-col gap-1 font-satoshi text-foreground text-sm font-medium leading-7">
                            <span className="text-muted text-xs uppercase tracking-widest mb-1">
                                {t.profileLabel}
                            </span>
                            <a href="#" className="hover:text-brand transition-colors duration-200">
                                {t.aboutLabel}
                            </a>
                        </div>

                        <div className="flex flex-col gap-1 font-satoshi text-foreground text-sm font-medium leading-7">
                            <span className="text-muted text-xs uppercase tracking-widest mb-1">
                                {t.navLabel}
                            </span>
                            {t.links.map(({ label, id }) => (
                                <a
                                    key={id}
                                    href={id}
                                    onClick={(e) => handleScroll(e, id)}
                                    className="hover:text-brand transition-colors duration-200"
                                >
                                    {label}
                                </a>
                            ))}
                        </div>
                    </nav>
                </div>
            </div>

            <div className="w-full h-px bg-border" />

            <div className="w-full px-8 sm:px-16 lg:px-32 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                <p className="text-muted font-satoshi text-xs">
                    {t.copyright(new Date().getFullYear())}
                </p>
            </div>
        </footer>
    );
}
