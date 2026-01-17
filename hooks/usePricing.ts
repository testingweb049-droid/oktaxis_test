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
    discount: number; // Return discount percentage
  };
}

interface PricingResponse extends ApiResponse<PricingData> {
  data: PricingData;
}

// Default fallback pricing values
export const DEFAULT_PRICING: PricingData = {
  outbound: {
    meetGreet: 15,
    flightTrack: 7,
    extraStop: 7,
  },
  return: {
    meetGreet: 15,
    flightTrack: 7,
    extraStop: 7,
    discount: 10, // Return discount percentage (default 10%)
  },
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

