import React from 'react'
import HeroForm from './HeroForm'
import BackgroundImage from "@/assets/new-form/background.png"
import YearsImage from "@/assets/new-form/10years.png"
import Image from 'next/image'

function NewHeroSection() {
  return (
    <div className='relative '>
    <Image src={BackgroundImage} alt='Background Image' className='absolute w-full h-[420px] lg:h-full left-0 right-0' />
    <div className='relative bg-black/40 w-full max-lg:rounded-b-lg '>

    <div className='grid gap-10 lg:grid-cols-2 xl:grid-cols-3 pt-20 lg:py-48 lg:px-5 w-full overflow-hidden  max-w-screen-2xl mx-auto'>

    <div className='flex flex-col gap-3 md:gap-5 items-start justify-center h-full w-full xl:col-span-2 max-lg:px-3'>
        <Image src={YearsImage} alt='Years image' className='w-20 lg:w-40' />
         
      
      <div className='text-2xl font-semibold  lg:text-7xl lg::font-bold text-white'>Chauffeur Service in Manchester</div>
      <div className='text-lg lg:text-2xl text-white'>Airport Taxi Service serving Manchester & Liverpool Airport</div>

          </div>
        
          <div className='flex items-center justify-center h-full w-full '>
         <HeroForm/>
          </div>
        </div>
    </div>
    </div>
  )
}

export default NewHeroSection