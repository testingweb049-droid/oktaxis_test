import { useApiQuery } from './useApiQuery';
import { queryKeys } from '@/lib/api/query-keys';
import {
  fetchPricingSettings,
  type PricingSettingsData,
} from '@/lib/api/pricing';

export const usePricingSettings = () => {
  return useApiQuery<PricingSettingsData>({
    queryKey: queryKeys.pricing.current(),
    queryFn: fetchPricingSettings,
  });
};

export type { PricingSettingsData } from '@/lib/api/pricing';
export { DEFAULT_PRICING_SETTINGS } from '@/lib/api/pricing';

