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

function Step1Form() {
  const { category, formLoading, changeStep, formData, setFormData } = useFormStore()
  const router = useRouter()
  const { toast } = useToast()
  const { data: pricing } = usePricing()
  const durationArray = getDurationArray()
  const handleSubmit = async () => {
    const fromIsAirport = isAirportLocation(formData.fromLocation.value)
    const toIsAirport = category === 'trip' ? isAirportLocation(formData.toLocation.value) : false
    
    if (fromIsAirport || toIsAirport) {
      setFormData('isAirportPickup', true)
    }
    const pricingData = pricing ? {
      minimumBookingHours: pricing.minimumBookingHours,
      timezone: pricing.timezone
    } : undefined
    const result = await changeStep(true, 1, pricingData)
    if (typeof result === 'object' && result !== null && 'errorType' in result && result.errorType === 'time_validation') {
      toast({
        title: "Booking Too Soon",
        description: result.errorMessage || `Booking can't be added within ${pricingData?.minimumBookingHours || 0} hours of pickup time, choose another time.`,
        variant: "destructive",
        duration: 1000,
      })
      return
    }
    
    if (result === true) {
      router.replace('/book-ride/select-car')
    }
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

export default Step1Form;

