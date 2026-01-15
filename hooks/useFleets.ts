import apiClient from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/api-endpoints';
import type { FleetType } from '@/lib/fleet-data';
import type { ApiResponse } from '@/lib/api/types';
import { queryKeys } from '@/lib/api/query-keys';
import { staticDataQueryOptions } from '@/lib/api/config';
import { useApiQuery } from './api/useApiQuery';

interface FleetResponse extends ApiResponse<FleetType[]> {
  fleets?: FleetType[]; // Legacy support
}


const fetchFleets = async (): Promise<FleetType[]> => {
  const response = await apiClient.get<FleetResponse>(API_ENDPOINTS.FLEETS);
  // Support both old and new response formats
  return response.data.fleets || response.data.data || [];
};


export const useFleets = () => {
  return useApiQuery<FleetType[]>({
    queryKey: queryKeys.fleets.lists(),
    queryFn: fetchFleets,
    ...staticDataQueryOptions,
  });
};


