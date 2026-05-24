/**
 * Content Variants
 * ─────────────────────────────────────────────
 * variant: "individual"  → default route  /
 * variant: "team"        → agency English  /tm
 * variant: "de"          → agency German   /de
 *
 * To add a new language or brand style, duplicate one of the
 * objects below and add its key + route mapping to VARIANT_MAP.
 */

export const VARIANT_MAP = {
  "/": "individual",
  "/tm": "team",
  "/de": "de",
};

// ─── Meta ──────────────────────────────────────────────────────────────────
const meta = {
  individual: {
    title: "Good Developer",
    description:
      "Full-stack developer specializing in Next.js, React, and modern web applications. Available for short-term, recurring, and full-time projects.",
    lang: "en",
  },
  team: {
    title: "Good Developer — Agency",
    description:
      "Full-stack agency specializing in Next.js, React, and modern web applications. Available for short-term, recurring, and full-time engagements.",
    lang: "en",
  },
  de: {
    title: "Good Developer — Agentur",
    description:
      "Full-Stack-Agentur spezialisiert auf Next.js, React und moderne Webanwendungen. Verfügbar für kurzfristige, wiederkehrende und langfristige Projekte.",
    lang: "de",
  },
};

// ─── Navbar ────────────────────────────────────────────────────────────────
const navbar = {
  individual: {
    links: [
      { id: "services", label: "Services" },
      { id: "process", label: "Process" },
      { id: "pricing", label: "Pricing" },
      { id: "contact", label: "Contact" },
    ],
  },
  team: {
    links: [
      { id: "services", label: "Services" },
      { id: "process", label: "Process" },
      { id: "pricing", label: "Pricing" },
      { id: "contact", label: "Contact" },
    ],
  },
  de: {
    links: [
      { id: "services", label: "Leistungen" },
      { id: "process", label: "Prozess" },
      { id: "pricing", label: "Preise" },
      { id: "contact", label: "Kontakt" },
    ],
  },
};

// ─── Hero ──────────────────────────────────────────────────────────────────
const hero = {
  individual: {
    tagline: "Your development partner.",
    description:
      "Hire me for short-term, recurring, or full-time projects — delivering precise results that exceed expectations.",
    cta: "CHAT WITH FAIZAN",
  },
  team: {
    tagline: "Your development partner.",
    description:
      "Hire us for short-term, recurring, or full-time projects — delivering precise results that exceed expectations.",
    cta: "WORK WITH US",
  },
  de: {
    tagline: "Ihr Entwicklungspartner.",
    description:
      "Beauftragen Sie uns für kurzfristige, wiederkehrende oder langfristige Projekte — präzise Ergebnisse, die Ihre Erwartungen übertreffen.",
    cta: "JETZT ANFRAGEN",
  },
};

// ─── Services ─────────────────────────────────────────────────────────────
const services = {
  individual: {
    heading: "Services",
    cards: [
      {
        id: "01",
        topic: "DESIGNING",
        description:
          "Crafting clean, responsive interfaces with a focus on user experience — from wireframes and Figma prototypes to polished, pixel-perfect layouts that look great on every device.",
        image: "/images/Services/designing.jpg",
      },
      {
        id: "02",
        topic: "DEVELOPMENT",
        description:
          "Building fast, scalable web applications using Next.js, React, and modern full-stack tools — including CMS integration, REST APIs, authentication, and custom dashboards.",
        image: "/images/Services/development.jpg",
      },
      {
        id: "03",
        topic: "ANIMATIONS & AI",
        description:
          "Bringing sites to life with scroll animations, page transitions, and micro-interactions using GSAP and Framer Motion — plus AI integrations and automation for smarter digital experiences.",
        image: "/images/Services/ai.jpg",
      },
    ],
  },
  team: {
    heading: "Services",
    cards: [
      {
        id: "01",
        topic: "DESIGNING",
        description:
          "We craft clean, responsive interfaces with a focus on user experience — from wireframes and Figma prototypes to polished, pixel-perfect layouts that look great on every device.",
        image: "/images/Services/designing.jpg",
      },
      {
        id: "02",
        topic: "DEVELOPMENT",
        description:
          "We build fast, scalable web applications using Next.js, React, and modern full-stack tools — including CMS integration, REST APIs, authentication, and custom dashboards.",
        image: "/images/Services/development.jpg",
      },
      {
        id: "03",
        topic: "ANIMATIONS & AI",
        description:
          "We bring sites to life with scroll animations, page transitions, and micro-interactions using GSAP and Framer Motion — plus AI integrations and automation for smarter digital experiences.",
        image: "/images/Services/ai.jpg",
      },
    ],
  },
  de: {
    heading: "Leistungen",
    cards: [
      {
        id: "01",
        topic: "DESIGN",
        description:
          "Wir gestalten klare, responsive Interfaces mit Fokus auf User Experience — von Wireframes und Figma-Prototypen bis hin zu pixelgenauen Layouts, die auf jedem Gerät überzeugen.",
        image: "/images/Services/designing.jpg",
      },
      {
        id: "02",
        topic: "ENTWICKLUNG",
        description:
          "Wir entwickeln schnelle, skalierbare Webanwendungen mit Next.js, React und modernen Full-Stack-Tools — inklusive CMS-Integration, REST-APIs, Authentifizierung und individuellen Dashboards.",
        image: "/images/Services/development.jpg",
      },
      {
        id: "03",
        topic: "ANIMATIONEN & KI",
        description:
          "Wir erwecken Websites mit Scroll-Animationen, Seitenübergängen und Micro-Interactions zum Leben — ergänzt durch KI-Integrationen und Automatisierungen für intelligentere digitale Erlebnisse.",
        image: "/images/Services/ai.jpg",
      },
    ],
  },
};

// ─── Work / Process ────────────────────────────────────────────────────────
const work = {
  individual: {
    header: "How I Work",
    phases: [
      {
        image: "/images/Strategy/Strategy-Thumbnail.jpg",
        name: "Strategy",
        link: "www.khakigemstone.com",
        tag: "Phase 01",
        images: [
          {
            src: "/images/Strategy/Strategy-1.jpg",
            title: "Discovery Call",
            description:
              "Every project starts with a live conversation. I sit down with you to understand your goals, your users, and the competitive landscape. No templates, no assumptions, just focused questions and real listening.",
            detail:
              "I map out success metrics, project constraints, and non-negotiables before a single pixel is touched.",
          },
          {
            src: "/images/Strategy/Strategy-2.jpg",
            title: "Research & Analysis",
            description:
              "Once I understand your world, I go deep. Competitor audits, user persona mapping, market positioning, all synthesized into a working strategy board that we align around together.",
            detail:
              "Deliverable: a shared research board with findings, personas, and opportunity gaps clearly defined.",
          },
          {
            src: "/images/Strategy/Strategy-3.jpg",
            title: "Roadmap & Sign-off",
            description:
              "Strategy without a plan is just talk. I translate all research into a concrete project roadmap, phases, timelines, deliverables, and milestones, then walk you through every line before you approve.",
            detail:
              "Nothing moves to design until the roadmap has your written sign-off. This protects you and me.",
          },
        ],
        details: [
          { label: "Discovery", value: "Market research & competitor analysis" },
          { label: "Workshops", value: "Stakeholder alignment sessions" },
          { label: "Deliverable", value: "Brand strategy document & roadmap" },
        ],
      },
      {
        image: "/images/Designing/Designing-thumbnail.jpg",
        name: "Designing",
        link: "www.khakigemstone.com",
        tag: "Phase 02",
        images: [
          {
            src: "/images/Designing/Designing-1.jpg",
            title: "Wireframes & Structure",
            description:
              "Before any colour or style, I map out the skeleton of every screen. Wireframes define layout, hierarchy, and user flow, solving structural problems early, when changes are cheap.",
            detail: "Wireframes are reviewed and approved before I move into visual design.",
          },
          {
            src: "/images/Designing/Designing-2.jpg",
            title: "Visual Design",
            description:
              "With structure locked in, I apply the full visual layer, typography, colour system, spacing, motion. Every decision is rooted in your brand and the strategy we built together.",
            detail: "Deliverable: a complete Figma file with all screens, components, and design tokens.",
          },
          {
            src: "/images/Designing/Designing-3.jpg",
            title: "Prototype & Handoff",
            description:
              "Interactive prototypes let you feel the product before it's built. I click through every flow, collect your feedback, finalise every detail, then hand off a developer-ready Figma file.",
            detail: "Two revision rounds are included. Additional rounds are scoped separately.",
          },
        ],
        details: [
          { label: "UI/UX", value: "Wireframes, prototypes & final visuals" },
          { label: "System", value: "Design tokens & component library" },
          { label: "Deliverable", value: "Figma source files & style guide" },
        ],
      },
      {
        image: "/images/Developer/Developer-thumbnail.jpg",
        name: "Development",
        link: "www.khakigemstone.com",
        tag: "Phase 03",
        images: [
          {
            src: "/images/Developer/Developer-1.jpg",
            title: "Architecture & Setup",
            description:
              "I scaffold the project with the right stack for your scale, Next.js, Tailwind, headless CMS, or no-code depending on your needs. CI/CD pipelines and code standards are set from day one.",
            detail:
              "Every project follows a structured repo, code review process, and deployment pipeline.",
          },
          {
            src: "/images/Developer/Developer-2.jpg",
            title: "Build & Review",
            description:
              "Components are built in isolation, tested, then assembled into full pages. You have access to a staging environment throughout, so you can follow progress in real time and flag anything early.",
            detail: "Weekly check-ins keep you in the loop without slowing things down.",
          },
          {
            src: "/images/Developer/Developer-3.jpg",
            title: "Launch & Handoff",
            description:
              "When everything is tested and approved, I deploy to production. You receive a full handoff, documented codebase, CMS training, and a post-launch window for any immediate fixes.",
            detail:
              "Post-launch support packages are available for ongoing maintenance and feature work.",
          },
        ],
        details: [
          { label: "Stack", value: "Next.js, React, Tailwind, Node.js" },
          { label: "Integration", value: "APIs, CMS, Auth & databases" },
          { label: "Deliverable", value: "Production-ready codebase & handoff" },
        ],
      },
    ],
  },

  team: {
    header: "How We Work",
    phases: [
      {
        image: "/images/Strategy/Strategy-Thumbnail.jpg",
        name: "Strategy",
        link: "www.khakigemstone.com",
        tag: "Phase 01",
        images: [
          {
            src: "/images/Strategy/Strategy-1.jpg",
            title: "Discovery Call",
            description:
              "Every project starts with a live conversation. We sit down with you to understand your goals, your users, and the competitive landscape. No templates, no assumptions, just focused questions and real listening.",
            detail:
              "We map out success metrics, project constraints, and non-negotiables before a single pixel is touched.",
          },
          {
            src: "/images/Strategy/Strategy-2.jpg",
            title: "Research & Analysis",
            description:
              "Once we understand your world, we go deep. Competitor audits, user persona mapping, market positioning, all synthesized into a working strategy board that we align around together.",
            detail:
              "Deliverable: a shared research board with findings, personas, and opportunity gaps clearly defined.",
          },
          {
            src: "/images/Strategy/Strategy-3.jpg",
            title: "Roadmap & Sign-off",
            description:
              "Strategy without a plan is just talk. We translate all research into a concrete project roadmap, phases, timelines, deliverables, and milestones, then walk you through every line before you approve.",
            detail:
              "Nothing moves to design until the roadmap has your written sign-off. This protects you and our team.",
          },
        ],
        details: [
          { label: "Discovery", value: "Market research & competitor analysis" },
          { label: "Workshops", value: "Stakeholder alignment sessions" },
          { label: "Deliverable", value: "Brand strategy document & roadmap" },
        ],
      },
      {
        image: "/images/Designing/Designing-thumbnail.jpg",
        name: "Designing",
        link: "www.khakigemstone.com",
        tag: "Phase 02",
        images: [
          {
            src: "/images/Designing/Designing-1.jpg",
            title: "Wireframes & Structure",
            description:
              "Before any colour or style, we map out the skeleton of every screen. Wireframes define layout, hierarchy, and user flow, solving structural problems early, when changes are cheap.",
            detail: "Wireframes are reviewed and approved before we move into visual design.",
          },
          {
            src: "/images/Designing/Designing-2.jpg",
            title: "Visual Design",
            description:
              "With structure locked in, we apply the full visual layer, typography, colour system, spacing, motion. Every decision is rooted in your brand and the strategy we built together.",
            detail: "Deliverable: a complete Figma file with all screens, components, and design tokens.",
          },
          {
            src: "/images/Designing/Designing-3.jpg",
            title: "Prototype & Handoff",
            description:
              "Interactive prototypes let you feel the product before it's built. We walk through every flow, collect your feedback, finalise every detail, then hand off a developer-ready Figma file.",
            detail: "Two revision rounds are included. Additional rounds are scoped separately.",
          },
        ],
        details: [
          { label: "UI/UX", value: "Wireframes, prototypes & final visuals" },
          { label: "System", value: "Design tokens & component library" },
          { label: "Deliverable", value: "Figma source files & style guide" },
        ],
      },
      {
        image: "/images/Developer/Developer-thumbnail.jpg",
        name: "Development",
        link: "www.khakigemstone.com",
        tag: "Phase 03",
        images: [
          {
            src: "/images/Developer/Developer-1.jpg",
            title: "Architecture & Setup",
            description:
              "We scaffold the project with the right stack for your scale, Next.js, Tailwind, headless CMS, or no-code depending on your needs. CI/CD pipelines and code standards are set from day one.",
            detail:
              "Every project follows a structured repo, code review process, and deployment pipeline.",
          },
          {
            src: "/images/Developer/Developer-2.jpg",
            title: "Build & Review",
            description:
              "Components are built in isolation, tested, then assembled into full pages. You have access to a staging environment throughout, so you can follow our progress in real time and flag anything early.",
            detail: "Weekly check-ins keep you in the loop without slowing us down.",
          },
          {
            src: "/images/Developer/Developer-3.jpg",
            title: "Launch & Handoff",
            description:
              "When everything is tested and approved, we deploy to production. You receive a full handoff, documented codebase, CMS training, and a post-launch window for any immediate fixes.",
            detail:
              "Post-launch support packages are available for ongoing maintenance and feature work.",
          },
        ],
        details: [
          { label: "Stack", value: "Next.js, React, Tailwind, Node.js" },
          { label: "Integration", value: "APIs, CMS, Auth & databases" },
          { label: "Deliverable", value: "Production-ready codebase & handoff" },
        ],
      },
    ],
  },

  de: {
    header: "Wie wir arbeiten",
    phases: [
      {
        image: "/images/Strategy/Strategy-Thumbnail.jpg",
        name: "Strategie",
        link: "www.khakigemstone.com",
        tag: "Phase 01",
        images: [
          {
            src: "/images/Strategy/Strategy-1.jpg",
            title: "Discovery Call",
            description:
              "Jedes Projekt beginnt mit einem persönlichen Gespräch. Wir setzen uns mit Ihnen zusammen, um Ihre Ziele, Ihre Nutzer und den Wettbewerb zu verstehen — keine Vorlagen, keine Annahmen, nur gezielte Fragen und echtes Zuhören.",
            detail:
              "Wir definieren Erfolgskennzahlen, Projektgrenzen und Nicht-Verhandelbarkeiten, bevor auch nur ein Pixel gesetzt wird.",
          },
          {
            src: "/images/Strategy/Strategy-2.jpg",
            title: "Recherche & Analyse",
            description:
              "Sobald wir Ihre Welt verstehen, gehen wir in die Tiefe. Wettbewerbsanalysen, User-Persona-Mapping, Marktpositionierung — alles zusammengefasst in einem gemeinsamen Strategie-Board.",
            detail:
              "Ergebnis: ein gemeinsames Research-Board mit klaren Erkenntnissen, Personas und Potenzialen.",
          },
          {
            src: "/images/Strategy/Strategy-3.jpg",
            title: "Roadmap & Freigabe",
            description:
              "Strategie ohne Plan ist nur Theorie. Wir übersetzen alle Erkenntnisse in eine konkrete Projekt-Roadmap — mit Phasen, Zeitplänen und Meilensteinen — und gehen diese gemeinsam mit Ihnen durch.",
            detail:
              "Nichts wird umgesetzt, bis die Roadmap Ihre schriftliche Freigabe hat. Das schützt Sie und unser Team.",
          },
        ],
        details: [
          { label: "Analyse", value: "Marktforschung & Wettbewerbsanalyse" },
          { label: "Workshops", value: "Stakeholder-Alignment-Sessions" },
          { label: "Ergebnis", value: "Markenstrategie-Dokument & Roadmap" },
        ],
      },
      {
        image: "/images/Designing/Designing-thumbnail.jpg",
        name: "Design",
        link: "www.khakigemstone.com",
        tag: "Phase 02",
        images: [
          {
            src: "/images/Designing/Designing-1.jpg",
            title: "Wireframes & Struktur",
            description:
              "Vor Farbe oder Stil legen wir das Grundgerüst jedes Bildschirms fest. Wireframes definieren Layout, Hierarchie und Nutzerfluss — strukturelle Probleme werden früh gelöst, wenn Änderungen noch günstig sind.",
            detail: "Wireframes werden überprüft und freigegeben, bevor wir mit dem Visual Design beginnen.",
          },
          {
            src: "/images/Designing/Designing-2.jpg",
            title: "Visuelles Design",
            description:
              "Mit gesicherter Struktur bringen wir die vollständige visuelle Ebene ein — Typografie, Farbsystem, Abstände, Motion. Jede Entscheidung basiert auf Ihrer Marke und der gemeinsam erarbeiteten Strategie.",
            detail: "Ergebnis: eine vollständige Figma-Datei mit allen Screens, Komponenten und Design-Tokens.",
          },
          {
            src: "/images/Designing/Designing-3.jpg",
            title: "Prototyp & Übergabe",
            description:
              "Interaktive Prototypen lassen Sie das Produkt fühlen, bevor es gebaut ist. Wir gehen jeden Flow durch, nehmen Ihr Feedback auf und übergeben eine entwicklungsfertige Figma-Datei.",
            detail: "Zwei Überarbeitungsrunden sind inklusive. Weitere Runden werden separat vereinbart.",
          },
        ],
        details: [
          { label: "UI/UX", value: "Wireframes, Prototypen & finale Designs" },
          { label: "System", value: "Design-Tokens & Komponentenbibliothek" },
          { label: "Ergebnis", value: "Figma-Quelldateien & Style Guide" },
        ],
      },
      {
        image: "/images/Developer/Developer-thumbnail.jpg",
        name: "Entwicklung",
        link: "www.khakigemstone.com",
        tag: "Phase 03",
        images: [
          {
            src: "/images/Developer/Developer-1.jpg",
            title: "Architektur & Setup",
            description:
              "Wir wählen den richtigen Tech-Stack für Ihre Anforderungen — Next.js, Tailwind, Headless CMS oder No-Code. CI/CD-Pipelines und Code-Standards werden von Beginn an eingerichtet.",
            detail:
              "Jedes Projekt folgt einer strukturierten Repository-Struktur, einem Code-Review-Prozess und einer Deployment-Pipeline.",
          },
          {
            src: "/images/Developer/Developer-2.jpg",
            title: "Entwicklung & Review",
            description:
              "Komponenten werden isoliert entwickelt, getestet und zu vollständigen Seiten zusammengesetzt. Sie haben während des gesamten Prozesses Zugriff auf eine Staging-Umgebung und können jederzeit Feedback geben.",
            detail: "Wöchentliche Check-ins halten Sie auf dem Laufenden, ohne uns zu bremsen.",
          },
          {
            src: "/images/Developer/Developer-3.jpg",
            title: "Launch & Übergabe",
            description:
              "Wenn alles getestet und freigegeben ist, deployen wir in die Produktion. Sie erhalten eine vollständige Übergabe, dokumentierten Quellcode, CMS-Schulung und ein Zeitfenster für sofortige Korrekturen nach dem Launch.",
            detail:
              "Post-Launch-Support-Pakete sind für laufende Wartung und neue Features verfügbar.",
          },
        ],
        details: [
          { label: "Stack", value: "Next.js, React, Tailwind, Node.js" },
          { label: "Integration", value: "APIs, CMS, Auth & Datenbanken" },
          { label: "Ergebnis", value: "Produktionsfertiger Code & Übergabe" },
        ],
      },
    ],
  },
};

// ─── Case Study ────────────────────────────────────────────────────────────
const caseStudy = {
  individual: {
    eyebrow: "MY PROJECTS",
    heading: "Case study",
    stats: {
      timeLabel: "Total Development Time",
      timeUnit: "Hours",
      componentsLabel: "Components Created",
      pagesLabel: "Pages Created",
      repoLabel: "Visit Git Repo",
      repoLink: "Visit Now",
    },
    projects: [
      {
        title:
          "Multi-Portal E-Commerce Platform for Certified Natural Gemstones with Investor & CMS Integration",
        tags: [
          { label: "E-Commerce", color: "#4C70EC" },
          { label: "CMS", color: "#FE9E48" },
          { label: "MERN", color: "#3CC9A7" },
          { label: "Investor Portal", color: "#A855F7" },
        ],
        description:
          "A full-stack MERN e-commerce platform built across three interconnected portals. The public storefront showcases certified natural gemstones with a trust-focused UI, secure checkout, and full input validation. The investor portal lets approved investors fund specific listings and automatically receive profit-share payouts upon sale. The CMS-powered admin panel gives full control over products, taxonomy, investor approvals, payout requests, testimonials, orders, and bargainer applications — all from a single real-time dashboard.",
        hours: "120+",
        pages: "40+",
        liveUrl: "https://github.com/FaiziCodeSpace/khaki-gemstone.git",
        image: "/images/Khakigemstone/Image-1.jpg",
      },
      {
        title:
          "Smart Stamp Generator & AgentHub — Car Dealer Document & Field Agent Platform",
        tags: [
          { label: "PDF Generation", color: "#EF4444" },
          { label: "Urdu OCR", color: "#FE9E48" },
          { label: "Geolocation", color: "#3CC9A7" },
          { label: "Multi-Portal", color: "#6366F1" },
        ],
        description:
          "A dual-portal web app built for the car dealership industry. The stamp portal lets users upload a stamp paper, fill a dynamic template, and auto-generate a formatted PDF via jsPDF — with an Urdu OCR API to read and parse Urdu-language stamp documents, eliminating manual PDF editing entirely. The AgentHub portal lets car bargainers register, get admin-approved, then browse a live list of nearby agents. One tap opens WhatsApp with the bargainer's GPS coordinates pre-embedded, so the agent can navigate directly via Google Maps — no back-and-forth needed.",
        hours: "80+",
        pages: "20+",
        liveUrl: "https://github.com/FaiziCodeSpace/khaki-gemstone.git",
        image: "/images/Agenthub/Image-1.jpg",
      },
      {
        title:
          "Personal Developer Portfolio — Next.js Web App with Multi-Section UI & Theme System",
        tags: [
          { label: "Next.js", color: "#4C70EC" },
          { label: "Tailwind CSS", color: "#3CC9A7" },
          { label: "UI/UX", color: "#A855F7" },
          { label: "Dark Mode", color: "#FE9E48" },
        ],
        description:
          "A fully custom developer portfolio built with Next.js and Tailwind CSS, featuring a component-driven architecture across sections including Hero, Services, Work, Case Studies, Pricing, Testimonials, and Footer. Includes a light/dark theme system with a custom Theme Provider, a skills marquee, dot-pattern backgrounds, and fluid responsive typography using locally hosted Satoshi fonts. Every section is designed from scratch — no UI kits, no templates.",
        hours: "20+",
        components: "15+",
        liveUrl: "https://github.com/FaiziCodeSpace/Portfolio.git",
        image: "/images/Portfolio/Image-1.jpg",
      },
    ],
  },

  team: {
    eyebrow: "OUR PROJECTS",
    heading: "Case study",
    stats: {
      timeLabel: "Total Development Time",
      timeUnit: "Hours",
      componentsLabel: "Components Created",
      pagesLabel: "Pages Created",
      repoLabel: "Visit Git Repo",
      repoLink: "Visit Now",
    },
    projects: [
      {
        title:
          "Multi-Portal E-Commerce Platform for Certified Natural Gemstones with Investor & CMS Integration",
        tags: [
          { label: "E-Commerce", color: "#4C70EC" },
          { label: "CMS", color: "#FE9E48" },
          { label: "MERN", color: "#3CC9A7" },
          { label: "Investor Portal", color: "#A855F7" },
        ],
        description:
          "A full-stack MERN e-commerce platform we built across three interconnected portals. The public storefront showcases certified natural gemstones with a trust-focused UI, secure checkout, and full input validation. The investor portal lets approved investors fund specific listings and automatically receive profit-share payouts upon sale. The CMS-powered admin panel gives full control over products, taxonomy, investor approvals, payout requests, testimonials, orders, and bargainer applications — all from a single real-time dashboard.",
        hours: "120+",
        pages: "40+",
        liveUrl: "https://github.com/FaiziCodeSpace/khaki-gemstone.git",
        image: "/images/Khakigemstone/Image-1.jpg",
      },
      {
        title:
          "Smart Stamp Generator & AgentHub — Car Dealer Document & Field Agent Platform",
        tags: [
          { label: "PDF Generation", color: "#EF4444" },
          { label: "Urdu OCR", color: "#FE9E48" },
          { label: "Geolocation", color: "#3CC9A7" },
          { label: "Multi-Portal", color: "#6366F1" },
        ],
        description:
          "A dual-portal web app our team built for the car dealership industry. The stamp portal lets users upload a stamp paper, fill a dynamic template, and auto-generate a formatted PDF via jsPDF — with an Urdu OCR API to read and parse Urdu-language stamp documents, eliminating manual PDF editing entirely. The AgentHub portal lets car bargainers register, get admin-approved, then browse a live list of nearby agents. One tap opens WhatsApp with the bargainer's GPS coordinates pre-embedded, so the agent can navigate directly via Google Maps — no back-and-forth needed.",
        hours: "80+",
        pages: "20+",
        liveUrl: "https://github.com/FaiziCodeSpace/khaki-gemstone.git",
        image: "/images/Agenthub/Image-1.jpg",
      },
      {
        title:
          "Agency Portfolio — Next.js Web App with Multi-Section UI & Theme System",
        tags: [
          { label: "Next.js", color: "#4C70EC" },
          { label: "Tailwind CSS", color: "#3CC9A7" },
          { label: "UI/UX", color: "#A855F7" },
          { label: "Dark Mode", color: "#FE9E48" },
        ],
        description:
          "A fully custom agency portfolio we built with Next.js and Tailwind CSS, featuring a component-driven architecture across sections including Hero, Services, Work, Case Studies, Pricing, Testimonials, and Footer. Includes a light/dark theme system with a custom Theme Provider, a skills marquee, dot-pattern backgrounds, and fluid responsive typography using locally hosted Satoshi fonts. Every section is designed from scratch — no UI kits, no templates.",
        hours: "20+",
        components: "15+",
        liveUrl: "https://github.com/FaiziCodeSpace/Portfolio.git",
        image: "/images/Portfolio/Image-1.jpg",
      },
    ],
  },

  de: {
    eyebrow: "UNSERE PROJEKTE",
    heading: "Fallstudien",
    stats: {
      timeLabel: "Gesamte Entwicklungszeit",
      timeUnit: "Stunden",
      componentsLabel: "Erstellte Komponenten",
      pagesLabel: "Erstellte Seiten",
      repoLabel: "Git-Repository besuchen",
      repoLink: "Jetzt ansehen",
    },
    projects: [
      {
        title:
          "Multi-Portal-E-Commerce-Plattform für zertifizierte Naturedelsteine mit Investor- & CMS-Integration",
        tags: [
          { label: "E-Commerce", color: "#4C70EC" },
          { label: "CMS", color: "#FE9E48" },
          { label: "MERN", color: "#3CC9A7" },
          { label: "Investoren-Portal", color: "#A855F7" },
        ],
        description:
          "Eine Full-Stack-MERN-E-Commerce-Plattform, die wir über drei miteinander verbundene Portale entwickelt haben. Der öffentliche Shop präsentiert zertifizierte Naturedelsteine mit einer vertrauensfokussierten UI, sicherem Checkout und vollständiger Eingabevalidierung. Das Investorenportal ermöglicht es genehmigten Investoren, bestimmte Listings zu finanzieren und bei Verkauf automatisch Gewinnbeteiligungen zu erhalten. Das CMS-Admin-Panel bietet vollständige Kontrolle über Produkte, Taxonomie, Investorengenehmigungen, Auszahlungsanfragen, Referenzen, Bestellungen und Händlerbewerbungen — alles über ein einziges Echtzeit-Dashboard.",
        hours: "120+",
        pages: "40+",
        liveUrl: "https://github.com/FaiziCodeSpace/khaki-gemstone.git",
        image: "/images/Khakigemstone/Image-1.jpg",
      },
      {
        title:
          "Smart Stamp Generator & AgentHub — Dokument- und Außendienst-Plattform für Autohändler",
        tags: [
          { label: "PDF-Erstellung", color: "#EF4444" },
          { label: "Urdu OCR", color: "#FE9E48" },
          { label: "Geolocation", color: "#3CC9A7" },
          { label: "Multi-Portal", color: "#6366F1" },
        ],
        description:
          "Eine Dual-Portal-Webanwendung, die wir für die Automobilhandelsbranche entwickelt haben. Das Stempelportal ermöglicht es Nutzern, ein Stempelpapier hochzuladen, eine dynamische Vorlage auszufüllen und automatisch ein formatiertes PDF via jsPDF zu generieren — mit einer Urdu-OCR-API zum Lesen und Verarbeiten von Urdu-Stempeldokumenten. Das AgentHub-Portal ermöglicht Autohändlern die Registrierung, Admin-Genehmigung und das Durchsuchen einer Live-Liste nahegelegener Agenten mit GPS-Koordinaten direkt per WhatsApp.",
        hours: "80+",
        pages: "20+",
        liveUrl: "https://github.com/FaiziCodeSpace/khaki-gemstone.git",
        image: "/images/Agenthub/Image-1.jpg",
      },
      {
        title:
          "Agentur-Portfolio — Next.js-Webanwendung mit mehrseitiger UI & Theme-System",
        tags: [
          { label: "Next.js", color: "#4C70EC" },
          { label: "Tailwind CSS", color: "#3CC9A7" },
          { label: "UI/UX", color: "#A855F7" },
          { label: "Dark Mode", color: "#FE9E48" },
        ],
        description:
          "Ein vollständig maßgeschneidertes Agentur-Portfolio, das wir mit Next.js und Tailwind CSS entwickelt haben — mit komponentenbasierter Architektur über Abschnitte wie Hero, Leistungen, Arbeitsweise, Fallstudien, Preise, Referenzen und Footer. Enthält ein Hell-/Dunkel-Theme-System mit eigenem Theme Provider, ein Skills-Marquee, Punkt-Muster-Hintergründe und flüssige responsive Typografie. Jeder Bereich wurde von Grund auf neu gestaltet — keine UI-Kits, keine Vorlagen.",
        hours: "20+",
        components: "15+",
        liveUrl: "https://github.com/FaiziCodeSpace/Portfolio.git",
        image: "/images/Portfolio/Image-1.jpg",
      },
    ],
  },
};

// ─── Pricing ───────────────────────────────────────────────────────────────
const pricing = {
  individual: {
    heading: "Pricing",
    subheading: "Simple, transparent pricing. No hidden fees.",
    plans: [
      {
        id: "basic",
        tag: "Live fast",
        name: "Basic",
        desc: "Hardcoded. Lightning fast. Perfect for a strong presence.",
        price: "500",
        currency: "€",
        features: [
          "Hardcoded performance (100/100)",
          "Up to 5 sections",
          "Mobile-first design",
          "Contact form & tracking",
          "1x revision round",
        ],
        cta: "Start Basic",
        popular: false,
      },
      {
        id: "standard",
        tag: "Grows with you",
        name: "Standard",
        desc: "Dynamically coded with admin panel & basic SEO power.",
        price: "800",
        currency: "€",
        features: [
          "Self-serve admin panel",
          "Dynamic content & blog",
          "Basic SEO strategy",
          "Up to 10 sections",
          "Analytics & lead capture",
        ],
        cta: "Choose Standard",
        popular: false,
      },
      {
        id: "corporate",
        tag: "Most Popular",
        name: "Corporate",
        desc: "Chatbot, AI integration & aggressive SEO. Sells 24/7.",
        price: "1,000",
        currency: "€",
        features: [
          "AI chatbot with your knowledge",
          "GPT/Claude API integration",
          "Aggressive SEO + content strategy",
          "CRM & email automations",
          "Multilingual ready",
        ],
        cta: "Book Corporate",
        popular: true,
      },
      {
        id: "award",
        tag: "The statement",
        name: "Award-winning",
        desc: "Insane 3D animations, every AI API, Awwwards-tier.",
        price: "2,000",
        currency: "€",
        features: [
          "WebGL & 3D hero scenes",
          "All relevant AI APIs wired",
          "Premium motion design",
          "A/B testing & CRO",
          "Awwwards-ready",
        ],
        cta: "Build Awesome",
        popular: false,
      },
    ],
    modal: {
      bookTitle: (planName) => `Book ${planName}`,
      nameLabel: "Full Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      websiteLabel: "Website",
      messageLabel: "Tell me about your project",
      dateLabel: "Preferred Date",
      timeLabel: "Preferred Time",
      submitLabel: "Send Request",
      successTitle: "Request Sent!",
      successMsg: "I'll be in touch within 24 hours.",
      errorRequired: "Email is required.",
      errorNetwork: "Network error. Please try again.",
    },
  },

  team: {
    heading: "Pricing",
    subheading: "Simple, transparent pricing. No hidden fees.",
    plans: [
      {
        id: "basic",
        tag: "Live fast",
        name: "Basic",
        desc: "Hardcoded. Lightning fast. Perfect for a strong presence.",
        price: "500",
        currency: "€",
        features: [
          "Hardcoded performance (100/100)",
          "Up to 5 sections",
          "Mobile-first design",
          "Contact form & tracking",
          "1x revision round",
        ],
        cta: "Start Basic",
        popular: false,
      },
      {
        id: "standard",
        tag: "Grows with you",
        name: "Standard",
        desc: "Dynamically coded with admin panel & basic SEO power.",
        price: "800",
        currency: "€",
        features: [
          "Self-serve admin panel",
          "Dynamic content & blog",
          "Basic SEO strategy",
          "Up to 10 sections",
          "Analytics & lead capture",
        ],
        cta: "Choose Standard",
        popular: false,
      },
      {
        id: "corporate",
        tag: "Most Popular",
        name: "Corporate",
        desc: "Chatbot, AI integration & aggressive SEO. Sells 24/7.",
        price: "1,000",
        currency: "€",
        features: [
          "AI chatbot with your knowledge",
          "GPT/Claude API integration",
          "Aggressive SEO + content strategy",
          "CRM & email automations",
          "Multilingual ready",
        ],
        cta: "Book Corporate",
        popular: true,
      },
      {
        id: "award",
        tag: "The statement",
        name: "Award-winning",
        desc: "Insane 3D animations, every AI API, Awwwards-tier.",
        price: "2,000",
        currency: "€",
        features: [
          "WebGL & 3D hero scenes",
          "All relevant AI APIs wired",
          "Premium motion design",
          "A/B testing & CRO",
          "Awwwards-ready",
        ],
        cta: "Build Awesome",
        popular: false,
      },
    ],
    modal: {
      bookTitle: (planName) => `Book ${planName}`,
      nameLabel: "Full Name",
      emailLabel: "Email",
      phoneLabel: "Phone",
      websiteLabel: "Website",
      messageLabel: "Tell us about your project",
      dateLabel: "Preferred Date",
      timeLabel: "Preferred Time",
      submitLabel: "Send Request",
      successTitle: "Request Sent!",
      successMsg: "We'll be in touch within 24 hours.",
      errorRequired: "Email is required.",
      errorNetwork: "Network error. Please try again.",
    },
  },

  de: {
    heading: "Preise",
    subheading: "Klare, transparente Preise. Keine versteckten Kosten.",
    plans: [
      {
        id: "basic",
        tag: "Schnell starten",
        name: "Basic",
        desc: "Statisch kodiert. Blitzschnell. Perfekt für einen starken Auftritt.",
        price: "500",
        currency: "€",
        features: [
          "Statische Performance (100/100)",
          "Bis zu 5 Sektionen",
          "Mobile-first Design",
          "Kontaktformular & Tracking",
          "1 Überarbeitungsrunde",
        ],
        cta: "Basic starten",
        popular: false,
      },
      {
        id: "standard",
        tag: "Mitwachsend",
        name: "Standard",
        desc: "Dynamisch kodiert mit Admin-Panel & grundlegender SEO-Stärke.",
        price: "800",
        currency: "€",
        features: [
          "Self-Serve Admin-Panel",
          "Dynamische Inhalte & Blog",
          "Grundlegende SEO-Strategie",
          "Bis zu 10 Sektionen",
          "Analytics & Lead-Erfassung",
        ],
        cta: "Standard wählen",
        popular: false,
      },
      {
        id: "corporate",
        tag: "Beliebteste Wahl",
        name: "Corporate",
        desc: "Chatbot, KI-Integration & aggressive SEO. Verkauft rund um die Uhr.",
        price: "1.000",
        currency: "€",
        features: [
          "KI-Chatbot mit Ihrem Wissen",
          "GPT/Claude API-Integration",
          "Aggressive SEO + Content-Strategie",
          "CRM & E-Mail-Automatisierungen",
          "Mehrsprachig vorbereitet",
        ],
        cta: "Corporate buchen",
        popular: true,
      },
      {
        id: "award",
        tag: "Das Statement",
        name: "Award-winning",
        desc: "Beeindruckende 3D-Animationen, alle KI-APIs, Awwwards-Niveau.",
        price: "2.000",
        currency: "€",
        features: [
          "WebGL & 3D-Hero-Szenen",
          "Alle relevanten KI-APIs integriert",
          "Premium Motion Design",
          "A/B-Testing & CRO",
          "Awwwards-ready",
        ],
        cta: "Jetzt anfragen",
        popular: false,
      },
    ],
    modal: {
      bookTitle: (planName) => `${planName} buchen`,
      nameLabel: "Vollständiger Name",
      emailLabel: "E-Mail",
      phoneLabel: "Telefon",
      websiteLabel: "Website",
      messageLabel: "Erzählen Sie uns von Ihrem Projekt",
      dateLabel: "Gewünschtes Datum",
      timeLabel: "Gewünschte Uhrzeit",
      submitLabel: "Anfrage senden",
      successTitle: "Anfrage gesendet!",
      successMsg: "Wir melden uns innerhalb von 24 Stunden.",
      errorRequired: "E-Mail ist erforderlich.",
      errorNetwork: "Netzwerkfehler. Bitte versuchen Sie es erneut.",
    },
  },
};

// ─── Testimonials ──────────────────────────────────────────────────────────
const testimonials = {
  individual: {
    heading: "Client Experiences",
    items: [
      {
        CompanyName: "KhakiGemstone",
        review:
          "Honestly, working with Faizan was a pleasant surprise. The project wrapped up faster than I expected, and the quality didn't take a hit because of it. He kept me in the loop the whole time and always gave me a heads up before anything major happened.",
        name: "Ayub Khan",
        position: "CEO of KhakiGemstone",
      },
      {
        CompanyName: "Iqra School System",
        review:
          "Faizan got the job done without any fuss. He communicated well, stuck to the timeline, and delivered exactly what we asked for. No surprises, just solid, reliable work.",
        name: "Qaisar Niaz",
        position: "Administration of IT",
      },
      {
        CompanyName: "E-Stamp Agenthub",
        review:
          "What stood out most was how much care he put into the details. Faizan was easy to reach, dependable, and made the whole development experience feel smooth and straightforward.",
        name: "Moiz Hassan",
        position: "Manager",
      },
      {
        CompanyName: "ODA Agency",
        review:
          "Faizan took care of everything from planning all the way to deployment. His creativity and professionalism really showed in the final product. It was genuinely a step above what we anticipated.",
        name: "Meher Ali",
        position: "CEO",
      },
    ],
  },
  team: {
    heading: "Client Experiences",
    items: [
      {
        CompanyName: "KhakiGemstone",
        review:
          "Honestly, working with the team was a pleasant surprise. The project wrapped up faster than we expected, and the quality didn't take a hit because of it. They kept us in the loop the whole time and always gave us a heads up before anything major happened.",
        name: "Ayub Khan",
        position: "CEO of KhakiGemstone",
      },
      {
        CompanyName: "Iqra School System",
        review:
          "The team got the job done without any fuss. They communicated well, stuck to the timeline, and delivered exactly what we asked for. No surprises, just solid, reliable work.",
        name: "Qaisar Niaz",
        position: "Administration of IT",
      },
      {
        CompanyName: "E-Stamp Agenthub",
        review:
          "What stood out most was how much care the team put into the details. They were easy to reach, dependable, and made the whole development experience feel smooth and straightforward.",
        name: "Moiz Hassan",
        position: "Manager",
      },
      {
        CompanyName: "ODA Agency",
        review:
          "The team took care of everything from planning all the way to deployment. Their creativity and professionalism really showed in the final product. It was genuinely a step above what we anticipated.",
        name: "Meher Ali",
        position: "CEO",
      },
    ],
  },
  de: {
    heading: "Kundenstimmen",
    items: [
      {
        CompanyName: "KhakiGemstone",
        review:
          "Ehrlich gesagt war die Zusammenarbeit mit dem Team eine angenehme Überraschung. Das Projekt wurde schneller abgeschlossen als erwartet, ohne Abstriche bei der Qualität. Wir wurden stets auf dem Laufenden gehalten und rechtzeitig über wichtige Entscheidungen informiert.",
        name: "Ayub Khan",
        position: "CEO von KhakiGemstone",
      },
      {
        CompanyName: "Iqra School System",
        review:
          "Das Team hat die Arbeit ohne Umschweife erledigt. Kommunikation war klar, der Zeitplan wurde eingehalten und das Ergebnis entsprach genau unseren Anforderungen. Keine Überraschungen — einfach solide, zuverlässige Arbeit.",
        name: "Qaisar Niaz",
        position: "IT-Administration",
      },
      {
        CompanyName: "E-Stamp Agenthub",
        review:
          "Was am meisten auffiel, war die Sorgfalt, die das Team in die Details steckte. Jederzeit erreichbar, verlässlich und professionell — die gesamte Entwicklungserfahrung war reibungslos und unkompliziert.",
        name: "Moiz Hassan",
        position: "Manager",
      },
      {
        CompanyName: "ODA Agency",
        review:
          "Das Team hat sich um alles gekümmert — von der Planung bis zum Deployment. Ihre Kreativität und Professionalität spiegelten sich im Endprodukt wider. Es war deutlich besser als erwartet.",
        name: "Meher Ali",
        position: "CEO",
      },
    ],
  },
};

// ─── Contact Modal ─────────────────────────────────────────────────────────
const contact = {
  individual: {
    badge: "Get in touch",
    heading: "Let's build something great.",
    subheading: "Fill out the form and I'll get back to you within 24 hours.",
    email: "",
    nameLabel: "Full Name",
    emailLabel: "Email",
    subjectLabel: "Subject",
    messageLabel: "Your Message",
    submitLabel: "Send Message",
    successTitle: "Message Sent!",
    successMsg: "I'll get back to you within 24 hours.",
    errorRequired: (field) => `${field} is required.`,
    errorNetwork: "Network error. Please try again.",
  },
  team: {
    badge: "Get in touch",
    heading: "Let's build something great.",
    subheading: "Fill out the form and we'll get back to you within 24 hours.",
    nameLabel: "Full Name",
    emailLabel: "Email",
    subjectLabel: "Subject",
    messageLabel: "Your Message",
    submitLabel: "Send Message",
    successTitle: "Message Sent!",
    successMsg: "We'll get back to you within 24 hours.",
    errorRequired: (field) => `${field} is required.`,
    errorNetwork: "Network error. Please try again.",
  },
  de: {
    badge: "Kontakt aufnehmen",
    heading: "Lassen Sie uns etwas Großartiges bauen.",
    subheading: "Füllen Sie das Formular aus — wir melden uns innerhalb von 24 Stunden.",
    nameLabel: "Vollständiger Name",
    emailLabel: "E-Mail",
    subjectLabel: "Betreff",
    messageLabel: "Ihre Nachricht",
    submitLabel: "Nachricht senden",
    successTitle: "Nachricht gesendet!",
    successMsg: "Wir melden uns innerhalb von 24 Stunden.",
    errorRequired: (field) => `${field} ist erforderlich.`,
    errorNetwork: "Netzwerkfehler. Bitte versuchen Sie es erneut.",
  },
};

// ─── Footer ────────────────────────────────────────────────────────────────
const footer = {
  individual: {
    cta: "Let's Kick this off",
    description:
      "Open to short-term, recurring, and full-time collaborations — focused on delivering high-quality work with consistency, attention to detail, and clear communication.",
    profileLabel: "Profile",
    aboutLabel: "About me",
    navLabel: "Navigation",
    links: [
      { label: "Landing", id: "hero" },
      { label: "Process", id: "process" },
      { label: "Pricing", id: "pricing" },
      { label: "Testimonials", id: "testimonials" },
    ],
    copyright: (year) => `© ${year} Good Developer. All rights reserved.`,
  },
  team: {
    cta: "Let's work with us",
    description:
      "Open to short-term, recurring, and full-time collaborations — focused on delivering high-quality work with consistency, attention to detail, and clear communication.",
    profileLabel: "Agency",
    aboutLabel: "About us",
    navLabel: "Navigation",
    links: [
      { label: "Landing", id: "hero" },
      { label: "Process", id: "process" },
      { label: "Pricing", id: "pricing" },
      { label: "Testimonials", id: "testimonials" },
    ],
    copyright: (year) => `© ${year} Good Developer. All rights reserved.`,
  },
  de: {
    cta: "Starten wir zusammen",
    description:
      "Wir sind offen für kurzfristige, wiederkehrende und langfristige Zusammenarbeit — mit Fokus auf hochwertige Ergebnisse, Zuverlässigkeit, Liebe zum Detail und klare Kommunikation.",
    profileLabel: "Agentur",
    aboutLabel: "Über uns",
    navLabel: "Navigation",
    links: [
      { label: "Start", id: "hero" },
      { label: "Prozess", id: "process" },
      { label: "Preise", id: "pricing" },
      { label: "Referenzen", id: "testimonials" },
    ],
    copyright: (year) => `© ${year} Good Developer. Alle Rechte vorbehalten.`,
  },
};

// ─── Public API ────────────────────────────────────────────────────────────
export const content = { meta, navbar, hero, services, work, caseStudy, pricing, testimonials, contact, footer };
