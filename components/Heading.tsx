import React from "react"
import { cn } from "@/lib/utils"

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel
  children: React.ReactNode
}

export function Heading({ as = "h2", children, className, ...props }: HeadingProps) {
  const Tag = as
  const baseClasses =
    "text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl font-bold text-heading-black text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16"

  return (
    <Tag
      className={cn(baseClasses, className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Heading


