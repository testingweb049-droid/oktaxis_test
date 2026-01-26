import { useApiQuery } from './useApiQuery';
import { queryKeys } from '@/lib/api/query-keys';
import {
  fetchFleetsWithPrices,
  type FleetWithPrice,
  type UseFleetsOptions,
} from '@/lib/api/fleets';

export const useFleetsWithPrices = (options?: UseFleetsOptions) => {
  const shouldEnable = Boolean(
    options?.date && 
    options?.time && 
    (options?.distance || options?.duration) &&
    (options?.category === 'trip' ? options?.distance && options.distance > 0 : options?.category === 'hourly' ? options?.duration && options.duration > 0 : false)
  );

  return useApiQuery<FleetWithPrice[]>({
    queryKey: queryKeys.fleets.withPrices(options as Record<string, unknown> | undefined),
    queryFn: () => fetchFleetsWithPrices(options),
    enabled: shouldEnable,
  });
};

export type { FleetWithPrice, UseFleetsOptions } from '@/lib/api/fleets';

