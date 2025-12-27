'use client'
import React, { useEffect } from 'react'
import useFormStore from '@/stores/FormStore'
import LocationInput from './LocationPicker'
import { Loader, TimerIcon, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import NewDropdownInput from '@/components/booking/forms/DropDownInput'
import QuantitySelector from '@/components/booking/forms/QuantitySelector'
import NewDateTimePicker from '@/components/booking/forms/NewDateTimePicker'
import { useToast } from '@/components/ui/use-toast'

function HeroForm() {
  const { category, changeCategory, formError, formLoading, changeStep, formData, setFormData, manageStops, isOrderDone, step, resetForm } = useFormStore()
  const { toast } = useToast()
  const router = useRouter()

  // Helper function to detect if a location is an airport
  const isAirportLocation = (location: string): boolean => {
    if (!location) return false
    const lowerLocation = location.toLowerCase()
    const airportKeywords = [
      'airport',
      'terminal',
      'manchester airport',
      'liverpool airport',
      'man airport',
      'lpl airport',
      'heathrow',
      'gatwick',
      'stansted',
      'luton',
      'birmingham airport',
      'edinburgh airport',
      'glasgow airport',
      'bristol airport',
      'newcastle airport',
      'leeds bradford airport',
      'east midlands airport',
      'terminal 1',
      'terminal 2',
      'terminal 3',
      'terminal 4',
      'terminal 5'
    ]
    return airportKeywords.some(keyword => lowerLocation.includes(keyword))
  }
  const durationArray = Array.from({ length: 48 }, (_, i) => {
    const hours = (i + 1) / 2
    const label =
      hours === 0.5
        ? "0.5 Hour"
        : `${hours} ${hours === 1 ? "Hour" : "Hours"}`
    return { label, value: hours.toString() }
  })

  useEffect(() => {
    if (isOrderDone) {
      resetForm()
    }
  }, [step, isOrderDone])


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
          Trip
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
            <LocationInput field="fromLocation" placeholder="Pickup Location" label='Start' />

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

            {category !== 'hourly' && <LocationInput field="toLocation" placeholder="Drop Off Location" label='End' />}
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
          />

          {/* Passengers and Bags */}
          <div className='grid grid-cols-2 gap-3'>
            <QuantitySelector fieldName='passengers' label='Passengers' min={1} max={8} />
            <QuantitySelector fieldName='bags' label='Bags' min={0} max={10} />
          </div>
        </div>

        {formError && <div className='text-sm text-red-500'>{formError}</div>}

        {/* See Prices Button */}
        <button
          onClick={async () => {
            // Check if start and end locations are the same (for trip category)
            if (category === 'trip' && formData.fromLocation.value && formData.toLocation.value) {
              const fromLocation = formData.fromLocation.value.trim().toLowerCase()
              const toLocation = formData.toLocation.value.trim().toLowerCase()
              
              // Compare locations (check if they're the same or very similar)
              if (fromLocation === toLocation || 
                  (fromLocation.includes(toLocation) && toLocation.length > 10) ||
                  (toLocation.includes(fromLocation) && fromLocation.length > 10)) {
                toast({
                  title: "Invalid Locations",
                  description: "Start and end locations cannot be the same. Please choose different locations.",
                  variant: "destructive",
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

            const isOk = await changeStep(true, 1);
            if (isOk) {
              router.replace('/book-ride/select-car')
            }
          }}
          className={`flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg cursor-pointer font-semibold text-black transition-colors ${formLoading
              ? 'bg-brand/70 cursor-not-allowed'
              : 'bg-brand hover:bg-primary-yellow/90'
            }`}
          disabled={formLoading}
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
        </button>
      </div>
    </div>
  )
}

export default HeroForm
