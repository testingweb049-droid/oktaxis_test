import Step1Form from '@/components/booking/steps/step1-form'
import Image from 'next/image'
import { Star } from 'lucide-react'

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
          <div className='grid gap-6 sm:gap-8 lg:grid-cols-2 xl:grid-cols-3 pt-12 pb-0 sm:py-16 md:py-20 lg:py-24 xl:py-36 lg:px-5 w-full'>

            <div className='flex flex-col gap-6 sm:gap-8 items-start justify-center h-full w-full xl:col-span-2 max-lg:px-4 mt-4 md:mt-0 mb-4 md:mb-0'>
              <div className='inline-flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gray/80 backdrop-blur-[4px] rounded-full border border-white/20 shadow-lg'>
                <Star className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 fill-primary-yellow text-primary-yellow" />
                <span className='font-montserrat text-primary-yellow text-xs sm:text-sm md:text-base font-bold uppercase tracking-wide whitespace-normal sm:whitespace-nowrap'>
                  Best Fleet Service In Manchester
                </span>
              </div>

              <div className='max-w-5xl flex flex-col gap-3 sm:gap-4'>
                <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-white leading-tight sm:leading-tight md:leading-tight lg:leading-tight'>
                  Airport Transfer &
                  <span className='text-gradient-primary'> Chauffeured Service</span>
                </h1>
              </div>
            </div>

            <div className='flex items-start md:items-center justify-center h-full w-full max-lg:col-span-full max-lg:mb-0 pt-12 md:pt-20 lg:pt-24'>
              <Step1Form />
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default NewHeroSection;