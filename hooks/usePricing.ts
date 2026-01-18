import apiClient from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/api-endpoints';
import type { ApiResponse } from '@/lib/api/types';
import { queryKeys } from '@/lib/api/query-keys';
import { staticDataQueryOptions } from '@/lib/api/config';
import { useApiQuery } from './api/useApiQuery';

export interface PricingData {
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
  vehicle: Record<string, number>; // Vehicle display discount percentages by vehicle name
  returnDiscount: Record<string, number>; // Return discount percentages per vehicle
  hourlyRanges: Array<{ minHours: number; maxHours: number; percent: number }>; // Hourly pricing ranges: [{minHours, maxHours, percent}, ...] - Used for both hourly bookings and last-minute pricing
  dateRanges: Array<{ startDate: string; endDate: string; percent: number }>; // Date-based pricing ranges: [{startDate, endDate, percent}, ...] - Used for seasonal/peak pricing
  minimumBookingHours: number; // Minimum hours before booking can be made
  timezone: string; // Timezone for booking validation (e.g., "America/New_York")
}

interface PricingResponse extends ApiResponse<PricingData> {
  data: PricingData;
}

// Empty fallback pricing - all values must come from backend
export const DEFAULT_PRICING: PricingData = {
  outbound: {
    meetGreet: 0,
    flightTrack: 0,
    extraStop: 0,
  },
  return: {
    meetGreet: 0,
    flightTrack: 0,
    extraStop: 0,
  },
  vehicle: {},
  returnDiscount: {},
  hourlyRanges: [],
  dateRanges: [],
  minimumBookingHours: 0,
  timezone: "",
};

const fetchPricing = async (): Promise<PricingData> => {
  try {
    const response = await apiClient.get<PricingResponse>(API_ENDPOINTS.PRICING);
    return response.data.data || DEFAULT_PRICING;
  } catch (error) {
    // Return default pricing if API fails
    console.warn('Failed to fetch pricing from API, using defaults:', error);
    return DEFAULT_PRICING;
  }
};

export const usePricing = () => {
  return useApiQuery<PricingData>({
    queryKey: queryKeys.pricing.current(),
    queryFn: fetchPricing,
    staleTime: 1 * 60 * 1000, // 1 minute - refresh more frequently so pricing updates are visible sooner
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
    refetchOnWindowFocus: true, // Refetch when user returns to the page
  });
};

