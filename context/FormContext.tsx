'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState, useTransition } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { hourlyFormValidation, simpleFormValidation } from "@/types/FormInterfaces";
import { calculateDistance } from "@/actions/get-distance";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/actions/add-order";
import { useOrderContext } from '@/context/OrderContext'
import { OrderProps } from "@/types/OrderProps";
export type tripMethodType = 'hourly' | 'trips'

export const CombinedSchema = z.union([hourlyFormValidation, simpleFormValidation]);
export type FormDataType = z.infer<typeof CombinedSchema>;
function formatTime12(hour: number, minute: number): string {
  const amPm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = ((hour + 11) % 12) + 1; // converts 0-23 to 1-12
  const minuteStr = minute.toString().padStart(2, '0');
  return `${hour12}:${minuteStr} ${amPm}`;
}

interface CreateFormType {
  form: UseFormReturn<FormDataType>;
  order: OrderProps | null;
  resetOrder: (link:string)=>void;
  category: tripMethodType;
  resetForm: () => void;
  setCategory: (category: tripMethodType) => void;
  loading: boolean,
  NextStep: () => void,
  Step1: () => void,
  Step2: () => void,
  Step3: () => void,
  step: number,
  error: string,
  startLoading: (fn: () => void) => void;

}

export const FormContext = createContext<CreateFormType | null>(null);

export function CustomFormProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<tripMethodType>('trips');
  const [order, setOrder] = useState<OrderProps | null>(null);
  
  const [step, setStep] = useState(1)
  const [loading, startLoading] = useTransition()
  const router = useRouter()

  const [error, setError] = useState('')
  const { toast } = useToast()


  const form = useForm<FormDataType>({
    resolver: zodResolver(
      category === 'hourly' ? hourlyFormValidation : simpleFormValidation
    ),
    defaultValues: {
      passengers: 1,
      kids: 0,
      bags: 0,
      payment_method: 'online',
      duration: 0,

    }
  });

  const { trigger, getValues, setValue } = form;

  function resetForm() {
    form.reset();
    // setCategory('trips')
  }

  console.log("errors : ", form.formState.errors)



  function onSubmit() {
    console.log('submitt')
    const {
      bags, dropoff_location, payment_id, email, payment_method, flight, duration, kids,
      name, passengers, phone, pickup_time, pickup_date, pickup_location, price, car, distance,
      flight_track, meet_greet, is_return, return_date, return_time,
    } = form.getValues();

    // Safeguard for pickup_time and return_time
    const _pickup_time = pickup_time
      ? formatTime12(pickup_time.hour, pickup_time.minute)
      : "";

    const _return_time = return_time
      ? formatTime12(return_time.hour, return_time.minute)
      : null;


    // Safeguard for pickup_date: show error and return if not set
    if (!pickup_date || !(pickup_date instanceof Date)) {
      toast({
        variant: "destructive",
        title: "Missing Pickup Date",
        description: "Please select a pickup date.",
      });
      return;
    }

    const _price = Number(price) + (flight_track ? 7 : 0) + (meet_greet ? 15 : 0);
    startLoading(async () => {
      const response = await createOrder({
        bags,
        dropoff_location,
        email,
        payment_id: payment_id ?? 'N/A',
        flight: flight ?? 'N/A',
        duration,
        kids,
        name,
        passengers,
        phone,
        pickup_time: _pickup_time,
        pickup_date, // now always a Date
        pickup_location,
        payment_method,
        price: _price,
        car,
        distance: Number(distance),
        category: category ?? 'n/a',
        flight_track,
        meet_greet,
        return_date,
        return_time: _return_time,
        is_return
      });
      localStorage.setItem("orderData", JSON.stringify({
        bags,
        dropoff_location,
        email,
        payment_id: payment_id ?? 'N/A',
        flight: flight ?? 'N/A',
        duration,
        kids,
        name,
        passengers,
        phone,
        pickup_time: _pickup_time,
        pickup_date,
        pickup_location,
        payment_method,
        price: _price,
        car,
        distance: Number(distance),
        category: category ?? 'n/a',
        flight_track,
        meet_greet,
        return_date,
        return_time: _return_time,
        is_return,

      }));

      console.log('response : ', response)
      if (response.status === 201 && response.order?.[0]) {
        setOrder(response.order[0]) // Cast response to OrderProps if needed
        resetForm();
        router.push('/order-placed') // no query param required
      }

      setError(response.error)
    })
  }
  function NextStep() {
    setError('');
    startLoading(async () => {
      if (step === 1) {
        const from = getValues('pickup_location_lag_alt');
        const to = getValues('dropoff_location_lag_alt');

        if (category === 'trips') {
          if (!from || !to) {
            await trigger([
              'pickup_date', 'pickup_time',
              'dropoff_location', 'pickup_location',
              'distance', 'dropoff_location_lag_alt', 'pickup_location_lag_alt'
            ]);
            toast({
              variant: "destructive",
              title: "From and To not Found",
              description: "Please reselect your locations",
            });
            return;
          }

          const res = await calculateDistance({ from, to });
          if (res.status !== 200) {
            toast({
              variant: "destructive",
              title: "Route not found",
              description: "Please select nearby places",
            });
            return;
          }

          if (res.distance) {
            setValue('distance', res.distance.toString());
          }
        }

        const output = await trigger(category === 'trips'
          ? ['pickup_date', 'pickup_time', 'dropoff_location', 'pickup_location', 'distance', 'dropoff_location_lag_alt', 'pickup_location_lag_alt']
          : ['pickup_date', 'pickup_time', 'pickup_location', 'duration']
        );

        if (!output) {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please complete all required fields.",
          });
          return;
        }

        setStep(2);
        router.push('/booking#back-button');
      }

      else if (step === 2) {
        const output = await trigger(['car', 'price']);
        if (!output) {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please complete all required fields.",
          });
          return;
        }
        setStep(3);
        router.push('/booking#back-button');
      }

      else if (step === 3) {
        const output = await trigger([
          'name', 'email', 'phone', 'pickup_date', 'pickup_time', 'passengers', 'bags'
        ]);
        if (!output) {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please complete all required fields.",
          });
          return;
        }
        setStep(4);
        router.push('/booking#back-button');
      }

      else if (step === 4) {
        const output = await trigger();
        if (!output) {
          toast({
            variant: "destructive",
            title: "Validation Error",
            description: "Please complete all required fields.",
          });
          return;
        }

        // ✅ THIS is now only called on step 4
        if (form.watch('payment_method') === 'cod') {
          onSubmit();
          return;
        }

        if (!form.watch('payment_id')) {
          toast({
            variant: "destructive",
            title: "Payment not done",
            description: "Please pay your amount.",
          });
          return;
        }

        console.log("submit work");
        onSubmit();
      }
    });
  }



  function Step1() {
    if (step === 1) return;
    setStep(1)
  }
  function Step2() {
    if (step !== 3) return;
    setStep(2);
    router.push('/booking#back-button');

  }
  function Step3() {
    if (step !== 4) return;
    setStep(3);
    router.push('/booking#back-button');
  }
 
  function resetOrder(link:string){
    setOrder(null)
    router.push('/booking#back-button');

  }

  return (
    <FormContext.Provider value={{ form, category, setCategory, resetForm, loading, NextStep,startLoading, error, step, Step1, Step2, Step3, order, resetOrder }}>
      {children}
    </FormContext.Provider>
  );
}
