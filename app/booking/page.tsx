'use client'
import React, { useEffect } from 'react'
import ContainerLayout from '@/components/NewBookingForm/ContainerLayout'
import useCustomForm from '@/hooks/useFormContext'
import CarList from '@/components/NewBookingForm/CarList'
import { useRouter } from 'next/navigation'
import { CiEdit } from "react-icons/ci";
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { IoArrowBackOutline } from "react-icons/io5";
import Step3Form from '@/components/NewBookingForm/Step3Form'

// re deploye
function Page() {
    const { form, category, step, Step2, Step1 } = useCustomForm()
    const { getValues, watch } = form
    const router = useRouter()
    
    useEffect(() => {
        if (step === 1) {
            router.push('/')
        }
    }, [step])

    return (
        <div className=' w-full py-24'>
            <ContainerLayout>
                <div className='flex flex-col gap-5 w-full'>
                    <div onClick={() => { if (step === 2) { Step1() } if (step === 3) { Step2() } }} className='cursor-pointer flex items-center gap-2' > <IoArrowBackOutline className='text-xl' /> <span>Back</span></div>
                    <div className='w-full max-w-screen-sm grid grid-cols-2 items-center mx-auto'>
                        <div className='pt-5 w-full border-t-2 border-orange-400 text-gray-700 text-center'>
                            Select Fleet
                        </div>
                        <div className={cn('pt-5 w-full border-t-2 text-center text-gray-700 ', step === 3 ? 'border-orange-400' : 'border-gray-500')}>
                            Confirm Order
                        </div>
                    </div>
                </div>
                <div className='pt-10 lg:pt-20 w-full grid lg:grid-cols-7 gap-5'>
                    <div className='w-full p-4 hidden lg:flex flex-col gap-5 bg-gray-100 lg:col-span-2 h-fit rounded-xl'>
                        <div className='flex items-center justify-between w-full'>
                            <div className='text-2xl'>Summary</div>
                            <Link href='/'>
                                <CiEdit className='text-2xl' />
                            </Link>
                        </div>

                        <div className='flex flex-col divide-y w-full '>

                            <div className='flex flex-col gap-1 py-2'>
                                <p className='text-gray-500 text-sm'>Service Type</p>
                                <p className=''>{category.toUpperCase()}</p>
                            </div>
                            <div className='flex flex-col gap-1 py-2'>
                                <p className='text-gray-500 text-sm'>Pickup Location</p>
                                <p className=''>{getValues('pickup_location')}</p>
                            </div>
                            {category === 'trips' ? <div className='flex flex-col gap-1 py-2'>
                                <p className='text-gray-500 text-sm'>Drop Off</p>
                                <p className=''>{getValues('dropoff_location')}</p>
                            </div> :
                                <div className='flex flex-col gap-1 py-2'>
                                    <p className='text-gray-500 text-sm'>Duration</p>
                                    <p className=''>{getValues('duration')} Hours</p>
                                </div>}
                            <div className='flex flex-col gap-1 py-2'>
                                <p className='text-gray-500 text-sm'>Pickup Date</p>
                                <p className=''>{getValues('pickup_date')?.toDateString()}</p>
                            </div>
                            <div className='flex flex-col gap-1 py-2'>
                                <p className='text-gray-500 text-sm'>Pickup Time</p>
                                <p className=''>{getValues('pickup_time')?.hour}:{getValues('pickup_time')?.minute}:{getValues('pickup_time')?.period}</p>
                            </div>
                            {getValues('car') && <div className='flex flex-col gap-1 py-2'>
                                <p className='text-gray-500 text-sm'>Car</p>
                                <p className=''>{getValues('car')}</p>
                            </div>}
                            {getValues('price') && <div className='flex flex-col gap-1 py-2'>
                                <p className='text-gray-500 text-sm'>Price</p>
                                <p className=''>{getValues('price') + (watch('flight_track') ? 7 : 0) + (watch('meet_greet') ? 15 : 0)}£</p>
                            </div>}

                        </div>

                    </div>
                    <div className='w-full lg:col-span-5'>
                        {step === 2 && <CarList />}
                        {step === 3 && <Step3Form />}
                    </div>
                </div>
            </ContainerLayout>
        </div>
    )
}

export default Page