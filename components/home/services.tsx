"use client"

import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { useEffect, useRef } from "react"
import Link from "next/link"

const services = [
  {
    id: 1,
    slug: "airport-transfer",
    title: "Premium Airport Chauffeur Services",
    category: "Airport Transfers",
    description:
      "Enjoy hassle-free Manchester airport services with OKTaxis. Whether you're landing or departing from Manchester or Liverpool.....",
    image: "/images/airport-transfer.png",
    size: "large",
  },
  {
    id: 2,
    slug: "hourly-chauffeur",
    title: "Convenient Hourly Chauffeur Hire",
    category: "Hourly Chauffeur Service",
    description:
      "Need on-demand travel? With OKTaxis, enjoy flexible hourly chauffeur services ideal for city errands, business meetings.....",
    image: "/images/hourly-service.png",
    size: "large",
  },
  {
    id: 3,
    slug: "chauffeur-services",
    title: "Chauffeur Services in Manchester",
    category: "Chauffeur Services",
    description:
      "Experience the highest level of comfort and class with OKTaxis' chauffeur services. Whether you're a corporate client....",
    image: "/blog6.webp",
    size: "small",
  },
  {
    id: 4,
    slug: "city-tours",
    title: "City to City Chauffeur Service",
    category: "City Tours",
    description:
      "Explore the best of the North with our exclusive city tours of Manchester, Liverpool, and the surrounding areas.....",
    image: "/city.jpg",
    size: "small",
  },
  {
    id: 5,
    slug: "event-weddings",
    title: "Weddings Chauffeur in Manchester",
    category: "Event & Weddings",
    description:
      "At OKTaxis, we specialize in providing luxury wedding and event transfers that make your special day truly unforgettable.....",
    image: "/Luxury Wedding & Event Transfers.jpg",
    size: "small",
  },
]

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])

  /* ✨ fade-in on scroll */
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

  const largeServices = services.filter((s) => s.size === "large")
  const smallServices = services.filter((s) => s.size === "small")

  /* 👉 shared image height class */
  const cardImgHeight = "relative h-[300px] md:h-[360px] w-full overflow-hidden"

  return (
    <section id="services" className="py-16" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">

        {/* Section Heading */}
        <div
          className="mb-12 animate-fade-in-up opacity-0"
          style={{ animation: inView ? "fadeInUp 0.6s ease-out forwards" : "none" }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
            <span className="text-brand">Our Premium</span> Chauffeur <span className="text-brand">Services</span>
          </h2>
        </div>

        {/* Large Cards */}
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          {largeServices.map((service, index) => (
            <Link href={`/services/${service.slug}`} key={service.id}>
              <div
                ref={(el) => { serviceRefs.current[index] = el }}
                className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 cursor-pointer"
                style={{ opacity: 0, transform: "translateY(30px)" }}
              >
                <div className={cardImgHeight}>
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-brand">
                      {service.category}
                    </p>
                    <h3 className="mb-3 text-2xl font-bold">{service.title}</h3>
                    <p className="text-gray-300">{service.description}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Small Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {smallServices.map((service, index) => (
            <Link href={`/services/${service.slug}`} key={service.id}>
              <div
                ref={(el) => { serviceRefs.current[index + largeServices.length] = el }}
                className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 cursor-pointer"
                style={{ opacity: 0, transform: "translateY(30px)" }}
              >
                <div className={cardImgHeight}>
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-brand">
                      {service.category}
                    </p>
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
