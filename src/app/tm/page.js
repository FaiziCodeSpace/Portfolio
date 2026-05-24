import { content } from "@/i18n/content";
import PortfolioShell from "@/components/PortfolioShell";
import HeroSection from "@/components/Hero";
import Services from "@/components/Services";
import CaseStudy from "@/components/CaseStudy";
import Work from "@/components/Work";
import PricingSection from "@/components/Pricing";
import ClientsExperiences from "@/components/ClientsExperiences";
import Footer from "@/components/Footer";

const VARIANT = "team";

export const metadata = {
  title: content.meta[VARIANT].title,
  description: content.meta[VARIANT].description,
  icons: { icon: "/Logo/Logo-light.svg" },
};

export default function TeamPage() {
  return (
    <PortfolioShell variant={VARIANT}>
      <HeroSection />
      <Services />
      <CaseStudy />
      <Work />
      <PricingSection />
      <ClientsExperiences />
      <Footer />
    </PortfolioShell>
  );
}
