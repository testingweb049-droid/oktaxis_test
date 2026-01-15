import { Metadata } from "next";
import { generateMetadata as generateSEOMetadata } from "@/lib/seo";

export const metadata: Metadata = generateSEOMetadata({
  title: "Drive with OKTaxis | Register as a Chauffeur",
  description:
    "Join OKTaxis as a professional chauffeur. Enjoy flexible hours, weekly pay, and premium passengers. Apply now to start your journey.",
  pageUrl: "/driver",
  keywords: [
    "driver registration",
    "chauffeur jobs",
    "taxi driver jobs manchester",
    "become a chauffeur",
    "driver application",
  ],
});

export default function DriverLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

