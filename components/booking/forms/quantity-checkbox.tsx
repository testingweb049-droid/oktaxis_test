"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import useFormStore, { FormDataType } from "@/stores/form-store"

interface QuantityCheckboxProps {
  fieldName: keyof FormDataType
  label: string
  subLabel?: string
  description?: string
  maxQuantity?: number
  minQuantity?: number
  onQuantityChange?: (quantity: number) => void
  getQuantity?: () => number
}

export default function QuantityCheckbox({
  fieldName,
  label,
  subLabel,
  description,
  maxQuantity = 3,
  minQuantity = 0,
  onQuantityChange,
  getQuantity,
}: QuantityCheckboxProps) {
  const { formData, setFormData } = useFormStore()

  const value = Boolean(!Array.isArray(formData[fieldName]) && formData[fieldName]?.value)
  const isError =
    !Array.isArray(formData[fieldName]) && formData[fieldName]?.error

  // Get quantity from custom function or default to 0
  const quantity = getQuantity ? getQuantity() : 0

  const handleChange = (checked: boolean) => {
    setFormData(fieldName, checked)
    if (checked && quantity === 0) {
      if (onQuantityChange) {
        onQuantityChange(1)
      }
    } else if (!checked && quantity > 0) {
      // Remove all when unchecked
      if (onQuantityChange) {
        onQuantityChange(0)
      }
    }
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    const currentQuantity = getQuantity ? getQuantity() : 0
    if (currentQuantity > minQuantity) {
      if (onQuantityChange) {
        onQuantityChange(currentQuantity - 1)
        if (currentQuantity === 1) {
          setFormData(fieldName, false)
        }
      }
    }
  }

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    const currentQuantity = getQuantity ? getQuantity() : 0
    if (currentQuantity < maxQuantity) {
      if (onQuantityChange) {
        onQuantityChange(currentQuantity + 1)
        // Check the checkbox when incrementing from 0
        if (currentQuantity === 0) {
          setFormData(fieldName, true)
        }
      }
    }
  }

  return (
    <div
      className={cn(
        "w-full rounded-lg bg-white border flex items-center gap-3 transition-all px-4 py-3",
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
            "text-sm font-medium leading-none cursor-pointer",
            value ? "text-heading-black" : "text-text-gray"
          )}
        >
          {label}
        </label>
        {subLabel && (
          <span className="text-xs text-text-gray">{subLabel}</span>
        )}
        {description && (
          <span className="text-xs text-text-gray italic">{description}</span>
        )}
      </div>
      {/* Horizontal Quantity Selector - Always visible by default */}
      <div 
        className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= minQuantity}
          className="px-3 py-1.5 text-heading-black hover:bg-light-background disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-r border-gray-200"
        >
          -
        </button>
        <div className="px-4 py-1.5 text-sm font-medium text-heading-black min-w-[2rem] text-center">
          {quantity}
        </div>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= maxQuantity}
          className="px-3 py-1.5 text-heading-black hover:bg-light-background disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-l border-gray-200"
        >
          +
        </button>
      </div>
    </div>
  )
}

