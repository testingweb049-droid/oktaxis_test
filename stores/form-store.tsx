'use client';

import { calculateDistance } from "@/hooks/useDistance";
import { hourlyInitialFormData, tripInitialFormData } from "@/constants/store-initial-objects";
import { create } from "zustand";
import { validateDistance, validateCoordinates } from "@/lib/utils/validation";
import { validateBookingTime } from "@/lib/utils";
import { 
  step1TripValidationSchema, 
  step1HourlyValidationSchema,
  step3ValidationSchema 
} from "@/types/form-interfaces";

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
    required: boolean,
  ) => void;
  validateData: (_step: number, pricingData?: { minimumBookingHours?: number; timezone?: string }) => { hasErrors: boolean; errorMessage?: string; errorType?: 'time_validation' | 'form_validation' };
  changeStep: (isNext: boolean, _step: number, pricingData?: { minimumBookingHours?: number; timezone?: string }) => Promise<boolean | { success: false; errorMessage?: string; errorType?: 'time_validation' | 'form_validation' }>;
  changeCategory: (newCategory: "trip" | "hourly") => void;
  cleanupCategoryData: (category: "trip" | "hourly") => void;
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

/**
 * Clean up category-specific data when switching categories
 * - Trip → Hourly: clear toLocation, stops, distance
 * - Hourly → Trip: clear duration
 */
const cleanupCategoryDataHelper = (category: "trip" | "hourly", currentFormData: FormDataType): FormDataType => {
  const cleaned = { ...currentFormData };

  if (category === "hourly") {
    // Clear trip-specific fields
    cleaned.toLocation = { ...cleaned.toLocation, value: "", coordinates: "", error: "" };
    cleaned.stops = [];
    cleaned.distance = { ...cleaned.distance, value: 0, error: "" };
  } else {
    // Clear hourly-specific fields
    cleaned.duration = { ...cleaned.duration, value: "", error: "" };
  }

  return cleaned;
};

const useFormStore = create<FormStoreType>((set, get) => ({
  step: 1,
  isMobileDropdownOpen: false,
  category: "trip",
  formError: "",
  formLoading: false,
  formData: tripInitialFormData,
  isOrderDone: false,
  orderId: '',
  
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

  /**
   * Validate form data using Zod schemas based on step and category
   * Returns object with hasErrors boolean and optional error message/type
   */
  validateData: (_step: number, pricingData?: { minimumBookingHours?: number; timezone?: string }) => {
    const { formData, category } = get();
    const updated: FormDataType = { ...formData };
    let hasErrors = false;
    let errorMessage: string | undefined;
    let errorType: 'time_validation' | 'form_validation' | undefined;

    // Step 1 validation using Zod
    if (_step === 1) {
      const validationData = {
        category,
        date: formData.date.value,
        time: formData.time.value,
        fromLocation: formData.fromLocation.value,
        toLocation: formData.toLocation.value,
        duration: formData.duration.value,
        passengers: formData.passengers.value,
        bags: formData.bags.value,
      };

      const schema = category === "trip" ? step1TripValidationSchema : step1HourlyValidationSchema;
      const result = schema.safeParse(validationData);

      if (!result.success) {
        hasErrors = true;
        // Map Zod errors to form fields
        const fieldMap: Record<string, keyof FormDataType> = {
          'date': 'date',
          'time': 'time',
          'fromLocation': 'fromLocation',
          'toLocation': 'toLocation',
          'duration': 'duration',
          'passengers': 'passengers',
          'bags': 'bags',
        };

        result.error.errors.forEach((error) => {
          const fieldPath = error.path[0] ? String(error.path[0]) : '';
          const fieldKey = fieldMap[fieldPath];
          if (fieldKey && updated[fieldKey] && !Array.isArray(updated[fieldKey])) {
            const currentField = updated[fieldKey] as FieldType<string | number | boolean>;
            (updated[fieldKey] as FieldType<string | number | boolean>) = {
              ...currentField,
              error: error.message,
            };
          }
        });
      }

      // Validate minimum booking hours from backend (business rule validation)
      if (formData.date.value && formData.time.value && pricingData?.minimumBookingHours && pricingData.minimumBookingHours > 0) {
        const timezone = pricingData.timezone || "America/New_York"
        const timeValidation = validateBookingTime(
          formData.date.value,
          formData.time.value,
          pricingData.minimumBookingHours,
          timezone
        )

        if (!timeValidation.isValid) {
          hasErrors = true
          errorType = 'time_validation'
          errorMessage = timeValidation.error || `Booking can't be added within ${pricingData.minimumBookingHours} hours of pickup time, choose another time.`
          // Don't set field errors - only show toast notification
        }
      }

      // Validate coordinates for location fields (not in Zod schema)
      const locationFields = category === "trip" 
        ? ['fromLocation', 'toLocation'] as const
        : ['fromLocation'] as const;

      for (const fieldKey of locationFields) {
        const field = updated[fieldKey];
        if (field && field.coordinatesRequired && !field.error) {
          const coordValidation = validateCoordinates(field.coordinates);
          if (!coordValidation.isValid) {
            hasErrors = true;
            (updated[fieldKey] as FieldType<string>) = {
              ...field,
              error: coordValidation.error || `${fieldKey} coordinates required`,
            };
          }
        }
      }
    }

    // Step 3 validation using Zod
    if (_step === 3) {
      const validationData = {
        name: formData.name.value,
        email: formData.email.value,
        phone: formData.phone.value,
        isReturn: formData.isReturn?.value || false,
        returnDate: formData.returnDate?.value || '',
        returnTime: formData.returnTime?.value || '',
        isAirportPickup: formData.isAirportPickup?.value || false,
        flightName: formData.flightName?.value || '',
        flightNumber: formData.flightNumber?.value || '',
        isFlightTrack: formData.isFlightTrack?.value || false,
        isMeetGreet: formData.isMeetGreet?.value || false,
        extraStopsCount: formData.extraStopsCount?.value || '0',
        isReturnFlightTrack: formData.isReturnFlightTrack?.value || false,
        isReturnMeetGreet: formData.isReturnMeetGreet?.value || false,
        returnExtraStopsCount: formData.returnExtraStopsCount?.value || '0',
        isAddInstructions: formData.isAddInstructions?.value || false,
        instructions: formData.instructions?.value || '',
      };

      const result = step3ValidationSchema.safeParse(validationData);

      if (!result.success) {
        hasErrors = true;
        // Map Zod errors to form fields
        const fieldMap: Record<string, keyof FormDataType> = {
          'name': 'name',
          'email': 'email',
          'phone': 'phone',
          'returnDate': 'returnDate',
          'returnTime': 'returnTime',
        };

        result.error.errors.forEach((error) => {
          const fieldPath = error.path[0] ? String(error.path[0]) : '';
          const fieldKey = fieldMap[fieldPath];
          if (fieldKey && updated[fieldKey] && !Array.isArray(updated[fieldKey])) {
            const currentField = updated[fieldKey] as FieldType<string | number | boolean>;
            (updated[fieldKey] as FieldType<string | number | boolean>) = {
              ...currentField,
              error: error.message,
            };
          }
        });
      }
    }

    // Validate stops (coordinates validation)
    if (_step === 1 && category === "trip") {
      const stopsUpdated = formData.stops.map((s) => {
        let error = "";
        
        if (s.required && !s.value.trim()) {
          error = "Stop is required";
          hasErrors = true;
        } else if (s.coordinatesRequired) {
          const coordValidation = validateCoordinates(s.coordinates);
          if (!coordValidation.isValid) {
            error = coordValidation.error || "Stop coordinates required";
            hasErrors = true;
          }
        }
        
        return { ...s, error };
      });
      updated.stops = stopsUpdated;
    }

    set({ formData: updated });
    return { hasErrors, errorMessage, errorType };
  },

  changeStep: async (isNext: boolean, _step: number, pricingData?: { minimumBookingHours?: number; timezone?: string }) => {
    const { formData, category, validateData } = get();
    if (!isNext) {
      set((state) => ({
        ...state,
        step: isNext ? _step + 1 : Math.max(1, _step - 1),
      }));
      return true;
    }

    set((state) => ({ ...state, formError: "", formLoading: true }));

    const validationResult = validateData(_step, pricingData);
    if (validationResult.hasErrors) {
      // Don't set formError for time validation - only show toast
      const shouldSetFormError = validationResult.errorType !== 'time_validation';
      set((state) => ({ ...state, formError: shouldSetFormError ? (validationResult.errorMessage || "") : "", formLoading: false }));
      return { success: false, errorMessage: validationResult.errorMessage, errorType: validationResult.errorType } as any;
    }
    
    // For trip category, calculate distance on step 1
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

  /**
   * Clean up category-specific data
   */
  cleanupCategoryData: (category) => {
    const { formData } = get();
    const cleaned = cleanupCategoryDataHelper(category, formData);
    set({ formData: cleaned });
  },

  /**
   * Change category and clean up irrelevant data
   */
  changeCategory: (newCategory) => {
    const { category } = get();
    if (category === newCategory) return;
    
    // Get initial data for new category
    const initialData = newCategory === "trip" ? tripInitialFormData : hourlyInitialFormData;
    
    // Clean up category-specific data from current form before switching
    const cleaned = cleanupCategoryDataHelper(newCategory, initialData);
    
    set({ 
      formData: cleaned, 
      step: 1, 
      category: newCategory, 
      formError: "", 
      formLoading: false 
    });
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
