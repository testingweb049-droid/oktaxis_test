import React from 'react'
import HeroForm from './HeroForm'
import BackgroundImage from "@/assets/new-form/background.png"
import YearsImage from "@/assets/new-form/10years.png"
import Image from 'next/image'

function NewHeroSection() {
  return (
    <div className='relative pb-10 md:pb-0'>
      
      <Image src="/assets/home-images/home-banner.png" alt='Background Image' className='absolute w-full h-[420px] lg:h-full left-0 right-0' fill />
      <div className='relative bg-black/40 w-full max-lg:rounded-b-3xl '>
            <div className='full-width-section'>
            <div className='grid gap-6 lg:grid-cols-2 xl:grid-cols-3 pt-20 lg:py-48 lg:px-5 w-full overflow-hidden'>

<div className='flex flex-col gap-8 items-start justify-center h-full w-full xl:col-span-2 max-lg:px-3 mt-4 md:mt-0 mb-4 md:mb-0'>
  {/* <Image src={YearsImage} alt='Years image' className='w-16 lg:w-40' /> */}
  {/* Badge--here */}
  <div className='inline-flex items-center gap-2 px-4 py-2.5 bg-gray/80 backdrop-blur-[4px] rounded-full border border-white/20 shadow-lg'>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0">
      <path d="M7.06342 1.3563L5.28467 4.96282L1.30497 5.54303C0.591294 5.64654 0.305279 6.52638 0.822831 7.03031L3.70205 9.83599L3.02107 13.7993C2.89849 14.5157 3.65302 15.0524 4.28498 14.7173L7.8452 12.846L11.4054 14.7173C12.0374 15.0496 12.7919 14.5157 12.6693 13.7993L11.9883 9.83599L14.8676 7.03031C15.3851 6.52638 15.0991 5.64654 14.3854 5.54303L10.4057 4.96282L8.62697 1.3563C8.30827 0.713449 7.38485 0.705278 7.06342 1.3563Z" fill="#FFB400" />
    </svg>
    <span className='font-montserrat text-primary-yellow text-xs sm:text-base font-bold uppercase tracking-wide whitespace-normal sm:whitespace-nowrap'>
      #1 LUXURY CHAUFFEUR IN MANCHESTER
    </span>
  </div>

  <div className='max-w-5xl flex flex-col gap-4'>
  <div className='text-2xl font-semibold  lg:text-hero lg:leading-hero lg::font-bold text-white'>Premium Chauffeur
    Service in <span className='text-gradient-primary'>Manchester</span>  </div>
  <div className='text-base lg:text-2xl text-white'>Experience the ultimate Five-Star Chauffeur Experience with OKTaxis. As a leading provider of Chauffeur Services in Manchester, we deliver bespoke travel solutions tailored for discerning business professionals and private clients alike.</div>

  </div>
  
</div>

<div className='flex items-center justify-center h-full w-full px-4'>
  <HeroForm />
</div>
</div>
            </div>
       
      </div>
    </div>
  )


}

export default NewHeroSection