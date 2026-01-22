import apiClient from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/api-endpoints';
import type { ApiResponse } from '@/lib/api/types';
import { queryKeys } from '@/lib/api/query-keys';
import { useApiMutation } from './api/useApiMutation';
import type { FleetType } from '@/types/fleet.types';

export interface PrepareQuoteRequest {
  category: 'trip' | 'hourly';
  fromLocation: {
    address: string;
    coordinates: string;
  };
  toLocation?: {
    address: string;
    coordinates: string;
  };
  duration?: number; // Only for hourly
  date: string; // YYYY-MM-DD
  time: string; // HH:MM
  passengers: number;
  bags: number;
  stops?: string[]; // Array of coordinate strings
}

export interface PrepareQuoteResponse {
  distance?: number; // Only for trip
  duration?: number; // Only for hourly
  fleets: FleetType[];
  pricing: {
    outbound: {
      meetGreet: number;
      flightTrack: number;
      extraStop: number;
    };
    return: {
      meetGreet: number;
      flightTrack: number;
      extraStop: number;
    };
    vehicle: Record<string, number>;
    returnDiscount: Record<string, number>;
    hourlyRanges: Array<{ minHours: number; maxHours: number; percent: number }>;
    dateRanges: Array<{ startDate: string; endDate: string; percent: number }>;
    minimumBookingHours: number;
    timezone: string;
  };
}

interface PrepareQuoteApiResponse extends ApiResponse<PrepareQuoteResponse> {
  data: PrepareQuoteResponse;
}

const prepareQuote = async (data: PrepareQuoteRequest): Promise<PrepareQuoteApiResponse> => {
  const response = await apiClient.post<PrepareQuoteApiResponse>(
    '/bookings/prepare-quote',
    data
  );
  return response.data;
};

export const usePrepareQuote = () => {
  return useApiMutation<PrepareQuoteApiResponse, PrepareQuoteRequest>({
    mutationFn: prepareQuote,
  });
};

