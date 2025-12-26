// components/SEO.tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";

export type BreadcrumbItem = {
  position: number;
  name: string;
  item?: string; // absolute URL (optional for last item)
};

interface SeoProps {
  title: string;
  description: string;
  url: string;
  image: string;
  breadcrumbs?: BreadcrumbItem[];
}

/**
 * SEO component — injects meta tags + TaxiService schema + optional BreadcrumbList JSON-LD
 * Compatible with Next.js App Router
 */
export default function SEO({ title, description, url, image, breadcrumbs }: SeoProps) {
  const taxiServiceSchema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    name: "OkTaxis",
    url,
    description,
    image,
    telephone: "+1-800-555-OKTX",
    address: {
      "@type": "PostalAddress",
      streetAddress: "123 City Center",
      addressLocality: "YourCity",
      addressRegion: "YourState",
      postalCode: "12345",
      addressCountry: "US",
    },
  };

  const breadcrumbSchema =
    breadcrumbs && breadcrumbs.length
      ? {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbs.map((b) => {
            const li: any = {
              "@type": "ListItem",
              position: b.position,
              name: b.name,
            };
            if (b.item) li.item = b.item;
            return li;
          }),
        }
      : null;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, isProperty = false) => {
      const attribute = isProperty ? "property" : "name";
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute("content", content);
    };

    // Update standard meta tags
    updateMetaTag("description", description);
    
    // Update Open Graph tags
    updateMetaTag("og:title", title, true);
    updateMetaTag("og:description", description, true);
    updateMetaTag("og:url", url, true);
    updateMetaTag("og:type", "website", true);
    updateMetaTag("og:image", image, true);

    // Update canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", url);
  }, [title, description, url, image]);

  return (
    <>
      {/* TaxiService JSON-LD */}
      <Script
        id="taxi-service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceSchema) }}
      />

      {/* Breadcrumb JSON-LD (if provided) */}
      {breadcrumbSchema && (
        <Script
          id="breadcrumb-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}
    </>
  );
}