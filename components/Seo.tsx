// components/Seo.tsx
import Head from "next/head";

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
 * Seo component — injects meta tags + TaxiService schema + optional BreadcrumbList JSON-LD
 */
export default function Seo({ title, description, url, image, breadcrumbs }: SeoProps) {
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

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={image} />

      {/* TaxiService JSON-LD */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceSchema) }} />

      {/* Breadcrumb JSON-LD (if provided) */}
      {breadcrumbSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      )}
    </Head>
  );
}