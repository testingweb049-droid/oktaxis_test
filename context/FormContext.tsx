'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, ReactNode, useEffect, useState, useTransition } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { hourlyFormValidation, simpleFormValidation } from "@/types/FormInterfaces";
import { calculateDistance } from "@/actions/get-distance";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { createOrder } from "@/actions/add-order";

export type tripMethodType = 'hourly' | 'trips'

export const CombinedSchema = z.union([hourlyFormValidation, simpleFormValidation]);
export type FormDataType = z.infer<typeof CombinedSchema>;

interface CreateFormType {
  form: UseFormReturn<FormDataType>;
  category: tripMethodType;
  resetForm: () => void;
  setCategory: (category: tripMethodType) => void;
  loading: boolean,
  NextStep: () => void,
  Step1: () => void,
  Step2: () => void,
  step: number,
  error: string
}

export const FormContext = createContext<CreateFormType | null>(null);

export function CustomFormProvider({ children }: { children: ReactNode }) {
  const [category, setCategory] = useState<tripMethodType>('trips');
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
      payment_method: 'cod',
      duration:0
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
    const { bags, dropoff_location, payment_id, email, payment_method, flight, duration, kids,  name, passengers, phone, pickup_time, pickup_date, pickup_location, price, car, distance , flight_track, meet_greet  } = form.getValues();
    const _pickup_time = `${pickup_time.hour.toString()} : ${pickup_time.minute.toString()} : ${pickup_time.period.toString()} `
    const _price = Number(price) + (flight_track ? 7 : 0) + (meet_greet ? 15: 0)  ;
    startLoading(async () => {
      const response = await createOrder({
        bags, dropoff_location, email, payment_id: payment_id ?? 'N/A', flight: flight ?? 'N/A', duration, kids,  name, passengers, phone, pickup_time: _pickup_time, pickup_date, pickup_location,payment_method,
        price,
        car,
        distance:Number(distance),
        category: category ?? 'n/a',
        flight_track,
        meet_greet

      });

      console.log('response : ', response)
      if (response.status === 201) {
        router.push("/order-placed"); 
        return;
      }
      setError(response.error)
    })
  }

  function NextStep() {
    setError('')
    startLoading(async () => {

      if (step === 1) {
        const from = getValues('pickup_location_lag_alt')
        const to = getValues('dropoff_location_lag_alt')
        console.log("from ", from)
        console.log("to ", to)
        if (category === 'trips') {
          if (!from || !to) {
            await trigger(['pickup_date', 'pickup_time', 'dropoff_location', 'pickup_location', 'distance', 'dropoff_location_lag_alt', 'pickup_location_lag_alt'])
            toast({
              variant: "destructive",
              title: "From and To not Found",
              description: "please reselect your locations",
            })
            return;
          };
          const res = await calculateDistance({ from, to })
          if (res.status !== 200) {
            await trigger(['pickup_date', 'pickup_time', 'dropoff_location', 'pickup_location', 'distance', 'dropoff_location_lag_alt', 'pickup_location_lag_alt'])
            toast({
              variant: "destructive",
              title: "Route not found",
              description: "please select nearly places",
            })
            return;
          }
          if (res.distance) {
            setValue('distance', res.distance.toString())
          }
        }

        console.log("distance : ", form.getValues('distance'))

        const output = await trigger(category === 'hourly' ? ['pickup_date', 'pickup_time', 'pickup_location', 'duration',] : ['pickup_date', 'pickup_time', 'dropoff_location', 'pickup_location', 'distance', 'dropoff_location_lag_alt', 'pickup_location_lag_alt'])
        console.log("output : ", form.formState.errors)
        if (!output) {
          toast({
            variant:"destructive",
            title: "Validationos Error",
            description: "please complete all required fields",
          })
          return;
        }
        
        setStep(2);
        router.push('/booking')
      }
      if (step === 2) {
        const output = await trigger(['car', 'price'])
        console.log("output : ", output)
        if (!output) {
          toast({
            variant:"destructive",
            title: "Validationos Error",
            description: "please complete all required fields",
          })
          return;
        }
        setStep(3);
      }
      if(step === 3){
        const output = await trigger()
        if (!output) {
          toast({
            variant:"destructive",
            title: "Validationos Error",
            description: "please complete all required fields",
          })
          return;
        }

        if(form.watch('payment_method') === 'cod'){
          onSubmit();
          return;
        }

        if(!form.watch('payment_id')){
          toast({
            variant:"destructive",
            title: "Payment not done",
            description: "please pay your amount",
          })
          return;
        }
        onSubmit();

      }
    })
  }


  

  function Step1() {
    if (step === 1) return;
    setStep(1)
  }
  function Step2() {
    if (step !== 3) return;
    setStep(2)
  }

  return (
    <FormContext.Provider value={{ form, category, setCategory, resetForm, loading, NextStep,  error, step, Step1, Step2 }}>
      {children}
    </FormContext.Provider>
  );
}
