'use client'

import React from 'react'
import Image from 'next/image'

interface OfferItem {
  id: number
  icon: string // image path relative to public/
  title: string
  description: string
}

const offers: OfferItem[] = [
  {
    id: 1,
    icon: '/minute.svg',
    title: '30 Minutes Free Wait Time',
    description:
      'We offer a generous 30-minute free wait time, allowing you to take your time and enjoy every moment without feeling rushed.',
  },
  {
    id: 2,
    icon: '/free.svg',
    title: 'Free Cancellation Up to 48 Hours',
    description:
      'Plans change, and we get that. We offer free cancellation up to 48 hours before your scheduled pickup.',
  },
  {
    id: 3,
    icon: '/flight.svg',
    title: 'Flight Tracking',
    description:
      "For destination weddings or out-of-town guests, our flight tracking service ensures we're always on time, even if your flight isn't.",
  },
  {
    id: 4,
    icon: '/pilot.svg',
    title: 'Multilingual and Professional Chauffeurs',
    description:
      "Our chauffeurs are more than just drivers; they're your personal concierges, fluent in multiple languages and trained to provide top-notch service.",
  },
  {
    id: 5,
    icon: '/pricing.svg',
    title: 'Transparent Pricing',
    description:
      "No hidden fees, no surprises. Our transparent pricing ensures you know exactly what you're paying for.",
  },
  {
    id: 6,
    icon: '/meet.svg',
    title: 'Meet and Greet',
    description:
      'Your chauffeur will be waiting for you with a warm welcome, ready to assist with anything you need.',
  },
]

const Offer: React.FC = () => {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-7xl font-bold text-center mb-8">
        What <span className="border-b-4 border-[#F0A857] ">Do We</span> <span className="text-[#F0A857]">Offer?</span>
      </h2>
      <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {offers.map(({ id, icon, title, description }) => (
          <div key={id} className="flex flex-col items-start space-x-4">
            <div className="flex-shrink-0 p-4 ">
              <Image
                src={icon}
                alt={`${title} icon`}
                width={80}
                height={80}
                priority={false}
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-gray-600 text-lg">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Offer
