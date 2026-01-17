import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Find Your Order",
  description: "Enter your order ID to view your booking details",
  pageUrl: "/order",
  noindex: true,
  nofollow: false,
});

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

