import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/lib/utils'; 
import { BiSolidShoppingBags } from "react-icons/bi"; 
import { MdPeopleAlt } from "react-icons/md"; 
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarDays, TimerIcon, ChevronUp, ChevronDown, Clock, ChevronRight } from 'lucide-react';
import { format, isSameDay, isBefore, addMonths, subMonths } from "date-fns";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast } from '@/hooks/use-toast';
import DateTimePicker from '../../components/ui/DateTimePicker'; 
import useCustomForm from '@/hooks/useFormContext';
import { startOfDay } from 'date-fns';

function Step3Form() {
  const { form, step, Step1, Step2, NextStep, loading, category } = useCustomForm();
  const { formState: { errors }, setValue, watch, clearErrors, trigger } = form;
  const [returnDateOpen, setReturnDateOpen] = useState(false);
  const [mobileReturnDateOpen, setMobileReturnDateOpen] = useState(false);

  const pickupDate = watch('pickup_date') ?? null;
  const pickupTime = watch('pickup_time') ?? null;
  const returnDate = watch('return_date') ?? null;
  const returnTime = watch('return_time') ?? null;
  const isReturn = watch('is_return');

  const requiredFields = [
    "name",
    "email",
    "phone",
    "pickup_date",
    "pickup_time",
    "passengers",
    "bags",
  ] as const;

  // Handler for form submission
  const handleSubmit = async () => {
    const valid = await trigger(requiredFields);

    // Check if date and time are selected
    if (!pickupDate || !pickupTime) {
      toast({
        variant: "destructive",
        title: "Missing Date or Time",
        description: "Please select both pickup date and time.",
      });
      return;
    }

    if (isReturn && (!returnDate || !returnTime)) {
      toast({
        variant: "destructive",
        title: "Missing Return Date or Time",
        description: "Please select both return date and time.",
      });
      return;
    }

    if (!valid) {
      setTimeout(() => {
        const firstErrorKey = Object.keys(form.formState.errors)[0];
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

    // Proceed if everything is valid
    const values = form.getValues();
    console.log("Form values:", values);
    NextStep();
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-2 bg-white shadow-lg rounded-2xl border border-gray-300">
      <h2 className="text-xl font-semibold uppercase text-black mx-3 pt-7">Booking Details</h2>
      <div className='w-full flex flex-col gap-5 px-3 md:px-5 py-5'>
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-base font-medium text-black">Full Name <span className="text-red-500">*</span></label>
          <input
            id="name"
            name="name"
            className={cn(
              'p-2 rounded-xl border text-base md:text-base placeholder:text-xs sm:placeholder:text-base',
              errors.name ? 'border-red-500' : 'border-gray-500',
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
          <label htmlFor="email" className="text-base font-medium text-black">Email Address <span className="text-red-500">*</span></label>
          <input
            id="email"
            name="email"
            className={cn(
              'p-2 rounded-xl border text-base md:text-base placeholder:text-xs sm:placeholder:text-base',
              errors.email ? 'border-red-500' : 'border-gray-500',
            )}
            value={watch('email')}
            onChange={(e) => {
              setValue('email', e.target.value);
              errors.email = undefined;
            }}
            placeholder="Enter your email"
          />
        </div>
        
        <div className="md:hidden">
          <DateTimePicker
            label="Pickup Date & Time"
            selectedDate={pickupDate}
            selectedTime={pickupTime}
            setValue={(field, value) => setValue(field as any, value)}
            dateFieldName="pickup_date"
            timeFieldName="pickup_time"
            minSelectableDate={startOfDay(new Date())}
          />
        </div>

        {isReturn && (
          <DateTimePicker
            label="Return Date & Time"
            selectedDate={returnDate}
            selectedTime={returnTime}
            setValue={(field, value) => setValue(field as any, value)}
            dateFieldName="return_date"
            timeFieldName="return_time"
            minSelectableDate={pickupDate ? startOfDay(new Date(pickupDate.getFullYear(), pickupDate.getMonth(), pickupDate.getDate() + 1)) : startOfDay(new Date())}
          />
        )}

        <div className="flex flex-col gap-1">
          <label className="text-base font-medium text-black">
            Phone Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="phone"
            value={watch('phone')}
            onChange={(e) => {if(isNaN(Number(e.target.value)) && e.target.value.length >0){return;} setValue('phone', e.target.value)}}
            className={cn(
              'p-2 rounded-xl border text-base md:text-base placeholder:text-xs sm:placeholder:text-base',
              errors.phone ? 'border-red-500' : 'border-gray-500',
            )}
            placeholder="Enter phone number"
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">Phone is required</p>}
        </div>

        {/* Number of Passengers and Bags in one row */}
        <div className="flex  md:hidden gap-5 flex-row sm:gap-4">
  {/* Number of Passengers */}
  <div className="flex flex-col gap-1 w-full sm:w-1/2">
    <label className="text-base font-medium">
      Passengers <span className="text-red-500">*</span>
    </label>
    <select
      name="passengers"
      className={cn(
        'p-2 rounded-xl border text-base md:text-base placeholder:text-xs sm:placeholder:text-base',
        errors.passengers ? 'border-red-500' : 'border-gray-500',
        'text-base touch-manipulation' // Ensure font-size is >= 16px and prevent zoom
      )}
      value={watch('passengers')}
      onChange={(e) => setValue('passengers', parseInt(e.target.value))}
    >
      {[0, 1, 2, 3, 4].map(i => (
        <option key={i} value={i}>
          {i < 4 ? i : '4+'}
        </option>
      ))}
    </select>
    {errors.passengers && (
      <p className="text-xs text-red-500 mt-1">Passengers required</p>
    )}
  </div>

  {/* Number of Bags */}
  <div className="flex  flex-col gap-1  w-full sm:w-1/2">
    <label className="text-base font-medium">
      Suitcases<span className="text-red-500">*</span>
    </label>
    <select
      name="bags"
      className={cn(
        'p-2 rounded-xl border text-base md:text-base placeholder:text-xs sm:placeholder:text-base',
        errors.bags ? 'border-red-500' : 'border-gray-500',
        'text-base touch-manipulation' // Ensure font-size is >= 16px and prevent zoom
      )}
      value={watch('bags')}
      onChange={(e) => setValue('bags', parseInt(e.target.value))}
    >
      {[0, 1, 2, 3, 4].map(i => (
        <option key={i} value={i}>{i}</option>
      ))}
    </select>
    {errors.bags && (
      <p className="text-xs text-red-500 mt-1">Bags required</p>
    )}
  </div>
        </div>

        {/* Airport Pickup Toggle */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="checkbox"
            checked={watch('airport_pickup')}
            onChange={(e) => setValue('airport_pickup', e.target.checked)}
            className="size-5 accent-black"
          />
          <label className="text-base font-medium">Airport Pickup?</label>
        </div>

        {/* Airport Pickup Options */}
        {watch('airport_pickup') && (
          <div className="flex flex-col gap-5 mt-5">
            {/* Flight Number */}
            <div className="flex flex-col gap-1">
              <label className="text-base font-medium">Flight Number</label>
              <input
                type="text"
                placeholder="Flight Number"
                value={watch('flight') || ''}
                onChange={(e) => setValue('flight', e.target.value)}
                className="w-full p-2 rounded-xl border border-gray-500 text-base placeholder:text-xs"
              />
              <p className="text-xs text-gray-500 mt-1">
                Don’t worry. Even if your flight is delayed, we’ll monitor your flight and arrive on time, every time.
              </p>
            </div>

            {/* Flight Track Option */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-base">Flight Track</p>
                <span className="border bg-brand font-semibold p-1 px-2 rounded-lg text-xs text-black">7£</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div
                  onClick={() => { if (!watch('payment_id')) setValue("flight_track", true) }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={cn('rounded-full border size-4 border-gray-500', watch('flight_track') ? 'bg-black' : '')}></div>
                  <p className="text-base">Yes</p>
                </div>
                <div
                  onClick={() => { if (!watch('payment_id')) setValue("flight_track", false) }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={cn('rounded-full border size-4 border-gray-500', !watch('flight_track') ? 'bg-black' : '')}></div>
                  <p className="text-base accent-black">No</p>
                </div>
              </div>
            </div>

            {/* Meet & Greet */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <p className="font-medium text-base">Meet & Greet</p>
                <span className="border bg-brand font-semibold p-1 px-2 rounded-lg text-xs text-black">15£</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div
                  onClick={() => { if (!watch('payment_id')) setValue("meet_greet", true) }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={cn('rounded-full border size-4 border-gray-500', watch('meet_greet') ? 'bg-black' : '')}></div>
                  <p className="text-base">Yes</p>
                </div>
                <div
                  onClick={() => { if (!watch('payment_id')) setValue("meet_greet", false) }}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <div className={cn('rounded-full border size-4 border-gray-500', !watch('meet_greet') ? 'bg-black' : '')}></div>
                  <p className="text-base">No</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Payment Action Buttons */}
        <div className="flex flex-col gap-4 mt-8 w-full">
          <button
            className="w-full bg-black text-white py-3 px-6 rounded-full font-bold text-center disabled:opacity-50 disabled:cursor-not-allowed"
            type="button"
            disabled={loading}
            onClick={async () => {
              const valid = await trigger(requiredFields);
              
              // Check if date and time are selected
              if (!pickupDate || !pickupTime) {
                toast({
                  variant: "destructive",
                  title: "Missing Date or Time",
                  description: "Please select both pickup date and time.",
                });
                return;
              }

              if (isReturn && (!returnDate || !returnTime)) {
                toast({
                  variant: "destructive",
                  title: "Missing Return Date or Time",
                  description: "Please select both return date and time.",
                });
                return;
              }

              if (!valid) {
                setTimeout(() => {
                  const firstErrorKey = Object.keys(form.formState.errors)[0];
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

              // Get form values and calculate total amount
              const values = form.getValues();
              const basePrice = Number(values.price) || 0;
              const flightTrackFee = values.flight_track ? 7 : 0;
              const meetGreetFee = values.meet_greet ? 15 : 0;
              const totalAmount = basePrice + flightTrackFee + meetGreetFee;

              // Prepare order data for Stripe Checkout
              const orderData = {
                ...values,
                totalAmount,
                category: category || 'trips',
              };

              try {
                // Create Stripe Checkout Session
                const response = await fetch('/api/create-checkout-session', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    amount: totalAmount,
                    orderData,
                  }),
                });

                const data = await response.json();

                if (!response.ok) {
                  throw new Error(data.error || 'Failed to create checkout session');
                }

                // Redirect to Stripe Checkout
                if (data.url) {
                  window.location.href = data.url;
                } else {
                  throw new Error('No checkout URL received');
                }
              } catch (error: any) {
                console.error('Error creating checkout session:', error);
                toast({
                  variant: "destructive",
                  title: "Payment Error",
                  description: error.message || "Failed to redirect to payment. Please try again.",
                });
              }
            }}
          >
            {loading ? "Processing..." : "PROCEED TO PAYMENT →"}
          </button>
          <button
            type="button"
            onClick={() => {
              if (step === 3) Step2();
              else if (step === 2) Step1();
            }}
            className="w-full border border-black text-black py-3 px-6 rounded-full font-bold text-center"
          >
            ← BACK TO CARS
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step3Form;
