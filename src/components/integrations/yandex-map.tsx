"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { YANDEX_MAP } from "@/lib/site-content";

declare global {
  interface Window {
    ymaps?: {
      ready: (cb: () => void) => void;
      Map: new (
        element: HTMLElement,
        state: { center: number[]; zoom: number },
        options?: { suppressMapOpenBlock?: boolean },
      ) => unknown;
      Placemark: new (
        coords: number[],
        properties?: object,
        options?: object,
      ) => unknown;
    };
  }
}

export function YandexMap() {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const init = () => {
      if (!mapRef.current || !window.ymaps) return;
      window.ymaps.ready(() => {
        if (!mapRef.current || !window.ymaps) return;
        const map = new window.ymaps.Map(
          mapRef.current,
          { center: YANDEX_MAP.coords, zoom: 16 },
          { suppressMapOpenBlock: true },
        );
        const placemark = new window.ymaps.Placemark(YANDEX_MAP.coords, {}, { preset: "islands#blueIcon" });
        (map as { geoObjects: { add: (p: unknown) => void } }).geoObjects.add(placemark);
      });
    };

    if (window.ymaps) {
      init();
    } else {
      window.addEventListener("yandex-maps-ready", init);
      return () => window.removeEventListener("yandex-maps-ready", init);
    }
  }, []);

  return (
    <>
      <Script
        id="yandex-maps"
        src={`https://api-maps.yandex.ru/2.1/?apikey=${YANDEX_MAP.apiKey}&lang=ru_RU`}
        strategy="lazyOnload"
        onLoad={() => window.dispatchEvent(new Event("yandex-maps-ready"))}
      />
      <div
        ref={mapRef}
        className="h-64 w-full overflow-hidden rounded-2xl border border-(--border-subtle) md:h-80"
        aria-label="Карта офиса на Яндекс.Картах"
      />
    </>
  );
}
