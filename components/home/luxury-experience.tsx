"use client";

import { useState } from "react";
import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { Check, ChevronRight } from "lucide-react";
import Link from "next/link";

// Luxury experience data
const experiences = [
  {
    id: "airport",
    title: "Airport Transfers",
    description:
      "Seamless airport transfers with flight tracking, meet & greet service, and complimentary waiting time.",
    image: "/images/mercedes-airport.jpeg",
    features: [
      "Real-time flight monitoring",
      "Meet & greet at arrivals",
      "Complimentary waiting time",
      "Luggage assistance",
      "Child seats available on request",
    ],
  },
  {
    id: "business",
    title: "Business Travel",
    description:
      "Professional chauffeur service for executives and business professionals with premium vehicles and amenities.",
    image: "/images/mercedes-s-class.jpeg",
    features: [
      "Professional, uniformed chauffeurs",
      "Premium vehicles with Wi-Fi",
      "Confidentiality guaranteed",
      "Multiple stop options",
      "Corporate account management",
    ],
  },
  {
    id: "events",
    title: "Special Events",
    description:
      "Make your special occasion truly memorable with our luxury chauffeur service for weddings, anniversaries, and more.",
    image: "/images/mercedes-mansion.jpeg",
    features: [
      "Decorated vehicles available",
      "Red carpet service",
      "Champagne service option",
      "Coordinated multiple vehicle service",
      "Professional photography arrangements",
    ],
  },
  {
    id: "hourly",
    title: "Hourly Hire",
    description:
      "Flexible hourly chauffeur service for shopping trips, meetings, or city tours with a dedicated driver.",
    image: "/images/bmw-city.jpeg",
    features: [
      "Minimum 2-hour booking",
      "Dedicated chauffeur",
      "Customizable itinerary",
      "No hidden charges",
      "Last-minute changes accommodated",
    ],
  },
];

export default function LuxuryExperience() {
  const [activeTab, setActiveTab] = useState("airport");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const activeExperience =
    experiences.find((exp) => exp.id === activeTab) || experiences[0];

  return (
    <section className="bg-gray-50 py-20" ref={ref}>
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <p
            className="mb-2 text-sm font-medium uppercase tracking-wider text-brand opacity-0"
            style={{
              animation: inView ? "fadeInUp 0.6s ease-out forwards" : "none",
            }}
          >
            Tailored for Your Needs
          </p>
          <h2
            className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl opacity-0"
            style={{
              animation: inView
                ? "fadeInUp 0.6s ease-out forwards 0.2s"
                : "none",
            }}
          >
            Luxury Experience <span className="text-brand">Redefined</span>
          </h2>
        </div>

        <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
          {/* Tabs */}
          <div
            className="flex flex-col space-y-4 opacity-0"
            style={{
              animation: inView
                ? "fadeInLeft 0.8s ease-out forwards 0.3s"
                : "none",
            }}
          >
            {experiences.map((exp) => (
              <button
                key={exp.id}
                onClick={() => setActiveTab(exp.id)}
                className={`flex flex-col justify-between rounded-lg border p-4 text-left transition-all min-h-[160px] h-full ${
                  activeTab === exp.id
                    ? "border-brand bg-white shadow-md"
                    : "border-gray-200 bg-white/50 hover:bg-white hover:shadow-sm"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3
                      className={`text-lg font-semibold ${
                        activeTab === exp.id
                          ? "text-brand"
                          : "text-gray-900"
                      }`}
                    >
                      {exp.title}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      {exp.description}
                    </p>
                  </div>
                  <ChevronRight
                    className={`h-5 w-5 transition-transform ${
                      activeTab === exp.id
                        ? "rotate-90 text-brand"
                        : "text-gray-400"
                    }`}
                  />
                </div>
              </button>
            ))}
          </div>

          {/* Content */}
          <div
            className="relative rounded-lg bg-white p-6 shadow-lg opacity-0 h-full"
            style={{
              animation: inView
                ? "fadeInRight 0.8s ease-out forwards 0.4s"
                : "none",
            }}
          >
            <div className="relative mb-6 h-64 w-full overflow-hidden rounded-lg">
              <Image
                src={activeExperience.image || "/placeholder.svg"}
                alt={activeExperience.title}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <h3 className="mb-4 text-2xl font-bold text-gray-900">
              {activeExperience.title} Features
            </h3>

            <ul className="space-y-3">
              {activeExperience.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start"
                  style={{
                    opacity: 0,
                    animation: inView
                      ? `fadeInUp 0.5s ease-out forwards ${0.5 + index * 0.1}s`
                      : "none",
                  }}
                >
                  <span className="mr-2 flex h-6 w-6 items-center justify-center rounded-full bg-brand text-amber-100">
                    <Check className="h-4 w-4" />
                  </span>
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/#herosection"
              className="mt-6 inline-flex items-center rounded-md bg-brand px-6 py-3 text-white transition-colors hover:bg-amber-600"
            >
              Book This Service
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
