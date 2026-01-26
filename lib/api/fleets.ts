import apiClient from './client';
import { API_ENDPOINTS } from './api-endpoints';
import type { FleetType } from '@/types/fleet.types';
import type { ApiResponse } from './types';

export interface FleetResponse extends ApiResponse<FleetType[]> {
  fleets?: FleetType[];
}

export interface FleetWithPrice extends FleetType {
  calculatedPrice?: number;
  totalCalculatedPrice?: number;
  pricingBreakdown?: {
    basePrice: number;
    dateBasedIncrease?: number;
    dateBasedPercent?: number;
    lastMinuteIncrease?: number;
    lastMinutePercent?: number;
    finalPrice: number;
    displayDiscount?: number;
    originalPrice?: number;
  };
}

export interface FleetsWithPricesResponse extends ApiResponse<FleetWithPrice[]> {
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UseFleetsOptions {
  distance?: number;
  duration?: number;
  date?: string;
  time?: string;
  category?: "trip" | "hourly";
  isActive?: boolean;
  page?: number;
  limit?: number;
}

export const fetchFleets = async (options?: UseFleetsOptions): Promise<FleetType[]> => {
  try {
    const response = await apiClient.get<FleetResponse>(API_ENDPOINTS.FLEETS);
    console.log(response.data);
    return response.data.data;
  } catch (error: any) {
    console.error('Error fetching fleets:', error);
    throw new Error(error?.message || 'Failed to load fleets');
  }
};

export const fetchFleetsWithPrices = async (options?: UseFleetsOptions): Promise<FleetWithPrice[]> => {
  const params: Record<string, string> = {};
  if (options?.distance && options.distance > 0) {
    params.distance = options.distance.toString();
  }
  if (options?.duration && options.duration > 0) {
    params.duration = options.duration.toString();
  }
  if (options?.date) {
    params.date = options.date;
  }
  if (options?.time) {
    params.time = options.time;
  }

  if (options?.category) {
    params.category = options.category;
  }

  if (options?.isActive !== undefined) {
    params.isActive = options.isActive.toString();
  }

  if (options?.page) {
    params.page = options.page.toString();
  }

  if (options?.limit) {
    params.limit = options.limit.toString();
  }

  const response = await apiClient.get<FleetsWithPricesResponse>(API_ENDPOINTS.FLEETS_WITH_PRICES, {
    params,
  });
  const apiResponse = response.data;
  console.log(apiResponse);
  const fleets = (apiResponse?.data || []) as FleetWithPrice[];
  
  return fleets;
};

