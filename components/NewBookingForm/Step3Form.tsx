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
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from '@/hooks/use-toast';

function formatTime12(hour: number, minute: number): string {
  const hour12 = ((hour + 11) % 12) + 1;
  const minuteStr = minute.toString().padStart(2, "0");
  const amPm = hour >= 12 ? "PM" : "AM";
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
  const { form, step, Step1, Step2, NextStep, loading } = useCustomForm();
  const { formState: { errors }, setValue, watch, clearErrors, trigger } = form;
  const [returnDateOpen, setReturnDateOpen] = useState(false);
  const [mobileReturnDateOpen, setMobileReturnDateOpen] = useState(false);
  const pickupDate = watch('pickup_date');
  const pickupTime = watch('pickup_time');
  const returnDate = watch('return_date');
  const returnTime = watch('return_time');
  const isReturn = watch('is_return');

  const isSameDayReturn = returnDate && pickupDate && isSameDay(returnDate, pickupDate);

  const requiredFields = [
    "name",
    "email",
    "phone",
    "pickup_date",
    "pickup_time",
    "passengers",
    "bags",
  ] as const;


  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-xl font-semibold uppercase text-black mx-3 pt-7">Booking Details</h2>
      <div className='w-full flex flex-col gap-5 px-3 md:px-5 py-5'>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-black">Full Name <span className="text-red-500">*</span></label>
          <input
            id="name"
            name="name"
            className={cn(
              'p-2 rounded-xl border text-sm md:text-base placeholder:text-xs sm:placeholder:text-sm',
              errors.name ? 'border-red-500' : 'border-gray-500'
            )}
            value={watch('name')}
            onChange={(e) => {
              setValue('name', e.target.value);
              errors.name = undefined;
            }}
            placeholder="Enter your name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-black">Email Address <span className="text-red-500">*</span></label>
          <input
            id="email"
            name="email"
            className={cn(
              'p-2 rounded-xl border text-sm md:text-base placeholder:text-xs sm:placeholder:text-sm',
              errors.email ? 'border-red-500' : 'border-gray-500'
            )}
            value={watch('email')}
            onChange={(e) => {
              setValue('email', e.target.value);
              errors.email = undefined;
            }}
            placeholder="Enter your email"
          />
        </div>
        {/* Always show Pickup Date & Time */}
        {(isReturn || !isReturn) && (
          <div className="w-full block md:hidden">
            <label className="block text-sm font-medium text-black mb-2">Pickup Date & Time</label>
            <Popover open={dateOpen} onOpenChange={setDateOpen}>
              <PopoverTrigger asChild>
                <div
                  className={cn("w-full flex h-full items-center gap-2 justify-start px-3 py-3 border rounded-xl cursor-pointer",
                    errors.pickup_date ? "border-red-500" : "border-gray-500")}
                  onClick={() => setDateOpen(true)}
                >
                  <CalendarDays className="size-5" />
                  <div className="flex flex-col">
                    {pickupDate && pickupTime ? (
                      <p className="text-sm text-black">
                        {format(pickupDate, "PPP")} at {formatTime12(pickupTime?.hour || 0, pickupTime?.minute || 0)}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-400">Select date and time</p>
                    )}
                  </div>
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-[280px] p-4 bg-white z-[999]" align="start">
                <p className="text-sm font-semibold mb-2">Select A Date</p>
                <Calendar
                  mode="single"
                  selected={pickupDate ?? undefined}
                  onSelect={(date) => {
                    clearErrors("pickup_date");
                    setValue("pickup_date", date);
                  }}
                  disabled={(date) => date < new Date()}
                  initialFocus
                />

                {pickupDate && (
                  <>
                    <p className="text-sm font-semibold mt-4 mb-2">Select A Time</p>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      {/* Hour Input */}
                      <div className="relative">
                        <label className="text-xs font-medium mb-1 block">Hour</label>
                        <div className="relative">
                          <input
                            type="number"

                            min={1}
                            max={23}
                            value={pickupTime?.hour ?? 0}
                            onChange={(e) => {
                              let hour = parseInt(e.target.value);
                              const current = pickupTime ?? { hour: 0, minute: 0 };
                              const isPM = current.hour >= 12;
                              if (isPM && hour < 12) hour += 12;
                              setValue("pickup_time", {
                                ...current,
                                hour: isNaN(hour) ? 0 : hour,
                              });
                            }}



                            className="w-full border rounded px-2 py-1 text-center appearance-none"
                          />
                          <button
                            type="button"
                            className="absolute right-1 top-0 text-xs"
                            onClick={() => {
                              const current = pickupTime ?? { hour: 12, minute: 0 };
                              let hour = ((current.hour + 11) % 12) + 1;
                              hour = hour < 12 ? hour + 1 : 1;
                              const isPM = current.hour >= 12;
                              setValue("pickup_time", {
                                ...current,
                                hour: isPM ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour),
                              });
                            }}
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            className="absolute right-1 bottom-0 text-xs"
                            onClick={() => {
                              const current = pickupTime ?? { hour: 12, minute: 0 };
                              let hour = ((current.hour + 11) % 12) + 1;
                              hour = hour > 1 ? hour - 1 : 12;
                              const isPM = current.hour >= 12;
                              setValue("pickup_time", {
                                ...current,
                                hour: isPM ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour),
                              });
                            }}
                          >
                            ▼
                          </button>
                        </div>
                      </div>

                      {/* Minute Input */}
                      <div className="relative">
                        <label className="text-xs font-medium mb-1 block">Minute</label>
                        <div className="relative">
                          <input
                            type="number"
                            min={0}
                            max={59}
                            step={5}
                            value={pickupTime?.minute ?? 0}
                            onChange={(e) => {
                              const minute = parseInt(e.target.value);
                              const current = pickupTime ?? { hour: 0, minute: 0 };
                              setValue("pickup_time", {
                                ...current,
                                minute: isNaN(minute) ? 0 : minute,
                              });
                            }}
                            className="w-full border rounded px-2 py-1 text-center appearance-none"
                          />
                          <button
                            type="button"
                            className="absolute right-1 top-0 text-xs"
                            onClick={() => {
                              const current = pickupTime ?? { hour: 0, minute: 0 };
                              let minute = current.minute ?? 0;
                              minute = minute < 55 ? minute + 5 : 0;
                              setValue("pickup_time", { ...current, minute });
                            }}
                          >
                            ▲
                          </button>
                          <button
                            type="button"
                            className="absolute right-1 bottom-0 text-xs"
                            onClick={() => {
                              const current = pickupTime ?? { hour: 0, minute: 0 };
                              let minute = current.minute ?? 0;
                              minute = minute > 0 ? minute - 5 : 55;
                              setValue("pickup_time", { ...current, minute });
                            }}
                          >
                            ▼
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* AM/PM Buttons */}
                    <div className="flex justify-between">
                      {["AM", "PM"].map((period) => {
                        const currentHour = returnTime?.hour ?? 0;
                        const isPM = currentHour >= 12;
                        const isActive = (period === "PM" && isPM) || (period === "AM" && !isPM);
                        return (
                          <button
                            type="button"
                            key={period}
                            className={cn(
                              "w-[48%] py-1 rounded-full text-sm font-semibold",
                              isActive ? "bg-blue-500 text-white" : "border border-gray-400 text-gray-700"
                            )}
                            onClick={() => {
                              const time = returnTime ?? { hour: 12, minute: 0 };
                              let newHour = time.hour;
                              if (period === "AM" && newHour >= 12) newHour -= 12;
                              if (period === "PM" && newHour < 12) newHour += 12;
                              setValue("return_time", { ...time, hour: newHour });
                            }}
                          >
                            {period}
                          </button>
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      onClick={() => setDateOpen(false)}
                      className="w-full bg-blue-600 text-white py-2 rounded-full font-bold mt-4"
                    >
                      DONE
                    </button>
                  </>
                )}
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* RETURN DATE & TIME */}
        {isReturn && (
          <>
            {/* DESKTOP ONLY */}
            <div className="hidden md:block w-full">
              <label className="block text-sm font-medium text-black mb-2">Return Date & Time</label>
              <Popover open={returnDateOpen} onOpenChange={setReturnDateOpen}>
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      "w-full flex h-full items-center gap-2 justify-start px-3 py-3 border rounded-xl cursor-pointer",
                      errors.return_date ? "border-red-500" : "border-gray-500"
                    )}
                    onClick={() => setReturnDateOpen(true)} // ✅ use correct setter
                  >
                    <CalendarDays className="size-5" />
                    <div className="flex flex-col">
                      {returnDate && returnTime ? (
                        <p className="text-sm text-black">
                          {format(returnDate, "PPP")} at {formatTime12(returnTime?.hour || 0, returnTime?.minute || 0)}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400">Select date and time</p>
                      )}
                    </div>
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-[280px] p-4 bg-white z-[999]" align="start">
                  <p className="text-sm font-semibold mb-2">Select A Date</p>
                  <Calendar
                    mode="single"
                    selected={returnDate ?? undefined}
                    onSelect={(date) => {
                      clearErrors("return_date");
                      setValue("return_date", date);
                    }}

                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                  {pickupDate && (
                    <>
                      <p className="text-sm font-semibold mt-4 mb-2">Select A Time</p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div>
                          <label className="text-xs font-medium">Hour</label>
                          <input
                            type="number"
                            min={1}
                            max={23}
                            value={pickupTime?.hour ?? 0}
                            onChange={(e) => {
                              const hour = parseInt(e.target.value);
                              const current = pickupTime ?? { hour: 0, minute: 0 };
                              setValue("pickup_time", {
                                ...current,
                                hour: isNaN(hour) ? 0 : hour,
                              });
                            }}

                            className="w-full border rounded px-2 py-1"
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium">Minute</label>
                          <input
                            type="number"
                            min={0}
                            max={59}
                            step={5}
                            value={pickupTime?.minute ?? 0}
                            onChange={(e) => {
                              const minute = parseInt(e.target.value);
                              const current = pickupTime ?? { hour: 0, minute: 0 }; // default fallback
                              setValue("pickup_time", {
                                ...current,
                                minute: isNaN(minute) ? 0 : minute,
                              });
                            }}

                            className="w-full border rounded px-2 py-1"
                          />
                        </div>
                        <div className="flex justify-between">
                          {["AM", "PM"].map((period) => {
                            const currentHour = returnTime?.hour ?? 0;
                            const isPM = currentHour >= 12;
                            const isActive = (period === "PM" && isPM) || (period === "AM" && !isPM);
                            return (
                              <button
                                type="button"
                                key={period}
                                className={cn(
                                  "w-[48%] py-1 rounded-full text-sm font-semibold",
                                  isActive ? "bg-blue-500 text-white" : "border border-gray-400 text-gray-700"
                                )}
                                onClick={() => {
                                  const time = returnTime ?? { hour: 12, minute: 0 };
                                  let newHour = time.hour;
                                  if (period === "AM" && newHour >= 12) newHour -= 12;
                                  if (period === "PM" && newHour < 12) newHour += 12;
                                  setValue("return_time", { ...time, hour: newHour });
                                }}
                              >
                                {period}
                              </button>
                            );
                          })}
                        </div>

                      </div>
                      <button
                        type="button"
                        onClick={() => setReturnDateOpen(false)}
                        className="w-full bg-blue-600 text-white py-2 rounded-full font-bold"
                      >
                        DONE
                      </button>
                    </>
                  )}
                </PopoverContent>
              </Popover>
            </div>
            {/* MOBILE ONLY */}
            <div className="block md:hidden w-full">
              <label className="block text-sm font-medium text-black mb-2">Return Date & Time</label>

              <Popover open={mobileReturnDateOpen} onOpenChange={setMobileReturnDateOpen}>
                <PopoverTrigger asChild>
                  <div
                    className={cn(
                      "w-full flex h-full items-center gap-2 justify-start px-3 py-3 border rounded-xl cursor-pointer",
                      errors.return_date ? "border-red-500" : "border-gray-500"
                    )}
                    onClick={() => setMobileReturnDateOpen(true)}
                  >
                    <CalendarDays className="size-5" />
                    <div className="flex flex-col">
                      {returnDate && returnTime ? (
                        <p className="text-sm text-black">
                          {format(returnDate, "PPP")} at {formatTime12(returnTime?.hour || 0, returnTime?.minute || 0)}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-400">Select date and time</p>
                      )}
                    </div>
                  </div>
                </PopoverTrigger>

                <PopoverContent className="w-[280px] p-4 bg-white z-[999]" align="start">
                  <p className="text-sm font-semibold mb-2">Select A Date</p>
                  <Calendar
                    mode="single"
                    selected={returnDate ?? undefined}
                    onSelect={(date) => {
                      clearErrors("return_date");
                      setValue("return_date", date);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />

                  {returnDate && (
                    <>
                      <p className="text-sm font-semibold mt-4 mb-2">Select A Time</p>
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        {/* Hour Input */}
                        <div className="relative">
                          <label className="text-xs font-medium mb-1 block">Hour</label>
                          <div className="relative">
                            <input
                              type="number"

                              min={1}
                              max={23}
                              value={returnTime?.hour ?? 0}
                              onChange={(e) => {
                                let hour = parseInt(e.target.value);
                                const current = returnTime ?? { hour: 0, minute: 0 };
                                const isPM = current.hour >= 12;
                                if (isPM && hour < 12) hour += 12;
                                setValue("return_time", {
                                  ...current,
                                  hour: isNaN(hour) ? 0 : hour,
                                });
                              }}



                              className="w-full border rounded px-2 py-1 text-center appearance-none"
                            />
                            <button
                              type="button"
                              className="absolute right-1 top-0 text-xs"
                              onClick={() => {
                                const current = returnTime ?? { hour: 12, minute: 0 };
                                let hour = ((current.hour + 11) % 12) + 1;
                                hour = hour < 12 ? hour + 1 : 1;
                                const isPM = current.hour >= 12;
                                setValue("return_time", {
                                  ...current,
                                  hour: isPM ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour),
                                });
                              }}
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              className="absolute right-1 bottom-0 text-xs"
                              onClick={() => {
                                const current = returnTime ?? { hour: 12, minute: 0 };
                                let hour = ((current.hour + 11) % 12) + 1;
                                hour = hour > 1 ? hour - 1 : 12;
                                const isPM = current.hour >= 12;
                                setValue("return_time", {
                                  ...current,
                                  hour: isPM ? (hour === 12 ? 12 : hour + 12) : (hour === 12 ? 0 : hour),
                                });
                              }}
                            >
                              ▼
                            </button>
                          </div>
                        </div>

                        {/* Minute Input */}
                        <div className="relative">
                          <label className="text-xs font-medium mb-1 block">Minute</label>
                          <div className="relative">
                            <input
                              type="number"
                              min={0}
                              max={59}
                              step={5}
                              value={returnTime?.minute ?? 0}
                              onChange={(e) => {
                                const minute = parseInt(e.target.value);
                                const current = returnTime ?? { hour: 0, minute: 0 };
                                setValue("return_time", {
                                  ...current,
                                  minute: isNaN(minute) ? 0 : minute,
                                });
                              }}
                              className="w-full border rounded px-2 py-1 text-center appearance-none"
                            />
                            <button
                              type="button"
                              className="absolute right-1 top-0 text-xs"
                              onClick={() => {
                                const current = returnTime ?? { hour: 0, minute: 0 };
                                let minute = current.minute ?? 0;
                                minute = minute < 55 ? minute + 5 : 0;
                                setValue("return_time", { ...current, minute });
                              }}
                            >
                              ▲
                            </button>
                            <button
                              type="button"
                              className="absolute right-1 bottom-0 text-xs"
                              onClick={() => {
                                const current = returnTime ?? { hour: 0, minute: 0 };
                                let minute = current.minute ?? 0;
                                minute = minute > 0 ? minute - 5 : 55;
                                setValue("return_time", { ...current, minute });
                              }}
                            >
                              ▼
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* AM/PM Buttons */}
                      <div className="flex justify-between">
                        {["AM", "PM"].map((period) => {
                          const currentHour = returnTime?.hour ?? 0;
                          const isPM = currentHour >= 12;
                          const isActive = (period === "PM" && isPM) || (period === "AM" && !isPM);
                          return (
                            <button
                              type="button"
                              key={period}
                              className={cn(
                                "w-[48%] py-1 rounded-full text-sm font-semibold",
                                isActive ? "bg-blue-500 text-white" : "border border-gray-400 text-gray-700"
                              )}
                              onClick={() => {
                                const time = returnTime ?? { hour: 12, minute: 0 };
                                let newHour = time.hour;
                                if (period === "AM" && newHour >= 12) newHour -= 12;
                                if (period === "PM" && newHour < 12) newHour += 12;
                                setValue("return_time", { ...time, hour: newHour });
                              }}
                            >
                              {period}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={() => setMobileReturnDateOpen(false)}
                        className="w-full bg-blue-600 text-white py-2 rounded-full font-bold mt-4"
                      >
                        DONE
                      </button>
                    </>
                  )}
                </PopoverContent>
              </Popover>
            </div>


          </>
        )}


        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium text-black">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <PhoneInput
            country={'pk'}
            value={watch('phone')}
            onChange={(phone) => setValue('phone', phone)}
            inputClass={cn(
              '!w-full !rounded-xl',
              errors.phone && '!border-red-500'
            )}
            inputProps={{
              name: 'phone',
            }}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">Phone is required</p>
          )}
        </div>

        {/* Number of Passengers */}
        <div className="flex flex-col gap-1 md:hidden">
          <label className="text-sm font-medium">Number of Passengers</label>
          <select
            className="p-2 rounded-xl border border-gray-500"
            value={watch('passengers')}
            onChange={(e) => setValue('passengers', parseInt(e.target.value))}
          >
            {[...Array(5).keys()].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
          {errors.passengers && (
            <p className="text-xs text-red-500 mt-1">Passengers required</p>
          )}
        </div>

        {/* Number of Suitcases */}
        <div className="flex flex-col gap-1 md:hidden">
          <label className="text-sm font-medium">
            Number of Bags <span className="text-red-500">*</span>
          </label>
          <select
            className="p-2 rounded-xl border border-gray-500"
            value={watch('bags')}
            onChange={(e) => setValue('bags', parseInt(e.target.value))}
          >
            {[...Array(3).keys()].map(i => (
              <option key={i} value={i}>{i}</option>
            ))}
          </select>
        </div>
        {/* Airport Pickup Toggle */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={watch('airport_pickup')}
            onChange={(e) => setValue('airport_pickup', e.target.checked)}
            className="size-5 accent-black"
          />
          <label className="text-sm font-medium">Airport Pickup?</label>
        </div>

        {/* Airport Pickup Options */}
        {watch('airport_pickup') && (
          <div className="flex flex-col gap-5 mt-5">

            {/* Flight Number */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium">Flight Number</label>
              <input
                type="text"
                placeholder="Flight Number"
                value={watch('flight') || ''}
                onChange={(e) => setValue('flight', e.target.value)}
                className="w-full p-2 rounded-xl border border-gray-500 text-sm placeholder:text-xs"
              />
              <p className="text-xs text-gray-500 mt-1">
                Don’t worry. Even if your flight is delayed, we’ll monitor your flight and arrive on time, every time.
              </p>
            </div>

            {/* Flight Track Option */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">Flight Track</p>
                <span className="border bg-brand font-semibold p-1 px-2 rounded-lg text-xs text-black">7£</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div
                  onClick={() => { if (!watch('payment_id')) setValue("flight_track", true) }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={cn('rounded-full border size-4 border-gray-500', watch('flight_track') ? 'bg-black' : '')}></div>
                  <p className="text-sm">Yes</p>
                </div>
                <div
                  onClick={() => { if (!watch('payment_id')) setValue("flight_track", false) }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={cn('rounded-full border size-4 border-gray-500', !watch('flight_track') ? 'bg-black' : '')}></div>
                  <p className="text-sm accent-black">No</p>
                </div>
              </div>
            </div>

            {/* Meet & Greet */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-sm">Meet & Greet</p>
                <span className="border bg-brand font-semibold p-1 px-2 rounded-lg text-xs text-black">15£</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div
                  onClick={() => { if (!watch('payment_id')) setValue("meet_greet", true) }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={cn('rounded-full border size-4 border-gray-500', watch('meet_greet') ? 'bg-black' : '')}></div>
                  <p className="text-sm">Yes</p>
                </div>
                <div
                  onClick={() => { if (!watch('payment_id')) setValue("meet_greet", false) }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={cn('rounded-full border size-4 border-gray-500', !watch('meet_greet') ? 'bg-black' : '')}></div>
                  <p className="text-sm">No</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Action Buttons */}
        <div className="flex flex-col gap-4 mt-8 w-full">
          <button
            className="w-full bg-black text-white py-3 px-6 rounded-full font-bold text-center"
            type="button"
            onClick={async () => {
              const valid = await trigger(requiredFields);

              if (!valid) {
                // Give the DOM some time to render error classes before selecting
                setTimeout(() => {
                  const firstErrorKey = Object.keys(form.formState.errors)[0]; // use formState directly
                  const el = document.querySelector(`[name="${firstErrorKey}"]`);

                  if (el) {
                    el.scrollIntoView({ behavior: "smooth", block: "center" });
                    (el as HTMLElement).focus();
                  }

                  toast({
                    variant: "destructive",
                    title: "Missing Information",
                    description: "Please fill in all required fields correctly.",
                  });
                }, 0);

                return;
              }

              const values = form.getValues();
              console.log("Form values:", values);
              NextStep();
            }}

          >
            GO TO PAYMENT →
          </button>



          <button
            type="button"
            onClick={() => {
              if (step === 3) Step2();
              else if (step === 2) Step1();
            }}
            className="w-full border border-black text-black  py-3 px-6 rounded-full font-bold text-center"
          >
            ← BACK TO CARS
          </button>
        </div>

        {/* {watch('payment_method') === 'online'
          ? watch('payment_id')
            ? <div onClick={() => NextStep()} className='w-full py-2 px-4 text-center font-bold text-white bg-black rounded-xl cursor-pointer'>{loading ? 'Loading...' : 'Place Order (Payment Done)'}</div>
            : <MyPaymentForm />
          : <div onClick={() => NextStep()} className='w-full py-2 px-4 text-center font-bold text-white bg-black rounded-xl cursor-pointer'>{loading ? 'Loading...' : 'Place Order'}</div>} */}

      </div>
    </div>

  );
}

export default Step3Form;