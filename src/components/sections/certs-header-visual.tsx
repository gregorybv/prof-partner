import Image from "next/image";

const CERTS = [
  {
    src: "/prof-p/cert-3.jpg",
    alt: "Сертификат Металлинвестбанк",
    className: "left-[1%] z-[1] w-[33%] -rotate-[10deg]",
  },
  {
    src: "/prof-p/cert-2.jpg",
    alt: "Сертификат СберБанк",
    className: "left-1/2 z-[3] w-[36%] -translate-x-1/2",
  },
  {
    src: "/prof-p/cert-alfa.jpg",
    alt: "Сертификат Альфа-Банк",
    className: "right-[1%] z-[1] w-[33%] rotate-[10deg]",
  },
] as const;

export function CertsHeaderVisual() {
  return (
    <div
      className="relative mb-4 aspect-[41/20] w-full overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgba(241,245,250,0.95)_0%,rgba(255,255,255,0.75)_100%)]"
      aria-hidden
    >
      {CERTS.map((cert) => (
        <div
          key={cert.src}
          className={`absolute top-1/2 h-[94%] -translate-y-1/2 drop-shadow-[0_8px_24px_rgba(15,23,42,0.14)] ${cert.className}`}
        >
          <Image
            src={cert.src}
            alt={cert.alt}
            fill
            priority
            quality={92}
            className="rounded-sm object-cover object-top"
            sizes="(min-width: 1024px) 300px, 32vw"
          />
        </div>
      ))}
    </div>
  );
}
