'use client';

import Link from "next/link";
export default function Footer() {
    const handleScroll = (e, id) => {
        e.preventDefault();
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };
    return (
        <footer className="w-full bg-zinc-900 flex flex-col mt-[clamp(80px,12vw,350px)]">
            {/* Top amber border */}
            <div className="w-full h-1.5 bg-brand" />

            <div className="w-full px-8 sm:px-16 lg:px-32 py-14 flex flex-col gap-16 lg:gap-24">
                {/* Top row: headline + testimonial */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">
                    <h2
                        className="text-brand font-bebas font-medium leading-none
                       text-5xl sm:text-6xl lg:text-7xl
                       max-w-xl"
                    >
                        Let's work with us
                    </h2>

                    <p
                        className="text-white/80 font-satoshi text-sm sm:text-base leading-relaxed
                       max-w-sm lg:max-w-xs xl:max-w-sm"
                    >
                        Open to short-term, recurring, and full-time collaborations — focused on delivering high-quality work with consistency, attention to detail, and clear communication.

                    </p>
                </div>

                {/* Bottom row: logo + nav links */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-10">
                    {/* Logo — "GO□□D" style */}
                    <div className="flex items-center gap-0 shrink-0">
                        <Link className="flex items-center gap-2 font-bold text-[20px]" href="hero"
                            onClick={(e) => handleScroll(e, 'hero')}>
                            {/* Light mode logo */}
                            <img
                                src="/Logo/Logo-dark.svg"
                                alt="Company Logo"
                                className="h-7 md:h-8 w-auto block dark:hidden"
                            />
                            {/* Dark mode logo */}
                            <img
                                src="/Logo/Logo-light.svg"
                                alt="Company Logo"
                                className="h-7 md:h-8 w-auto hidden dark:block"
                            />
                            <p>Good Developer</p>
                        </Link>
                    </div>

                    {/* Nav columns */}
                    <nav className="flex flex-wrap gap-10 sm:gap-16 lg:gap-20 opacity-70">
                        {/* Company */}
                        <div className="flex flex-col gap-1 font-satoshi text-white text-sm font-medium leading-7">
                            <span className="text-white/50 text-xs uppercase tracking-widest mb-1">
                                Profile
                            </span>
                            <a href="#" className="hover:text-brand transition-colors duration-200">About me</a>
                        </div>

                        {/* Blog */}
                        <div className="flex flex-col gap-1 font-satoshi text-white text-sm font-medium leading-7">
                            <span className="text-white/50 text-xs uppercase tracking-widest mb-1">
                                Blog
                            </span>
                            <a href="#" className="hover:text-brand transition-colors duration-200">Careers</a>
                            <a href="#" className="hover:text-brand transition-colors duration-200">Our Work</a>
                            <a href="#" className="hover:text-brand transition-colors duration-200">Reviews</a>
                        </div>


                        <div className="flex flex-col gap-1 font-satoshi text-white text-sm font-medium leading-7">
                            <span className="text-white/50 text-xs uppercase tracking-widest mb-1">
                                Navigation
                            </span>
                            <a
                                href="hero"
                                onClick={(e) => handleScroll(e, 'hero')}
                                className="hover:text-brand transition-colors duration-200">Landing</a>
                            <a
                                href="process"
                                onClick={(e) => handleScroll(e, 'process')}
                                className="hover:text-brand transition-colors duration-200">Process</a>
                            <a
                                href="pricing"
                                onClick={(e) => handleScroll(e, 'pricing')}
                                className="hover:text-brand transition-colors duration-200">Pricing</a>
                            <a
                                href="testimonials"
                                onClick={(e) => handleScroll(e, 'testimonials')}
                                className="hover:text-brand transition-colors duration-200">Testimonials</a>
                        </div>
                    </nav>
                </div>
            </div>

            {/* Bottom border */}
            <div className="w-full h-px bg-white/10" />
            <div className="w-full px-8 sm:px-16 lg:px-32 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
                <p className="text-white/30 font-satoshi text-xs">
                    © {new Date().getFullYear()} Good Developer. All rights reserved.
                </p>
                <div className="flex gap-6">
                    {["Privacy", "Terms", "Cookies"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-white/30 font-satoshi text-xs hover:text-brand transition-colors duration-200"
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}