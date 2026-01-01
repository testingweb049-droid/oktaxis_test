
import type React from "react";
import type { Metadata } from "next";
import { Roboto, Montserrat } from "next/font/google";
import "./globals.css";

import { Toaster } from "@/components/ui/toaster";
import { CustomFormProvider } from "@/context/FormContext";
import { OrderProvider } from '@/context/OrderContext';
import Footer from "@/components/Footer/Footer";
import { generateMetadata as generateSEOMetadata, generateLocalBusinessSchema } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

// Generate metadata using the SEO utility
const baseMetadata: Metadata = generateSEOMetadata({
  title: "Trusted Taxi Service in Manchester",
  description:
    "Book reliable and affordable taxi services in Manchester. 24/7 availability. Airport transfers, city rides & more.",
  pageUrl: "/",
});

export const metadata: Metadata = {
  ...baseMetadata,
  icons: {
    icon: "/assets/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
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

      <body className={`${roboto.variable} ${montserrat.variable} antialiased`}>
        {/* ✅ Structured Data - Local Business Schema */}
        <StructuredData data={generateLocalBusinessSchema()} id="local-business-schema" />
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
          {children}
          <Toaster />
          <Footer />
        </CustomFormProvider></OrderProvider>

      </body>
    </html>
  );
}
