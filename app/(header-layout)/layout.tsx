import type React from "react"

import Header from "@/components/Header/Header"
// import FloatingReviewWidget from "@/components/floating/GoogleFloatingButton"



export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className={``}>
      {/* Google Tag Manager (noscript) for SSR */}

      <Header />
      {children}
      {/* <FloatingReviewWidget /> */}


    </div>
  )
}