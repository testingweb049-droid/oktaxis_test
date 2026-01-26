'use client'
import useFormStore from '@/stores/form-store'
import LocationInput from '@/app/book-ride/location-picker'
import { Loader, TimerIcon, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import NewDropdownInput from '@/components/booking/forms/drop-down-input'
import QuantitySelector from '@/components/booking/forms/quantity-selector'
import NewDateTimePicker from '@/components/booking/forms/new-date-time-picker'
import CategoryTabs from '@/components/booking/category-tabs'
import { isAirportLocation, getDurationArray } from '@/lib/utils'
import { useBookingSettings } from '@/hooks/api/useBookingSettings'
import { useToast } from '@/components/ui/use-toast'
import { calculateDistance } from '@/lib/services/distance-calculator'
import { useState } from 'react'

function Step1Form() {
  const { category, formLoading, changeStep, formData, setFormData } = useFormStore()
  const router = useRouter()
  const { toast } = useToast()
  const { data: bookingSettings } = useBookingSettings()
  const durationArray = getDurationArray()
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false)
  const isLoading = formLoading || isCalculatingDistance

  const handleValidationError = (validationResult: any, pricingData?: { minimumBookingHours?: number }) => {
    if (typeof validationResult === 'object' && validationResult !== null && 'errorType' in validationResult) {
      if (validationResult.errorType === 'time_validation') {
        toast({
          title: "Booking Too Soon",
          description: validationResult.errorMessage || `Booking can't be added within ${pricingData?.minimumBookingHours || 0} hours of pickup time, choose another time.`,
          variant: "destructive",
          duration: 1000,
        })
      }
      return true
    }
    return validationResult !== true
  }
  const handleSubmit = async () => {
    const bookingSettingsData = bookingSettings ? {
      minimumBookingHours: bookingSettings.minimumBookingHours,
      minimumBookingHoursActive: bookingSettings.minimumBookingHoursActive,
      timezone: bookingSettings.timezone
    } : undefined
    
    const validationResult = await changeStep(true, 1, bookingSettingsData)
    
    if (handleValidationError(validationResult, bookingSettingsData)) {
      return
    }

    // Validate required fields
    if (category === 'trip' && (!formData.toLocation.value || !formData.toLocation.coordinates)) {
      toast({
        title: "Missing Location",
        description: "Please select a drop-off location",
        variant: "destructive",
      })
      return
    }

    if (category === 'hourly' && !formData.duration.value) {
      toast({
        title: "Missing Duration",
        description: "Please select a duration",
        variant: "destructive",
      })
      return
    }
    // Calculate distance for trip category
    if (category === 'trip') {
      setIsCalculatingDistance(true)
      try {
        const distanceResult = await calculateDistance({
          from: formData.fromLocation.coordinates,
          to: formData.toLocation.coordinates,
        })
        
        setFormData('distance', distanceResult.mileDistance)
      } catch (error) {
        setIsCalculatingDistance(false)
        return
      }
      setIsCalculatingDistance(false)
    }

    const fromIsAirport = isAirportLocation(formData.fromLocation.value)
    const toIsAirport = category === 'trip' ? isAirportLocation(formData.toLocation.value) : false
    if (fromIsAirport || toIsAirport) {
      setFormData('isAirportPickup', true)
    }
    router.replace('/book-ride/select-car')
  }

  return (
    <div className='flex flex-col gap-3 sm:gap-5 w-full max-w-screen-sm max-lg:w-full'>
      <CategoryTabs />
  
      <div className='max-lg:px-4 max-lg:pt-5 max-lg:pb-5 max-lg:rounded-t-2xl max-lg:rounded-b-none max-lg:border-x-0 max-lg:border-t sm:p-5 sm:rounded-2xl bg-white flex flex-col gap-5 sm:border border-gray-200 shadow-sm'>
        <div className='flex flex-col gap-4 w-full'>
          <div className='flex flex-col gap-4 w-full'>
            <LocationInput field="fromLocation" placeholder="Pickup Location" label='From' />
            {category !== 'hourly' && <LocationInput field="toLocation" placeholder="Drop Off Location" label='To' />}
            {category === 'hourly' && (
              <NewDropdownInput Icon={TimerIcon} fieldName='duration' placeholder='Duration in Hours' options={durationArray} />
            )}
          </div>
          <NewDateTimePicker
            selectedDate={formData.date.value}
            selectedTime={formData.time.value}
            setFormData={setFormData}
            dateFieldName="date"
            timeFieldName="time"
            placeholder='Select Date & Time'
            timezone={bookingSettings?.timezone}
            isDisable={false}
            className="bg-gray-200"
          />
          <div className='grid grid-cols-2 gap-3'>
            <QuantitySelector fieldName='passengers' label='Passengers' min={1} max={8} />
            <QuantitySelector fieldName='bags' label='Bags' min={0} max={10} />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Button
            onClick={handleSubmit}
            variant="brand"
            size="default"
            disabled={isLoading}
            className="w-full py-2 px-3 gap-2 relative overflow-hidden group before:absolute before:top-0 before:left-0 before:w-full before:h-full before:bg-heading-black before:scale-x-0 before:origin-left before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100 before:z-0 disabled:before:hidden"
          >
            <div className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-300">
              {isLoading ? (
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
            </div>
          </Button>
          <p className="text-sm sm:text-base text-text-gray text-center mt-1">
            Chauffeur waits up to 30 minutes free at the airport.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Step1Form;

