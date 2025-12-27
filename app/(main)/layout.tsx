import type React from "react";
import Header from "@/components/Header/Header";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={``}>
      {/* ✅ Google Tag Manager (noscript) for SSR */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM-MF6HV3CB"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        ></iframe>
      </noscript>

      {/* ✅ Structured Data (JSON-LD for SEO) - Can be added per page */}

      <Header />
      {children}
    </div>
  );
}