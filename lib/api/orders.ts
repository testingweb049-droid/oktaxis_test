import apiClient from './client';
import { API_ENDPOINTS } from './api-endpoints';

export interface BookingData {
  id: string;
  category: string;
  price: string;
  car: string;
  distance?: string | null;
  stops?: string[] | null;
  pickup_date?: string | null;
  pickup_time?: string | null;
  return_date?: string | null;
  return_time?: string | null;
  is_return?: boolean | null;
  pickup_location: string;
  dropoff_location?: string | null;
  passengers: number;
  bags: number;
  name: string;
  email: string;
  phone: string;
  flight_arrival_time?: string | null;
  flight_number?: string | null;
  payment_id?: string | null;
  payment_method?: string | null;
  duration?: number | null;
  flight_track?: boolean | null;
  meet_greet?: boolean | null;
  extra_stops_count?: number | null;
  return_flight_track?: boolean | null;
  return_meet_greet?: boolean | null;
  return_extra_stops_count?: number | null;
  instructions?: string | null;
  updated_at: string;
  created_at: string;
  fleet?: {
    name: string;
    cars?: string | null;
    passengers: number;
    suitcases: number;
    image?: string | null;
    description?: string | null;
  } | null;
}

export interface BookingPlacedData {
  id: string;
  name: string;
  email: string;
  pickup_location: string;
  dropoff_location?: string | null;
  stops?: string[] | null;
  category: string;
  duration?: number | null;
  pickup_date?: string | null;
  pickup_time?: string | null;
  fleet?: {
    name: string;
    image?: string | null;
    cars?: string | null;
  } | null;
}

interface BookingResponse {
  success: boolean;
  data: {
    order: BookingData;
  };
}

interface BookingPlacedResponse {
  success: boolean;
  data: {
    order: BookingPlacedData;
  };
}

export const getBookingBySessionId = async (sessionId: string): Promise<BookingData> => {
  const response = await apiClient.get<BookingResponse>(
    API_ENDPOINTS.BOOKING_BY_SESSION_ID(sessionId)
  );
  return response.data.data.order;
};

export const getBookingByBookingId = async (bookingId: string): Promise<BookingData> => {
  const response = await apiClient.get<BookingResponse>(
    API_ENDPOINTS.BOOKING_BY_BOOKING_ID(bookingId)
  );
  return response.data.data.order;
};

export const getBookingPlacedBySessionId = async (sessionId: string): Promise<BookingPlacedData> => {
  const response = await apiClient.get<BookingPlacedResponse>(
    API_ENDPOINTS.BOOKING_PLACED_BY_SESSION_ID(sessionId)
  );
  return response.data.data.order;
};

