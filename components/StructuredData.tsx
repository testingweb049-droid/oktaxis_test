interface StructuredDataProps {
  data: Record<string, any> | Array<Record<string, any>>;
  id?: string;
}

/**
 * Component to inject structured data (JSON-LD) into the page
 * Use this component to add schema.org structured data for SEO
 * This is a server component that renders script tags
 */
export default function StructuredData({ data, id }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <>
      {jsonLd.map((item, index) => (
        <script
          key={id || `structured-data-${index}`}
          id={id || `structured-data-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
}

