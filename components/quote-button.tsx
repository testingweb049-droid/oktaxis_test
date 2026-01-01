import React from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface QuoteButtonProps {
  label?: string
  href?: string
  onClick?: () => void
  className?: string
}

export function QuoteButton({
  label = "Get an Instant Quote",
  href,
  onClick,
  className,
}: QuoteButtonProps) {
  const baseClasses = cn(
    "inline-flex items-center justify-center w-full sm:w-auto font-semibold rounded-lg shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-yellow focus-visible:ring-offset-2",
    "bg-primary-yellow hover:bg-primary-yellow/90 text-white font-semibold transition-all duration-200",
    "px-8 py-4 sm:px-14 sm:py-6 text-base sm:text-base md:text-lg"
  )

  if (href) {
    return (
      <Link href={href} className={cn(baseClasses, className)} onClick={onClick}>
        {label}
      </Link>
    )
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(baseClasses, className)}
    >
      {label}
    </button>
  )
}

export default QuoteButton


