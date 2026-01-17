'use client'
import useFormStore from '@/stores/form-store'
import React, { useEffect, useRef } from 'react'
import CarList from '@/components/booking/steps/car-list'
import GoogleMapsRoute from '@/components/booking/shared/google-map'
import PickupTripDetails from '@/components/booking/sidebar/pickup-details'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function Page() {
  const { category, formData } = useFormStore()
  const router = useRouter()
  const headerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [])

  // Format date and time for mobile summary
  const formatDateTime = () => {
    if (!formData.date.value || !formData.time.value) return ''
    try {
      const date = new Date(formData.date.value)
      const [hours, minutes] = formData.time.value.split(':').map(Number)
      const dateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hours,
        minutes
      )
      return format(dateTime, 'EEE, MMM d \'at\' hh:mm a')
    } catch {
      return ''
    }
  }

  // Calculate estimated arrival time (assuming average speed of 30 mph)
  const calculateEstimatedArrival = () => {
    if (!formData.date.value || !formData.time.value || !formData.distance.value) return null
    try {
      const date = new Date(formData.date.value)
      const [hours, minutes] = formData.time.value.split(':').map(Number)
      const pickupDateTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        hours,
        minutes
      )
      
      // Distance is in miles, estimate time (assuming 30 mph average)
      const distanceMiles = Number(formData.distance.value)
      const estimatedMinutes = Math.round((distanceMiles / 30) * 60)
      const arrivalDateTime = new Date(pickupDateTime.getTime() + estimatedMinutes * 60 * 1000)
      
      return {
        time: format(arrivalDateTime, 'hh:mm a'),
        distance: distanceMiles.toFixed(1)
      }
    } catch {
      return null
    }
  }

  const formattedDateTime = formatDateTime()
  const estimatedArrival = calculateEstimatedArrival()
  const fromLocation = formData.fromLocation?.value || ''
  const toLocation = formData.toLocation?.value || ''

  // Truncate long location names
  const truncateLocation = (location: string, maxLength: number = 25) => {
    if (location.length <= maxLength) return location
    return location.substring(0, maxLength) + '...'
  }

  return (
    <div className={cn('w-full flex flex-col min-h-[50vh]', 'bg-light-background')}>
      <div ref={headerRef} className='h-24 w-full bg-heading-black header'></div>
      <div className='max-w-screen-lg mx-auto flex flex-col gap-4 sm:gap-5 lg:gap-10 w-full py-4 sm:py-5 lg:py-16 px-3 sm:px-4 lg:px-6'>
        {/* Back Button - Mobile Full Width */}
        <div className="lg:hidden flex justify-start w-full">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            size="default"
            className="w-full"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Button>
        </div>

        {/* Back Button - Desktop */}
        <div className="hidden lg:flex justify-start w-full">
          <Button
            onClick={() => router.push('/')}
            variant="outline"
            size="default"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Button>
        </div>

        {/* Mobile Summary Card - Only for trip category */}
        {category !== 'hourly' && formattedDateTime && (
          <div className={cn(
            "w-full rounded-lg p-4 lg:hidden",
            "bg-light-background",
            "border border-text-gray"
          )}>
            {/* Date and Time */}
            <div className={cn("font-bold text-base mb-3", "text-heading-black")}>
              {formattedDateTime}
            </div>
            
            {/* Origin → Destination */}
            <div className={cn("flex items-center gap-2 text-sm mb-2", "text-heading-black")}>
              <span className="truncate flex-1 min-w-0">
                {truncateLocation(fromLocation)}
              </span>
              <span className={cn("flex-shrink-0", "text-text-gray")}>→</span>
              <span className="truncate flex-1 min-w-0">
                {truncateLocation(toLocation)}
              </span>
            </div>
            
            {/* Estimated Arrival and Distance */}
            {estimatedArrival && (
              <div className={cn("text-xs", "text-text-gray")}>
                Est. arrival at {estimatedArrival.time} • {estimatedArrival.distance} miles
              </div>
            )}
          </div>
        )}

        <div className='grid lg:grid-cols-3 gap-4 sm:gap-5 w-full'>
          <div className='lg:col-span-2 w-full flex flex-col gap-4 sm:gap-5'>
            <CarList/>
          </div>
          <div className='hidden lg:flex flex-col gap-5 w-full'>
            {category !== 'hourly' && <GoogleMapsRoute/>}
            <PickupTripDetails/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page


