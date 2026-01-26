import type { FormDataType } from '@/stores/form-store';
import type { CreatePendingBookingRequest } from '@/lib/api/bookings';

export function prepareBookingData(
  formData: FormDataType,
  category: 'trip' | 'hourly',
  price: string
): CreatePendingBookingRequest {
  return {
    name: formData.name.value,
    email: formData.email.value,
    phone: formData.phone.value,
    car: formData.car.value,
    price: price,
    totalAmount: parseFloat(price),
    distance: formData.distance.value || 0,
    fromLocation: formData.fromLocation.value,
    toLocation: formData.toLocation.value || '',
    stops: [],
    date: formData.date.value,
    time: formData.time.value,
    duration: formData.duration.value || '',
    passengers: formData.passengers.value,
    bags: formData.bags.value,
    isReturn: formData.isReturn?.value || false,
    returnDate: formData.returnDate?.value || '',
    returnTime: formData.returnTime?.value || '',
    isFlightTrack: formData.isFlightTrack?.value || false,
    isMeetGreet: formData.isMeetGreet?.value || false,
    extraStopsCount: formData.extraStopsCount?.value || '0',
    isReturnFlightTrack: formData.isReturnFlightTrack?.value || false,
    isReturnMeetGreet: formData.isReturnMeetGreet?.value || false,
    returnExtraStopsCount: formData.returnExtraStopsCount?.value || '0',
    isAirportPickup: formData.isAirportPickup?.value || false,
    flightArrivalTime: formData.flightArrivalTime?.value || '',
    flightNumber: formData.flightNumber?.value || '',
    instructions: formData.instructions?.value || '',
    category: category || 'trip',
  };
}

