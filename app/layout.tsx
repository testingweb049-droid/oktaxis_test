
import type React from "react";
import type { Metadata } from "next";
import { Roboto, Inter, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import StripeProvider from "@/components/BookingForm/PaymentCardModal/StripeProvider";
import { CustomFormProvider } from "@/context/FormContext";
import { OrderProvider } from '@/context/OrderContext';
import Footer from "@/components/Footer/footer";
const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "OkTaxis | Trusted Taxi Service in Manchester",
  description:
    "Book reliable and affordable taxi services in Manchester. 24/7 availability. Airport transfers, city rides & more.",
  icons: {
    icon: "/favicon.png",
  },
  metadataBase: new URL("https://oktaxis.co.uk/"),
  openGraph: {
    title: "OkTaxis | Trusted Taxi Service in Manchester",
    description:
      "Reliable and affordable taxi rides in Manchester and surrounding areas. 24/7 service available.",
    url: "https://oktaxis.co.uk/",
    siteName: "OkTaxis",
    images: [
      {
        url: "/cover.jpg",
        width: 1200,
        height: 630,
        alt: "OkTaxis Fleet - Reliable Manchester Taxi Service",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* ✅ Canonical & Structured Data */}
        <link rel="canonical" href="https://oktaxis.co.uk/" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TaxiService",
              name: "OkTaxis",
              url: "https://oktaxis.co.uk/",
              logo: "https://oktaxis.co.uk/logo.png",
              image: "https://oktaxis.co.uk/cover.jpg",
              description:
                "Trusted 24/7 taxi service in Manchester for airport transfers and city rides.",
              telephone: "+44 1234 567890",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Manchester",
                addressCountry: "UK",
              },
              areaServed: {
                "@type": "City",
                name: "Manchester",
              },
            }),
          }}
        />

        {/* ✅ Google Tag Manager (HEAD) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-MF6HV3CB');
            `,
          }}
        />
      </head>

      <body className={`${roboto.variable} ${inter.variable} ${montserrat.variable} antialiased`}>
        {/* ✅ Google Tag Manager (NOSCRIPT) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MF6HV3CB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <OrderProvider><CustomFormProvider>
          <StripeProvider>
            {children}
            <Toaster />
          </StripeProvider>
          <Footer />
        </CustomFormProvider></OrderProvider>

      </body>
    </html>
  );
}
