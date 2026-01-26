import apiClient from './client';
import { API_ENDPOINTS } from './api-endpoints';
import type { ApiResponse } from './types';

export interface PricingSettingsData {
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
}

export interface PricingSettingsResponse extends ApiResponse<PricingSettingsData> {}

export const DEFAULT_PRICING_SETTINGS: PricingSettingsData = {
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
};

export const fetchPricingSettings = async (): Promise<PricingSettingsData> => {
  const response = await apiClient.get<PricingSettingsResponse>(API_ENDPOINTS.PRICING);
  return response.data.data;
};

