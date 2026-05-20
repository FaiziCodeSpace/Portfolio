import React from "react";
// Import entire icon sets as objects
import * as SiIcons from "react-icons/si";
import * as TbIcons from "react-icons/tb";

const defaultSkills = [
  { lib: "si", name: "SiReact", label: "React", color: "#61DAFB" },
  { lib: "si", name: "SiNextdotjs", label: "Next.js", color: "#61DAFB" },
  { lib: "si", name: "SiTailwindcss", label: "Tailwind", color: "#38BDF8" },
  { lib: "si", name: "SiTypescript", label: "TypeScript", color: "#3178C6" },
  { lib: "si", name: "SiJavascript", label: "JavaScript", color: "#F7DF1E" },
  { lib: "si", name: "SiNodedotjs", label: "Node.js", color: "#339933" },
  { lib: "si", name: "SiExpress", label: "Express", color: "#239120" },
  { lib: "si", name: "SiMongodb", label: "MongoDB", color: "#47A248" },
  { lib: "si", name: "SiAppwrite", label: "Appwrite", color: "#FD366E" },
  { lib: "tb", name: "TbBrandCSharp", label: "C#", color: "#239120" },
  { lib: "si", name: "SiCss3", label: "CSS", color: "#1572B6" },
  { lib: "si", name: "SiFigma", label: "Figma", color: "#F24E1E" },
  { lib: "si", name: "SiPostman", label: "Postman", color: "#FF6C37" },
  { lib: "si", name: "SiGit", label: "Git", color: "#F05032" },
];

function SkillItem({ item }) {
  // Dynamically select the icon from the correct library object
  const IconLib = item.lib === "si" ? SiIcons : TbIcons;
  const IconComponent = IconLib[item.name];

  if (!IconComponent) return null;

  return (
    <div className="group inline-flex items-center gap-3 px-8 shrink-0 select-none cursor-pointer">
      <span 
        className="text-2xl grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out transform group-hover:scale-110"
        style={{ '--icon-color': item.color }}
      >
        <IconComponent className="group-hover:text-[var(--icon-color)] transition-colors duration-300" />
      </span>
      <span className="font-mono text-[13px] font-medium tracking-wider text-zinc-400 group-hover:text-text-primary transition-colors duration-300">
        {item.label}
      </span>
      <span className="ml-6 text-xl font-light text-zinc-800 group-hover:text-zinc-600 transition-colors duration-300">
        ·
      </span>
    </div>
  );
}

export default function SkillsMarquee({ items = defaultSkills, speed = 30 }) {
  const repeated = [...items, ...items, ...items];
  const duration = `${(items.length * 150) / speed}s`;

  return (
    <>
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(calc(-100% / 3)); }
        }
        .marquee-track {
          animation: marquee-scroll ${duration} linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div className="relative w-full overflow-hidden bg-background py-5 opacity-60">
        {/* Visual Fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-background to-transparent" />

        <div className="flex items-center overflow-hidden">
          <div className="marquee-track flex items-center w-max">
            {repeated.map((skill, i) => (
              <SkillItem key={i} item={skill} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}