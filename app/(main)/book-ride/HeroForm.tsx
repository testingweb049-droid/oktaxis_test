'use client'
import React, { useEffect } from 'react'
import useFormStore from '@/stores/FormStore'
import LocationInput from './LocationPicker'
import { Loader, TimerIcon, Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import NewDropdownInput from '@/components/booking/forms/DropDownInput'
import QuantitySelector from '@/components/booking/forms/QuantitySelector'
import NewDateTimePicker from '@/components/booking/forms/NewDateTimePicker'

function HeroForm() {
  const { category, changeCategory, formError, formLoading, changeStep, formData, setFormData, manageStops, isOrderDone, step, resetForm } = useFormStore()

  const router = useRouter()
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
