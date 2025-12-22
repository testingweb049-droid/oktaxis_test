import React from "react"
import { cn } from "@/lib/utils"
import QuoteButton from "@/components/QuoteButton"
import Heading from "@/components/Heading"

interface CTASectionProps {
  heading: string
  text: string
  buttonText: string
  buttonHref?: string
  onButtonClick?: () => void
  className?: string
}

export function CTASection({
  heading,
  text,
  buttonText,
  buttonHref,
  onButtonClick,
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        "font-montserrat bg-heading-black py-12 sm:py-16 md:py-20",
        "px-4 sm:px-6 md:px-8",
        className,
      )}
    >
      <div className="full-width-section mx-auto flex flex-col items-center text-center gap-4">
        <Heading
          as="h2"
          className="text-2xl sm:text-4xl md:text-5xl font-semibold text-white"
        >
          {heading}
        </Heading>
        <p className="mt-3 max-w-3xl text-base sm:text-xl md:text-2xl text-text-gray">
          {text}
        </p>
        <div className="mt-8 w-full sm:w-auto">
          <QuoteButton
            label={buttonText}
            href={buttonHref}
            onClick={onButtonClick}
          />
        </div>
      </div>
    </section>
  )
}

export default CTASection

