import React from 'react'
import useCustomForm from '@/hooks/useFormContext'
import { cn } from '@/lib/utils'
import MyPaymentForm from './PaymentForm'

function Step3Form() {
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
          <textarea rows={3} className={cn('p-2 rounded-xl border ', errors.instructions ? 'border-red-500' : 'border-gray-500')} value={watch('instructions')} onChange={(e) => { setValue('instructions', e.target.value); errors.instructions = undefined; }} placeholder="Instructions" />
        </div>
      </div>

      <div className='flex flex-col  border border-gray-500 rounded-xl overflow-hidden'>
        <div className='w-full text-center p-2 font-semibold bg-black text-white'>Extras</div>
        <div className='w-full flex flex-col gap-5 px-3 md:px-5 py-10'>
          <div className='rounded-xl w-full flex items-center justify-between border p-2 border-gray-500'>
            <p>Passengers</p>
            <div className='w-fit flex items-center gap-3'>

              <div onClick={() => { if (watch("passengers") === 1) return; setValue("passengers", watch('passengers') - 1) }} className=' p-2 rounded-lg border leading-4 flex items-center justify-center size-7 border-gray-500 font-bold cursor-pointer'>-</div>
              <p>{watch('passengers')}</p>
              <div onClick={() => { if (watch("passengers") === 6) return; setValue("passengers", watch('passengers') + 1) }} className=' p-2 rounded-lg border leading-4 flex items-center justify-center size-7 border-gray-500 font-bold cursor-pointer'>+</div>

            </div>
          </div>
          <div className='rounded-xl w-full flex items-center justify-between border border-gray-500 p-2'>
            <p>Bags</p>
            <div className='w-fit flex items-center gap-3'>

              <div onClick={() => { if (watch("bags") === 0) return; setValue("bags", watch('bags') - 1) }} className=' p-2 rounded-lg border leading-4 flex items-center justify-center size-7 border-gray-500 font-bold cursor-pointer'>-</div>
              <p>{watch('bags')}</p>
              <div onClick={() => { if (watch("bags") === 4) return; setValue("bags", watch('bags') + 1) }} className=' p-2 rounded-lg border leading-4 flex items-center justify-center size-7 border-gray-500 font-bold cursor-pointer'>+</div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p>Flight Track (7£)</p>

            <div className='flex items-center gap-10 sm:gap-16'>
              <div onClick={() => {if(watch('payment_id')) {return;} setValue("flight_track", true) }} className='flex items-center gap-2 w-fit cursor-pointer'>
                <div className={cn('rounded-full border size-4 border-gray-500 ', watch('flight_track')? 'bg-blue-600' : 'bg-transparent')}></div>
                <p>Yes</p>
              </div>
              <div onClick={() => { if(watch('payment_id')) {return;} setValue("flight_track", false) }} className='flex items-center gap-2 w-fit cursor-pointer'>
                <div className={cn('rounded-full border size-4 border-gray-500 ', !watch('flight_track') ? 'bg-blue-600' : 'bg-transparent')}></div>
                <p>No</p>
              </div>
            </div>
          </div>

          <div className='flex flex-col gap-2'>
            <p>Meet & Greet (15£)</p>

           <div className='flex items-center gap-10 sm:gap-16'>
              <div onClick={() => { if(watch('payment_id')) {return;} setValue("meet_greet", true) }} className='flex items-center gap-2 w-fit cursor-pointer'>
                <div className={cn('rounded-full border size-4 border-gray-500 ', watch('meet_greet')? 'bg-blue-600' : 'bg-transparent')}></div>
                <p>Yes</p>
              </div>
              <div onClick={() => {if(watch('payment_id')) {return;} setValue("meet_greet", false) }} className='flex items-center gap-2 w-fit cursor-pointer'>
                <div className={cn('rounded-full border size-4 border-gray-500 ', !watch('meet_greet') ? 'bg-blue-600' : 'bg-transparent')}></div>
                <p>No</p>
              </div>
            </div>

          </div>
          <div className='flex flex-col gap-2'>
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

          </div>

          {form.watch('payment_method') === 'online' ? form.watch('payment_id') ? <div onClick={() => { NextStep() }} className='w-full py-2 px-4 text-center font-bold text-white bg-black rounded-xl cursor-pointer'>{loading ? 'Loading...' : 'Place Order (Payment Done)'}</div> : <MyPaymentForm /> : <div onClick={() => { NextStep() }} className='w-full py-2 px-4 text-center font-bold text-white bg-black rounded-xl cursor-pointer'>{loading ? 'Loading...' : 'Place Order'}</div>}
        </div>
      </div>
    </div>
  )
}

export default Step3Form