"use client"

import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { useEffect, useRef } from "react"
import Link from "next/link"
import BusImage from "@/assets/vehicles/xlvan.jpg"

const services = [
  {
    id: 1,
    slug: "airport-transfer",
    title: "Premium Airport Chauffeur Services",
    category: "Airport Transfers",
    description:
      "From runway to roadway, we've planned every detail. Enjoy stress-free airport pickups with real-time flight tracking, complimentary wait time, and much more.",
    image: "/images/airport-transfer.png",
    size: "large",
  },
  {
    id: 2,
    slug: "hourly-chauffeur",
    title: "Convenient Hourly Chauffeur Hire",
    category: "Hourly Chauffeur Service",
    description:
      "Your time, your ride, your way. Tailored chauffeur services for every hour and occasion. Hire a chauffeur by the hour or for the entire day, offering flexibility, reliability that you require.",
    image: "/images/hourly-service.png",
    size: "large",
  },
  {
    id: 3,
    slug: "chauffeur-services",
    title: "Professional Limousine Services",
    category: "Limousine Services",
    description:
      "Redefining travel with elegance, every mile of the way. Experience exquisite excellence with our premium limousine services, combining luxury with comfort to elevate every journey.",
    image: "/images/limousine.png",
    size: "small",
  },
  {
    id: 4,
    slug: "city-tours",
    title: "Comfortable Bus Rides",
    category: "Bus Transfers",
    description:
      "Enjoy stress-free group travel with our spacious buses, offering reliability and comfort for trips of any scale, whether for families, businesses, or tours.",
    image: BusImage,
    size: "small",
  },
  {
    id: 5,
    slug: "event-weddings",
    title: "Your Trusted Event Transportation Partner",
    category: "Events Transfer",
    description:
      "Arrive in style, leave with lasting impressions. Trust us to provide reliable transportation service for your events, ensuring every attendee arrives on time and in style, no matter the occasion.",
    image: "/images/event.png",
    size: "small",
  },
]

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (inView) {
      serviceRefs.current.forEach((el, index) => {
        if (el) {
          el.style.transition = `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`
          el.style.opacity = "1"
          el.style.transform = "translateY(0)"
        }
      })
    }
  }, [inView])

  const largeServices = services.filter((service) => service.size === "large")
  const smallServices = services.filter((service) => service.size === "small")

  return (
    <section id="services" className="py-16" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div
          className="mb-12 animate-fade-in-up opacity-0"
          style={{ animation: inView ? "fadeInUp 0.6s ease-out forwards" : "none" }}
        >
          <p className="text-sm uppercase tracking-wider text-gray-400">OUR SERVICES</p>
          <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
            Discover <span className="text-amber-500">Our Premium</span> <br />
            Chauffeur <span className="text-amber-500">Services</span>
          </h2>
        </div>

        <div className="mb-6 grid gap-6 md:grid-cols-2">
          {largeServices.map((service, index) => (
            <Link href={`/services/${service.slug}`} key={service.id}>
              <div
                ref={(el) => {
                  serviceRefs.current[index] = el
                }}
                className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 cursor-pointer"
                style={{ opacity: 0, transform: "translateY(30px)" }}
              >
                <div className="relative h-[400px] w-full overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-amber-400">{service.category}</p>
                    <h3 className="mb-3 text-2xl font-bold">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {smallServices.map((service, index) => (
            <Link href={`/services/${service.slug}`} key={service.id}>
              <div
                ref={(el) => {
                  serviceRefs.current[index + largeServices.length] = el
                }}
                className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 cursor-pointer"
                style={{ opacity: 0, transform: "translateY(30px)" }}
              >
                <div className="relative h-[300px] w-full overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-amber-400">{service.category}</p>
                    <h3 className="mb-3 text-xl font-bold">{service.title}</h3>
                    <p className="text-sm text-gray-300">{service.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
