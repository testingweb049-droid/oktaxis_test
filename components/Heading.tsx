import React from "react"
import { cn } from "@/lib/utils"

type HeadingLevel = "h1" | "h2" | "h3" | "h4" | "h5" | "h6"

interface HeadingProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingLevel
  children: React.ReactNode
  align?: "left" | "center" | "right"
}

export function Heading({ as = "h2", children, className, align = "center", ...props }: HeadingProps) {
  const Tag = as
  const baseClasses =
    "text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold text-heading-black mb-6 sm:mb-8 md:mb-12 lg:mb-16"

  const alignClass =
    align === "left" ? "text-left" : align === "right" ? "text-right" : "text-center"

  return (
    <Tag
      className={cn(baseClasses, alignClass, className)}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Heading


