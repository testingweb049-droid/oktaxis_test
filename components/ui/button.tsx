import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary-yellow hover:bg-primary-yellow/90 text-heading-black font-semibold transition-all duration-200 rounded-md",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-text-gray bg-white hover:bg-light-background text-heading-black font-semibold transition-all duration-200 rounded-md",
        secondary: "bg-heading-black hover:bg-heading-black/90 text-white font-semibold transition-all duration-200 rounded-md",
        ghost: "bg-transparent hover:bg-light-background text-heading-black font-medium transition-all duration-200 rounded-md",
        link: "text-primary-yellow underline-offset-4 hover:underline",
        brand: "bg-brand text-black hover:bg-primary-yellow/90 rounded-lg font-semibold transition-colors",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "px-3 py-1.5 text-sm rounded-md h-9",
        lg: "px-6 py-3 text-lg rounded-lg h-11",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
