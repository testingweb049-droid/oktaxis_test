import type React from "react";
import Header from "@/components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={``}>
      {/* ✅ Google Tag Manager (noscript) for SSR */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MF6HV3CB"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      {/* ✅ Structured Data (JSON-LD for SEO) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://oktaxis.co.uk/#webpage",
            url: "https://oktaxis.co.uk/",
            name: "OkTaxis | Trusted Taxi Service in Manchester",
            isPartOf: { "@id": "https://oktaxis.co.uk/#website" },
            datePublished: "2024-12-04T00:00:00+00:00",
            dateModified: "2025-02-21T00:00:00+00:00",
            description:
              "Book reliable and affordable taxi and chauffeur services in Manchester. 24/7 availability. Airport transfers, city rides & more.",
            breadcrumb: { "@id": "https://oktaxis.co.uk/#breadcrumb" },
            inLanguage: "en-GB",
            potentialAction: [
              {
                "@type": "ReadAction",
                target: ["https://oktaxis.co.uk/"],
              },
            ],
          }),
        }}
      />

      <Header />
      {children}
    </div>
  );
}