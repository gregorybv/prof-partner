import { SectionShell } from "@/components/ui/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";

const UPCOMING_SECTIONS = [
  { id: "otzyvy", title: "Отзывы и благодарности" },
  { id: "price", title: "Почему у нас бесплатно?" },
  { id: "kalkulyator", title: "Онлайн-калькулятор Независимой Банковской Гарантии" },
] as const;

/** Temporary placeholders for sections pending full implementation */
export function RoadmapSkeletonSections() {
  return (
    <>
      {UPCOMING_SECTIONS.map((section) => (
        <SectionShell key={section.id} id={section.id} muted>
          <SectionHeading
            title={section.title}
            subtitle="Секция в разработке — контент и бизнес-логика будут перенесены без изменений"
          />
        </SectionShell>
      ))}
    </>
  );
}
