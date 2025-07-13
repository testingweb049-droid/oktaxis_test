import React, { useState } from 'react';
import useCustomForm from '@/hooks/useFormContext';
import { cn } from '@/lib/utils';
import MyPaymentForm from './PaymentForm';
import { BiSolidShoppingBags } from "react-icons/bi";
import { MdPeopleAlt } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, TimerIcon } from 'lucide-react';
import { format, isSameDay } from "date-fns";

function formatTime12(hour: number, minute: number): string {
  const hour12 = ((hour + 11) % 12) + 1;
  const minuteStr = minute.toString().padStart(2, '0');
  const amPm = hour >= 12 ? 'PM' : 'AM';
  return `${hour12}:${minuteStr} ${amPm}`;
}

// Helper: check if selected time is in the past (on the same day)
function isTimeBeforeNow(hour: number, minute: number): boolean {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const selectedMinutes = hour * 60 + minute;
  return selectedMinutes < nowMinutes;
}

function Step3Form() {
  const [dateOpen, setDateOpen] = useState(false);
  const { form, NextStep, loading } = useCustomForm();
  const { formState: { errors }, setValue, watch, clearErrors } = form;

  const returnTime = watch('return_time');
  const returnDate = watch('return_date');
  const pickupDate = watch('pickup_date');

  const isSameDayReturn = returnDate && pickupDate && isSameDay(returnDate, pickupDate);

  return (
    <div className='w-full flex flex-col gap-10'>
      {/* Contact Info */}
      <div className='flex flex-col border border-gray-500 rounded-xl overflow-hidden'>
        <div className='w-full text-center p-2 font-semibold bg-black text-white'>Contact Information</div>
        <div className='w-full flex flex-col gap-5 px-3 md:px-5 py-10'>
          <input className={cn('p-2 rounded-xl border', errors.name ? 'border-red-500' : 'border-gray-500')} value={watch('name')} onChange={(e) => { setValue('name', e.target.value); errors.name = undefined; }} placeholder='Name' />
          <input className={cn('p-2 rounded-xl border', errors.email ? 'border-red-500' : 'border-gray-500')} value={watch('email')} onChange={(e) => { setValue('email', e.target.value); errors.email = undefined; }} placeholder='Email' />
          <input className={cn('p-2 rounded-xl border', errors.phone ? 'border-red-500' : 'border-gray-500')} value={watch('phone')} onChange={(e) => { setValue('phone', e.target.value); errors.phone = undefined; }} placeholder='Phone' />

          {/* Return Date & Time */}
          {form.watch('is_return') && (
            <div className='grid md:grid-cols-2 gap-5 w-full'>
              {/* Return Date Picker */}
              <Popover open={loading ? false : dateOpen} onOpenChange={setDateOpen}>
                <PopoverTrigger asChild>
                  <div className={cn("w-full flex h-full items-center gap-2 justify-start px-2 py-3 lg:py-2 border rounded-xl", errors.return_date ? 'border-red-500' : 'border-black/80')}>
                    <CalendarDays className="size-5" />
                    <div className='flex flex-col gap-1'>
                      <p className={cn('text-xs text-start', errors.return_date ? 'text-red-500' : 'text-black')}>Return Date</p>
                      {returnDate ? <p className='text-black text-sm'>{format(returnDate, "PPP")}</p> : <p className='text-gray-400 text-sm'>dd:mm:yyyy</p>}
                    </div>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white relative z-[200]" align="start">
                  <Calendar
                    mode="single"
                    selected={returnDate}
                    onSelect={(event) => {
                      clearErrors(['return_date']);
                      setValue('return_date', event);
                      setDateOpen(false);
                    }}
                    disabled={(date) => date <= pickupDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              {/* Return Time Picker */}
              <Popover>
                <PopoverTrigger asChild>
                  <div className={cn("w-full flex h-full items-center gap-2 justify-start px-2 py-3 lg:py-2 border rounded-xl", errors.return_time ? 'border-red-500' : 'border-black/80')}>
                    <TimerIcon className="size-5" />
                    <p className={returnTime?.hour !== undefined ? 'text-sm text-black' : 'text-gray-400 text-sm'}>
                      {returnTime?.hour !== undefined ? formatTime12(returnTime.hour, returnTime?.minute ?? 0) : 'hh:mm AM/PM'}
                    </p>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="max-w-full w-fit h-40 p-2 overflow-hidden bg-white z-[200]" align="start">
                  <div className="flex items-start justify-start gap-3 max-h-full h-full overflow-hidden">
                    {/* Hour Picker */}
                    <div className='flex flex-col py-1 rounded-sm border border-gray-300 text-center h-full overflow-y-auto w-fit'>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((hourDisplay) => {
                        const currentHour = returnTime?.hour ?? 0;
                        const isPM = currentHour >= 12;
                        let actualHour = hourDisplay % 12;
                        if (isPM) actualHour += 12;
                        if (actualHour === 12) actualHour = isPM ? 12 : 0;

                        const disabled = isSameDayReturn && isTimeBeforeNow(actualHour, returnTime?.minute ?? 0);

                        return (
                          <div
                            key={hourDisplay}
                            className={cn(
                              'py-1 px-4 cursor-pointer',
                              returnTime && returnTime.hour % 12 === hourDisplay % 12 ? 'bg-blue-500 text-white' : 'bg-white',
                              disabled && 'text-gray-400 cursor-not-allowed'
                            )}
                            onClick={() => {
                              if (disabled) return;
                              setValue('return_time', { minute: returnTime?.minute ?? 0, hour: actualHour });
                              form.formState.errors.return_time = undefined;
                            }}
                          >
                            {hourDisplay.toString().padStart(2, '0')}
                          </div>
                        );
                      })}
                    </div>

                    {/* Minute Picker */}
                    <div className='flex flex-col py-1 rounded-sm border border-gray-300 text-center h-full overflow-y-auto w-fit'>
                      {Array.from({ length: 12 }, (_, i) => i * 5).map((minute) => {
                        const disabled = isSameDayReturn && returnTime?.hour !== undefined && isTimeBeforeNow(returnTime.hour, minute);

                        return (
                          <div
                            key={minute}
                            className={cn(
                              'py-1 px-4 cursor-pointer',
                              returnTime?.minute === minute ? 'bg-blue-500 text-white' : 'bg-white',
                              disabled && 'text-gray-400 cursor-not-allowed'
                            )}
                            onClick={() => {
                              if (disabled) return;
                              setValue('return_time', { hour: returnTime?.hour ?? 0, minute });
                              form.formState.errors.return_time = undefined;
                            }}
                          >
                            {minute.toString().padStart(2, '0')}
                          </div>
                        );
                      })}
                    </div>

                    {/* AM/PM Picker */}
                    <div className='flex flex-col py-1 rounded-sm border border-gray-300 text-center h-full overflow-y-auto w-fit'>
                      {['AM', 'PM'].map((period) => (
                        <div
                          key={period}
                          className={cn(
                            'py-1 px-2 cursor-pointer',
                            (returnTime?.hour || 0) >= 12 === (period === 'PM') ? 'bg-blue-500 text-white' : 'bg-white'
                          )}
                          onClick={() => {
                            if (returnTime?.hour !== undefined) {
                              let hour = returnTime.hour;
                              if (period === 'AM' && hour >= 12) hour -= 12;
                              if (period === 'PM' && hour < 12) hour += 12;
                              setValue('return_time', { ...returnTime, hour });
                              form.formState.errors.return_time = undefined;
                            }
                          }}
                        >
                          {period}
                        </div>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
          <textarea rows={3} className={cn('p-2 rounded-xl border', errors.instructions ? 'border-red-500' : 'border-gray-500')} value={watch('instructions')} onChange={(e) => { setValue('instructions', e.target.value); errors.instructions = undefined; }} placeholder="Instructions" />
        </div>
      </div>

      {/* Extras */}
      <div className='flex flex-col border border-gray-500 rounded-xl overflow-hidden'>
        <div className='w-full text-center p-2 font-semibold bg-black text-white'>Extras</div>
        <div className='w-full flex flex-col gap-5 px-3 md:px-5 py-10'>
          {/* Passengers & Bags */}
          <div className='grid sm:grid-cols-2 gap-5'>
            {/* Passengers */}
            <div className='rounded-xl w-full flex items-center justify-between border p-2 border-gray-500'>
              <div className='flex items-center gap-2'>
                <div className='p-1 rounded-lg border border-gray-500'>
                  <MdPeopleAlt className='size-6' />
                </div>
                <p>Passengers</p>
                <p className='border border-green-600 font-semibold p-1 rounded-lg text-xs text-green-600'>Free</p>
              </div>
              <div className='w-fit flex items-center gap-3'>
                <div onClick={() => { if (watch("passengers") > 1) setValue("passengers", watch('passengers') - 1) }} className='p-2 rounded-lg border size-7 border-gray-500 font-bold cursor-pointer'>-</div>
                <p>{watch('passengers')}</p>
                <div onClick={() => { if (watch("passengers") < 6) setValue("passengers", watch('passengers') + 1) }} className='p-2 rounded-lg border size-7 border-gray-500 font-bold cursor-pointer'>+</div>
              </div>
            </div>

            {/* Bags */}
            <div className='rounded-xl w-full flex items-center justify-between border border-gray-500 p-2'>
              <div className='flex items-center gap-2'>
                <div className='p-1 rounded-lg border border-gray-500'>
                  <BiSolidShoppingBags className='size-6' />
                </div>
                <p>Bags</p>
                <p className='border border-green-600 font-semibold p-1 rounded-lg text-xs text-green-600'>Free</p>
              </div>
              <div className='w-fit flex items-center gap-3'>
                <div onClick={() => { if (watch("bags") > 0) setValue("bags", watch('bags') - 1) }} className='p-2 rounded-lg border size-7 border-gray-500 font-bold cursor-pointer'>-</div>
                <p>{watch('bags')}</p>
                <div onClick={() => { if (watch("bags") < 4) setValue("bags", watch('bags') + 1) }} className='p-2 rounded-lg border size-7 border-gray-500 font-bold cursor-pointer'>+</div>
              </div>
            </div>
          </div>

          {/* Addons */}
          <div className='grid sm:grid-cols-2 gap-5'>
            {/* Flight Track */}
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <p>Flight Track</p>
                <p className='border border-green-600 font-semibold p-1 px-2 rounded-lg text-xs text-green-600'>7£</p>
              </div>
              <div className='flex items-center gap-10 sm:gap-16'>
                <div onClick={() => { if (!watch('payment_id')) setValue("flight_track", true) }} className='flex items-center gap-2 cursor-pointer'>
                  <div className={cn('rounded-full border size-4 border-gray-500', watch('flight_track') ? 'bg-blue-600' : '')}></div>
                  <p>Yes</p>
                </div>
                <div onClick={() => { if (!watch('payment_id')) setValue("flight_track", false) }} className='flex items-center gap-2 cursor-pointer'>
                  <div className={cn('rounded-full border size-4 border-gray-500', !watch('flight_track') ? 'bg-blue-600' : '')}></div>
                  <p>No</p>
                </div>
              </div>
            </div>

            {/* Meet & Greet */}
            <div className='flex flex-col gap-2'>
              <div className='flex items-center gap-2'>
                <p>Meet & Greet</p>
                <p className='border border-green-600 font-semibold p-1 px-2 rounded-lg text-xs text-green-600'>15£</p>
              </div>
              <div className='flex items-center gap-10 sm:gap-16'>
                <div onClick={() => { if (!watch('payment_id')) setValue("meet_greet", true) }} className='flex items-center gap-2 cursor-pointer'>
                  <div className={cn('rounded-full border size-4 border-gray-500', watch('meet_greet') ? 'bg-blue-600' : '')}></div>
                  <p>Yes</p>
                </div>
                <div onClick={() => { if (!watch('payment_id')) setValue("meet_greet", false) }} className='flex items-center gap-2 cursor-pointer'>
                  <div className={cn('rounded-full border size-4 border-gray-500', !watch('meet_greet') ? 'bg-blue-600' : '')}></div>
                  <p>No</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment */}
          {watch('payment_method') === 'online'
            ? watch('payment_id')
              ? <div onClick={() => NextStep()} className='w-full py-2 px-4 text-center font-bold text-white bg-black rounded-xl cursor-pointer'>{loading ? 'Loading...' : 'Place Order (Payment Done)'}</div>
              : <MyPaymentForm />
            : <div onClick={() => NextStep()} className='w-full py-2 px-4 text-center font-bold text-white bg-black rounded-xl cursor-pointer'>{loading ? 'Loading...' : 'Place Order'}</div>}
        </div>
      </div>
    </div>
  );
}

export default Step3Form;
