import apiClient from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/api-endpoints';
import type { ApiResponse } from '@/lib/api/types';
import { criticalMutationOptions } from '@/lib/api/config';
import { useApiMutation } from './api/useApiMutation';

export interface CreateCheckoutSessionRequest {
  amount: number;
  bookingId: string;
}

export interface CheckoutSessionData {
  url: string;
  sessionId?: string;
}

export interface CheckoutSessionResponse extends ApiResponse<CheckoutSessionData> {
  url?: string; // Legacy support for direct response
  sessionId?: string; // Legacy support
  error?: string; // Legacy support
}

export interface CheckoutSuccessRequest {
  sessionId: string;
}

export interface CheckoutOrder {
  _id: string;
  [key: string]: unknown;
}

export interface CheckoutSuccessData {
  orderId?: string;
  order?: CheckoutOrder;
}

export interface CheckoutSuccessResponse extends ApiResponse<CheckoutSuccessData> {
  orderId?: string; // Legacy support
  order?: CheckoutOrder; // Legacy support
  error?: string; // Legacy support
}

/**
 * Create Stripe checkout session
 */
const createCheckoutSession = async (
  data: CreateCheckoutSessionRequest
): Promise<CheckoutSessionResponse> => {
  const response = await apiClient.post<CheckoutSessionResponse>(
    API_ENDPOINTS.CREATE_CHECKOUT_SESSION,
    data,
    {
      timeout: 60000, // Extended timeout for payment operations
    }
  );
  
  // Normalize response format
  if (response.data.url && !response.data.data) {
    return {
      ...response.data,
      data: {
        url: response.data.url,
        sessionId: response.data.sessionId,
      },
      success: response.data.success ?? true,
    };
  }
  
  return response.data;
};

/**
 * Process checkout success
 * @deprecated This endpoint is deprecated. Payment processing is now handled automatically via Stripe webhooks.
 * The webhook creates bookings and sends emails automatically when payment is confirmed.
 * Use the useOrder hook with session_id to fetch order data instead.
 */
const processCheckoutSuccess = async (
  data: CheckoutSuccessRequest
): Promise<CheckoutSuccessResponse> => {
  const response = await apiClient.post<CheckoutSuccessResponse>(
    API_ENDPOINTS.CHECKOUT_SUCCESS,
    data,
    {
      timeout: 60000, // Extended timeout for payment operations
    }
  );
  
  // Normalize response format
  if ((response.data.orderId || response.data.order) && !response.data.data) {
    return {
      ...response.data,
      data: {
        orderId: response.data.orderId,
        order: response.data.order,
      },
      success: response.data.success ?? true,
    };
  }
  
  return response.data;
};

export const useCreateCheckoutSession = () => {
  return useApiMutation<CheckoutSessionResponse, CreateCheckoutSessionRequest>({
    mutationFn: createCheckoutSession,
    ...criticalMutationOptions,
  });
};

/**
 * @deprecated This hook is deprecated. Payment processing is now handled automatically via Stripe webhooks.
 * Use the useOrder hook with session_id to fetch order data instead.
 * Example: const { data: order } = useOrder(sessionId);
 */
export const useProcessCheckoutSuccess = () => {
  return useApiMutation<CheckoutSuccessResponse, CheckoutSuccessRequest>({
    mutationFn: processCheckoutSuccess,
    ...criticalMutationOptions,
  });
};


