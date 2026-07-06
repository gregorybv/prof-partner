import { SiteHeader } from "@/components/sections/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { GuaranteeTypesSection } from "@/components/sections/guarantee-types-section";
import { AutoSelectionSection } from "@/components/sections/auto-selection-section";
import { ValueSection } from "@/components/sections/value-section";
import { CertificatesSection } from "@/components/sections/certificates-section";
import { TeamSection } from "@/components/sections/team-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TenderSupportSection } from "@/components/sections/tender-support-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { CallbackCtaSection } from "@/components/sections/callback-cta-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { WhyFreeSection } from "@/components/sections/why-free-section";
import { ContactsFooterSection } from "@/components/sections/contacts-footer-section";
import { RoadmapSkeletonSections } from "@/components/sections/roadmap-skeleton-sections";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <GuaranteeTypesSection />
        <AutoSelectionSection />
        <ValueSection />
        <CertificatesSection />
        <TeamSection />
        <ServicesSection />
        <TenderSupportSection />
        <ProcessSection />
        <TestimonialsSection />
        <CallbackCtaSection />
        <PricingSection />
        <WhyFreeSection />
        <CallbackCtaSection formName="РАСЧЕТ" muted={false} />
        <RoadmapSkeletonSections />
        <CallbackCtaSection formName="КОМПАНИЯ" />
        <ContactsFooterSection />
      </main>
    </>
  );
}
