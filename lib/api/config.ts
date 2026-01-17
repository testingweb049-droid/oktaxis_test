/**
 * API Configuration
 * Centralized configuration for API requests and React Query
 */

import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import type { ApiError } from './types';

/**
 * Default query options
 */
export const defaultQueryOptions = {
  staleTime: 60 * 1000, // 1 minute
  gcTime: 5 * 60 * 1000, // 5 minutes
  retry: 1,
  refetchOnWindowFocus: false,
} satisfies Partial<UseQueryOptions>;

/**
 * Default mutation options
 */
export const defaultMutationOptions = {
  retry: 0,
} satisfies Partial<UseMutationOptions>;

/**
 * Query options for data that doesn't change often (e.g., fleet data)
 */
export const staticDataQueryOptions = {
  staleTime: 10 * 60 * 1000, // 10 minutes
  gcTime: 30 * 60 * 1000, // 30 minutes
  retry: 3,
  retryDelay: (attemptIndex: number) => Math.min(1000 * 2 ** attemptIndex, 30000),
  refetchOnWindowFocus: false,
} satisfies Partial<UseQueryOptions>;

/**
 * Mutation options for critical operations (e.g., payment)
 */
export const criticalMutationOptions = {
  retry: 2,
  retryDelay: 1000,
} satisfies Partial<UseMutationOptions>;

/**
 * Default error handler for mutations
 */
export const defaultErrorHandler = (error: unknown) => {
  const apiError = error as ApiError;
  console.error('API Error:', {
    message: apiError.message,
    status: apiError.status,
    data: apiError.data,
  });
  // Component can show toast based on this
};

/**
 * Default success handler for mutations
 */
export const defaultSuccessHandler = <TData,>(data: TData) => {
  // Can be extended with toast notifications, analytics, etc.
  return data;
};

