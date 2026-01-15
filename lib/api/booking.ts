import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from './axios';

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

export interface BookingResponse {
  success: boolean;
  data: {
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
  };
  message?: string;
}

/**
 * Create a new booking
 */
export const createBooking = async (data: CreateBookingRequest): Promise<BookingResponse> => {
  const response = await apiClient.post<BookingResponse>('/bookings', data);
  return response.data;
};

/**
 * React Query mutation hook for creating a booking
 */
export const useCreateBooking = () => {
  return useMutation({
    mutationFn: createBooking,
    onError: (error: any) => {
      console.error('Booking creation failed:', error);
    },
  });
};

/**
 * Get booking by ID
 */
export const getBookingById = async (id: string): Promise<BookingResponse['data']> => {
  const response = await apiClient.get<{ success: boolean; data: BookingResponse['data'] }>(`/bookings/${id}`);
  return response.data.data;
};

/**
 * React Query hook to fetch booking by ID
 */
export const useBooking = (id: string | null) => {
  return useQuery({
    queryKey: ['booking', id],
    queryFn: () => getBookingById(id!),
    enabled: !!id,
  });
};

