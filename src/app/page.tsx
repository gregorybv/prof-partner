import { SiteHeader } from "@/components/sections/site-header";
import { HeroSection } from "@/components/sections/hero-section";
import { GuaranteeTypesSection } from "@/components/sections/guarantee-types-section";
import { ContactsFooterSection } from "@/components/sections/contacts-footer-section";
import { RoadmapSkeletonSections } from "@/components/sections/roadmap-skeleton-sections";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <GuaranteeTypesSection />
        <RoadmapSkeletonSections />
        <ContactsFooterSection />
      </main>
    </>
  );
}
