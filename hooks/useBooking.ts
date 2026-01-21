import apiClient from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/api-endpoints';
import type { ApiResponse } from '@/lib/api/types';
import { queryKeys } from '@/lib/api/query-keys';
import { useApiQuery } from './api/useApiQuery';
import { useApiMutation } from './api/useApiMutation';

// Booking request types
export interface CreateBookingRequest {
  passengerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  bookingDetails: {
    pickUpAddress: string;
    dropOffAddress: string;
    date: string;
    time: string;
    bookingType: string;
    vehicleTitle: string;
    category: 'trip' | 'hourly';
    passengerCount: number;
    bagCount?: number;
    childCount?: number;
    textarea?: string;
    stops?: string[];
    hourly?: string;
    distance: number;
    price: number;
  };
}

// Pending booking request (frontend orderData format)
export interface CreatePendingBookingRequest {
  name: string;
  email: string;
  phone: string;
  car: string;
  price: string;
  totalAmount: number;
  distance: number;
  fromLocation: string;
  toLocation: string;
  stops: string[];
  date: string;
  time: string;
  duration: string;
  passengers: string;
  bags: string;
  isReturn?: boolean;
  returnDate?: string;
  returnTime?: string;
  isFlightTrack?: boolean;
  isMeetGreet?: boolean;
  extraStopsCount?: string;
  isReturnFlightTrack?: boolean;
  isReturnMeetGreet?: boolean;
  returnExtraStopsCount?: string;
  isAirportPickup?: boolean;
  flightName?: string;
  flightNumber?: string;
  instructions?: string;
  category: 'trip' | 'hourly';
}

export interface CreatePendingBookingResponse extends ApiResponse<{
  bookingId: string;
  booking: BookingData;
}> {}

export interface BookingData {
  _id: string;
  passengerInfo: {
    name: string;
    email: string;
    phone: string;
  };
  bookingDetails: {
    pickUpAddress: string;
    dropOffAddress: string;
    date: string;
    time: string;
    bookingType: string;
    vehicleTitle: string;
    category: string;
    passengerCount: number;
    bagCount?: number;
    childCount?: number;
    textarea?: string;
    stops?: string[];
    hourly?: string;
    distance: number;
    price: number;
  };
  status: string;
  paymentStatus: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookingResponse extends ApiResponse<BookingData> {}


const createBooking = async (data: CreateBookingRequest): Promise<BookingResponse> => {
  const response = await apiClient.post<BookingResponse>(API_ENDPOINTS.BOOKINGS, data);
  return response.data;
};


const getBookingById = async (id: string): Promise<BookingData> => {
  const response = await apiClient.get<ApiResponse<BookingData>>(
    API_ENDPOINTS.BOOKING_BY_ID(id)
  );
  return response.data.data;
};

export const useCreateBooking = () => {
  return useApiMutation<BookingResponse, CreateBookingRequest>({
    mutationFn: createBooking,
  });
};

const createPendingBooking = async (data: CreatePendingBookingRequest): Promise<CreatePendingBookingResponse> => {
  const response = await apiClient.post<CreatePendingBookingResponse>(
    '/bookings/create-pending',
    data
  );
  return response.data;
};

export const useCreatePendingBooking = () => {
  return useApiMutation<CreatePendingBookingResponse, CreatePendingBookingRequest>({
    mutationFn: createPendingBooking,
  });
};


export const useBooking = (id: string | null) => {
  return useApiQuery<BookingData>({
    queryKey: queryKeys.bookings.detail(id || ''),
    queryFn: () => getBookingById(id!),
    enabled: !!id,
  });
};


