'use client'
import useFormStore from '@/stores/FormStore'
import React, { useEffect, useRef } from 'react'
import CarList from '@/components/booking/steps/CarList'
import GoogleMapsRoute from '@/components/booking/shared/GoogleMap'
import PickupTripDetails from '@/components/booking/sidebar/PickupDetails'
import { useRouter } from 'next/navigation'
import { ArrowDown, ArrowUp, ArrowLeft } from 'lucide-react'
import { format } from 'date-fns'

function Page() {
  const { isMobileDropdownOpen, toggleMobileDropdown, category, formData } = useFormStore()
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
    <div className=' w-full bg-slate-50 flex flex-col min-h-[50vh]'>
      <div ref={headerRef} className='h-24 w-full bg-black header'></div>
      <div className='max-w-screen-lg mx-auto flex flex-col gap-4 sm:gap-5 lg:gap-10 w-full py-4 sm:py-5 lg:py-16 px-3 sm:px-4 lg:px-6'>
        {/* Back Button - Mobile Full Width */}
        <div className="lg:hidden flex justify-start w-full">
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg border border-gray-300 transition-all shadow-sm hover:shadow-md active:scale-[0.98] w-full"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>

        {/* Back Button - Desktop */}
        <div className="hidden lg:flex justify-start w-full">
          <button
            onClick={() => router.push('/')}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg border border-gray-300 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>

        {/* Mobile Summary Card - Only for trip category */}
        {category !== 'hourly' && formattedDateTime && (
          <div className="w-full bg-gray-100 rounded-lg p-4 border border-gray-200 lg:hidden">
            {/* Date and Time */}
            <div className="font-bold text-base text-gray-900 mb-3">
              {formattedDateTime}
            </div>
            
            {/* Origin → Destination */}
            <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
              <span className="truncate flex-1 min-w-0">
                {truncateLocation(fromLocation)}
              </span>
              <span className="text-gray-500 flex-shrink-0">→</span>
              <span className="truncate flex-1 min-w-0">
                {truncateLocation(toLocation)}
              </span>
            </div>
            
            {/* Estimated Arrival and Distance */}
            {estimatedArrival && (
              <div className="text-xs text-gray-600">
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


