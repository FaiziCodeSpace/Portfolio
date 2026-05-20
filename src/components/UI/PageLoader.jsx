"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"

export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)
  const [mounted, setMounted] = useState(false)
  const { resolvedTheme } = useTheme()

  // Wait for client mount before reading theme — prevents SSR mismatch
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    let raf
    let start = null
    const duration = 1800

    function step(ts) {
      if (!start) start = ts
      const elapsed = ts - start
      const t = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.floor(eased * 85))
      if (t < 1) raf = requestAnimationFrame(step)
    }

    raf = requestAnimationFrame(step)

    const onLoad = () => {
      cancelAnimationFrame(raf)
      setProgress(100)
      setTimeout(() => setVisible(false), 500)
    }

    if (document.readyState === "complete") {
      onLoad()
    } else {
      window.addEventListener("load", onLoad)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("load", onLoad)
    }
  }, [])

  // Always render with light theme values until mounted — avoids hydration diff
  const isDark = mounted && resolvedTheme === "dark"

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: isDark ? "#09090b" : "#ffffff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          {/* Logo — only render once we know the theme */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {mounted && (
              <img
                src={isDark ? "/Logo/Logo-light.svg" : "/Logo/Logo-dark.svg"}
                alt="Logo"
                style={{ width: 56, height: 56 }}
              />
            )}
          </motion.div>

          {/* Bar track */}
          <div
            style={{
              width: "clamp(180px, 28vw, 320px)",
              height: "2px",
              borderRadius: "999px",
              backgroundColor: isDark ? "#27272a" : "#e4e4e7",
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                borderRadius: "999px",
                backgroundColor: "#FEAF3A",
                transformOrigin: "left center",
              }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontFamily: "var(--font-satoshi-next), ui-sans-serif, system-ui",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.12em",
              color: isDark ? "#71717a" : "#a1a1aa",
              marginTop: "-1.5rem",
              minWidth: "3ch",
              textAlign: "center",
            }}
          >
            {progress}%
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}