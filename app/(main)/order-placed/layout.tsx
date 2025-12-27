import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Order Confirmed",
  description: "Your booking has been confirmed",
  pageUrl: "/order-placed",
  noindex: true,
  nofollow: false,
});

export default function OrderPlacedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

