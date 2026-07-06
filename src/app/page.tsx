import { SiteHeader } from "@/components/sections/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { GuaranteeTypesSection } from "@/components/sections/guarantee-types-section";
import { AutoSelectionSection } from "@/components/sections/auto-selection-section";
import { ValueSection } from "@/components/sections/value-section";
import { CertificatesSection } from "@/components/sections/certificates-section";
import { TeamSection } from "@/components/sections/team-section";
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
        <RoadmapSkeletonSections />
        <ContactsFooterSection />
      </main>
    </>
  );
}
