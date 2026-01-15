import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Order Details",
  description: "View your booking order details",
  pageUrl: "/order",
  noindex: true,
  nofollow: false,
});

export default function OrderDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

