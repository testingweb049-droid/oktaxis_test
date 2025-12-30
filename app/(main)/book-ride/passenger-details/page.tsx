'use client'
import useFormStore from '@/stores/FormStore'
import React, { useEffect, useRef } from 'react'
import DetailsForm from '@/components/booking/steps/DetailsForm'
import GoogleMapsRoute from '@/components/booking/shared/GoogleMap'
import PickupTripDetails from '@/components/booking/sidebar/PickupDetails'
import SelectedCar from '@/components/booking/sidebar/SelectedCar'
import FeatureList from '@/components/booking/sidebar/FeatureList'
import { useRouter } from 'next/navigation'
import { ArrowDown, ArrowUp, ArrowLeft } from 'lucide-react'

function Page() {
  const { isMobileDropdownOpen, toggleMobileDropdown, formData, category } = useFormStore()
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
    <div className=' w-full bg-slate-50 flex flex-col min-h-[50vh]'>
      <div ref={headerRef} className='h-24 w-full bg-black header'></div>
      <div className='max-w-screen-lg mx-auto flex flex-col gap-5 lg:gap-10 w-full py-5 lg:py-16 px-2 '>
        {/* Back Button - Mobile Full Width */}
        <div className="lg:hidden flex justify-start w-full">
          <button
            onClick={() => router.push('/book-ride/select-car')}
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
            onClick={() => router.push('/book-ride/select-car')}
            className="flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold px-4 py-2 rounded-lg border border-gray-300 transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
            aria-label="Go back"
          >
            <ArrowLeft size={18} />
            <span>Back</span>
          </button>
        </div>

        <div className={`w-full border-2 border-brand rounded-md flex flex-col lg:hidden ${isMobileDropdownOpen ? 'gap-5' : 'gap-0'}`}>
          <div className={`overflow-hidden transition-all duration-700 flex flex-col gap-3  ease-out
            ${isMobileDropdownOpen ? 'max-h-[2000px] opacity-100  p-1' : 'max-h-0 opacity-0 p-0' }
          `}>
            {category !== 'hourly' && <GoogleMapsRoute/>}
            <PickupTripDetails/>
            <SelectedCar/>
            <FeatureList/>
          </div>
          <div onClick={()=>toggleMobileDropdown()} className='bg-brand p-2 rounded-sm font-bold flex items-center justify-between' >
            <div>Ride Details</div>
            {isMobileDropdownOpen ?   <ArrowUp/> : <ArrowDown/>}
          </div>
        </div>

        <div className='grid lg:grid-cols-3 gap-5 w-full'>
          <div className='lg:col-span-2 w-full flex flex-col gap-5'>
            <DetailsForm/>
          </div>
          <div className='hidden lg:flex flex-col gap-5 w-full'>
            {category !== 'hourly' && <GoogleMapsRoute/>}
            <PickupTripDetails/>
            <SelectedCar/>
            <FeatureList/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page


