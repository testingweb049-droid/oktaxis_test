'use client';

import { OrderDataType } from "@/actions/add-order";
import { calculateDistance } from "@/actions/get-distance";
import { fleets } from "@/components/booking/steps/CarList";
import { fleetsLocal } from "@/lib/fleet-data";
import { hourlyInitialFormData, tripInitialFormData } from "@/constants/storeInitailObjects";
import { create } from "zustand";

  export interface FieldType<T> {
  value: T;
  error: string;
  coardinates: string;
  coardinatesRequired: boolean;
  required: boolean;
  step: number;
  }

  export interface FormDataType {
  fromLocation: FieldType<string>;
  toLocation: FieldType<string>;
  stops: FieldType<string>[];        
  duration: FieldType<string>;
  distance: FieldType<number>;
  car: FieldType<string>;
  price: FieldType<string>;
  name: FieldType<string>;
  phone: FieldType<string>;
  email: FieldType<string>;
  date: FieldType<string>;
  time: FieldType<string>;
  returnDate: FieldType<string>;
  returnTime: FieldType<string>;
  passengers: FieldType<string>;
  bags: FieldType<string>;
  flightName: FieldType<string>;
  flightNumber: FieldType<string>;
  paymentId: FieldType<string>;
  isAirportPickup: FieldType<boolean>;
  isFlightTrack: FieldType<boolean>;
  isMeetGreet: FieldType<boolean>;
  isReturn: FieldType<boolean>;
  isReturnFlightTrack: FieldType<boolean>;
  isReturnMeetGreet: FieldType<boolean>;
  isExtraStops: FieldType<boolean>;
  extraStopsCount: FieldType<string>;
  isReturnExtraStops: FieldType<boolean>;
  returnExtraStopsCount: FieldType<string>;
  isAddInstructions: FieldType<boolean>;
  instructions: FieldType<string>;
  }

  interface FormStoreType {
  step: number;
  isMobileDropdownOpen: boolean;
  category: "trip" | "hourly";
  formError: string;
  orderId: string;
  isOrderDone: boolean;
  formLoading: boolean;
  formData: FormDataType;
  setFormData: (
    key: keyof FormDataType | "stops",
    value: string | boolean | number,
    coardinates?: string,
    index?: number
  ) => void;
  setFieldOptions: (
    key: keyof FormDataType | "stops",
    required:  boolean ,
   
  ) => void;
  validateData: ( _step:number) => boolean;
  changeStep: (isNext: boolean, _step:number) => Promise<boolean>;
  changeCategory: (newCategory: "trip" | "hourly") => void;
  manageStops: (action: "add" | "remove", index?: number) => void;
  toggleMobileDropdown: () => void;
  resetForm: () => void;
  }

  const makeStop = (required = false): FieldType<string> => ({
  value: "",
  coardinates: "",
  error: "",
  required,
  coardinatesRequired: required,
  step: 1,
  });



  const useFormStore = create<FormStoreType>((set, get) => ({
  step: 1,
  isMobileDropdownOpen: false,
  category: "trip",
  formError: "",
  formLoading: false,
  formData: tripInitialFormData,
  isOrderDone: false,
  orderId:'',
  setFormData: (key, value, coardinates = "", index) => {
    if (key === "stops" && typeof index === "number") {
      set((state) => {
        const stops = [...state.formData.stops];
        if (index >= 0 && index < stops.length && stops[index]) {
          stops[index] = { ...stops[index], value: value as string, coardinates, error:'' };
        }
        return { formData: { ...state.formData, stops } };
      });
      return;
    }
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: { ...state.formData[key as keyof FormDataType], value, coardinates, error:''  },
      },
    }));
  },
  setFieldOptions: (key, required) => {
    if(key==='stops') return;
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: { ...state.formData[key as keyof FormDataType], error:'', required  },
      },
    }));
  },

  validateData: (_step:number) => {
    const { formData } = get();

    // Validate all fields (including dynamic stops)
    const updated: FormDataType = { ...formData };

    // validate simple fields
    (Object.keys(formData) as (keyof FormDataType)[]).forEach((k) => {
      if (k === "stops") return;
      const item = formData[k] as FieldType<string>;
      const hasErr = item.step === _step && item.required && !item.value;
      const hasErr2 = item.step === _step && item.coardinatesRequired && !item.coardinates;
      (updated[k] as FieldType<string>) = { ...item, error: hasErr ? `${k} is required` : hasErr2 ? `${k} coordinates required` : "" };
    });

    // validate stops
    const stopsUpdated = formData.stops.map((s) => {
      const hasErr = s.step === _step && s.required && !s.value;
      const hasErr2 = s.step === _step && s.coardinatesRequired && !s.coardinates;
      return { ...s, error: hasErr ? `stop is required` : hasErr2 ? `stop coordinates required` : "" };
    });

    updated.stops = stopsUpdated;
    console.log("updated ",updated)

    set({ formData: updated  });

   
    const anyErrorField = Object.values(updated as FormDataType).some((v) => {
      if (Array.isArray(v)) {
        return v.some((s) => s.error!=='');
      }
      return v.error !== '';
    });

    return anyErrorField;
  },

  changeStep: async (isNext: boolean, _step:number) => {
    const { formData, category, validateData } = get();
    if (!isNext) {
      set((state) => ({
        ...state,
        step: isNext ? _step + 1 : Math.max(1, _step - 1),
      }));
      return true;
    }

    set((state) => ({ ...state, formError: "", formLoading: true }));

    if (validateData(_step)) {
      console.log("not validate")
      set((state) => ({ ...state, formError: "", formLoading: false }));
      return false;
    }
    
    console.log("validate")
    if (_step === 1 && category === "trip") {
      try {
        const stopsCoords = formData.stops.map((s) => s.coardinates);
        const distanceResponse = await calculateDistance({
          from: formData.fromLocation.coardinates,
          to: formData.toLocation.coardinates,
          stops: stopsCoords, 
        } as any);
        console.log("distanceResponse ",distanceResponse)
        if (distanceResponse.status !== 200) {
          set((state) => ({ ...state, formError: distanceResponse.error ?? "route not found", formLoading: false }));
          return false;
        }
        set((state) => ({
          ...state,
          formData: { ...state.formData, distance: { ...state.formData.distance, value: distanceResponse?.mileDistance ?? 0 } },
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          formError: error instanceof Error ? error.message : "route not found",
          formLoading: false,
        }));
        return false;
      }
    }

    // Order creation is now handled in checkout-success route after payment confirmation
    // No order should be created here before payment
    console.log("working fine : ",_step)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("working fine 2 : ",_step)
    set((state) => ({ ...state, formError: "", formLoading: false, step: isNext ? _step + 1 : Math.max(1, _step - 1) }));
    return true; 
  },

  changeCategory: (newCategory) => {
    const { category } = get();
    if (category === newCategory) return;
    if (newCategory === "trip") {
      set({ formData: tripInitialFormData, step: 1, category: "trip", formError: "", formLoading: false });
    } else {
      set({ formData: hourlyInitialFormData, step: 1, category: "hourly", formError: "", formLoading: false });
    }
  },

  manageStops: (action, index) => {
    const { formData } = get();
    if (action === "add") {
      set((state) => ({ ...state, formData: { ...state.formData, stops: [...state.formData.stops.slice(0,index), makeStop(true), ...state.formData.stops.slice(index,state.formData.stops.length ),] } }));
      return;
    }
    if (action === "remove" && typeof index === "number") {
      const stops = [...formData.stops];
      // Check if index is valid before removing
      if (index >= 0 && index < stops.length) {
        stops.splice(index, 1);
        set((state) => ({ ...state, formData: { ...state.formData, stops } }));
      }
    }
  },

  toggleMobileDropdown:()=>{
    set((state)=>({...state, isMobileDropdownOpen:!state.isMobileDropdownOpen}))
  },
  
  resetForm: () => set({ formData: tripInitialFormData, step: 1, category: "trip", formError: "", formLoading: false, isMobileDropdownOpen:false, isOrderDone:false, orderId:'' }),
  }));

export default useFormStore;