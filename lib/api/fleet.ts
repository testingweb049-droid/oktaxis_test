import { useQuery } from '@tanstack/react-query';
import apiClient from './axios';
import type { FleetType } from '@/lib/fleet-data';

export interface FleetResponse {
  success: boolean;
  fleets: FleetType[];
}

/**
 * Fetch all fleets from the API
 */
export const fetchFleets = async (): Promise<FleetType[]> => {
  const response = await apiClient.get<FleetResponse>('/fleets');
  return response.data.fleets || [];
};

/**
 * React Query hook to fetch fleets
 */
export const useFleets = () => {
  return useQuery({
    queryKey: ['fleets'],
    queryFn: fetchFleets,
    staleTime: 10 * 60 * 1000, // 10 minutes - fleet data doesn't change often
    retry: 3, // Retry up to 3 times on failure
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
    refetchOnWindowFocus: false, // Don't refetch on window focus
  });
};

