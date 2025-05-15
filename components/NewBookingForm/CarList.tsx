import React from 'react'
import useCustomForm from '@/hooks/useFormContext'
import Image from 'next/image'
import { GoPeople } from "react-icons/go";
import { PiSuitcase } from "react-icons/pi";
import Link from 'next/link'
import { cn } from '@/lib/utils'
import BMW from "@/assets/Executive.jpg";
import Skoda from "@/assets/Economy.jpg";
import Tesla from "@/assets/Tesla S.png";
import XLVan from "@/assets/Luxury Van.jpg";


export const fleets = [{ name: 'Economy', cars: 'Skoda Octavia | ToyotaPrius', price: 1.3, image: Skoda, bags: 3, persons: 4, specailRequest: false, under10: 25, under20: 35, hourly: 25, stop: 10 },
{ name: 'Executive', cars: 'BMW 5 Series | MERC E Class', price: 1.45, image: BMW, bags: 3, persons: 4, specailRequest: false, under10: 35, under20: 45, hourly: 17, stop: 10 },
{ name: 'Executive Premium', cars: 'Tesla Model S', price: 1.6, image: Tesla, bags: 3, persons: 4, specailRequest: false, under10: 45, under20: 65, hourly: 20, stop: 10 },
{ name: 'Luxury Van', cars: 'XL Passenger Van', price: 1.9, image: XLVan, bags: 6, persons: 6, specailRequest: true, under10: 65, under20: 80, hourly: 30, stop: 15 },]


function CarList() {
    const { category, form: { getValues, setValue }, NextStep } = useCustomForm()
    const distance = Number(getValues('distance') ?? 0)
    const hours = Number(getValues('duration') ?? 0)
    return (
        <div className='w-full flex flex-col gap-5 '>
            {fleets.map((item) => {

                let price = 0;
                if (category === 'hourly') {
                    price = Number((((hours) >= 2 ? (hours) : 2) * Number(item.hourly)).toFixed(2));

                } else if (category === 'trips') {
                    if (distance < 10) {
                        price = item.under10
                    } else if (distance < 20) {
                        price = item.under20
                    } else {
                        price = item.under20 + ((distance - 20) * item.price)
                    }
                }

                price = Number(price.toFixed(2))

                return <div key={item.name} className={cn('w-full rounded-xl border border-black/50 grid md:grid-cols-4 divide-y md:divide-x ', item.name === getValues('car') ? 'bg-gray-100' : 'bg-white')} >

                    <div className='p-3 w-full h-52 md:h-44 rounded-xl overflow-hidden '>
                        <Image src={item.image} alt={item.name} className='w-full h-full object-cover' />
                    </div>
                    <div className='p-3 w-full flex flex-col gap-2 md:col-span-2'>

                        <p className='text-2xl font-semibold'>{item.name}</p>
                        <p className='text-gray-700 '>{item.cars}</p>
                        <div className='flex items-center gap-5'>
                            <div className='w-full flex items-center gap-2 '>
                                <GoPeople className='text-black font-bold' />
                                <div>max {item.persons}</div>
                            </div>
                            <div className='w-full flex items-center gap-2 '>
                                <PiSuitcase className='text-black font-black' />
                                <div>max {item.bags}</div>
                            </div>
                        </div>

                    </div>

                    <div className='w-full p-3 flex flex-col justify-center gap-5'>
                        {!item.specailRequest && <div className='text-2xl font-bold text-center'>
                            $ <span className='text-4xl'>{price}</span>
                        </div>}
                        {!item.specailRequest ?
                            <button type='button' onClick={() => { setValue('car', item.name); setValue('price', price); NextStep() }} className='w-full bg-black text-white px-4 py-2 rounded-xl text-center font-bold cursor-pointer'>Select</button> :
                            <Link href='/contact' className='w-full bg-black text-white px-4 py-2 rounded-xl text-center font-bold'>Request</Link>}
                    </div>


                </div>
            })}
        </div>
    )
}

export default CarList