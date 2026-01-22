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
import { usePricing } from '@/hooks/usePricing'
import { useToast } from '@/components/ui/use-toast'
import { usePrepareQuote } from '@/hooks/usePrepareQuote'

function Step1Form() {
  const { category, formLoading, changeStep, formData, setFormData, setCachedFleets, setCachedQuoteData } = useFormStore()
  const router = useRouter()
  const { toast } = useToast()
  const { data: pricing } = usePricing()
  const { mutate: prepareQuote, isPending: isPreparingQuote } = usePrepareQuote()
  const durationArray = getDurationArray()
  
  const handleSubmit = async () => {
    // Validate form first
    const pricingData = pricing ? {
      minimumBookingHours: pricing.minimumBookingHours,
      timezone: pricing.timezone
    } : undefined
    
    const validationResult = await changeStep(true, 1, pricingData)
    
    if (typeof validationResult === 'object' && validationResult !== null && 'errorType' in validationResult) {
      if (validationResult.errorType === 'time_validation') {
        toast({
          title: "Booking Too Soon",
          description: validationResult.errorMessage || `Booking can't be added within ${pricingData?.minimumBookingHours || 0} hours of pickup time, choose another time.`,
          variant: "destructive",
          duration: 1000,
        })
      }
      return
    }
    
    if (validationResult !== true) {
      return
    }

    // Check for airport locations
    const fromIsAirport = isAirportLocation(formData.fromLocation.value)
    const toIsAirport = category === 'trip' ? isAirportLocation(formData.toLocation.value) : false
    
    if (fromIsAirport || toIsAirport) {
      setFormData('isAirportPickup', true)
    }

    // Prepare quote data
    const quoteRequest: any = {
      category,
      fromLocation: {
        address: formData.fromLocation.value,
        coordinates: formData.fromLocation.coordinates,
      },
      date: formData.date.value,
      time: formData.time.value,
      passengers: Number(formData.passengers.value) || 1,
      bags: Number(formData.bags.value) || 0,
    }

    if (category === 'trip') {
      if (!formData.toLocation.value || !formData.toLocation.coordinates) {
        toast({
          title: "Missing Location",
          description: "Please select a drop-off location",
          variant: "destructive",
        })
        return
      }
      quoteRequest.toLocation = {
        address: formData.toLocation.value,
        coordinates: formData.toLocation.coordinates,
      }
      // Include stops if any
      const stops = formData.stops
        .map((stop) => stop.coordinates)
        .filter((coord) => coord && coord.trim())
      if (stops.length > 0) {
        quoteRequest.stops = stops
      }
    } else if (category === 'hourly') {
      if (!formData.duration.value) {
        toast({
          title: "Missing Duration",
          description: "Please select a duration",
          variant: "destructive",
        })
        return
      }
      quoteRequest.duration = Number(formData.duration.value)
    }

    // Call prepare-quote endpoint
    prepareQuote(quoteRequest, {
      onSuccess: (response) => {
        if (response.success && response.data) {
          const { distance, duration, fleets, pricing: quotePricing } = response.data

          // Store distance/duration in formData
          if (category === 'trip' && distance !== undefined) {
            setFormData('distance', distance)
          } else if (category === 'hourly' && duration !== undefined) {
            setFormData('duration', duration.toString())
          }

          // Store fleets and quote data in cache
          setCachedFleets(fleets)
          setCachedQuoteData({
            distance,
            duration,
            fleets,
            pricing: quotePricing,
          })

          // Navigate to step 2
          router.replace('/book-ride/select-car')
        }
      },
      onError: (error: any) => {
        toast({
          title: "Failed to Get Prices",
          description: error?.message || "Unable to calculate prices. Please try again.",
          variant: "destructive",
        })
      },
    })
  }

  return (
    <div className='flex flex-col gap-3 sm:gap-5 w-full max-w-screen-sm max-lg:w-full'>
      <CategoryTabs />

      {/* Form Container */}
      <div className='max-lg:px-4 max-lg:pt-5 max-lg:pb-5 max-lg:rounded-t-2xl max-lg:rounded-b-none max-lg:border-x-0 max-lg:border-t sm:p-5 sm:rounded-2xl bg-white flex flex-col gap-5 sm:border border-gray-200 shadow-sm'>
        <div className='flex flex-col gap-4 w-full'>
          {/* Location Inputs */}
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
            disabled={formLoading || isPreparingQuote}
            className="w-full py-2 px-3 gap-2"
          >
            {(formLoading || isPreparingQuote) ? (
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

export default Step1Form;

