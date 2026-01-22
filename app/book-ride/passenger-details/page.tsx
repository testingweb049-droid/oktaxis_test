'use client'
import Step3DetailsForm from '@/components/booking/steps/step3-details-form'
import PickupTripDetails from '@/components/booking/sidebar/pickup-details'
import { cn } from '@/lib/utils'
import useFormStore from '@/stores/form-store'
import { useFleets } from '@/hooks/useFleets'
import type { FleetType } from '@/types/fleet.types'
import Image from 'next/image'
import { Users, Luggage, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

function Page() {
  const { formData, cachedFleets, isCacheValid } = useFormStore()
  const router = useRouter()
  const shouldFetchFromAPI = !cachedFleets || !isCacheValid()
  const { data: fleetsData, isLoading: fleetsLoading } = useFleets({}, {
    enabled: shouldFetchFromAPI,
  })
  const fleets: FleetType[] = (cachedFleets && isCacheValid())
    ? cachedFleets
    : ((fleetsData as FleetType[] | undefined) || [])

  const selectedFleet = fleets.find((item) => item.name === formData.car?.value)
  const isLoading = shouldFetchFromAPI && fleetsLoading

  const handleBackToFleets = () => {
    router.push('/book-ride/select-car')
  }

  return (
    <div className={cn('w-full flex flex-col min-h-[50vh]', 'bg-white pt-16 md:pt-32')}>
      <div className='max-w-7xl mx-auto flex flex-col gap-2 lg:gap-10 w-full py-5 md:py-16 px-2'>
        {selectedFleet && !isLoading && (
          <div className='w-full mb-3 lg:hidden'>
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-3">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 bg-gray-50 rounded p-1.5">
                  <Image
                    src={selectedFleet.image}
                    alt={selectedFleet.name}
                    width={96}
                    height={96}
                    className="w-24 h-24 object-contain"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-base text-heading-black uppercase tracking-tight mb-1">
                    {selectedFleet.name}
                  </h4>
                  {selectedFleet.cars && (
                    <p className="text-sm text-text-gray mb-1.5">{selectedFleet.cars}</p>
                  )}
                  <div className="flex items-center gap-3 text-sm text-text-gray">
                    <div className="flex items-center gap-1">
                      <Users size={12} className="text-heading-black" />
                      <span className="font-medium">{selectedFleet.passengers} Passengers</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Luggage size={12} className="text-heading-black" />
                      <span className="font-medium">{selectedFleet.suitcases} Bags</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Back Button */}
        <div className="">
          <button
            onClick={handleBackToFleets}
            className="flex items-center gap-2 text-text-gray hover:text-heading-black"
          >
            <ArrowLeft size={16} /> Back to Vehicle Selection
          </button>
        </div>
        <div className='grid lg:grid-cols-3 gap-5 w-full'>
          <div className='lg:col-span-2 w-full flex flex-col gap-5'>
            <Step3DetailsForm />
          </div>
          <div className='hidden lg:flex flex-col gap-5 w-full'>
            <PickupTripDetails showMap={false} showVehicle={true} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page


