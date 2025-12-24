
"use client"

import React, { useState } from "react"
import Heading from "@/components/Heading"

type FAQItem = {
  question: string
  answer: string
}

interface FAQSectionProps {
  /**
   * Main section heading, rendered with the shared `Heading` component.
   */
  title: string
  /**
   * Dynamic list of FAQs to render.
   */
  faqs: FAQItem[]
  /**
   * Optional extra classes for the outer section container.
   */
  className?: string
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, faqs, className }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleToggle = (index: number) => {
    setOpenIndex((current) => (current === index ? null : index))
  }

  return (
    <section
      className={[
        "w-full bg-light-background font-montserrat py-12 sm:py-16 lg:py-20",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Heading as="h2">{title}</Heading>

        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            const answerId = `faq-answer-${index}`

            return (
              <article
                key={index}
                className="rounded-xl bg-white px-5 py-4 shadow-[0px_1.33px_2.67px_0px_#0000000D] sm:px-8 sm:py-5 md:py-6"
              >
                <button
                  type="button"
                  onClick={() => handleToggle(index)}
                  className="flex w-full items-center justify-between gap-3 text-left"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                >
                  <div className="flex items-start gap-2 sm:gap-3">
                    <span className="text-xl font-semibold text-primary-yellow sm:text-2xl">
                      Q:
                    </span>
                    <p className="flex-1 text-lg sm:text-2xl font-semibold text-heading-black">
                      {faq.question}
                    </p>
                  </div>
                  <span
                    className="ml-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-light-background text-text-gray transition-transform duration-200"
                    aria-hidden="true"
                  >
                    <svg
                      className={`h-3 w-3 transform transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0"
                      }`}
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  id={answerId}
                  role="region"
                  aria-hidden={!isOpen}
                  className={`pt-3 sm:pt-4 md:pt-5 ${
                    isOpen ? "block" : "hidden"
                  }`}
                >
                  <p className="text-base md:text-xl font-normal leading-relaxed text-text-gray">
                    A: {faq.answer}
                  </p>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection;

