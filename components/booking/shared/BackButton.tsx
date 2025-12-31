'use client'
import React from 'react'
import { useRouter } from 'next/navigation'

function BackButton({step}:{step:number}) {
    const router = useRouter()
  return (
    <div onClick={()=>{
      if (step === 4) {
        router.push('/book-ride/passenger-details')
      } else if (step === 3) {
        router.push('/book-ride/select-car')
      }
    }} className='p-2 rounded-lg border border-gray-500 w-full text-center text-gray-700 font-semibold cursor-pointer'>
                    Back 
         </div>
  )
}

export default BackButton