"use client";

import { useState } from "react";

const cards = [
  {
    id: "01",
    topic: "DESIGNING",
    description:
      "Crafting clean, responsive interfaces with a focus on user experience — from wireframes and Figma prototypes to polished, pixel-perfect layouts that look great on every device.",
    image: "/images/Services/designing.png",
  },
  {
    id: "02",
    topic: "DEVELOPMENT",
    description:
      "Building fast, scalable web applications using Next.js, React, and modern full-stack tools — including CMS integration, REST APIs, authentication, and custom dashboards.",
    image: "/images/Services/development.png",
  },
  {
    id: "03",
    topic: "ANIMATIONS & AI",
    description:
      "Bringing sites to life with scroll animations, page transitions, and micro-interactions using GSAP and Framer Motion — plus AI integrations and automation for smarter digital experiences.",
    image: "/images/Services/ai.png",
  },
];

function Services() {
  const [active, setActive] = useState(0);

  return (
    <section id="services" className="flex flex-col mt-[clamp(80px,12vw,350px)] gap-12 lg:gap-20 w-full">

      {/* Header */}
      <div className="flex flex-col md:flex-row pl-6 md:px-0 md:pl-12 lg:pl-20 items-start md:items-center justify-between gap-6 md:gap-8">
        <h1 className="font-bebas tracking-wide text-6xl sm:text-7xl md:text-8xl lg:text-[104px] font-bold leading-none shrink-0">
          Services
        </h1>
        <div className="w-[60%] h-[50px] sm:h-[70px] md:h-[90px] lg:h-[119px] border-brand border-l-[12px] sm:border-l-[20px] md:border-l-[30px] lg:border-l-[39px] border-t-[12px] sm:border-t-[20px] md:border-t-[30px] lg:border-t-[39px] border-b-[12px] sm:border-b-[20px] md:border-b-[30px] lg:border-b-[39px] rounded-l-full self-end md:self-auto" />
      </div>

      {/* Body */}
      <div className="flex flex-col lg:flex-row w-full gap-6 lg:gap-10">

        {/* Image Panel — desktop only */}
        <div className="hidden lg:block relative lg:w-[40%] lg:h-[700px] rounded-r-[40px] overflow-hidden flex-shrink-0">
          {cards.map((card, i) => (
            <img
              key={i}
              src={card.image}
              alt={card.topic}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: active === i ? 1 : 0,
                transition: "opacity 900ms cubic-bezier(0.4, 0, 0.2, 1)",
                willChange: "opacity",
              }}
            />
          ))}
        </div>

        {/* Cards Panel */}
        <div className="flex flex-col gap-3 lg:gap-4 flex-1 px-4 sm:px-6 lg:pl-0 lg:pr-10">
          {cards.map((card, i) => (
            <div
              key={i}
              onMouseEnter={() => setActive(i)}
              onClick={() => setActive(i)}
              className="bg-secondary rounded-[24px] lg:rounded-[32px] overflow-hidden cursor-pointer"
              style={{
                transition: "opacity 300ms ease",
                opacity: active === i ? 1 : 0.6,
              }}
            >
              {/* Mobile/tablet inline image — expands on active */}
              <div
                className="block lg:hidden w-full overflow-hidden"
                style={{
                  height: active === i ? "clamp(140px, 40vw, 220px)" : "0px",
                  transition: "height 500ms cubic-bezier(0.4, 0, 0.2, 1)",
                }}
              >
                <img
                  src={card.image}
                  alt={card.topic}
                  className="w-full h-full object-cover"
                  style={{ height: "clamp(140px, 40vw, 220px)" }}
                />
              </div>

              {/* Card text content */}
              <div className="flex gap-6 sm:gap-10 lg:gap-20 px-6 py-6 sm:px-8 sm:py-8 lg:px-8 lg:py-10">
                <p className="font-satoshi text-[14px] lg:text-[16px] shrink-0 pt-1">{card.id}</p>
                <div>
                  <h1
                    className="font-bebas leading-none"
                    style={{ fontSize: "clamp(22px, 4vw, 40px)" }}
                  >
                    {card.topic}
                  </h1>
                  <p className="font-satoshi text-[13px] lg:text-[16px] font-normal text-muted mt-1">
                    {card.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Services;