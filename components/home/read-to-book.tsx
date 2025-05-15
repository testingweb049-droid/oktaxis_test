"use client"

import Link from "next/link"
import { useInView } from "react-intersection-observer"

export default function ReadyToBook() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-cover bg-center py-16"
      style={{
        backgroundImage: "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(45,45,45,0.8) 100%)",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Diagonal lines overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #444 25%, transparent 25%, transparent 50%, #444 50%, #444 75%, transparent 75%, transparent)",
          backgroundSize: "100px 100px",
        }}
      ></div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div
          className="flex flex-col items-start opacity-0"
          style={{
            animation: inView ? "fadeInUp 0.6s ease-out forwards" : "none",
          }}
        >
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">Ready to book?</h2>
          <Link href='/#herosection' className="rounded bg-white px-6 py-2 text-sm font-medium text-gray-900 transition-all duration-300 hover:bg-amber-500 hover:text-white">
            BOOK NOW
          </Link>
        </div>
      </div>
    </section>
  )
}
