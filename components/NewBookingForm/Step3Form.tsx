import React, { useState } from 'react'
import useCustomForm from '@/hooks/useFormContext'
import { cn } from '@/lib/utils'
import MyPaymentForm from './PaymentForm'
import { BiSolidShoppingBags } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { isBeforeNewJerseyToday } from '@/lib/isBeforeTime';
import { CalendarDays, TimerIcon } from 'lucide-react';
import { format } from "date-fns"



function Step3Form() {
  const [dateOpen, setDateOpen] = useState(false)
  const { form, NextStep, loading } = useCustomForm()
  const { formState: { errors }, setValue, watch, } = form
  return (
    <div className='w-full flex flex-col gap-10'>

      <div className='flex flex-col  border border-gray-500 rounded-xl overflow-hidden'>
        <div className='w-full text-center p-2 font-semibold bg-black text-white'>Contact Information</div>
        <div className='w-full flex flex-col gap-5 px-3 md:px-5 py-10'>
          <input className={cn('p-2 rounded-xl border ', errors.name ? 'border-red-500' : 'border-gray-500')} value={watch('name')} onChange={(e) => { setValue('name', e.target.value); errors.name = undefined; }} placeholder='Name' />
          <input className={cn('p-2 rounded-xl border ', errors.email ? 'border-red-500' : 'border-gray-500')} value={watch('email')} onChange={(e) => { setValue('email', e.target.value); errors.email = undefined; }} placeholder='Email' />
          <input className={cn('p-2 rounded-xl border ', errors.phone ? 'border-red-500' : 'border-gray-500')} value={watch('phone')} onChange={(e) => { setValue('phone', e.target.value); errors.phone = undefined; }} placeholder='Phone' />
          {
            //return date and time
            form.watch('is_return') && <div className='grid md:grid-cols-2 gap-5 w-full'>

              <Popover open={loading ? false : dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      "w-full flex h-full items-center gap-2 justify-start  px-2 py-3 lg:py-2 border rounded-xl" , errors.return_date ? 'border-red-500' : 'border-black/80'
                    )}
                  >
                    <CalendarDays className="size-5" />

                    <div className='flex flex-col gap-1 '>
                      <p className={cn('text-xs  text-start', errors.pickup_date ? 'text-red-500' : 'text-black')}>Return Date</p>
                      {watch('return_date') ? <p className='text-black text-sm' >{format(watch('return_date') ?? new Date(), "PPP")}</p> : <p className='text-gray-400 text-sm'>dd:mm:yyyy</p>}
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white relative z-[200]" align="start">
                  <Calendar
                    mode="single"
                    selected={watch('return_date')}
                    className=''
                    onSelect={(event) => {
                      form.formState.errors.pickup_date = undefined;
                      setValue('return_date', event)
                      form.resetField('pickup_time')
                      setDateOpen(false)
                    }}
                    disabled={(date) => date <= watch("pickup_date")}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>


              <Popover>
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      "w-full flex h-full items-center gap-2 justify-start  px-2 py-3 lg:py-2 border rounded-xl  ", errors.return_time ? 'border-red-500' : 'border-black/80'
                    )}
                  >
                    <TimerIcon className="size-5 " />
                    <div className='flex flex-col gap-1 '>
                      <p className={cn('text-xs  text-start', errors.pickup_time ? 'text-red-500' : 'text-black')}>Return Time</p>
                      {watch('return_time')?.hour ? <p className='text-sm text-black'>{watch('return_time')?.hour ? watch('return_time')?.hour.toString().padStart(2, "0") : 'hh'}:{watch('return_time')?.minute ? watch('return_time')?.minute.toString().padStart(2, "0") : '00'} </p> : <p className='text-gray-400 text-sm'>{watch('return_time')?.hour ? watch('return_time')?.hour.toString().padStart(2, "0") : 'hh'}:{watch('return_time')?.minute ? watch('return_time')?.minute.toString().padStart(2, "0") : '00'} </p>}
                    </div>

                  </div>

                </PopoverTrigger>
                <PopoverContent className="max-w-full w-fit h-40  p-2 overflow-hidden bg-white z-[200]" align="start">
                  <div className="flex items-start justify-start gap-3 max-h-full h-full overflow-hidden">

                    <div className='flex flex-col py-1 rounded-sm border border-gray-300 text-center max-h-full h-full overflow-y-auto overflow-hidden w-fit '>
                      {Array.from({ length: 23 }, (_, i) => i + 1).map((item) => (
                        <div className={`py-1 px-4 cursor-pointer ${watch('return_time')?.hour === item ? 'bg-blue-500 text-white' : 'bg-white'}`} key={item} onClick={() => {
                          form.formState.errors.pickup_time = undefined;
                          setValue('return_time', { minute: isNaN(watch('return_time')?.minute ?? 0) ? 0 : watch('return_time')?.minute ?? 0, hour: item })
                        }
                        } >{item}</div>
                      ))}
                    </div>

                    <div className='flex flex-col py-1 rounded-sm border border-gray-300 text-center max-h-full h-full overflow-y-auto overflow-hidden w-fit'>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map((item) => (
                        <div
                          className={`py-1 px-4  cursor-pointer  ${watch('return_time')?.minute === item ? 'bg-blue-500 text-white' : 'bg-white'}`}
                          key={item}
                          onClick={() => {
                            form.formState.errors.pickup_time = undefined;
                            setValue('return_time', { minute: item, hour: watch('return_time')?.hour ?? 0 });
                          }}
                        >
                          {item}
                        </div>
                      ))}
                    </div>



                    {/* <div className='flex flex-col py-1 rounded-sm border border-gray-300 text-center max-h-full h-full overflow-y-auto overflow-hidden w-fit '>
              
                                                                  <div className={`py-1 px-2  cursor-pointer  ${field.value?.period === "AM" ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => {
                                                                      form.formState.errors.pickup_time = undefined;
                                                                      field.onChange({ ...field.value, period: "AM" })
                                                                  }
                                                                  } >AM</div>
                                                                  <div className={`py-1 px-2 ${field.value?.period === "PM" ? 'bg-blue-500 text-white' : 'bg-white'}`} onClick={() => {
                                                                      form.formState.errors.pickup_time = undefined;
                                                                      field.onChange({ ...field.value, period: "PM" })
                                                                  }
                                                                  } >PM</div>
              
                                                              </div> */}

                  </div>
                </PopoverContent>
              </Popover>




            </div>

          }
          <textarea rows={3} className={cn('p-2 rounded-xl border ', errors.instructions ? 'border-red-500' : 'border-gray-500')} value={watch('instructions')} onChange={(e) => { setValue('instructions', e.target.value); errors.instructions = undefined; }} placeholder="Instructions" />
        </div>
      </div>

      <div className='flex flex-col  border border-gray-500 rounded-xl overflow-hidden'>
        <div className='w-full text-center p-2 font-semibold bg-black text-white'>Extras</div>
        <div className='w-full flex flex-col gap-5 px-3 md:px-5 py-10'>
          <div className='grid sm:grid-cols-2 gap-5'>


            <div className='rounded-xl w-full flex items-center justify-between border p-2 border-gray-500'>
              <div className='flex items-center gap-2'>
                <div className='p-1 rounded-lg border border-gray-500'>
                  <MdPeopleAlt className='size-6' />
                </div>
                <p>Passengers</p>
                <p className='border border-green-600 font-semibold p-1 rounded-lg text-xs text-green-600'>Free</p>

              </div>
              <div className='w-fit flex items-center gap-3'>

                <div onClick={() => { if (watch("passengers") === 1) return; setValue("passengers", watch('passengers') - 1) }} className=' p-2 rounded-lg border leading-4 flex items-center justify-center size-7 border-gray-500 font-bold cursor-pointer'>-</div>
                <p>{watch('passengers')}</p>
                <div onClick={() => { if (watch("passengers") === 6) return; setValue("passengers", watch('passengers') + 1) }} className=' p-2 rounded-lg border leading-4 flex items-center justify-center size-7 border-gray-500 font-bold cursor-pointer'>+</div>

              </div>
            </div>
            <div className='rounded-xl w-full flex items-center justify-between border border-gray-500 p-2'>
              <div className='flex items-center gap-2'>
                <div className='p-1 rounded-lg border border-gray-500'>
                  <BiSolidShoppingBags className='size-6' />
                </div>
                <p>Bags</p>
                <p className='border border-green-600 font-semibold p-1 rounded-lg text-xs text-green-600'>Free</p>

              </div>
              <div className='w-fit flex items-center gap-3'>

                <div onClick={() => { if (watch("bags") === 0) return; setValue("bags", watch('bags') - 1) }} className=' p-2 rounded-lg border leading-4 flex items-center justify-center size-7 border-gray-500 font-bold cursor-pointer'>-</div>
                <p>{watch('bags')}</p>
                <div onClick={() => { if (watch("bags") === 4) return; setValue("bags", watch('bags') + 1) }} className=' p-2 rounded-lg border leading-4 flex items-center justify-center size-7 border-gray-500 font-bold cursor-pointer'>+</div>
              </div>
            </div>
          </div>

          <div className='grid sm:grid-cols-2 gap-5'>


            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>

                <p>Flight Track</p>
                <p className='border border-green-600 font-semibold p-1 px-2 rounded-lg text-xs text-green-600'>7£</p>

              </div>

              <div className='flex items-center gap-10 sm:gap-16'>
                <div onClick={() => { if (watch('payment_id')) { return; } setValue("flight_track", true) }} className='flex items-center gap-2 w-fit cursor-pointer'>
                  <div className={cn('rounded-full border size-4 border-gray-500 ', watch('flight_track') ? 'bg-blue-600' : 'bg-transparent')}></div>
                  <p>Yes</p>
                </div>
                <div onClick={() => { if (watch('payment_id')) { return; } setValue("flight_track", false) }} className='flex items-center gap-2 w-fit cursor-pointer'>
                  <div className={cn('rounded-full border size-4 border-gray-500 ', !watch('flight_track') ? 'bg-blue-600' : 'bg-transparent')}></div>
                  <p>No</p>
                </div>
              </div>
            </div>

            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>

                <p>Meet & Greet</p>
                <p className='border border-green-600 font-semibold p-1 rounded-lg text-xs text-green-600 px-2'>15£</p>

              </div>

              <div className='flex items-center gap-10 sm:gap-16'>
                <div onClick={() => { if (watch('payment_id')) { return; } setValue("meet_greet", true) }} className='flex items-center gap-2 w-fit cursor-pointer'>
                  <div className={cn('rounded-full border size-4 border-gray-500 ', watch('meet_greet') ? 'bg-blue-600' : 'bg-transparent')}></div>
                  <p>Yes</p>
                </div>
                <div onClick={() => { if (watch('payment_id')) { return; } setValue("meet_greet", false) }} className='flex items-center gap-2 w-fit cursor-pointer'>
                  <div className={cn('rounded-full border size-4 border-gray-500 ', !watch('meet_greet') ? 'bg-blue-600' : 'bg-transparent')}></div>
                  <p>No</p>
                </div>
              </div>

            </div>
          </div>
          {/* <div className='flex flex-col gap-2'>
            <p>Payment Method</p>

            <div className='flex items-center gap-10 sm:gap-16'>
              <div onClick={() => { setValue("payment_method", "cod") }} className='flex items-center gap-2 w-fit cursor-pointer'>
                <div className={cn('rounded-full border size-4 border-gray-500 ', watch('payment_method') === 'cod' ? 'bg-blue-600' : 'bg-transparent')}></div>
                <p>COD</p>
              </div>
              <div onClick={() => { setValue("payment_method", "online") }} className='flex items-center gap-2 w-fit cursor-pointer'>
                <div className={cn('rounded-full border size-4 border-gray-500 ', watch('payment_method') === 'online' ? 'bg-blue-600' : 'bg-transparent')}></div>
                <p>Online</p>
              </div>
            </div>

          </div> */}

          {form.watch('payment_method') === 'online' ? form.watch('payment_id') ? <div onClick={() => { NextStep() }} className='w-full py-2 px-4 text-center font-bold text-white bg-black rounded-xl cursor-pointer'>{loading ? 'Loading...' : 'Place Order (Payment Done)'}</div> : <MyPaymentForm /> : <div onClick={() => { NextStep() }} className='w-full py-2 px-4 text-center font-bold text-white bg-black rounded-xl cursor-pointer'>{loading ? 'Loading...' : 'Place Order'}</div>}
        </div>
      </div>
    </div>
  )
}

export default Step3Form