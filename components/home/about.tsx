"use client"

import { useInView } from "react-intersection-observer"
import { useEffect, useRef } from "react"
import Image from "next/image"
import { Check, ArrowRight } from "lucide-react"

export default function AboutSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const highlightRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (inView && highlightRef.current) {
      const highlight = highlightRef.current

      // Add shimmer effect
      const shimmerEffect = () => {
        highlight.classList.add("animate-shimmer")
        setTimeout(() => {
          highlight.classList.remove("animate-shimmer")
        }, 2000)
      }

      // Initial shimmer
      setTimeout(shimmerEffect, 1000)

      // Repeat shimmer every 8 seconds
      const interval = setInterval(shimmerEffect, 8000)

      return () => clearInterval(interval)
    }
  }, [inView])

  return (
    <section className="relative bg-white py-20 flex flex-col gap-12 w-full" ref={ref}>
      {/* Background decorative elements */}
      <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-amber-100 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-amber-100 opacity-20 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left column - Main content */}
          <div
            className="flex flex-col justify-center opacity-0"
            style={{
              animation: inView ? "fadeInLeft 0.8s ease-out forwards" : "none",
            }}
          >
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              <span ref={highlightRef} className="text-amber-500">
                Premier Luxury
              </span>{" "}
              <br />
              Chauffeur & Airport <br />
              Transfer Services
            </h2>

            <p className="mb-8 text-lg text-gray-600">
              Manchester's leading luxury chauffeur service, offering premium airport transfers and executive
              transportation across Manchester, Liverpool, and the wider UK.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-gray-700">24/7 Airport Transfers with flight tracking</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-gray-700">Luxury Fleet with premium sedans and SUVs</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-amber-500 text-white">
                  <Check className="h-4 w-4" />
                </div>
                <p className="text-gray-700">Expert Chauffeurs with professional service</p>
              </div>
            </div>

            <div className="mt-8">
              <a
                href="#services"
                className="group inline-flex items-center gap-2 text-amber-500 transition-colors hover:text-amber-600"
              >
                Explore our services
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right column - Image */}
          <div
            className="relative h-[400px] overflow-hidden rounded-lg opacity-0 md:h-auto"
            style={{
              animation: inView ? "fadeInRight 0.8s ease-out forwards 0.3s" : "none",
            }}
          >
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-amber-500 opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 h-24 w-24 rounded-full bg-amber-500 opacity-80"></div>

            <div className="relative h-full overflow-hidden rounded-lg border-8 border-white shadow-xl">
              <Image src="/images/mercedes.png" alt="Luxury Chauffeur Service" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div
        className="container mx-auto  px-4 md:px-6"
        style={{
          opacity: 0,
          animation: inView ? "fadeInUp 0.8s ease-out forwards 0.6s" : "none",
        }}
      >
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-lg bg-gray-50 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
            <h3 className="mb-3 text-xl font-bold text-gray-900">Seamless Service</h3>
            <p className="text-gray-600">
              Flight monitoring for any delays or early arrivals, with meet-and-greet assistance to ensure a smooth,
              stress-free experience.
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
            <h3 className="mb-3 text-xl font-bold text-gray-900">Transparent Pricing</h3>
            <p className="text-gray-600">
              Fixed, competitive rates with no surprise charges – "the price you see is the price you pay."
            </p>
          </div>

          <div className="rounded-lg bg-gray-50 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md">
            <h3 className="mb-3 text-xl font-bold text-gray-900">Premium Experience</h3>
            <p className="text-gray-600">
              Travel in style with our fleet of luxurious vehicles, including Mercedes, BMW, Audi, and more.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
