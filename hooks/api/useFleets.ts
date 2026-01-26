import { useApiQuery } from './useApiQuery';
import { queryKeys } from '@/lib/api/query-keys';
import type { FleetType } from '@/types/fleet.types';
import {
  fetchFleets,
  type UseFleetsOptions,
} from '@/lib/api/fleets';

export const useFleets = (options?: UseFleetsOptions, queryOptions?: { enabled?: boolean }) => {
  return useApiQuery<FleetType[]>({
    queryKey: [...queryKeys.fleets.lists(), options],
    queryFn: () => fetchFleets(options),
    enabled: queryOptions?.enabled !== false,
  });
};

export type { UseFleetsOptions } from '@/lib/api/fleets';

