'use client'
import useFormStore from '@/stores/FormStore'
import React from 'react'
import Steps from './steps'
import CarList from './CarList'
import GoogleMapsRoute from './GoogleMap'
import PickupTripDetails from './PickupDetails'
import HeroForm from './HeroForm'



function page() {
  
  const {step} = useFormStore()

  return (
    <div className=' w-full bg-slate-100 flex flex-col min-h-[50vh]'>
        <div className='h-24 w-full bg-black'></div>
         {step===1 && <div className='flex items-center justify-center p-10'>
         <HeroForm/>
        </div>}
        {step===2 && <div className='max-w-screen-lg mx-auto flex flex-col gap-10 w-full py-16 px-2 '>
            <Steps/>
            <div className='grid lg:grid-cols-3 gap-5 w-full'>
                <div className='lg:col-span-2 w-full flex flex-col gap-5'>
                  <CarList/>
                </div>
                <div className='hidden lg:flex flex-col gap-5 w-full'>
                <GoogleMapsRoute/>
                <PickupTripDetails/>
                </div>
            </div>
        </div>}
       
    </div>
  )
}

export default page