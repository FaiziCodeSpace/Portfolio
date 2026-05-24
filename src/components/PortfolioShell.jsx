"use client";

import Navbar from "@/components/Navbar";
import { ContentProvider } from "@/i18n/ContentContext";

/**
 * PortfolioShell
 * ──────────────
 * Wraps every portfolio route with:
 *  1. ContentProvider (makes variant available to all child components)
 *  2. Navbar (which reads variant content via useContent)
 *
 * Usage:
 *   <PortfolioShell variant="individual">…page sections…</PortfolioShell>
 */
export default function PortfolioShell({ variant, children }) {
  return (
    <ContentProvider variant={variant}>
      <Navbar />
      {children}
    </ContentProvider>
  );
}
