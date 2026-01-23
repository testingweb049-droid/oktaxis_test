import apiClient from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/api-endpoints';
import type { ApiResponse } from '@/lib/api/types';
import { queryKeys } from '@/lib/api/query-keys';
import { useApiQuery } from './api/useApiQuery';

export interface PricingData {
  outbound: {
    meetGreet: number;
    meetGreetActive: boolean;
    flightTrack: number;
    flightTrackActive: boolean;
    extraStop: number;
    extraStopActive: boolean;
  };
  return: {
    meetGreet: number;
    meetGreetActive: boolean;
    flightTrack: number;
    flightTrackActive: boolean;
    extraStop: number;
    extraStopActive: boolean;
  };
  vehicle: Record<string, number>;
  returnDiscount: Record<string, number>;
  hourlyRanges: Array<{ minHours: number; maxHours: number; percent: number }>;
  dateRanges: Array<{ startDate: string; endDate: string; percent: number }>;
  minimumBookingHours: number;
  minimumBookingHoursActive: boolean;
  timezone: string;
}

interface PricingResponse extends ApiResponse<PricingData> {
  data: PricingData;
}

export const DEFAULT_PRICING: PricingData = {
  outbound: {
    meetGreet: 0,
    meetGreetActive: true,
    flightTrack: 0,
    flightTrackActive: true,
    extraStop: 0,
    extraStopActive: true,
  },
  return: {
    meetGreet: 0,
    meetGreetActive: true,
    flightTrack: 0,
    flightTrackActive: true,
    extraStop: 0,
    extraStopActive: true,
  },
  vehicle: {},
  returnDiscount: {},
  hourlyRanges: [],
  dateRanges: [],
  minimumBookingHours: 0,
  minimumBookingHoursActive: true,
  timezone: "",
};

const fetchPricing = async (): Promise<PricingData> => {
  try {
    const response = await apiClient.get<PricingResponse>(API_ENDPOINTS.PRICING);
    return response.data.data || DEFAULT_PRICING;
  } catch (error) {
    console.warn('Failed to fetch pricing from API, using defaults:', error);
    return DEFAULT_PRICING;
  }
};

export const usePricing = () => {
  return useApiQuery<PricingData>({
    queryKey: queryKeys.pricing.current(),
    queryFn: fetchPricing,
    staleTime: 1 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    retry: 1,
    refetchOnWindowFocus: true,
  });
};

