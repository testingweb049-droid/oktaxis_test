"use client"

import React from 'react'
import useFormStore from '@/stores/form-store'

interface QuantitySelectorProps {
  fieldName: 'passengers' | 'bags' | 'duration'
  label: string
  min?: number
  max?: number
  stepValue?: number
}

export default function QuantitySelector({ fieldName, label, min = 0, max = 10, stepValue = 1 }: QuantitySelectorProps) {
  const { formData, setFormData } = useFormStore()
  
  const currentValue = Number(formData[fieldName].value) || min
  const hasError = !!formData[fieldName]?.error
  
  const increment = () => {
    const newValue = currentValue + stepValue
    if (newValue <= max) {
      setFormData(fieldName, newValue.toString())
    }
  }
  
  const decrement = () => {
    const newValue = currentValue - stepValue
    if (newValue >= min) {
      setFormData(fieldName, newValue.toString())
    }
  }

  const displayValue = fieldName === 'duration' 
    ? `${currentValue} ${currentValue === 1 ? 'Hour' : 'Hours'}`
    : currentValue

  return (
    <div className={`flex flex-col w-full bg-gray-200 rounded-xl px-4 py-3 border ${hasError ? 'border-red-500' : 'border-transparent'}`}>
      {/* Label inside field */}
      <label className="text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      {/* Counter field */}
      <div className="flex items-center justify-between">
        {/* Value */}
        <span className="text-base font-semibold text-gray-800">{displayValue}</span>
        {/* Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={decrement}
            disabled={currentValue <= min}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/80 text-white hover:bg-primary/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            -
          </button>
          <button
            type="button"
            onClick={increment}
            disabled={currentValue >= max}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-primary/80 text-white hover:bg-primary/70 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}

