'use client';

import { calculateDistance } from "@/hooks/useDistance";
import { hourlyInitialFormData, tripInitialFormData } from "@/constants/store-initial-objects";
import { create } from "zustand";
import { validateDistance, validateDuration, validateCoordinates } from "@/lib/utils/validation";

  export interface FieldType<T> {
  value: T;
  error: string;
  coordinates: string;
  coordinatesRequired: boolean;
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
    coordinates?: string,
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
  coordinates: "",
  error: "",
  required,
  coordinatesRequired: required,
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
  setFormData: (key, value, coordinates = "", index) => {
    if (key === "stops" && typeof index === "number") {
      set((state) => {
        const stops = [...state.formData.stops];
        if (index >= 0 && index < stops.length && stops[index]) {
          stops[index] = { ...stops[index], value: value as string, coordinates, error: '' };
        }
        return { formData: { ...state.formData, stops } };
      });
      return;
    }
    
    // Type-safe update for non-stop fields
    set((state) => {
      const currentField = state.formData[key as keyof FormDataType];
      if (currentField && !Array.isArray(currentField)) {
        return {
          formData: {
            ...state.formData,
            [key]: { ...currentField, value, coordinates, error: '' },
          },
        };
      }
      return state;
    });
  },
  setFieldOptions: (key, required) => {
    if (key === 'stops') return;
    
    set((state) => {
      const currentField = state.formData[key as keyof FormDataType];
      if (currentField && !Array.isArray(currentField)) {
        return {
          formData: {
            ...state.formData,
            [key]: { ...currentField, error: '', required },
          },
        };
      }
      return state;
    });
  },

  validateData: (_step:number) => {
    const { formData, category } = get();

    // Validate all fields (including dynamic stops)
    const updated: FormDataType = { ...formData };

    // validate simple fields
    (Object.keys(formData) as (keyof FormDataType)[]).forEach((k) => {
      if (k === "stops") return;
      const item = formData[k] as FieldType<string | number | boolean>;
      
      if (item.step === _step) {
        let error = "";
        
        // Check required field
        if (item.required) {
          if (k === "distance") {
            const distanceValidation = validateDistance(item.value as number);
            if (!distanceValidation.isValid) {
              error = distanceValidation.error || "Distance is required";
            }
          } else if (k === "duration" && category === "hourly") {
            const durationValidation = validateDuration(item.value as string);
            if (!durationValidation.isValid) {
              error = durationValidation.error || "Duration is required";
            }
          } else if (typeof item.value === "string" && !item.value.trim()) {
            error = `${k} is required`;
          } else if (typeof item.value === "number" && (isNaN(item.value) || item.value < 0)) {
            error = `${k} must be a valid positive number`;
          }
        }
        
        // Check coordinates if required
        if (!error && item.coordinatesRequired) {
          const coordValidation = validateCoordinates(item.coordinates);
          if (!coordValidation.isValid) {
            error = coordValidation.error || `${k} coordinates required`;
          }
        }
        
        (updated[k] as FieldType<string | number | boolean>) = { ...item, error };
      }
    });

    // validate stops
    const stopsUpdated = formData.stops.map((s) => {
      if (s.step === _step) {
        let error = "";
        
        if (s.required && !s.value.trim()) {
          error = "Stop is required";
        } else if (s.coordinatesRequired) {
          const coordValidation = validateCoordinates(s.coordinates);
          if (!coordValidation.isValid) {
            error = coordValidation.error || "Stop coordinates required";
          }
        }
        
        return { ...s, error };
      }
      return s;
    });

    updated.stops = stopsUpdated;

    set({ formData: updated  });

    // Check if there are any errors
    const anyErrorField = Object.values(updated as FormDataType).some((v) => {
      if (Array.isArray(v)) {
        return v.some((s) => s.error !== '');
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
      set((state) => ({ ...state, formError: "", formLoading: false }));
      return false;
    }
    
    if (_step === 1 && category === "trip") {
      try {
        // Validate coordinates before calculating distance
        const fromCoordsValidation = validateCoordinates(formData.fromLocation.coordinates);
        const toCoordsValidation = validateCoordinates(formData.toLocation.coordinates);
        
        if (!fromCoordsValidation.isValid || !toCoordsValidation.isValid) {
          set((state) => ({ 
            ...state, 
            formError: "Please select valid pickup and drop-off locations", 
            formLoading: false 
          }));
          return false;
        }
        
        const stopsCoords = formData.stops
          .map((s) => s.coordinates)
          .filter((coord) => {
            const validation = validateCoordinates(coord);
            return validation.isValid;
          });
        
        const distanceResponse = await calculateDistance({
          from: formData.fromLocation.coordinates,
          to: formData.toLocation.coordinates,
          stops: stopsCoords, 
        });
        
        if (distanceResponse.status !== 200) {
          set((state) => ({ 
            ...state, 
            formError: distanceResponse.error ?? "Unable to calculate route. Please check your locations.", 
            formLoading: false 
          }));
          return false;
        }
        
        const mileDistance = distanceResponse.mileDistance ?? 0;
        const distanceValidation = validateDistance(mileDistance);
        
        if (!distanceValidation.isValid) {
          set((state) => ({ 
            ...state, 
            formError: distanceValidation.error ?? "Invalid distance calculated", 
            formLoading: false 
          }));
          return false;
        }
        
        set((state) => ({
          ...state,
          formData: { 
            ...state.formData, 
            distance: { ...state.formData.distance, value: mileDistance } 
          },
        }));
      } catch (error) {
        set((state) => ({
          ...state,
          formError: error instanceof Error 
            ? `Failed to calculate distance: ${error.message}` 
            : "Unable to calculate route. Please try again.",
          formLoading: false,
        }));
        return false;
      }
    }

    // Order creation is now handled in checkout-success route after payment confirmation
    // No order should be created here before payment
    await new Promise((resolve) => setTimeout(resolve, 1500));
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
      const insertIndex = typeof index === "number" && index >= 0 ? index : formData.stops.length;
      set((state) => ({
        ...state,
        formData: {
          ...state.formData,
          stops: [
            ...state.formData.stops.slice(0, insertIndex),
            makeStop(true),
            ...state.formData.stops.slice(insertIndex),
          ],
        },
      }));
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

  toggleMobileDropdown: () => {
    set((state) => ({ ...state, isMobileDropdownOpen: !state.isMobileDropdownOpen }));
  },
  
  resetForm: () => {
    set({
      formData: tripInitialFormData,
      step: 1,
      category: "trip",
      formError: "",
      formLoading: false,
      isMobileDropdownOpen: false,
      isOrderDone: false,
      orderId: '',
    });
  },
  }));

export default useFormStore;