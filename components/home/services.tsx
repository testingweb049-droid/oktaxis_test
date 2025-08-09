"use client"

import Image from "next/image"
import { useInView } from "react-intersection-observer"
import { useEffect, useRef, useState } from "react"
import Link from "next/link"

const services = [
  {
    id: 1,
    slug: "airport-transfer",
    title: "Premium Manchester Airport Chauffeur Services",
    category: "Airport Transfers",
    description:
      "Enjoy hassle-free Manchester airport services with OKTaxis. Whether you're landing or departing from Manchester or Liverpool airports, our executive airport transfers include real-time flight monitoring, meet-and-greet at arrivals, complimentary waiting time, luggage assistance, and child seats on request. As Manchester's leading provider of premium airport chauffeur services, we redefine luxury travel – no more queues or stress. Book your Manchester airport chauffeur today for fixed, transparent pricing.",
    image: "/images/airport-transfer.png",
    size: "large",
  },
  {
    id: 2,
    slug: "hourly-chauffeur",
    title: "Convenient Hourly Chauffeur Hire in Manchester",
    category: "Hourly Chauffeur Service",
    description:
      "Need on-demand travel? With OKTaxis, enjoy flexible hourly chauffeur services ideal for city errands, business meetings, or spontaneous outings. Our hourly chauffeur Manchester options provide 24/7 availability, adapting to your schedule with professional drivers and modern vehicles. Perfect for executives or tourists – travel comfortably anytime, anywhere in Manchester. Explore flexible rides in Manchester with no hidden fees.",
    image: "/images/hourly-service.png",
    size: "large",
  },
  {
    id: 3,
    slug: "chauffeur-services",
    title: "Chauffeur Services for City Tours in Manchester",
    category: "Chauffeur Services",
    description:
      "Experience the highest level of comfort and class with OKTaxis' chauffeur services in Manchester. Explore the best of the North with our exclusive city tours of Manchester, Liverpool, and the surrounding areas. From iconic landmarks to hidden gems, our city tours in Manchester are customized for an unforgettable journey. Whether you're a corporate client or visitor, our city-to-city chauffeur service ensures safe, stylish transport.",
    image: "/blog6.webp",
    size: "small",
  },
  {
    id: 5,
    slug: "stadium-transfers",
    title: "Stadium Transfers and Special Events",
    category: "Special Events",
    description:
      "For football fans and event-goers, OKTaxis offers reliable stadium transfers from Manchester to venues like Old Trafford and Etihad Stadium. Avoid match-day chaos with our luxury chauffeur service, including pickups, drop-offs, and hourly hire options. Ideal for special events, business travel, or VIP occasions, our seamless service includes amenities like Wi-Fi and refreshments.",
    image: "/city.jpg",
    size: "small",
  },
  {
    id: 4,
    slug: "event-weddings",
    title: "Wedding Chauffeur Services in Manchester",
    category: "Event & Weddings",
    description:
      "At OKTaxis, we specialize in providing luxury wedding chauffeur services in Manchester that make your special day truly unforgettable. Our event and wedding transfers feature premium vehicles for brides, grooms, and guests, with tailored packages for anniversaries and other occasions. From venue arrivals to post-event stadium transfers in Manchester (e.g., for celebrations near Old Trafford or Etihad), we handle it all with elegance. Make your event memorable – book a wedding chauffeur in Manchester now.",
    image: "/wedding.png",
    size: "small",
  },
]

export default function Services() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 })
  const serviceRefs = useRef<(HTMLDivElement | null)[]>([])
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

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
  const cardImgHeight = "relative h-[300px] md:h-[360px] w-full overflow-hidden"

  const renderDescription = (service: typeof services[number]) => {
    const isExpanded = expandedCard === service.id
    const shortDesc = service.description.slice(0, 150)

    return (
      <p className="text-sm text-gray-300">
        {isExpanded ? service.description : shortDesc + (service.description.length > 150 ? "..." : "")}
        {service.description.length > 150 && (
          <span
            className="ml-2 cursor-pointer text-brand underline hover:text-amber-600 transition"
            onClick={(e) => {
              e.preventDefault()
              setExpandedCard(isExpanded ? null : service.id)
            }}
          >
            {isExpanded ? "Read less" : "Read more"}
          </span>
        )}
      </p>
    )
  }

  return (
    <section id="services" className="py-3 mt-40" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div
          className="mb-8 animate-fade-in-up opacity-0"
          style={{ animation: inView ? "fadeInUp 0.6s ease-out forwards" : "none" }}
        >
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
            <span className="text-brand">Our Premium</span> Chauffeur <span className="text-brand">Services</span> in Manchester
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl">
            Discover OKTaxis' range of luxury services tailored for Manchester and the North West.
            Whether you need Manchester airport chauffeur transfers or a wedding chauffeur in Manchester,
            our professional drivers and luxury fleet (Mercedes, BMW, Audi) guarantee comfort and reliability.
          </p>
        </div>

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
                    src={service.image}
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
                    {renderDescription(service)}
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
                ref={(el) => { serviceRefs.current[index + largeServices.length] = el }}
                className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-500 cursor-pointer"
                style={{ opacity: 0, transform: "translateY(30px)" }}
              >
                <div className={cardImgHeight}>
                  <Image
                    src={service.image}
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
                    {renderDescription(service)}
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
