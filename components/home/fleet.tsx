"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Users, Briefcase } from "lucide-react"
import { useInView } from "react-intersection-observer"
import { fleets } from "../NewBookingForm/CarList"

export default function FleetClasses() {
  const [startIndex, setStartIndex] = useState(0)
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Calculate how many items to show based on screen width
  const [itemsToShow, setItemsToShow] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth
      if (width >= 1024) {
        setItemsToShow(3) // Show 3 on large screens
      } else if (width >= 768) {
        setItemsToShow(2) // Show 2 on medium screens
      } else {
        setItemsToShow(1) // Show 1 on small screens
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Get visible fleets based on startIndex and itemsToShow
  const getVisibleFleets = () => {
    const visibleFleets = []
    for (let i = 0; i < itemsToShow; i++) {
      const index = (startIndex + i) % fleets.length
      visibleFleets.push(fleets[index])
    }
    return visibleFleets
  }

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? fleets.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev === fleets.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="bg-white py-16" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-8 flex flex-col items-start justify-between md:flex-row md:items-center">
          <div
            className="mb-6 md:mb-0 opacity-0"
            style={{
              animation: inView ? "fadeInUp 0.6s ease-out forwards" : "none",
            }}
          >
            <h2 className="text-3xl font-bold md:text-4xl">
              Experience <span className="text-brand">Luxury with Our</span> <br className="md:hidden" />
              Chauffeur  <span className="text-brand">Services</span>
            </h2>
          </div>

          <div
            className="flex space-x-2 opacity-0"
            style={{
              animation: inView ? "fadeInRight 0.6s ease-out forwards 0.3s" : "none",
            }}
          >
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
              aria-label="Previous fleet"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
              aria-label="Next fleet"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getVisibleFleets().map((vehicle, index) => (
            <div
              key={`${vehicle.name}-${index}`}
              className="overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 hover:shadow-md"
              style={{
                opacity: 0,
                animation: inView ? `fadeInUp 0.6s ease-out forwards ${index * 0.1 + 0.3}s` : "none",
              }}
            >
              <div className="relative h-64 w-full">
                <Image src={vehicle.image || "/placeholder.svg"} alt={vehicle.name} fill className="object-cover" />
              </div>
              <div className="p-6">
                {/* <h3 className="mb-2 text-xl font-bold text-gray-900">{vehicle.name}</h3> */}
                <h3 className="mb-2 text-xl font-bold text-gray-900" >{vehicle.cars}</h3>

                <div className="flex items-center justify-start space-x-6">
                  <div className="flex items-center text-brand">
                    <Users className="mr-2 h-5 w-5" />
                    <span className="text-sm">{vehicle.persons} passengers</span>
                  </div>
                  <div className="flex items-center text-brand">
                    <Briefcase className="mr-2 h-5 w-5" />
                    <span className="text-sm">{vehicle.bags} suitcases</span>
                  </div> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
