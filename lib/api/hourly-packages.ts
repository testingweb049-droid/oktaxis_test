import apiClient from './client';
import { API_ENDPOINTS } from './api-endpoints';

export type PackageType = 'hourly' | 'day' | 'week';

export interface HourlyPackageOption {
  duration: number;
  includedMiles: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  vehicleCount: number;
  label: string;
  packageType?: PackageType;
}

export interface HourlyPackageOptionsResponse {
  success: boolean;
  data: HourlyPackageOption[];
}

export interface AllPackageOptions {
  hourly: HourlyPackageOption[];
  day: HourlyPackageOption[];
  week: HourlyPackageOption[];
}

export interface AllPackageOptionsResponse {
  success: boolean;
  data: AllPackageOptions;
}

/**
 * Fetch available hourly package options for the booking dropdown
 * @param packageType - Type of package: 'hourly', 'day', or 'week'
 * @deprecated Use fetchAllPackageOptions() instead for better performance
 */
export const fetchHourlyPackageOptions = async (
  packageType: PackageType = 'hourly'
): Promise<HourlyPackageOption[]> => {
  try {
    const response = await apiClient.get<HourlyPackageOptionsResponse>(
      API_ENDPOINTS.HOURLY_PACKAGE_OPTIONS,
      { params: { packageType } }
    );
    return (response.data.data || []).map(opt => ({ ...opt, packageType }));
  } catch (error: any) {
    console.error('Error fetching hourly package options:', error);
    throw new Error(error?.message || 'Failed to load package options');
  }
};

/**
 * Fetch all package options (hourly, day, week) for the booking dropdown
 * Single API call - optimized for performance
 */
export const fetchAllPackageOptions = async (): Promise<AllPackageOptions> => {
  try {
    const response = await apiClient.get<AllPackageOptionsResponse>(
      API_ENDPOINTS.HOURLY_PACKAGE_ALL_OPTIONS
    );
    const data = response.data.data || { hourly: [], day: [], week: [] };
    
    // Add packageType to each option for consistency
    return {
      hourly: data.hourly.map(opt => ({ ...opt, packageType: 'hourly' as PackageType })),
      day: data.day.map(opt => ({ ...opt, packageType: 'day' as PackageType })),
      week: data.week.map(opt => ({ ...opt, packageType: 'week' as PackageType })),
    };
  } catch (error: any) {
    console.error('Error fetching all package options:', error);
    throw new Error(error?.message || 'Failed to load package options');
  }
};
