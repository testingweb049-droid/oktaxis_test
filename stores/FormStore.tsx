'use client';

import { createOrder } from "@/actions/add-order";
import { create } from "zustand";

interface FieldType<T> {
  value: T;
  error: string;
  coardinates: string;
  required: boolean;
  step: number;
}

interface FormDataType {
  category: FieldType<"trip" | "hourly">;
  fromLocation: FieldType<string>;
  toLocation: FieldType<string>;
  stop1: FieldType<string>;
  stop2: FieldType<string>;
  stop3: FieldType<string>;
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
  formError: string;
  formLoading: boolean;
  formData: FormDataType;
  setFormData: (key: keyof FormDataType, value: any) => void;
  validateData: () => boolean;
  changeStep: (isNext: boolean) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: FormDataType = {
  category: { value: "trip", error: "", required: true, step: 1, coardinates: "" },
  fromLocation: { value: "", coardinates: "", error: "", required: true, step: 1 },
  toLocation: { value: "", coardinates: "", error: "", required: true, step: 1 },
  stop1: { value: "", coardinates: "", error: "", required: false, step: 1 },
  stop2: { value: "", coardinates: "", error: "", required: false, step: 1 },
  stop3: { value: "", coardinates: "", error: "", required: false, step: 1 },
  duration: { value: "", error: "", required: false, step: 1, coardinates: "" },
  distance: { value: 0, error: "", required: true, step: 1, coardinates: "" },
  car: { value: "", error: "", required: true, step: 2, coardinates: "" },
  price: { value: "", error: "", required: true, step: 2, coardinates: "" },
  name: { value: "", error: "", required: true, step: 3, coardinates: "" },
  phone: { value: "", error: "", required: true, step: 3, coardinates: "" },
  email: { value: "", error: "", required: true, step: 3, coardinates: "" },
  date: { value: "", error: "", required: true, step: 3, coardinates: "" },
  time: { value: "", error: "", required: true, step: 3, coardinates: "" },
  returnDate: { value: "", error: "", required: false, step: 3, coardinates: "" },
  returnTime: { value: "", error: "", required: false, step: 3, coardinates: "" },
  passengers: { value: "", error: "", required: true, step: 3, coardinates: "" },
  bags: { value: "", error: "", required: false, step: 3, coardinates: "" },
  flightName: { value: "", error: "", required: false, step: 3, coardinates: "" },
  flightNumber: { value: "", error: "", required: false, step: 3, coardinates: "" },
  isAirportPickup: { value: false, error: "", required: false, step: 3, coardinates: "" },
  isFlightTrack: { value: false, error: "", required: false, step: 3, coardinates: "" },
  isMeetGreet: { value: false, error: "", required: false, step: 3, coardinates: "" },
  paymentId: { value: "", error: "", required: false, step: 4, coardinates: "" },
};

const useFormStore = create<FormStoreType>((set, get) => ({
  step: 1,
  formError: "",
  formLoading: false,
  formData: initialFormData,

  setFormData: (key, value) =>
    set((state) => ({
      formData: {
        ...state.formData,
        [key]: { ...state.formData[key], value },
      },
    })),

  validateData: () => {
    const { step, formData } = get();

    const updatedFormData = Object.entries(formData).reduce<FormDataType>(
      (acc, [key, item]) => {
        const hasError = item.step === step && item.required && !item.value;
        acc[key as keyof FormDataType] = {
          ...item,
          error: hasError ? `${key} is required` : "",
        } as any;
        return acc;
      },
      {} as FormDataType
    );

    set({ formData: updatedFormData });
    return Object.values(updatedFormData).some((item) => item.error);
  },

  changeStep: async (isNext: boolean) => {
    const { step, formData, validateData } = get();
    if (isNext && validateData()) return;

    if (step === 1 && formData.category.value === "trip") {
      // Calculate distance logic (unchanged)
      return;
    }

    if (step > 1 && step < 4) {
      set((state) => ({
        ...state,
        step: isNext ? state.step + 1 : Math.max(1, state.step - 1),
      }));
      return;
    }

    if (step === 4) {
      // ✅ Create plain object from formData
      const orderData = Object.entries(formData).reduce<Record<string, any>>(
        (acc, [key, item]) => {
          acc[key] = item.value;
          return acc;
        },
        {}
      );

      set({ formLoading: true, formError: "" });

      try {
        const response = await createOrder(orderData);
        if (response.status !== 201) {
          set({ formError: response.error, formLoading: false });
          return;
        }
        set({ formError: "", formLoading: false });
      } catch (error) {
        set({
          formError: error instanceof Error ? error.message : "Failed to place order",
          formLoading: false,
        });
      }
    }
  },

  resetForm: () => set({ formData: initialFormData, step: 1 }),
}));

export default useFormStore;
