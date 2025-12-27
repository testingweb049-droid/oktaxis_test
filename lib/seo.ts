import { Metadata } from "next";

// Base configuration for OKTaxis
export const SITE_CONFIG = {
  name: "OKTaxis",
  title: "OKTaxis | Premium Chauffeur Services & Airport Transfers in Manchester",
  description:
    "OKTaxis provides luxury chauffeur services, airport transfers, city rides, wedding cars, and premium transportation in Manchester, Liverpool, and across the UK. 24/7 reliable service.",
  url: process.env.NEXT_PUBLIC_BASE_URL || "https://oktaxis.co.uk",
  ogImage: "/cover.jpg",
  logo: "/favicon.png",
  author: "OKTaxis",
  phone: "+44 7788 710290",
  email: "info@oktaxis.co.uk",
  address: {
    streetAddress: "Bailey Lane, Airport, Wythenshawe",
    addressLocality: "Manchester",
    addressRegion: "Greater Manchester",
    postalCode: "M90 4AN",
    addressCountry: "GB",
  },
  defaultKeywords: [
    "taxi service manchester",
    "airport transfer manchester",
    "chauffeur service manchester",
    "manchester airport taxi",
    "luxury car service",
    "executive car service",
    "wedding car hire",
    "stadium transfer",
    "city centre taxi",
    "hourly chauffeur",
    "liverpool airport transfer",
    "manchester taxi",
    "oktaxis",
    "premium transportation",
    "24/7 taxi service",
    "airport chauffeur",
    "corporate transport",
    "event transportation",
    "manchester city taxi",
    "reliable taxi service",
  ],
};

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  pageUrl?: string;
  ogImage?: string;
  noindex?: boolean;
  nofollow?: boolean;
  canonicalUrl?: string;
  structuredData?: Record<string, any>;
  type?: "website" | "article" | "product";
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
}

/**
 * Generate comprehensive SEO metadata for Next.js App Router
 */
export function generateMetadata({
  title,
  description,
  keywords = [],
  pageUrl = "",
  ogImage,
  noindex = false,
  nofollow = false,
  canonicalUrl,
  type = "website",
  publishedTime,
  modifiedTime,
  author,
}: SEOProps): Metadata {
  const fullTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.title;

  const fullDescription = description || SITE_CONFIG.description;

  const fullKeywords = [...SITE_CONFIG.defaultKeywords, ...keywords].join(", ");

  const url = canonicalUrl || `${SITE_CONFIG.url}${pageUrl}`;

  const imageUrl = ogImage
    ? ogImage.startsWith("http")
      ? ogImage
      : `${SITE_CONFIG.url}${ogImage}`
    : `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  const robots = [];
  if (noindex) robots.push("noindex");
  else robots.push("index");
  if (nofollow) robots.push("nofollow");
  else robots.push("follow");

  const metadata: Metadata = {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords,
    authors: [{ name: author || SITE_CONFIG.author }],
    creator: SITE_CONFIG.author,
    publisher: SITE_CONFIG.author,
    robots: {
      index: !noindex,
      follow: !nofollow,
      googleBot: {
        index: !noindex,
        follow: !nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: type === "article" ? "article" : "website",
      locale: "en_GB",
      url: url,
      siteName: SITE_CONFIG.name,
      title: fullTitle,
      description: fullDescription,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: fullDescription,
      images: [imageUrl],
      // Add Twitter handle if available
      // creator: "@oktaxis",
      // site: "@oktaxis",
    },
    verification: {
      // Add your verification codes here when available
      // google: "your-google-verification-code",
      // yandex: "your-yandex-verification-code",
      // yahoo: "your-yahoo-verification-code",
    },
    category: "Transportation",
  };

  return metadata;
}

/**
 * Generate TaxiService structured data (LocalBusiness variant for taxi services)
 */
export function generateLocalBusinessSchema(additionalData?: Record<string, any>) {
  return {
    "@context": "https://schema.org",
    "@type": "TaxiService",
    "@id": `${SITE_CONFIG.url}#organization`,
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    image: `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`,
    telephone: SITE_CONFIG.phone,
    email: SITE_CONFIG.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.address.streetAddress,
      addressLocality: SITE_CONFIG.address.addressLocality,
      addressRegion: SITE_CONFIG.address.addressRegion,
      postalCode: SITE_CONFIG.address.postalCode,
      addressCountry: SITE_CONFIG.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "53.3588", // Approximate coordinates for Manchester Airport area
      longitude: "-2.2728",
    },
    priceRange: "££",
    areaServed: [
      {
        "@type": "City",
        name: "Manchester",
        sameAs: "https://en.wikipedia.org/wiki/Manchester",
      },
      {
        "@type": "City",
        name: "Liverpool",
        sameAs: "https://en.wikipedia.org/wiki/Liverpool",
      },
      {
        "@type": "City",
        name: "Leeds",
        sameAs: "https://en.wikipedia.org/wiki/Leeds",
      },
      {
        "@type": "AdministrativeArea",
        name: "Greater Manchester",
        sameAs: "https://en.wikipedia.org/wiki/Greater_Manchester",
      },
      {
        "@type": "AdministrativeArea",
        name: "Merseyside",
        sameAs: "https://en.wikipedia.org/wiki/Merseyside",
      },
    ],
    serviceArea: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: "53.3588",
        longitude: "-2.2728",
      },
      geoRadius: {
        "@type": "Distance",
        value: "50",
        unitCode: "MI",
      },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Taxi & Chauffeur Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Airport Transfer Service",
            description: "Professional airport transfer service to Manchester Airport, Liverpool John Lennon Airport, and other UK airports",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "City Centre Taxi Service",
            description: "Reliable taxi service for city centre travel in Manchester and Liverpool",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Hourly Chauffeur Service",
            description: "Flexible hourly chauffeur service for multiple stops and extended trips",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Wedding Car Hire",
            description: "Luxury wedding car hire service with professional chauffeurs",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Stadium Transfer Service",
            description: "Premium transportation to Old Trafford, Etihad Stadium, and other venues",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Corporate Transportation",
            description: "Professional transportation for business meetings and corporate events",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "City Tours",
            description: "Guided city tours of Manchester, Liverpool, and surrounding areas",
          },
        },
      ],
    },
    ...additionalData,
  };
}

/**
 * Generate WebPage structured data
 */
export function generateWebPageSchema({
  title,
  description,
  url,
  breadcrumbs,
}: {
  title: string;
  description: string;
  url: string;
  breadcrumbs?: Array<{ name: string; url: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description: description,
    url: url,
    inLanguage: "en-GB",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${SITE_CONFIG.url}#website`,
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    ...(breadcrumbs && breadcrumbs.length > 0 && {
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((crumb, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: crumb.name,
          item: crumb.url,
        })),
      },
    }),
  };
}

/**
 * Generate FAQ structured data
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate Service structured data
 */
export function generateServiceSchema({
  name,
  description,
  provider,
  areaServed,
  serviceType,
}: {
  name: string;
  description: string;
  provider?: string;
  areaServed?: string;
  serviceType?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: name,
    description: description,
    provider: {
      "@type": "TaxiService",
      name: provider || SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    areaServed: areaServed || "Manchester, Liverpool, Greater Manchester, Merseyside",
    serviceType: serviceType || "Transportation Service",
  };
}

/**
 * Generate BreadcrumbList structured data
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

