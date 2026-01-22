'use client'
import Step2CarSelection from '@/components/booking/steps/step2-car-selection'
import PickupTripDetails from '@/components/booking/sidebar/pickup-details'
import AnimatedRouteMap from '@/components/booking/shared/animated-route-map'
import useFormStore from '@/stores/form-store'


function Page() {
  const { category } = useFormStore();

  return (
    <div className="w-full flex flex-col min-h-[50vh] bg-light-background pt-20 sm:pt-24 lg:pt-32">
      <div className='max-w-7xl mx-auto flex flex-col gap-4 sm:gap-5 lg:gap-10 w-full py-4 sm:py-5 lg:py-16 px-0 sm:px-0 lg:px-6'>
        <div className='lg:hidden w-full px-3 sm:px-4'>
          <PickupTripDetails showMap={false}/>
        </div>

        <div className='grid lg:grid-cols-3 gap-4 sm:gap-5 w-full relative'>
          <div className='lg:col-span-2 w-full flex flex-col gap-4 sm:gap-5 relative'>
            <div className="bg-white lg:bg-transparent rounded-none lg:rounded-none pt-4 sm:pt-6 lg:pt-0 px-3 sm:px-4 lg:px-0">
              <Step2CarSelection/>
            </div>
          </div>
          <div className='hidden lg:flex flex-col gap-5 w-full'>
            {category !== 'hourly' && (
              <AnimatedRouteMap />
            )}
            <PickupTripDetails showMap={false} showVehicle={true}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page


