import * as React from "react"
import { LucideProps } from "lucide-react"
import ReactPhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  error?: boolean
  label?: string
  containerClassName?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon: Icon, error, label, containerClassName, ...props }, ref) => {
    const inputElement = (
      <div className="relative w-full">
        {Icon && (
          <Icon className="absolute left-0 top-1/2 -translate-y-1/2 text-text-gray" size={18} />
        )}
      <input
        type={type}
        className={cn(
            "w-full bg-transparent text-heading-black placeholder:text-text-gray outline-none focus:outline-none text-base",
            Icon && "pl-6",
            error && "text-red-600 placeholder:text-red-400",
            "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
      </div>
    )

    if (label || containerClassName) {
      return (
        <div className={cn("w-full", containerClassName)}>
          {label && (
            <label className="block text-sm sm:text-base font-medium text-text-gray mb-1">
              {label}
            </label>
          )}
          {inputElement}
        </div>
      )
    }

    return inputElement
  }
)
Input.displayName = "Input"

export interface PhoneInputProps {
  value: string
  onChange: (phone: string) => void
  error?: boolean
  label?: string
  containerClassName?: string
  country?: string
}

const PhoneInput = React.forwardRef<HTMLDivElement, PhoneInputProps>(
  ({ value, onChange, error, label, containerClassName, country = "gb" }, ref) => {
    return (
      <div ref={ref} className={cn("w-full", containerClassName)}>
        {label && (
          <label className="block text-xs sm:text-sm font-medium text-text-gray mb-1">
            {label}
          </label>
        )}
        <div className="w-full">
          <ReactPhoneInput
            country={country}
            value={value}
            onChange={onChange}
            inputStyle={{
              width: "100%",
              paddingTop: "8px",
              paddingBottom: "8px",
              paddingLeft: "50px",
              paddingRight: "8px",
              fontSize: "16px",
              backgroundColor: "transparent",
              border: "none",
              borderRadius: "6px",
              color: error ? "rgb(220, 38, 38)" : "#1A1A1A", // heading-black
            }}
            buttonStyle={{
              border: "none",
              backgroundColor: "transparent",
            }}
            containerStyle={{
              width: "100%",
            }}
          />
        </div>
      </div>
    )
  }
)
PhoneInput.displayName = "PhoneInput"

export { Input, PhoneInput }
