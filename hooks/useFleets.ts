import apiClient from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/api-endpoints';
import type { FleetType } from '@/types/fleet.types';
import type { ApiResponse } from '@/lib/api/types';
import { queryKeys } from '@/lib/api/query-keys';
import { staticDataQueryOptions } from '@/lib/api/config';
import { useApiQuery } from './api/useApiQuery';

interface FleetResponse extends ApiResponse<FleetType[]> {
  fleets?: FleetType[];   
}

interface UseFleetsOptions {
  distance?: number;
  duration?: number;
  date?: string;
  time?: string;
  category?: "trip" | "hourly";
}

const fetchFleets = async (options?: UseFleetsOptions): Promise<FleetType[]> => {
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

  const response = await apiClient.get<FleetResponse>(API_ENDPOINTS.FLEETS, {
    params,
  });
  
  return response.data.fleets || response.data.data || [];
};

export const useFleets = (options?: UseFleetsOptions, queryOptions?: { enabled?: boolean }) => {
  return useApiQuery<FleetType[]>({
    queryKey: [...queryKeys.fleets.lists(), options],
    queryFn: () => fetchFleets(options),
    enabled: queryOptions?.enabled !== false, // Default to true, but allow disabling
    ...staticDataQueryOptions,
  });
};


