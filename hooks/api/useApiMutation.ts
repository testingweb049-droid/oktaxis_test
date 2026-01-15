/**
 * Base API Mutation Hook
 * Provides consistent mutation configuration with proper error handling
 */

import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
import type { ApiError } from '@/lib/api/types';
import { defaultMutationOptions, defaultErrorHandler, defaultSuccessHandler } from '@/lib/api/config';

export interface UseApiMutationOptions<TData, TVariables, TError = ApiError>
  extends Omit<UseMutationOptions<TData, TError, TVariables>, 'mutationFn'> {
  onError?: (error: TError, variables: TVariables, context: unknown) => void;
  onSuccess?: (data: TData, variables: TVariables, context: unknown) => void;
}

/**
 * Base hook for API mutations with consistent error handling
 */
export function useApiMutation<TData, TVariables, TError = ApiError>(
  options: UseApiMutationOptions<TData, TVariables, TError> & {
    mutationFn: UseMutationOptions<TData, TError, TVariables>['mutationFn'];
  }
) {
  const { onError, onSuccess, ...mutationOptions } = options;

  return useMutation<TData, TError, TVariables>({
    ...defaultMutationOptions,
    ...mutationOptions,
    onError: (error, variables, context) => {
      if (onError) {
        onError(error, variables, context);
      } else {
        defaultErrorHandler(error);
      }
    },
    onSuccess: (data, variables, context) => {
      defaultSuccessHandler(data);
      if (onSuccess) {
        onSuccess(data, variables, context);
      }
    },
  });
}

