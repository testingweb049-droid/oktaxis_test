'use client'
import useFormStore from '@/stores/FormStore'
import React, { useEffect } from 'react'
import Steps from './steps'
import CarList from './CarList'
import GoogleMapsRoute from './GoogleMap'
import PickupTripDetails from './PickupDetails'
import Step3 from './Step3'
import FeatureList from './FeatureList'
import SelectedCar from './SelectedCar'
import { useRouter } from 'next/navigation'
import Step4 from './Step4'


function page() {
  
  const {step} = useFormStore()
  const router = useRouter()
  
  console.log("step :: ",step)

  useEffect(()=>{
    if(step===1){
      router.replace('/');
      router.refresh();
    }
  },[step])

  return (
    <div className=' w-full bg-slate-100 flex flex-col min-h-[50vh]'>
        <div className='h-24 w-full bg-black'></div>
        <div className='max-w-screen-lg mx-auto flex flex-col gap-10 w-full py-16 px-2 '>
            <Steps/>

         <div className='grid lg:grid-cols-3 gap-5 w-full'>
                <div className='lg:col-span-2 w-full flex flex-col gap-5'>
                 {step===2 &&  <CarList/>}
                 {step===3 &&  <Step3/> }
                 {step===4 &&  <Step4/> }
                </div>
                <div className='hidden lg:flex flex-col gap-5 w-full'>
                {step===2 && <GoogleMapsRoute/>}
                <PickupTripDetails/>
                {step>2 && <SelectedCar/>}
                {step===3 && <FeatureList/>}
                </div>
            </div>
        
       
        </div>
    </div>
  )
}

export default page