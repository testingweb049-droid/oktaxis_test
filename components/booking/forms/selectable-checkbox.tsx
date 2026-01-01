"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import useFormStore, { FormDataType } from "@/stores/form-store"

interface SelectableCheckboxProps {
  fieldName: keyof FormDataType
  label: string
  subLabel?: string
  noBorder?: boolean
}

export default function SelectableCheckbox({
  fieldName,
  label,
  subLabel,
  noBorder = false,
}: SelectableCheckboxProps) {
  const { formData, setFormData, setFieldOptions } = useFormStore()

  const value = Boolean(!Array.isArray(formData[fieldName]) && formData[fieldName]?.value)
  const isError =
    !Array.isArray(formData[fieldName]) && formData[fieldName]?.error

  const handleChange = (checked: boolean) => {
    setFormData(fieldName, checked)
    if(fieldName==='isAirportPickup'){
      setFieldOptions('flightName',checked)
      setFieldOptions('flightNumber',checked)
    }
    if(fieldName==='isAddInstructions'){
      setFieldOptions('instructions',checked)
    }
  }

  return (
    <div
      className={cn(
        "w-full rounded-lg bg-white flex items-center gap-3 cursor-pointer transition-all px-4 py-3",
        !noBorder && (isError ? "border border-red-500" : "border border-gray-200")
      )}
      onClick={() => handleChange(!value)}
    >
      <Checkbox
        checked={value}
        onCheckedChange={handleChange}
        className="bg-white"
      />
      <div className="flex items-center gap-2 flex-1">
        <label
          className={cn(
            "text-sm font-medium leading-none cursor-pointer",
            value ? "text-heading-black" : "text-text-gray"
          )}
        >
          {label}
        </label>
        {subLabel && (
          <span className="text-xs text-text-gray">{subLabel}</span>
        )}
      </div>
    </div>
  )
}
