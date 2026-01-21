import apiClient from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/api-endpoints';
import type { ApiResponse } from '@/lib/api/types';
import { queryKeys } from '@/lib/api/query-keys';
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
  vehicle: Record<string, number>;
  returnDiscount: Record<string, number>;
  hourlyRanges: Array<{ minHours: number; maxHours: number; percent: number }>;
  dateRanges: Array<{ startDate: string; endDate: string; percent: number }>;
  minimumBookingHours: number;
  timezone: string;
}

interface PricingResponse extends ApiResponse<PricingData> {
  data: PricingData;
}

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

