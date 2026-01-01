'use client'
import useFormStore from '@/stores/FormStore'
import React, { useEffect, useRef } from 'react'
import DetailsForm from '@/components/booking/steps/DetailsForm'
import GoogleMapsRoute from '@/components/booking/shared/GoogleMap'
import PickupTripDetails from '@/components/booking/sidebar/PickupDetails'
import SelectedCar from '@/components/booking/sidebar/SelectedCar'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

function Page() {
  const { formData, category } = useFormStore()
  const router = useRouter()
  const headerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    // Redirect if car is not selected
    if (!formData.car.value) {
      router.replace('/book-ride/select-car')
      return
    }
    if (headerRef.current) {
      headerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [formData.car.value, router])

  return (
    <div className={cn('w-full flex flex-col min-h-[50vh]', 'bg-white')}>
      <div ref={headerRef} className='h-24 w-full bg-heading-black header'></div>
      <div className='max-w-screen-lg mx-auto flex flex-col gap-5 lg:gap-10 w-full py-5 lg:py-16 px-2'>
        {/* Back Button - Mobile Full Width */}
        <div className="lg:hidden flex justify-start w-full">
          <Button
            onClick={() => router.push('/book-ride/select-car')}
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
            onClick={() => router.push('/book-ride/select-car')}
            variant="outline"
            size="default"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </Button>
        </div>

        {/* Selected Car - Mobile Only */}
        <div className="lg:hidden w-full">
          <SelectedCar/>
        </div>

        <div className='grid lg:grid-cols-3 gap-5 w-full'>
          <div className='lg:col-span-2 w-full flex flex-col gap-5'>
            <DetailsForm/>
          </div>
          <div className='hidden lg:flex flex-col gap-5 w-full'>
            {category !== 'hourly' && <GoogleMapsRoute/>}
            <PickupTripDetails/>
            <SelectedCar/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page


