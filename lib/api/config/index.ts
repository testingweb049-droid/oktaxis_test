
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import type { ApiError } from '../types';
export const defaultQueryOptions = {
  staleTime: 60 * 1000,
  gcTime: 5 * 60 * 1000,
  retry: 1,
  refetchOnWindowFocus: false,
} satisfies Partial<UseQueryOptions>;

export const defaultMutationOptions = {
  retry: 0,
} satisfies Partial<UseMutationOptions>;

export const staticDataQueryOptions = {
  staleTime: 10 * 60 * 1000,
  gcTime: 30 * 60 * 1000,
  retry: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnWindowFocus: false,
} satisfies Partial<UseQueryOptions>;

export const criticalMutationOptions = {
  retry: 2,
  retryDelay: 1000,
} satisfies Partial<UseMutationOptions>;

export const defaultErrorHandler = (error: unknown) => {
  const apiError = error as ApiError;
  return apiError;
};

export const defaultSuccessHandler = <TData,>(data: TData) => {
  console.log('API Success:', data);
  return data;
};

