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
        "w-full rounded-lg bg-white px-4 py-3 border",
        hasError ? "border-red-500" : "border-gray-200"
      )}>
          <Field name={name}>
            {({ field }: any) => (
              <Input
                {...field}
                type={type}
              icon={Icon}
              label={label + (required ? " *" : "")}
                placeholder={placeholder || label}
              error={hasError}
              className="bg-transparent text-heading-black placeholder:text-text-gray"
                ref={ref}
                {...props}
              />
            )}
          </Field>
      </div>
    )
  }
)
FormField.displayName = "FormField"

export default FormField

