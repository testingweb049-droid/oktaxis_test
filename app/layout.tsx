import type React from "react";
import { Roboto } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Footer from "@/components/Footer/Footer";
import { Toaster } from "@/components/ui/toaster";
import StripeProvider from "@/components/BookingForm/PaymentCardModal/StripeProvider";
import { CustomFormProvider } from "@/context/FormContext";
import { OrderProvider } from '@/context/OrderContext';

const roboto = Roboto({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

// REMOVED metadata export - Let SEO component handle it

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Basic meta tags that are common to all pages */}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Common Organization Schema */}
        <Script
          id="json-ld-organization"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "OKTaxis",
              "url": "https://oktaxis.co.uk",
              "logo": "https://oktaxis.co.uk/logo.png",
              "description": "Premium taxi services in Manchester and Liverpool",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "0B Portway",
                "addressLocality": "Wythenshawe",
                "addressRegion": "Manchester",
                "addressCountry": "GB"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+44-7788-710290",
                "contactType": "customer service",
                "availableLanguage": ["English"]
              },
              "sameAs": []
            }),
          }}
        />

        {/* ✅ Google Tag Manager (HEAD) */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
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

      <body className={`${roboto.variable} antialiased`}>
        {/* ✅ Google Tag Manager (NOSCRIPT) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MF6HV3CB"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        
        <OrderProvider>
          <CustomFormProvider>
            <StripeProvider>
              {children}
              <Toaster />
            </StripeProvider>
            <Footer />
          </CustomFormProvider>
        </OrderProvider>
      </body>
    </html>
  );
}