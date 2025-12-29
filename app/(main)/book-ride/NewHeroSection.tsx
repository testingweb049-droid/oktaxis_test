import React from 'react'
import HeroForm from './HeroForm'
import Image from 'next/image'

function NewHeroSection() {
  return (
    <div className='relative'>

      <Image 
        src="/assets/home-images/home-banner.png" 
        alt='Background Image' 
        className='absolute inset-0 object-cover' 
        fill 
        priority
        sizes="100vw"
      />
      <div className='relative bg-black/40 w-full max-lg:rounded-b-3xl'>
        <div className='container mx-auto px-2 sm:px-4 lg:px-6'>
          <div className='grid gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3 pt-12 pb-0 sm:py-16 md:py-20 lg:py-24 xl:py-32 lg:px-5 w-full'>

            <div className='flex flex-col gap-6 sm:gap-8 items-start justify-center h-full w-full xl:col-span-2 max-lg:px-4 mt-4 md:mt-0 mb-4 md:mb-0'>
              <div className='inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray/80 backdrop-blur-[4px] rounded-full border border-white/20 shadow-lg'>
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4">
                  <path d="M7.06342 1.3563L5.28467 4.96282L1.30497 5.54303C0.591294 5.64654 0.305279 6.52638 0.822831 7.03031L3.70205 9.83599L3.02107 13.7993C2.89849 14.5157 3.65302 15.0524 4.28498 14.7173L7.8452 12.846L11.4054 14.7173C12.0374 15.0496 12.7919 14.5157 12.6693 13.7993L11.9883 9.83599L14.8676 7.03031C15.3851 6.52638 15.0991 5.64654 14.3854 5.54303L10.4057 4.96282L8.62697 1.3563C8.30827 0.713449 7.38485 0.705278 7.06342 1.3563Z" className="fill-primary-yellow" />
                </svg>
                <span className='font-montserrat text-primary-yellow text-xs sm:text-sm md:text-base font-bold uppercase tracking-wide whitespace-normal sm:whitespace-nowrap'>
                 Airport Transfer & Chauffeured Service
                </span>
              </div>

              <div className='max-w-5xl flex flex-col gap-3 sm:gap-4'>
                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight'>
                  Airport Transfer & 
                  <span className='text-gradient-primary'> Chauffeured Service</span>
                </h1>
                {/* <div className='text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white/90 leading-relaxed'>Experience the ultimate Five-Star Chauffeur Experience with OKTaxis. As a leading provider of Chauffeur Services in Manchester, we deliver bespoke travel solutions tailored for discerning business professionals and private clients alike.</div> */}
              </div>

            </div>

            <div className='flex items-center justify-center h-full w-full mt-6 sm:mt-8 lg:mt-0 max-lg:col-span-full max-lg:mb-0'>
              <HeroForm />
            </div>
          </div>
        </div>

      </div>
    </div>
  )


}

export default NewHeroSection