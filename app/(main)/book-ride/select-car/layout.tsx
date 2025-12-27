import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Select Your Vehicle",
  description: "Choose from our premium fleet of vehicles for your journey",
  pageUrl: "/book-ride/select-car",
  noindex: true,
  nofollow: false,
});

export default function SelectCarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

