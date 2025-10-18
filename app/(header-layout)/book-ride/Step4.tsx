import useFormStore from '@/stores/FormStore'
import ChipImage from "@/assets/new-form/cardchip.png"
import Secure1 from "@/assets/new-form/secure.png"
import Secure2 from "@/assets/new-form/securepay.png"
import React from 'react'
import MyPaymentForm from './PaymentForm'
import Image from 'next/image'
import BackButton from './BackButton'

function Step4() {
    const { formData } = useFormStore()
    const totalPrice = (Number(formData.price.value) + (formData.isMeetGreet.value ? 15 : 0) + (formData.isFlightTrack.value ? 7 : 0)).toFixed(2)
  return (
    <div className='flex flex-col gap-10 w-full'>
        <div className='flex flex-col gap-6 w-full'>
             <div className='flex flex-col gap-5 w-full'>
                <div className='font-bold'>Price Breakdown</div>
                <div className='flex flex-col gap-2 w-full'>
                   <div className='flex items-center justify-between gap-2'>
                      <div className='text-sm text-gray-500'>Economy Sedan Transfer</div>
                      <div className='text-sm text-gray-500'>£ {formData.price.value} </div>
                   </div>
                   {formData.isMeetGreet.value && <div className='flex items-center justify-between gap-2'>
                      <div className='text-sm text-gray-500'>Meet & Greet</div>
                      <div className='text-sm text-gray-500'>£ 15</div>
                   </div>}
                   {formData.isFlightTrack.value && <div className='flex items-center justify-between gap-2'>
                      <div className='text-sm text-gray-500'>Flight Track</div>
                      <div className='text-sm text-gray-500'>£ 7</div>
                   </div>}
                  
                </div>
             </div>
             <div className='flex items-center justify-between gap-2 pt-2 border-t-2 border-black border-dashed text-2xl font-bold text-black'>
                      <div className=' '>Total:</div>
                      <div className=' '>£ {totalPrice} </div>
             </div>
        </div>
        <div className='grid lg:grid-cols-2 gap-5'>
            <MyPaymentForm price={totalPrice}/>
            <div className='flex flex-col gap-5 w-full max-lg:hidden'>
                <div className='w-full rounded-xl bg-black flex flex-col gap-8 p-5'>
                  <Image src={ChipImage} alt='card chip' className='w-12' />
                  <div className='flex items-center gap-5 text-gray-500 text-xl'>
                    {Array.from({length:4},(_,i)=><div key={i} className=''>****</div>)}
                  </div>
                  <div className='flex items-center justify-between text-gray-500 '>
                     <div className='text-xl'>{formData.name.value}</div>
                     <div className='flex flex-col text-sm text-center'>
                        <div className=''>
                           valid thru
                        </div>
                        <div className=''>
                           **/**
                        </div>
                     </div>
                  </div>
                </div>
                <div className='flex items-center justify-between gap-5'>
                <Image src={Secure1} alt='secure 1' className='' />
                <Image src={Secure2} alt='secure 2' className='' />
                </div>
            </div>
        </div>
        <BackButton step={4}/>
    </div>
  )
}

export default Step4