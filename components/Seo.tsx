// components/Seo.tsx
import Head from "next/head";
import { usePathname } from "next/navigation";

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
  const pathname = usePathname();

  // Base TaxiService schema
  const taxiServiceSchema = {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "name": "OKTaxis",
    "image": "https://oktaxis.co.uk/logo.png",
    "@id": "https://oktaxis.co.uk/",
    "url": "https://oktaxis.co.uk/",
    "telephone": "+44 7788 710290",
    "email": "info@oktaxis.co.uk",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "0B Portway",
      "addressLocality": "Wythenshawe",
      "addressRegion": "Manchester",
      "addressCountry": "GB"
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Manchester"
      },
      {
        "@type": "City",
        "name": "Liverpool"
      }
    ],
    "potentialAction": {
      "@type": "ReserveAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://oktaxis.co.uk/contact",
        "inLanguage": "en-GB",
        "actionPlatform": [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/IOSPlatform",
          "https://schema.org/AndroidPlatform"
        ]
      },
      "name": "Book Now"
    }
  };

  // Get breadcrumb schema based on current pathname
  const getBreadcrumbSchema = () => {
    const breadcrumbSchemas: Record<string, any> = {
      '/': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [{
          "@type": "ListItem",
          "position": 1,
          "name": "Home"
        }]
      },
      '/hourly-chauffeur': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://oktaxis.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://oktaxis.co.uk/services/" },
          { "@type": "ListItem", "position": 3, "name": "Hourly Chauffeur" }
        ]
      },
      '/event-weddings': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://oktaxis.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://oktaxis.co.uk/services/" },
          { "@type": "ListItem", "position": 3, "name": "Event Weddings" }
        ]
      },
      '/chauffeur-services': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://oktaxis.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://oktaxis.co.uk/services/" },
          { "@type": "ListItem", "position": 3, "name": "Chauffeur Services" }
        ]
      },
      '/city-tours': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://oktaxis.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://oktaxis.co.uk/services/" },
          { "@type": "ListItem", "position": 3, "name": "City Tours" }
        ]
      },
      '/stadium-transfer': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://oktaxis.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://oktaxis.co.uk/services/" },
          { "@type": "ListItem", "position": 3, "name": "Stadium Transfer" }
        ]
      },
      '/city-center': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://oktaxis.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://oktaxis.co.uk/services/" },
          { "@type": "ListItem", "position": 3, "name": "City Center" }
        ]
      },
      '/fleet': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://oktaxis.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Fleet" }
        ]
      },
      '/driver': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://oktaxis.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Driver" }
        ]
      },
      '/about': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://oktaxis.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "About" }
        ]
      },
      '/contact': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://oktaxis.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Contact" }
        ]
      },
      '/liverpool': {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://oktaxis.co.uk/" },
          { "@type": "ListItem", "position": 2, "name": "Liverpool" }
        ]
      }
    };

    return breadcrumbSchemas[pathname] || null;
  };

  // Use provided breadcrumbs or auto-detect based on pathname
  const breadcrumbSchema = breadcrumbs && breadcrumbs.length 
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": breadcrumbs.map((b) => {
          const li: any = {
            "@type": "ListItem",
            "position": b.position,
            "name": b.name,
          };
          if (b.item) li.item = b.item;
          return li;
        }),
      }
    : getBreadcrumbSchema();

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="OKTaxis" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="OKTaxis - Premium Taxi Services in Manchester & Liverpool" />
      <meta property="og:locale" content="en_GB" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Additional SEO Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="language" content="en" />
      <meta name="author" content="OKTaxis" />
      <meta name="geo.region" content="GB" />
      <meta name="geo.placename" content="Manchester" />

      {/* TaxiService JSON-LD (for all pages) */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(taxiServiceSchema) }} 
      />

      {/* Breadcrumb JSON-LD (auto-detected or provided) */}
      {breadcrumbSchema && (
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} 
        />
      )}
    </Head>
  );
}