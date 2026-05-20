"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="z-50 size-8 rounded-full flex items-center justify-center 
                 bg-secondary active:scale-95 transition-all duration-300 group cursor-pointer"
    >
      <div className="relative size-6">
        {/* Sun Icon */}
        <Sun
          className={`absolute inset-0 size-6 text-yellow-500 transition-all duration-500 
            ${isDark ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`}
        />
        {/* Moon Icon */}
        <Moon
          className={`absolute inset-0 size-6 text-white transition-all duration-500 
            ${isDark ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`}
        />
      </div>
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
}