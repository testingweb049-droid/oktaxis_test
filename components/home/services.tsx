"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

const services = [
  {
    id: 1,
    slug: "airport-transfer",
    title: "Premium Manchester Airport Chauffeur Services",
    category: "Airport Transfers",
    description:
      "Book our reliable Manchester Airport transfers for a smooth start. Enjoy flight tracking and meet-and-greet services with ease. Contact us for a stress-free ride.",
    image: "/images/airport-transfer.png",
    size: "large",
  },
  {
    id: 2,
    slug: "hourly-chauffeur",
    title: "Convenient Hourly Chauffeur Hire in Manchester",
    category: "Hourly Chauffeur Service",
    description:
      "Hire our hourly chauffeur service for flexible travel in Manchester. Get dedicated support and luxury vehicles at your pace. Book now for a tailored experience.",
    image: "/images/hourly-service.png",
    size: "large",
  },
  {
    id: 3,
    slug: "event-weddings",
    title: "Wedding Chauffeur Services in Manchester",
    category: "Event & Weddings",
    description:
      "Choose our event & weddings service for special moments. We offer wedding car hire with champagne and expert event logistics. Reach us for perfect celebrations.",
    image: "/wedding.png",
    size: "small",
  },
  {
    id: 4,
    slug: "chauffeur-services",
    title: "Executive Chauffeur Services in Manchester",
    category: "Chauffeur Services",
    description:
      "Trust our chauffeur services for all your travel needs. Experience executive chauffeur-driven vehicles with discretion and comfort. Explore our premium options.",
    image: "/blog6.jpg",
    size: "small",
  },
  {
    id: 5,
    slug: "city-tours",
    title: "City Tours in Manchester",
    category: "City Tours",
    description:
      "Explore Manchester with our city tours in style. Visit Northern Quarter and Spinningfields with expert guides. Book today for a memorable journey.",
    image: "/city.jpg",
    size: "small",
  },
  // {
  //   id: 6,
  //   slug: "stadium-transfers",
  //   title: "Stadium Transfers and Special Events",
  //   category: "Stadium Transfer",
  //   description:
  //     "Get to stadium transfer for games like Etihad or Old Trafford. Enjoy luxury A-to-B transfers with punctual service. Reserve for your next match day.",
  //   image: "/Manchester Stadium Transfers.jpg",
  //   size: "small",
  // },
  // {
  //   id: 7,
  //   slug: "city-center",
  //   title: "Manchester City Center Transfers",
  //   category: "Manchester City Center",
  //   image: "/Luxury Chauffeur Service (2).webp",
  //   description:
  //     "Travel to Manchester City Center with our premium service. Avoid traffic stress with door-to-door convenience. Book for a hassle-free trip.",
  //   size: "small",
  // },
]


export default function Services() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

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
    <section id="services" className="pt-8 ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
            <span className="text-brand">Our </span> Chauffeur{" "}
            <span className="text-brand">Services</span> in Manchester
          </h2>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl">
            Discover OKTaxis' range of luxury services tailored for Manchester and the North West.
            Whether you need Manchester airport chauffeur transfers or a wedding chauffeur in Manchester,
            our professional drivers and luxury fleet (Mercedes, BMW, Audi) guarantee comfort and reliability.
          </p>
        </div>
        {/* Row 1: 1 big + 2 stacked */}
        <div className="grid gap-6 md:grid-cols-3 mb-10">
          {/* Big left card */}
          <div className="md:col-span-2">
            <Link href={`/services/${services[0].slug}`} key={services[0].id}>
              <div className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer h-full">
                <div className="relative h-[500px] w-full overflow-hidden">
                  <Image
                    src={services[0].image}
                    alt={services[0].title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <p className="mb-2 text-sm font-medium uppercase tracking-wider text-brand">
                      {services[0].category}
                    </p>
                    <h3 className="mb-3 text-3xl font-bold">{services[0].title}</h3>
                    {renderDescription(services[0])}
                  </div>
                </div>
              </div>
            </Link>
          </div>

          {/* Right side: 2 stacked smaller cards */}
          <div className="flex flex-col gap-6">
            {[services[1], services[2]].map((service) => (
              <Link href={`/services/${service.slug}`} key={service.id}>
                <div className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer h-full">
                  <div className="relative h-[240px] w-full overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="mb-1 text-xs font-medium uppercase tracking-wider text-brand">
                        {service.category}
                      </p>
                      <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
                      {renderDescription(service)}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Row 2: 4 equal small cards */}
        <div className="grid gap-6 md:grid-cols-2">
          {services.slice(3).map((service) => (
            <Link href={`/services/${service.slug}`} key={service.id}>
              <div className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer h-full">
                <div className="relative h-[260px] w-full overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-80" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-brand">
                      {service.category}
                    </p>
                    <h3 className="mb-2 text-lg font-bold">{service.title}</h3>
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
