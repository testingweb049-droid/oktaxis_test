import Image from "next/image";
import { ReactNode } from "react";
import { Check } from "lucide-react";

type CTA = { label: string; href: string; variant?: "primary" | "outline" };

interface ImageTextSectionProps {
  imageSrc: string;
  imageAlt: string;
  title?: string | ReactNode;          // pass text or inline JSX (spans)
  text: string | ReactNode;            // paragraph(s) or JSX
  bgColor?: string;
  imagePosition?: "left" | "right";
  features?: string[];                 // optional: renders as check-list
  showFeatureIcons?: boolean;          // default true
  ctas?: CTA[];                        // optional CTA buttons

  // NEW: proper semantic, styled headings
  headingAs?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; // default h2
  titleClassName?: string;             // override heading styles
  imagePriority?: boolean;
  imageAspect?: "video" | "square" | "wide";
  className?: string;
  eyebrow?: string;                    // optional badge above title
}

const aspectClass = (a?: ImageTextSectionProps["imageAspect"]) => {
  switch (a) {
    case "square": return "aspect-square";
    case "wide": return "aspect-[16/7]";
    case "video":
    default: return "aspect-video";
  }
};

export default function ImageTextSection({
  imageSrc,
  imageAlt,
  title,
  text,
  bgColor = "bg-white",
  imagePosition = "left",
  features,
  showFeatureIcons = true,
  ctas,
  headingAs = "h2",
  titleClassName = "text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6",
  imagePriority = false,
  imageAspect = "video",
  className = "",
  eyebrow,
}: ImageTextSectionProps) {
  const HeadingTag = headingAs;

  return (
    <section className={`py-12 ${bgColor} ${className}`}>
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className={`flex flex-col items-center gap-12 ${imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
          {/* Image */}
          <div className="lg:w-1/2 w-full">
            <div className={`relative w-full ${aspectClass(imageAspect)} rounded-2xl overflow-hidden shadow-xl`}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                sizes="(min-width:1024px) 50vw, 100vw"
                className="object-cover"
                priority={imagePriority}
              />
            </div>
          </div>

          {/* Text */}
          <div className="lg:w-1/2">
            {eyebrow && (
              <div className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 mb-4">
                {eyebrow}
              </div>
            )}

            {title ? (
              <HeadingTag className={titleClassName}>
                {/* IMPORTANT: pass inline JSX (e.g., <span>), not another <h*> */}
                {title}
              </HeadingTag>
            ) : null}

            {typeof text === "string" ? (
              <p className="text-lg leading-relaxed text-gray-700">{text}</p>
            ) : (
              <div className="text-lg leading-relaxed text-gray-700">{text}</div>
            )}

            {/* Features */}
            {features?.length ? (
              <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6">
                <div className="space-y-3">
                  {features.map((f, i) => (
                    <div key={i} className="flex items-start">
                      {showFeatureIcons && (
                        <span
                          className="mr-3 mt-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white"
                          aria-hidden="true"
                        >
                          <Check className="h-4 w-4" />
                        </span>
                      )}
                      <p className="text-gray-800">{f}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}

            {/* CTAs */}
            {ctas?.length ? (
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                {ctas.map(({ label, href, variant = "primary" }, i) =>
                  variant === "primary" ? (
                    <a
                      key={i}
                      href={href}
                      className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand/90"
                    >
                      {label}
                    </a>
                  ) : (
                    <a
                      key={i}
                      href={href}
                      className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-900 hover:border-gray-400"
                    >
                      {label}
                    </a>
                  )
                )}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
