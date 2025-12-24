
"use client"

import React from "react"
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
          {faqs.map((faq, index) => (
            <article
              key={index}
              className="rounded-xl bg-white px-5 py-6 shadow-[0px_1.33px_2.67px_0px_#0000000D] sm:px-8 sm:py-7 md:py-8"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2 sm:gap-3">
                  <span className="mt-1 text-lg font-semibold text-primary-yellow sm:text-xl">
                    Q:
                  </span>
                  <p className="flex-1 text-2xl font-semibold text-heading-black">
                    {faq.question}
                  </p>
                </div>

                <p className="text-xl font-normal leading-relaxed text-gray">
                  {faq.answer}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FAQSection;

