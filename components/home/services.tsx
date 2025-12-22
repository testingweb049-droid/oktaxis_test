"use client"

import Image from "next/image"
import Link from "next/link"

const services = [
  {
    id: 1,
    slug: "airport-transfer",
    title: "Reliable Manchester Airport Transfers",
    category: "Airport Transfers",
    description:
      "Start your journey with a seamless luxury airport transfer. We Specialise in private Manchester Airport (MAN) transfer services, offering real-time flight tracking and professional Meet-and-Greet assistance inside the terminal to ensure a stress-free arrival or departure.",
    image: "/images/airport-transfer.png",
    size: "large",
  },
  {
    id: 2,
    slug: "hourly-chauffeur",
    title: "Hourly & Daily Executive Hire",
    category: "Hourly Chauffeur Service",
    description:
      "Do you have a busy schedule? Our hourly chauffeur service is perfect for executive meetings, roadshows, or day trips. We offer flexible Half Day Chauffeur packages or Full Day Chauffeur Service to keep you moving at your own pace without the hassle of parking or waiting.",
    image: "/images/hourly-service.png",
    size: "large",
  },
  {
    id: 3,
    slug: "event-weddings",
    title: "Events & Wedding Transport",
    category: "Event & Weddings",
    description:
      "Make your special moments unforgettable. We provide elegant wedding car hire in Manchester complete with champagne and expert logistics. Trust us for a polished service that adds a touch of class to any celebration.",
    image: "/wedding.png",
    size: "small",
  },
  {
    id: 4,
    slug: "chauffeur-services",
    title: "Business & Corporate Chauffeur",
    category: "Chauffeur Services",
    description:
      "We provide top-tier Executive Chauffeur Hire Manchester-wide. Trust our Business Chauffeur Services for all your corporate travel needs. Experience our executive vehicles that Prioritise discretion, safety, and absolute comfort for VIPs and CEOs.",
    image: "/blog6.jpg",
    size: "small",
  },
  {
    id: 5,
    slug: "city-tours",
    title: "VIP City Tours",
    category: "City Tours",
    description:
      "Explore Manchester in Style. Discover the city with our exclusive private tours. Visit the creative Northern Quarter and the financial district of Spinningfields with expert guides. Book today for a memorable journey through the heart of the city.",
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
  const largeServices = services.filter((s) => s.size === "large")
  const smallServices = services.filter((s) => s.size === "small")
  const cardImgHeight = "relative h-[300px] md:h-[360px] w-full overflow-hidden"

  const renderDescription = (service: typeof services[number]) => {
    return (
      <p className="text-sm text-gray-300">
        {service.description}
        {service.description.length > 150 && (
          <span className="ml-2 text-brand">
            Read more
          </span>
        )}
      </p>
    )
  }

  return (
    <section id="services" className="pt-10 md:pt-20 ">
      <div className="full-width-section mx-auto px-4 md:px-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl lg:text-5xl">
            <span className="text-brand">Our </span> Chauffeur{" "}
            <span className="text-brand">Services</span> in Manchester
          </h2>
          
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
