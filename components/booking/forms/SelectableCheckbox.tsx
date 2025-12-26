"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import useFormStore, { FormDataType } from "@/stores/FormStore"

interface SelectableCheckboxProps {
  fieldName: keyof FormDataType
  label: string
  subLabel?: string
}

export default function SelectableCheckbox({
  fieldName,
  label,
  subLabel,
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
        "w-full rounded-lg bg-gray-200 border flex items-center gap-3 cursor-pointer transition-all",
        isError ? "border-red-500" : "border-gray-200"
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
            "text-[13px] font-medium leading-none cursor-pointer",
            value ? "text-gray-900" : "text-gray-700"
          )}
        >
          {label}
        </label>
        {subLabel && (
          <span className="text-xs text-gray-500">{subLabel}</span>
        )}
      </div>
    </div>
  )
}
