import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Book Your Ride",
  description: "Complete your booking with OKTaxis",
  pageUrl: "/booking",
  noindex: true,
  nofollow: false,
});

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

