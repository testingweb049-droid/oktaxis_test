"use client"

import useFormStore from "@/stores/form-store"
import { ArrowRightLeft } from "lucide-react"
import React from "react"
import { usePricing, DEFAULT_PRICING } from "@/hooks/usePricing"

export default function AddReturn() {
  const { formData, setFormData, setFieldOptions } = useFormStore()
  const { data: pricing = DEFAULT_PRICING } = usePricing()

  const basePrice = Number(formData.price?.value || 0)
  const from = formData.fromLocation?.value || ""
  const to = formData.toLocation?.value || ""
  const isReturn = formData.isReturn?.value || false

  const discountPercent = pricing.return.discount || 10
  const discountAmount = (basePrice * discountPercent) / 100
  const discountedPrice = basePrice - discountAmount
  const formattedPrice = discountedPrice.toFixed(2)

  const headingText = `Complete Your Journey`
  const subText = isReturn
    ? `Return transfer from ${to || "your destination"} to ${
        from || "your departure point"
      } has been added.`
    : `Add return trip from ${to || "your destination"} to ${
        from || "your departure point"
      }`
  const savingsAmount = `Save £${formattedPrice}`

  return (
    <div
      className="w-full rounded-lg bg-white px-4 py-3 border border-gray-200 flex items-center gap-3 relative transition-all duration-300 overflow-visible"
    >
      {/* Save Discount Badge - Top Right Corner */}
      <div className="text-xs px-2 py-1 bg-heading-black text-white absolute right-4 -top-1 rounded-xl z-10 whitespace-nowrap shadow-sm font-medium">
        Save {discountPercent}%
      </div>

      <div
        className={`flex items-center justify-center p-2 rounded-full transition-all shrink-0 ${
          isReturn ? "bg-primary-yellow" : "bg-text-gray"
        }`}
      >
        <ArrowRightLeft size={18} className="text-heading-black" />
      </div>

      <div className="flex flex-col gap-1 flex-1 min-w-0">
        <div className="text-sm font-semibold text-heading-black">{headingText}</div>
        <div className={`text-xs text-text-gray ${isReturn ? '' : 'line-clamp-2'}`}>
          {subText}
          {!isReturn && (
            <span className="text-primary-yellow font-medium ml-1">{savingsAmount}</span>
          )}
        </div>
      </div>

      {/* Add Return Button - Far Right */}
      <div className="flex items-center shrink-0 mt-4">
        <div
          onClick={() => {
            const newIsReturn = !isReturn
            setFormData("isReturn", newIsReturn)
            setFieldOptions('returnDate', newIsReturn)
            setFieldOptions('returnTime', newIsReturn)
          }}
          className="px-4 py-2 rounded-lg text-sm font-medium text-nowrap cursor-pointer transition-all bg-primary-yellow hover:bg-primary-yellow/90 text-heading-black"
        >
          {isReturn ? "Cancel Return" : "Add Return"}
        </div>
      </div>
    </div>
  )
}
