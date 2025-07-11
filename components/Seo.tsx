import Head from "next/head";

interface SeoProps {
  title: string;
  description: string;
  url: string;
  image: string;
}

export default function Seo({ title, description, url, image }: SeoProps) {
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

      {/* Schema.org */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TaxiService",
            "name": "OkTaxis",
            "url": url,
            "description": description,
            "image": image,
            "telephone": "+1-800-555-OKTX",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 City Center",
              "addressLocality": "YourCity",
              "addressRegion": "YourState",
              "postalCode": "12345",
              "addressCountry": "US"
            },
          }),
        }}
      />
    </Head>
  );
}
