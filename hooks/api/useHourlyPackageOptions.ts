import { useApiQuery } from './useApiQuery';
import {
  fetchHourlyPackageOptions,
  fetchAllPackageOptions,
  type PackageType,
  type HourlyPackageOption,
  type AllPackageOptions,
} from '@/lib/api/hourly-packages';

export interface UseHourlyPackageOptionsParams {
  packageType?: PackageType;
  enabled?: boolean;
}

export const useHourlyPackageOptions = (params?: UseHourlyPackageOptionsParams) => {
  const { packageType = 'hourly', enabled = true } = params || {};

  return useApiQuery<HourlyPackageOption[]>({
    queryKey: ['hourly-package-options', packageType],
    queryFn: () => fetchHourlyPackageOptions(packageType),
    enabled,
  });
};

export interface UseAllPackageOptionsParams {
  enabled?: boolean;
}

export const useAllPackageOptions = (params?: UseAllPackageOptionsParams) => {
  const { enabled = true } = params || {};

  return useApiQuery<AllPackageOptions>({
    queryKey: ['all-package-options'],
    queryFn: fetchAllPackageOptions,
    enabled,
  });
};

export type { HourlyPackageOption, PackageType, AllPackageOptions } from '@/lib/api/hourly-packages';
