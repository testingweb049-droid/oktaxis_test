import apiClient from './client';
import { API_ENDPOINTS } from './api-endpoints';
import type { ApiResponse } from './types';

export interface BookingSettingsData {
  minimumBookingHours: number;
  minimumBookingHoursActive: boolean;
  timezone: string;
}

export interface BookingSettingsResponse extends ApiResponse<BookingSettingsData> {}

export const DEFAULT_BOOKING_SETTINGS: BookingSettingsData = {
  minimumBookingHours: 5,
  minimumBookingHoursActive: true,
  timezone: "America/New_York",
};

export const fetchBookingSettings = async (): Promise<BookingSettingsData> => {
  const response = await apiClient.get<BookingSettingsResponse>(API_ENDPOINTS.BOOKING_SETTINGS);
  return response.data.data;
};

