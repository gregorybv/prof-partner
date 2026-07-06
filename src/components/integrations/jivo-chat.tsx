"use client";

import Script from "next/script";

const JIVO_WIDGET_ID = "qDNJAFkWAe";

export function JivoChat() {
  return (
    <Script
      id="jivosite"
      src={`//code-sb1.jivosite.com/widget/${JIVO_WIDGET_ID}`}
      strategy="lazyOnload"
    />
  );
}
