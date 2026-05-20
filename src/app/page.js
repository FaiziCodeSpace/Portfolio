import CaseStudy from "@/components/CaseStudy";
import ClientsExperiences from "@/components/ClientsExperiences";
import Footer from "@/components/Footer";
import HeroSection from "@/components/Hero"
import PricingSection from "@/components/Pricing";
import Services from "@/components/Services";
import Work from "@/components/Work";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Services />
      <CaseStudy />
      <Work/>
      <PricingSection/>
      <ClientsExperiences/>
      <Footer/>
    </>
  );
}