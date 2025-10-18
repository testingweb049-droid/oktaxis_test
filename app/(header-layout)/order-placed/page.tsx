'use client'
import useFormStore from '@/stores/FormStore'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { fleets } from '../book-ride/CarList'
import { MdDone } from 'react-icons/md'
import { PlaneIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

function page() {
const { isOrderDone, formData, category }  = useFormStore()
const router = useRouter()

 const { fromLocation, toLocation, stops, duration } = formData;
  
  const locations = [
    fromLocation,
    ...stops,
  ].filter(Boolean);

  if(category==='hourly'){
    locations.push({...duration, value:duration.value + " Hours"})
  } else {
    locations.push(toLocation)
  }

  const selectedFleet = fleets.find((item)=>item.name===formData.car.value);

useEffect(()=>{
    if(!isOrderDone){
        router.replace('/')
        router.refresh()
    }
},[isOrderDone])

    return (
    <div className=' w-full bg-slate-100 flex flex-col min-h-[50vh]'>
        <div className='h-24 w-full bg-black'></div>

        <div className='max-w-screen-lg mx-auto py-32 w-full flex items-center justify-center flex-col gap-16 text-center'>
            
            <div className='w-full flex items-center justify-center flex-col gap-6'>
                <MdDone className='p-2 text-white bg-green-500 rounded-full ' size={35} />
            <div className='text-gray-700 '>Great choice, {formData.name.value}</div>
            <div className='text-black text-3xl lg:text-6xl'>YOUR RESERVATION IS CONFIRMED</div>
            <div className='text-gray-700'>We've sent a confirmation email to {formData.email.value}</div>
            </div>

         <div className='w-full grid md:grid-cols-3 gap-3 lg:gap-5'>
            <div className='lg:col-span-2 w-full  rounded-r-lg border-4 border-gray-500 py-10 px-4 gap-8 flex flex-col justify-center'>
              
              <div className='text-3xl font-bold'>
                Your itinerary
              </div>

              <div className='flex flex-col gap-5 w-full'>
              {locations.map((item)=>{
                  return <div className='flex items-start gap-3 md:gap-5'>
                    <PlaneIcon className='text-lg md:text-2xl text-black' />
                    <div className='text-lg' >{item.value}</div>
                </div>
              })}
              </div>

              <div className='flex flex-col gap-1'>
                <div className='text-gray-500' >Pickup Date & Time</div>
                <div>{formData.date.value} {formData.time.value}</div>
              </div>

              <div className='flex items-center justify-end w-full'>
                <Link className='bg-brand px-3 py-2 text-black w-fit' href='/' >Home</Link>
              </div>

            </div>
            {selectedFleet && <div className='rounded-l-lg border-4 border-gray-500 p-4 gap-5 flex flex-col items-center justify-center bg-gray-200'>
               <Image src={selectedFleet.image} alt={selectedFleet.name} className='w-full object-contain' />
               <div className='font-bold'>{selectedFleet.name}</div>
            </div>}
         </div>

        </div>

    </div>
  )
}

export default page