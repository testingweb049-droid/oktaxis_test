import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Passenger Details",
  description: "Enter your passenger details to complete your booking",
  pageUrl: "/book-ride/passenger-details",
  noindex: true,
  nofollow: false,
});

export default function PassengerDetailsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

