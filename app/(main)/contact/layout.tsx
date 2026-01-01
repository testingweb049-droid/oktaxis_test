import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Contact OKTaxis | 24/7 Chauffeur & Airport Transfers in Manchester",
  description:
    "Get in touch with OKTaxis for luxury chauffeur service and airport transfers across Manchester and Liverpool. Available 24/7 via phone or email.",
  pageUrl: "/contact",
  keywords: [
    "contact oktaxis",
    "oktaxis phone number",
    "oktaxis email",
    "book taxi manchester",
    "contact taxi service",
  ],
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

