"use client"
import { useState } from 'react'
import { motion } from 'framer-motion'
import DotBg from './UI/Dot-bg'
import SkillsMarquee from './UI/Skillsmarquee'
import { ContactModal } from './Contact'
import { useContent } from "@/i18n/ContentContext"

function HeroSection({ hidden = false }) {
  const t = useContent("hero")
  const [contactOpen, setContactOpen] = useState(false)

  return (
    <section className="relative overflow-hidden" id='hero'>
      <DotBg className="flex flex-col items-center pt-32 sm:pt-40 lg:pt-50 pb-10 min-h-screen">

        <div className="relative flex flex-col top-30 sm:top-20 md:top-10 items-center leading-none w-full">
          <h1
            className="flex font-bebas leading-none text-text-primary"
            style={{ fontSize: 'clamp(70px, 14vw, 180px)' }}
          >
            <span className="flex flex-col text-right leading-[0.82]">
              <span>GO</span>
              <span>DEVEL</span>
            </span>

            <span
              className="pill-container flex flex-col justify-center"
              style={{ height: '1.55em', marginInline: '0.05em', gap: '0.07em' }}
            >
              <span
                className="pill-top block rounded-full border-[#FEAF3A]"
                style={{ width: '0.3em', borderWidth: '0.09em' }}
              />
              <span
                className="pill-bottom block rounded-full border-[#FEAF3A]"
                style={{ width: '0.3em', borderWidth: '0.09em' }}
              />
            </span>

            <span className="flex flex-col text-left leading-[0.82]">
              <span>D</span>
              <span>PER</span>
            </span>
          </h1>

          <p
            className="text-text-primary tracking-wide leading-none font-medium font-satoshi mt-2"
            style={{ fontSize: 'clamp(10px, 1.5vw, 30.69px)' }}
          >
            {t.tagline}
          </p>

          <p className="font-satoshi text-[12px] sm:text-sm lg:text-base font-normal leading-6 max-w-[220px] sm:max-w-[260px] mt-10 text-left self-start ml-4 sm:ml-8 md:self-auto md:ml-[60%]">
            {t.description}
          </p>
        </div>

        <div className="relative flex items-center justify-center mt-40 right-[-25%] md:left-0 md:mt-10">
          <motion.button
            onClick={() => setContactOpen(true)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              type: 'spring',
              stiffness: 100,
              damping: 15,
            }}
            className="relative z-10 px-4 h-12 md:h-16 cursor-pointer flex justify-center gap-2 md:gap-3 items-center rounded-full bg-foreground text-[11px] md:text-sm text-white dark:text-black font-satoshi font-bold shadow-xl active:scale-95 transition-transform"
          >
            <div className="w-7 h-7 md:w-10 md:h-10 bg-[#FF0000] rounded-full shrink-0" />
            <p className="whitespace-nowrap">{t.cta}</p>

            <div
              className={`${hidden ? 'hidden' : 'block'} absolute w-3 h-3 sm:w-4 sm:h-4 bg-[#FE6E6E] border-[2px] sm:border-[3px] border-foreground rounded-full -right-0 -top-0`}
            >
              <motion.span
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
                className="absolute inset-0 bg-[#FE6E6E] rounded-full"
              />
            </div>
          </motion.button>
        </div>

        <div className="mt-auto pt-16 w-full">
          <SkillsMarquee />
        </div>

      </DotBg>

      {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
    </section>
  )
}

export default HeroSection
