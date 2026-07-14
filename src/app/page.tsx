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
import { CalculatorSection } from "@/components/sections/calculator-section";
import { ComplexCasesSection } from "@/components/sections/complex-cases-section";
import { AdvantagesSection } from "@/components/sections/advantages-section";
import { RegionsSection } from "@/components/sections/regions-section";
import { ClientsTrustSection } from "@/components/sections/clients-trust-section";
import { ContactsFooterSection } from "@/components/sections/contacts-footer-section";

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
        <CalculatorSection />
        <ComplexCasesSection />
        <AdvantagesSection />
        <RegionsSection />
        <ClientsTrustSection />
        <CallbackCtaSection formName="КОМПАНИЯ" />
        <ContactsFooterSection />
      </main>
    </>
  );
}
