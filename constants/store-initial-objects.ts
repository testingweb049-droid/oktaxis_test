import { FormDataType } from "@/stores/form-store"


const commonFormDataFields = {
  fromLocation: {
    value: "",
    coordinates: "",
    error: "",
    required: true,
    coordinatesRequired: true,
    step: 1,
  },
  toLocation: {
    value: "",
    coordinates: "",
    error: "",
    required: true,
    step: 1,
    coordinatesRequired: true,
  },
  stops: [],
  duration: {
    value: "",
    error: "",
    required: false,
    step: 1,
    coordinates: "",
    coordinatesRequired: false,
  },
  distance: {
    value: 0,
    error: "",
    required: true,
    step: 2,
    coordinates: "",
    coordinatesRequired: false,
  },
  car: { value: "", error: "", required: true, step: 2, coordinates: "", coordinatesRequired: false },
  price: { value: "0", error: "", required: true, step: 2, coordinates: "", coordinatesRequired: false },
  name: { value: "", error: "", required: true, step: 3, coordinates: "", coordinatesRequired: false },
  phone: { value: "", error: "", required: true, step: 3, coordinates: "", coordinatesRequired: false },
  email: { value: "", error: "", required: true, step: 3, coordinates: "", coordinatesRequired: false },
  date: { value: "", error: "", required: true, step: 1, coordinates: "", coordinatesRequired: false },
  time: { value: "", error: "", required: true, step: 1, coordinates: "", coordinatesRequired: false },
  returnDate: { value: "", error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  returnTime: { value: "", error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  passengers: { value: "1", error: "", required: true, step: 1, coordinates: "", coordinatesRequired: false },
  bags: { value: "0", error: "", required: true, step: 1, coordinates: "", coordinatesRequired: false },
  flightName: { value: "", error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  flightNumber: { value: "", error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  isAirportPickup: { value: false, error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  isFlightTrack: { value: false, error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  isMeetGreet: { value: false, error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  isReturn: { value: false, error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  isReturnFlightTrack: { value: false, error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  isReturnMeetGreet: { value: false, error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  isExtraStops: { value: false, error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  extraStopsCount: { value: "0", error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  isReturnExtraStops: { value: false, error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  returnExtraStopsCount: { value: "0", error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  isAddInstructions: { value: false, error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  instructions: { value: "", error: "", required: false, step: 3, coordinates: "", coordinatesRequired: false },
  paymentId: { value: "", error: "", required: true, step: 4, coordinates: "", coordinatesRequired: false },
}

export const tripInitialFormData: FormDataType = {
  ...commonFormDataFields,
  duration: { ...commonFormDataFields.duration, required: false },
  distance: { ...commonFormDataFields.distance, required: true },
  toLocation: { ...commonFormDataFields.toLocation, required: true, coordinatesRequired: true },
}

export const hourlyInitialFormData: FormDataType = {
  ...commonFormDataFields,
  toLocation: { ...commonFormDataFields.toLocation, required: false, coordinatesRequired: false },
  duration: { ...commonFormDataFields.duration, required: true },
  distance: { ...commonFormDataFields.distance, required: false },
}
