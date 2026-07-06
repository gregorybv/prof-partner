import { SectionShell } from "@/components/ui/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";

const UPCOMING_SECTIONS = [
  { id: "avto-podbor", title: "Онлайн-автоподбор банка", anchor: "#avto-podbor" },
  { id: "sertifikaty", title: "Сертификаты и Дипломы", anchor: "#sertifikaty" },
  { id: "ourTeam", title: "Наша команда", anchor: "#ourTeam" },
  { id: "otzyvy", title: "Отзывы и благодарности", anchor: "#otzyvy" },
  { id: "price", title: "Почему у нас бесплатно?", anchor: "#price" },
  { id: "kalkulyator", title: "Онлайн-калькулятор", anchor: "#kalkulyator" },
] as const;

/** Temporary placeholders marking IA sections pending full implementation */
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
