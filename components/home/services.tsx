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
    title: "Reliable Manchester Airport Services & Transfers Across the UK",
    category: "Airport Transfers",
    description:
      "Enjoy hassle-free Manchester airport services with OKTaxis. Whether you're landing or departing from Manchester or Liverpool, our 24/7 airport transfer service guarantees punctual pickups, real-time flight tracking, and executive-level comfort. Our professional chauffeurs are committed to making your journey seamless and stress-free.",
    image: "/images/airport-transfer.png",
    size: "large",
  },
  {
    id: 2,
    slug: "hourly-chauffeur",
    title: "Flexible Hourly Chauffeurs for Business or Leisure Travel",
    category: "Hourly Chauffeur Service",
    description:
      "Need on-demand travel? With OKTaxis, enjoy flexible hourly chauffeur services ideal for city errands, business meetings, or leisurely trips. Whether you're navigating Manchester airport or planning a day around town, our experienced chauffeurs ensure you travel efficiently in comfort and style.",
    image: "/images/hourly-service.png",
    size: "large",
  },
  {
    id: 3,
    slug: "chauffeur-services",
    title: "Professional Chauffeur Services in Manchester – Airport, Business & More",
    category: "Chauffeur Services",
    description:
      "Experience the highest level of comfort and class with OKTaxis' chauffeur services. Whether you're a corporate client, a tourist, or attending an important event, our professional drivers ensure a premium.....",
    image: "/images/limousine.png",
    size: "small",
  },
  {
    id: 4,
    slug: "city-tours",
    title: "Explore Manchester & Liverpool with a Chauffeured City Tour",
    category: "City Tours",
    description:
      "Explore the best of the North with our exclusive city tours of Manchester, Liverpool, and the surrounding areas. Our expert chauffeurs will take you to iconic landmarks as well as hidden gems, providing a rich.....",
    image: BusImage,
    size: "small",
  },
  {
    id: 5,
    slug: "event-weddings",
    title: "Luxury Wedding & Event Transfers — Arrive in Style",
    category: "Event & Weddings",
    description:
      "At OKTaxis, we specialize in providing luxury wedding and event transfers that make your special day truly unforgettable. From elegant arrivals to seamless departures, our fleet of premium vehicles and.....",
    image: "/Luxury Wedding & Event Transfers.jpg",
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
