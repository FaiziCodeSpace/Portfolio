"use client";

import { createContext, useContext } from "react";

/**
 * ContentContext
 * ──────────────
 * Holds the resolved content variant for the current route.
 * Wrap your page (or layout) with <ContentProvider variant="individual|team|de">.
 * Any component can call useContent() to get the right strings.
 */

export const ContentContext = createContext(null);

export function ContentProvider({ variant, children }) {
  return (
    <ContentContext.Provider value={variant}>
      {children}
    </ContentContext.Provider>
  );
}

/**
 * useVariant()
 * Returns the current variant key, e.g. "individual" | "team" | "de"
 */
export function useVariant() {
  const v = useContext(ContentContext);
  if (!v) throw new Error("useVariant must be used inside <ContentProvider>");
  return v;
}

/**
 * useContent(section)
 * Returns the content object for `section` in the current variant.
 *
 * Example:
 *   const t = useContent("hero");   // → { tagline, description, cta }
 */
export function useContent(section) {
  const variant = useVariant();
  // Lazy-import to keep the bundle lean
  const { content } = require("@/i18n/content");
  const sectionData = content[section];
  if (!sectionData) throw new Error(`Unknown content section: "${section}"`);
  const variantData = sectionData[variant];
  if (!variantData) throw new Error(`No content for variant "${variant}" in section "${section}"`);
  return variantData;
}
