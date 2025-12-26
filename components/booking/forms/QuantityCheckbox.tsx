"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import useFormStore, { FormDataType } from "@/stores/FormStore"

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
  const { formData, setFormData, manageStops } = useFormStore()

  const value = Boolean(!Array.isArray(formData[fieldName]) && formData[fieldName]?.value)
  const isError =
    !Array.isArray(formData[fieldName]) && formData[fieldName]?.error

  // Get quantity from custom function or default to stops count
  const quantity = getQuantity ? getQuantity() : (formData.stops?.length || 0)

  const handleChange = (checked: boolean) => {
    setFormData(fieldName, checked)
    if (checked && quantity === 0) {
      if (onQuantityChange) {
        onQuantityChange(1)
      } else {
        manageStops('add')
      }
    } else if (!checked && quantity > 0) {
      // Remove all when unchecked
      if (onQuantityChange) {
        onQuantityChange(0)
      } else {
        // Remove all stops when unchecked - remove from the end one by one
        const currentStops = formData.stops?.length || 0
        if (currentStops > 0) {
          // Remove from the last index down to 0
          for (let i = currentStops - 1; i >= 0; i--) {
            manageStops('remove', i)
          }
        }
      }
    }
  }

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    const currentQuantity = getQuantity ? getQuantity() : (formData.stops?.length || 0)
    if (currentQuantity > minQuantity) {
      if (onQuantityChange) {
        onQuantityChange(currentQuantity - 1)
        if (currentQuantity === 1) {
          setFormData(fieldName, false)
        }
      } else {
        const stopsLength = formData.stops?.length || 0
        if (stopsLength > 0 && stopsLength - 1 < stopsLength) {
          manageStops('remove', stopsLength - 1)
          if (stopsLength === 1) {
            setFormData(fieldName, false)
          }
        }
      }
    }
  }

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation()
    const currentQuantity = getQuantity ? getQuantity() : (formData.stops?.length || 0)
    if (currentQuantity < maxQuantity) {
      if (onQuantityChange) {
        onQuantityChange(currentQuantity + 1)
        // Check the checkbox when incrementing from 0
        if (currentQuantity === 0) {
          setFormData(fieldName, true)
        }
      } else {
        manageStops('add')
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
        "w-full rounded-lg bg-gray-200 border flex items-center gap-3 transition-all",
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
        {description && (
          <span className="text-xs text-gray-400 italic">{description}</span>
        )}
      </div>
      {/* Horizontal Quantity Selector - Always visible by default */}
      <div 
        className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={handleDecrement}
          disabled={quantity <= minQuantity}
          className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-r border-gray-300"
        >
          -
        </button>
        <div className="px-4 py-1.5 text-[13px] font-medium text-gray-800 min-w-[2rem] text-center">
          {quantity}
        </div>
        <button
          type="button"
          onClick={handleIncrement}
          disabled={quantity >= maxQuantity}
          className="px-3 py-1.5 text-gray-700 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors border-l border-gray-300"
        >
          +
        </button>
      </div>
    </div>
  )
}

