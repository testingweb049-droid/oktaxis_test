import type React from "react"

import Header from "@/components/Header/Header"



export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
     <div className={``}>
        {/* Google Tag Manager (noscript) for SSR */}
      
          <Header />
            {children}
        
      </div>
  )
}