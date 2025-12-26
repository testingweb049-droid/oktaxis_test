import * as React from "react"
import { Field } from "formik"
import { Input } from "./input"
import { cn } from "@/lib/utils"
import { LucideProps } from "lucide-react"

interface FormFieldProps {
  name: string
  label: string
  placeholder?: string
  type?: "text" | "email" | "tel" | "number" | "password"
  Icon?: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
  required?: boolean
  errors?: any
  touched?: any
}

export const FormField = React.forwardRef<HTMLInputElement, FormFieldProps>(
  ({ name, label, placeholder, type = "text", Icon, required = false, errors, touched, ...props }, ref) => {
    const hasError = errors && errors[name] && touched && touched[name]
    
    return (
      <div className={cn(
        "w-full rounded-lg bg-gray-200 px-4 py-3 border",
        hasError ? "border-red-500" : "border-gray-300"
      )}>
        {/* Label inside box */}
        <label className="block text-[13px] font-medium text-gray-600 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        {/* Input Field */}
        <div className="relative w-full">
          {Icon && (
            <Icon className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 z-10" size={18} />
          )}
          <Field name={name}>
            {({ field }: any) => (
              <Input
                {...field}
                type={type}
                placeholder={placeholder || label}
                className={cn(
                  "w-full pl-6 text-[15px] bg-transparent text-gray-800 placeholder:text-gray-400 outline-none focus:text-gray-900 focus:outline-none focus-visible:outline-none focus-visible:ring-0 focus:ring-0 border-0",
                  hasError && "text-red-600"
                )}
                ref={ref}
                {...props}
              />
            )}
          </Field>
        </div>
      </div>
    )
  }
)
FormField.displayName = "FormField"

export default FormField

