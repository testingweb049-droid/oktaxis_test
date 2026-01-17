/**
 * Shared API types and interfaces
 * Centralized type definitions for consistent API responses across the application
 */

/**
 * Standard API response wrapper
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

/**
 * Standard API error response
 */
export interface ApiError {
  message: string;
  status: number;
  data?: unknown;
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

/**
 * Paginated API response
 */
export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta?: PaginationMeta;
}

/**
 * Base request configuration
 */
export interface RequestConfig {
  signal?: AbortSignal;
  timeout?: number;
}

/**
 * Mutation result type helper
 */
export type MutationResult<TData, TVariables> = {
  data?: TData;
  error?: ApiError;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
};

/**
 * Query result type helper
 */
export type QueryResult<TData> = {
  data?: TData;
  error?: ApiError;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  refetch: () => void;
};

