/**
 * Base API Query Hook
 * Provides consistent query configuration with proper error handling
 */

import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { useEffect } from 'react';
import type { ApiError } from '@/lib/api/types';
import { defaultQueryOptions, defaultErrorHandler } from '@/lib/api/config';

export interface UseApiQueryOptions<TData, TError = ApiError>
  extends Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'> {
  onError?: (error: TError) => void;
}

/**
 * Base hook for API queries with consistent error handling
 */
export function useApiQuery<TData, TError = ApiError>(
  options: UseApiQueryOptions<TData, TError> & {
    queryKey: UseQueryOptions<TData, TError>['queryKey'];
    queryFn: UseQueryOptions<TData, TError>['queryFn'];
  }
) {
  const { onError, ...queryOptions } = options;

  const queryResult = useQuery<TData, TError>({
    ...defaultQueryOptions,
    ...queryOptions,
  });

  // Handle errors using useEffect (React Query v5 removed onError from options)
  useEffect(() => {
    if (queryResult.error) {
      if (onError) {
        onError(queryResult.error);
      } else {
        defaultErrorHandler(queryResult.error);
      }
    }
  }, [queryResult.error, onError]);

  return queryResult;
}

