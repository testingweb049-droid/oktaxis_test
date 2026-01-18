'use client'
import React, { useEffect, useCallback, useMemo } from 'react'
import useFormStore, { FieldType } from '@/stores/form-store'
import LocationInput from './location-picker'
import { Loader, TimerIcon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import NewDropdownInput from '@/components/booking/forms/drop-down-input'
import QuantitySelector from '@/components/booking/forms/quantity-selector'
import NewDateTimePicker from '@/components/booking/forms/new-date-time-picker'
import { isAirportLocation, validateBookingTime } from '@/lib/utils'
import { heroFormValidationSchema } from '@/types/form-interfaces'
import { useToast } from '@/components/ui/use-toast'
import { usePricing } from '@/hooks/usePricing'

function HeroForm() {
  const { category, changeCategory, formError, formLoading, changeStep, formData, setFormData, manageStops, isOrderDone, step, resetForm, setFieldOptions } = useFormStore()
  const router = useRouter()
  const { toast } = useToast()
  const { data: pricing } = usePricing()
  const minimumBookingHours = pricing?.minimumBookingHours ?? 0
  const timezone = pricing?.timezone ?? ""
  
  // Memoize duration array to prevent recreation on every render
  const durationArray = useMemo(() => {
    return Array.from({ length: 48 }, (_, i) => {
      const hours = (i + 1) / 2
      const label =
        hours === 0.5
          ? "0.5 Hour"
          : `${hours} ${hours === 1 ? "Hour" : "Hours"}`
      return { label, value: hours.toString() }
    })
  }, [])

  useEffect(() => {
    if (isOrderDone) {
      resetForm()
    }
  }, [step, isOrderDone])

  const formatFieldName = useCallback((fieldName: string): string => {
    const fieldMap: Record<string, string> = {
      date: 'Date',
      time: 'Time',
      fromLocation: 'Pickup Location',
      toLocation: 'Drop Off Location',
      duration: 'Duration',
      passengers: 'Passengers',
      bags: 'Bags',
      category: 'Category',
    }
    return fieldMap[fieldName] || fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
  }, [])
  const validateForm = useCallback((validationData: {
    category: string
    date: string
    time: string
    fromLocation: string
    toLocation: string
    duration: string
    passengers: string
    bags: string
  }) => {
    const result = heroFormValidationSchema.safeParse(validationData)

    if (result.success) {
      return { isValid: true, errors: [] }
    }

    // Group errors by field and format them
    const errorsByField = new Map<string, string[]>()
    
    result.error.errors.forEach((error) => {
      const fieldName = error.path[0] ? String(error.path[0]) : 'general'
      const formattedFieldName = formatFieldName(fieldName)
      
      if (!errorsByField.has(formattedFieldName)) {
        errorsByField.set(formattedFieldName, [])
      }
      errorsByField.get(formattedFieldName)!.push(error.message)
    })

    // Convert to array format
    const errors = Array.from(errorsByField.entries()).map(([field, messages]) => ({
      field,
      messages,
      displayText: `${field}: ${messages.join(', ')}`
    }))

    return { isValid: false, errors }
  }, [formatFieldName])

  const setFieldErrors = useCallback((errors: Array<{ field: string; messages: string[] }>) => {
    const fieldMap: Record<string, keyof typeof formData> = {
      'Date': 'date',
      'Time': 'time',
      'Pickup Location': 'fromLocation',
      'Drop Off Location': 'toLocation',
      'Duration': 'duration',
      'Passengers': 'passengers',
      'Bags': 'bags',
    }

    // Set errors on fields that have validation issues
    // Update form data with errors
    useFormStore.setState((state) => {
      const updatedFormData = { ...state.formData } as typeof state.formData
      
      errors.forEach(({ field, messages }) => {
        const fieldKey = fieldMap[field]
        if (fieldKey && updatedFormData[fieldKey] && !Array.isArray(updatedFormData[fieldKey])) {
          const currentField = updatedFormData[fieldKey] as FieldType<string>
          ;(updatedFormData as any)[fieldKey] = {
            ...currentField,
            error: messages[0] || 'Invalid value'
          }
        }
      })
      
      return { formData: updatedFormData }
    })
  }, [])
  const handleSubmit = useCallback(async () => {
    // Prepare data for validation
    const validationData = {
      category,
      date: formData.date.value,
      time: formData.time.value,
      fromLocation: formData.fromLocation.value,
      toLocation: formData.toLocation.value,
      duration: formData.duration.value,
      passengers: formData.passengers.value,
      bags: formData.bags.value,
    }

    // Validate form (excluding 5-hour check)
    const validation = validateForm(validationData)

    if (!validation.isValid) {
      setFieldErrors(validation.errors)
      return
    }

    // Check minimum booking hours requirement separately and show toast if invalid
    if (formData.date.value && formData.time.value) {
      const timeValidation = validateBookingTime(
        formData.date.value,
        formData.time.value,
        minimumBookingHours,
        timezone
      )

      if (!timeValidation.isValid) {
        // Set errors on date and time fields to show red borders
        useFormStore.setState((state) => {
          const updatedFormData = { ...state.formData } as typeof state.formData
          
          // Set date field error
          if (updatedFormData.date && !Array.isArray(updatedFormData.date)) {
            const currentDateField = updatedFormData.date as FieldType<string>
            ;(updatedFormData as any).date = {
              ...currentDateField,
              error: timeValidation.error?.includes("can't be added") ? timeValidation.error : 'Invalid date'
            }
          }
          
          // Set time field error
          if (updatedFormData.time && !Array.isArray(updatedFormData.time)) {
            const currentTimeField = updatedFormData.time as FieldType<string>
            ;(updatedFormData as any).time = {
              ...currentTimeField,
              error: timeValidation.error?.includes("can't be added") ? timeValidation.error : 'Invalid time'
            }
          }
          
          return { formData: updatedFormData }
        })
        
        toast({
          title: "Booking Too Soon",
          description: timeValidation.error || `Booking can't be added within ${minimumBookingHours} hours of pickup time, choose another time.`,
          variant: "destructive",
          duration: 3000,
        })
        return
      }
    }

    // Check for airport in locations and auto-set airport pickup
    const fromIsAirport = isAirportLocation(formData.fromLocation.value)
    const toIsAirport = category === 'trip' ? isAirportLocation(formData.toLocation.value) : false
    
    if (fromIsAirport || toIsAirport) {
      setFormData('isAirportPickup', true)
    }

    // Proceed with form submission
    const isOk = await changeStep(true, 1)
    if (isOk) {
      router.replace('/book-ride/select-car')
    }
  }, [
    category,
    formData,
    validateForm,
    setFieldErrors,
    setFormData,
    changeStep,
    router,
    toast,
    minimumBookingHours,
    timezone,
  ])


  return (
    <div className='flex flex-col gap-3 sm:gap-5 w-full max-w-screen-sm max-lg:w-full'>
      {/* Trip/Hourly Tabs */}
      <div className='grid grid-cols-2 gap-3 max-lg:px-4 sm:px-0'>
        <div
          onClick={() => changeCategory('trip')}
          className={`py-2 px-3 w-full text-center font-semibold rounded-xl cursor-pointer transition-colors ${category === 'trip'
              ? 'bg-brand text-black'
              : 'bg-white text-gray-700 border border-gray-300'
            }`}
        >
          One Way
        </div>
        <div
          onClick={() => changeCategory('hourly')}
          className={`py-2 px-3 w-full text-center font-semibold rounded-xl cursor-pointer transition-colors ${category === 'hourly'
              ? 'bg-brand text-black'
              : 'bg-white text-gray-700 border border-gray-300'
            }`}
        >
          Hourly
        </div>
      </div>

      {/* Form Container */}
      <div className='max-lg:px-4 max-lg:pt-5 max-lg:pb-5 max-lg:rounded-t-2xl max-lg:rounded-b-none max-lg:border-x-0 max-lg:border-t sm:p-5 sm:rounded-2xl bg-white flex flex-col gap-5 sm:border border-gray-200 shadow-sm'>
        <div className='flex flex-col gap-4 w-full'>
          {/* Location Inputs */}
          <div className='flex flex-col gap-4 w-full'>
            <LocationInput field="fromLocation" placeholder="Pickup Location" label='From' />

            {category !== 'hourly' && formData.stops.map((_, i) => (
              <LocationInput
                key={i}
                field={`stops`}
                label={`Stop ${i + 1}`}
                index={i}
                isStop
                placeholder={`Stop ${i + 1}`}
                onRemoveStop={() => manageStops('remove', i)}
                onAddStop={() => manageStops('add', i)}
                showAddButton
              />
            ))}

            {category !== 'hourly' && <LocationInput field="toLocation" placeholder="Drop Off Location" label='To' />}
            {category === 'hourly' && (
              <NewDropdownInput Icon={TimerIcon} fieldName='duration' placeholder='Duration in Hours' options={durationArray} />
            )}
          </div>

          {/* Date and Time Picker */}
          <NewDateTimePicker
            selectedDate={formData.date.value}
            selectedTime={formData.time.value}
            setFormData={setFormData}
            dateFieldName="date"
            timeFieldName="time"
            placeholder='Select Date & Time'
            isDisable={false}
            className="bg-gray-200"
          />

          {/* Passengers and Bags */}
          <div className='grid grid-cols-2 gap-3'>
            <QuantitySelector fieldName='passengers' label='Passengers' min={1} max={8} />
            <QuantitySelector fieldName='bags' label='Bags' min={0} max={10} />
          </div>
        </div>

        {formError && (
          <div className='text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3'>
            <p className="font-medium">Error</p>
            <p>{formError}</p>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSubmit}
            variant="brand"
            size="default"
            disabled={formLoading}
            className="w-full py-2 px-3 gap-2"
          >
            {formLoading ? (
              <>
                <Loader className='animate-spin' size={20} />
                <span>Loading...</span>
              </>
            ) : (
              <>
                <Search size={20} />
                <span>See Prices</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HeroForm;
