import { create } from "zustand";

interface FieldType<T> {
  value: T;
  error: string;
  coardinates: string;
  required: boolean;
  step: number;
}

interface FormStoreType {
  step: number;
  formError: string;
  formLoading: boolean;
  formData: {
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
  };
  setFormData: (key: keyof FormStoreType["formData"], value: any) => void;
  validateData: () => boolean;
  changeStep: (isNext: boolean) => Promise<void>;
  resetForm: () => void;
}

const initialFormData: FormStoreType["formData"] = {
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

    const updatedFormData = Object.entries(formData).reduce<FormStoreType["formData"]>(
      (acc, [key, item]) => {
        if (item.step === step && item.required && !item.value) {
          acc[key as keyof FormStoreType["formData"]] = {
            ...item,
            error: `${key} is required`,
          } as any;
        } else {
          acc[key as keyof FormStoreType["formData"]] = { ...item, error: "" } as any;
        }
        return acc;
      },
      {} as FormStoreType["formData"]
    );

    set({ formData: updatedFormData });

    return Object.values(updatedFormData).some((item) => item.error);
  },

  changeStep: async (isNext: boolean) => {
    const { step, formData, validateData } = get();
    if (isNext && validateData()) return;

    if (step === 1 && formData.category.value === "trip") {
      try {
        set({ formLoading: true, formError: "" });

        // Build all coordinates dynamically
        const points = [
          formData.fromLocation.coardinates,
          formData.stop1.coardinates || undefined,
          formData.stop2.coardinates || undefined,
          formData.stop3.coardinates || undefined,
          formData.toLocation.coardinates,
        ].filter(Boolean) as string[];

        // Calculate total distance
        let totalDistanceMeters = 0;

        for (let i = 0; i < points.length - 1; i++) {
          const origin = encodeURIComponent(points[i]);
          const destination = encodeURIComponent(points[i + 1]);
          const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${apiKey}`
          );

          const data = await response.json();

          if (data.status === "OK") {
            const leg = data.routes[0].legs[0];
            totalDistanceMeters += leg.distance?.value || 0;
          } else {
            console.error("Google Maps API error:", data.status);
          }
        }

        const totalDistanceKm = Number((totalDistanceMeters / 1000).toFixed(2));

        set((state) => ({
          ...state,
          formLoading: false,
          formData: {
            ...state.formData,
            distance: { ...state.formData.distance, value: totalDistanceKm },
          },
        }));
      } catch (error) {
        set({
          formLoading: false,
          formError: error instanceof Error ? error.message : "Google Maps API error",
        });
      }
    }

    set((state) => ({
      ...state,
      step: isNext ? state.step + 1 : Math.max(1, state.step - 1),
    }));
  },

  resetForm: () => set({ formData: initialFormData, step: 1 }),
}));

export default useFormStore;
