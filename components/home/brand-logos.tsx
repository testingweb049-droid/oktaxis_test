"use client"

import { useInView } from "react-intersection-observer"
import Image from "next/image"
import facebook from "@/assets/brands/facebook.png"
import google from "@/assets/brands/google.webp"
import youtube from "@/assets/brands/youtube.png"
import instagram from "@/assets/brands/instagram.png"

const brands = [
  { name: "Facebook", logo: facebook },
  { name: "Google", logo: google },
  { name: "Youtube", logo: youtube },
  { name: "Instagram", logo: instagram },
]

export default function BrandLogos() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section className="bg-gray-900 py-10" ref={ref}>
      <div className={`container mx-auto px-4 transition-opacity duration-700 ${inView ? "opacity-100" : "opacity-0"}`}>
        <div className="overflow-hidden">
          <div className="relative w-full overflow-hidden">
            <div className="animate-slide flex w-max">
              {[...brands, ...brands, ...brands, ...brands, ...brands].map((brand, index) => (
                <div
                  key={index}
                  className={`mx-8 flex min-w-[150px] items-center justify-center transition-opacity duration-500 hover:opacity-100 ${
                    inView ? "opacity-80" : "opacity-0"
                  }`}
                  style={{
                    animation: inView ? `fadeIn 0.5s ease-out ${index * 100}ms forwards` : "none",
                  }}
                >
                  <Image
                    src={brand.logo || "/placeholder.svg"}
                    alt={brand.name}
                    width={120}
                    height={50}
                    className="h-12 w-auto object-contain brightness-0 invert transition-transform duration-300 hover:scale-110"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
