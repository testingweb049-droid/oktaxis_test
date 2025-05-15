"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"

interface Testimonial {
  _id: string
  quote: string
  author: string
  date: string
}

const testimonials: Testimonial[] = [
  {
    _id: "1",
    quote: "Oktaxis's black car service in Chicago is the epitome of class and style. The chauffeur was friendly and the vehicle was a pristine luxury SUV. I will definitely be using Oktaxis for all my future transportation needs.",
    author: "Lopez Holland",
    date: "7/12/2023"
  },
  {
    _id: "2",
    quote: "Exceptional service and luxurious vehicles. The attention to detail was impressive.",
    author: "Sarah Johnson",
    date: "7/15/2023"
  },
  {
    _id: "3",
    quote: "Professional drivers and immaculate vehicles. A truly premium experience.",
    author: "Michael Chen",
    date: "7/18/2023"
  },
  {
    _id: "4",
    quote: "Reliable, punctual, and sophisticated. Oktaxis exceeded my expectations.",
    author: "Emma Davis",
    date: "7/20/2023"
  },
  {
    _id: "5",
    quote: "The best luxury transportation service in Chicago. Highly recommended.",
    author: "James Wilson",
    date: "7/22/2023"
  },
  {
    _id: "6",
    quote: "Outstanding service from start to finish. Will definitely use again.",
    author: "Maria Garcia",
    date: "7/25/2023"
  }
]

export default function Testimonials() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [latestReview, setLatestReview] = useState<Testimonial | null>(null)

  // const fetchLatestReview = useCallback(async () => {
  //   try {
  //     const response = await fetch('/api/latest-review')
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch latest review')
  //     }
  //     const data = await response.json()
  //     setLatestReview(data)
  //   } catch (error) {
  //     console.error('Error fetching latest review:', error)
  //   }
  // }, [])

  // useEffect(() => {
  //   fetchLatestReview()
  // }, [fetchLatestReview])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % (testimonials.length + (latestReview ? 1 : 0)))
  }, [latestReview])

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isPaused) {
        nextSlide()
      }
    }, 5000) // Change slide every 5 seconds

    return () => clearInterval(intervalId)
  }, [isPaused, nextSlide])

  const getCurrentTestimonial = () => {
    if (currentSlide === 0 && latestReview) {
      return latestReview
    }
    return testimonials[latestReview ? currentSlide - 1 : currentSlide]
  }

  const currentTestimonial = getCurrentTestimonial()

  return (
    <div 
      className="w-full lg:w-3/4 min-h-[400px] bg-[#004D4D] "
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >

      {/* Content */}
      <div className=" z-10 max-w-4xl mx-auto px-4 py-5 text-center">
        <h2 className="uppercase text-sm tracking-wider text-gray-200 font-semibold mb-2">
          TESTIMONIALS
        </h2>
        <h3 className="text-4xl font-bold text-white mb-6">
          What Our Clients Say
        </h3>

        {/* Quote Mark */}
        <div className="text-brand text-6xl mb-4">"</div>

        {/* Testimonial */}
        <div className="min-h-[150px] mb-8">
          <p className="text-white italic text-lg mb-6">
            {currentTestimonial.quote}
          </p>
          <div className="text-white">
            <p className="font-semibold">{currentTestimonial.author}</p>
            <p className="text-sm opacity-80">
              {new Date(currentTestimonial.date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2">
          {[...(latestReview ? [latestReview] : []), ...testimonials].map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                currentSlide === index 
                  ? 'bg-gray-950' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

