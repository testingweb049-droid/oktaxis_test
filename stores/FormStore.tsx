'use client';

import { createOrder } from "@/actions/add-order";
import { calculateDistance } from "@/actions/get-distance";
import { create } from "zustand";

interface FieldType<T> {
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
  stops: FieldType<string>[];        // <- dynamic stops array
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
}

interface FormStoreType {
  step: number;
  category: "trip" | "hourly";
  formError: string;
  formLoading: boolean;
  formData: FormDataType;
  setFormData: (
    key: keyof FormDataType | "stops",
    value: string | boolean | number,
    coardinates?: string,
    index?: number
  ) => void;
  validateData: () => boolean;
  changeStep: (isNext: boolean) => Promise<boolean>;
  changeCategory: (newCategory: "trip" | "hourly") => void;
  manageStops: (action: "add" | "remove", index?: number) => void;
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

const tripInitialFormData: FormDataType = {
  fromLocation: {
    value: "",
    coardinates: "",
    error: "",
    required: true,
    coardinatesRequired: true,
    step: 1,
  },
  toLocation: {
    value: "",
    coardinates: "",
    error: "",
    required: true,
    step: 1,
    coardinatesRequired: true,
  },
  stops: [], 
  duration: {
    value: "",
    error: "",
    required: false,
    step: 1,
    coardinates: "",
    coardinatesRequired: false,
  },
  distance: {
    value: 0,
    error: "",
    required: true,
    step: 2,
    coardinates: "",
    coardinatesRequired: false,
  },
  car: { value: "", error: "", required: true, step: 2, coardinates: "", coardinatesRequired: false },
  price: { value: "", error: "", required: true, step: 2, coardinates: "", coardinatesRequired: false },
  name: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  phone: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  email: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  date: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  time: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  returnDate: { value: "", error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  returnTime: { value: "", error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  passengers: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  bags: { value: "", error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  flightName: { value: "", error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  flightNumber: { value: "", error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  isAirportPickup: { value: false, error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  isFlightTrack: { value: false, error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  isMeetGreet: { value: false, error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  paymentId: { value: "", error: "", required: false, step: 4, coardinates: "", coardinatesRequired: false },
};

const hourlyInitialFormData: FormDataType = {
  fromLocation: {
    value: "",
    coardinates: "",
    error: "",
    required: true,
    coardinatesRequired: true,
    step: 1,
  },
  toLocation: {
    value: "",
    coardinates: "",
    error: "",
    required: false,
    step: 1,
    coardinatesRequired: false,
  },
  stops: [], // keep dynamic
  duration: {
    value: "",
    error: "",
    required: true,
    step: 1,
    coardinates: "",
    coardinatesRequired: false,
  },
  distance: {
    value: 0,
    error: "",
    required: false,
    step: 2,
    coardinates: "",
    coardinatesRequired: false,
  },
  car: { value: "", error: "", required: true, step: 2, coardinates: "", coardinatesRequired: false },
  price: { value: "", error: "", required: true, step: 2, coardinates: "", coardinatesRequired: false },
  name: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  phone: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  email: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  date: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  time: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  returnDate: { value: "", error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  returnTime: { value: "", error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  passengers: { value: "", error: "", required: true, step: 3, coardinates: "", coardinatesRequired: false },
  bags: { value: "", error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  flightName: { value: "", error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  flightNumber: { value: "", error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  isAirportPickup: { value: false, error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  isFlightTrack: { value: false, error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  isMeetGreet: { value: false, error: "", required: false, step: 3, coardinates: "", coardinatesRequired: false },
  paymentId: { value: "", error: "", required: false, step: 4, coardinates: "", coardinatesRequired: false },
};

const useFormStore = create<FormStoreType>((set, get) => ({
  step: 1,
  category: "trip",
  formError: "",
  formLoading: false,
  formData: tripInitialFormData,

  setFormData: (key, value, coardinates = "", index) => {
    if (key === "stops" && typeof index === "number") {
      set((state) => {
        const stops = [...state.formData.stops];
        stops[index] = { ...stops[index], value: value as string, coardinates, error:'' };
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

  validateData: () => {
    const { step, formData } = get();

    // Validate all fields (including dynamic stops)
    const updated: FormDataType = { ...formData };

    // validate simple fields
    (Object.keys(formData) as (keyof FormDataType)[]).forEach((k) => {
      if (k === "stops") return;
      const item = formData[k] as FieldType<string>;
      const hasErr = item.step === step && item.required && !item.value;
      const hasErr2 = item.step === step && item.coardinatesRequired && !item.coardinates;
      (updated[k] as FieldType<string>) = { ...item, error: hasErr ? `${k} is required` : hasErr2 ? `${k} coordinates required` : "" };
    });

    // validate stops
    const stopsUpdated = formData.stops.map((s) => {
      const hasErr = s.step === step && s.required && !s.value;
      const hasErr2 = s.step === step && s.coardinatesRequired && !s.coardinates;
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

  changeStep: async (isNext: boolean) => {
    const { step, formData, category, validateData } = get();
    if (!isNext) {
      set((state) => ({
        ...state,
        step: isNext ? state.step + 1 : Math.max(1, state.step - 1),
      }));
      return true;
    }

    set((state) => ({ ...state, formError: "", formLoading: true }));

    if (validateData()) {
      console.log("not validate")
      set((state) => ({ ...state, formError: "", formLoading: false }));
      return false;
    }
    
    console.log("validate")
    if (step === 1 && category === "trip") {
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
          formData: { ...state.formData, distance: { ...state.formData.distance, value: distanceResponse?.kmDistance ?? 0 } },
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

    if (step === 4) {
      const orderData = Object.entries(formData).reduce<Record<string, any>>((acc, [key, item]) => {
        if (key === "stops") {
          acc.stops = formData.stops.map((s) => ({ value: s.value, coardinates: s.coardinates }));
        } else {
          acc[key] = (item as FieldType<any>).value;
        }
        return acc;
      }, {});

      try {
        const response = await createOrder(orderData);
        if (response.status !== 201) {
          set({ formError: response.error, formLoading: false });
          return false;
        }
        set({ formError: "", formLoading: false });
      } catch (error) {
        set({ formError: error instanceof Error ? error.message : "Failed to place order", formLoading: false });
        return false;
      }
    }

    set((state) => ({ ...state, formError: "", formLoading: false, step: isNext ? state.step + 1 : Math.max(1, state.step - 1) }));
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
      // always add at the end (logic wise); UI will show + between items but we append
      set((state) => ({ ...state, formData: { ...state.formData, stops: [...state.formData.stops.slice(0,index), makeStop(true), ...state.formData.stops.slice(index,state.formData.stops.length ),] } }));
      return;
    }
    if (action === "remove" && typeof index === "number") {
      const stops = [...formData.stops];
      stops.splice(index, 1);
      set((state) => ({ ...state, formData: { ...state.formData, stops } }));
    }
  },

  resetForm: () => set({ formData: tripInitialFormData, step: 1, category: "trip", formError: "", formLoading: false }),
}));

export default useFormStore;
