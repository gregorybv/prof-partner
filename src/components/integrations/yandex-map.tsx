"use client";

import Script from "next/script";
import { useEffect, useRef } from "react";
import { YANDEX_MAP, YANDEX_MAP_CITIES } from "@/lib/site-content";

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

type YandexMapCityKey = keyof typeof YANDEX_MAP_CITIES;

export function YandexMap({ city = "moscow" }: { city?: YandexMapCityKey }) {
  const mapRef = useRef<HTMLDivElement>(null);

  // Поддерживаем переключение между городами на стороне UI (например, "Тверь"/"Москва").
  const cityData = YANDEX_MAP_CITIES[city];

  const mapInstanceRef = useRef<unknown>(null);
  const placemarkRef = useRef<unknown>(null);
  const desiredCoordsRef = useRef<[number, number]>(cityData.coords);
  const desiredZoomRef = useRef<number>(cityData.zoom);

  useEffect(() => {
    desiredCoordsRef.current = cityData.coords;
    desiredZoomRef.current = cityData.zoom;
  }, [cityData.coords, cityData.zoom]);

  useEffect(() => {
    const init = () => {
      if (!mapRef.current || !window.ymaps) return;
      window.ymaps.ready(() => {
        if (!mapRef.current || !window.ymaps) return;
        const map = new window.ymaps.Map(
          mapRef.current,
          { center: desiredCoordsRef.current, zoom: desiredZoomRef.current },
          { suppressMapOpenBlock: true },
        );
        const placemark = new window.ymaps.Placemark(desiredCoordsRef.current, {}, { preset: "islands#blueIcon" });
        (map as { geoObjects: { add: (p: unknown) => void } }).geoObjects.add(placemark);
        mapInstanceRef.current = map;
        placemarkRef.current = placemark;
      });
    };

    if (window.ymaps) {
      init();
    } else {
      window.addEventListener("yandex-maps-ready", init);
      return () => window.removeEventListener("yandex-maps-ready", init);
    }
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current as
      | { setCenter?: (coords: number[]) => void; setZoom?: (zoom: number) => void }
      | null;
    const placemark = placemarkRef.current as { geometry?: { setCoordinates?: (coords: number[]) => void } } | null;
    if (!map) return;

    const coords = cityData.coords;
    if (map && typeof map.setCenter === "function") {
      map.setCenter(coords);
    }
    if (typeof map.setZoom === "function") {
      // На случай, если у городов будет разный zoom.
      (map as { setZoom?: (zoom: number) => void }).setZoom?.(cityData.zoom);
    }
    if (
      placemark &&
      placemark.geometry &&
      typeof placemark.geometry.setCoordinates === "function"
    ) {
      placemark.geometry.setCoordinates(coords);
    }
  }, [cityData.coords, cityData.zoom]);

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
        className="h-80 w-full overflow-hidden rounded-2xl border border-(--border-subtle) md:h-96 lg:h-[26rem]"
        aria-label={`Карта офиса: ${cityData.label}`}
      />
    </>
  );
}
