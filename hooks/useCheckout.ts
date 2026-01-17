import apiClient from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/api-endpoints';
import type { ApiResponse } from '@/lib/api/types';
import { criticalMutationOptions } from '@/lib/api/config';
import { useApiMutation } from './api/useApiMutation';

export interface CreateCheckoutSessionRequest {
  amount: number;
  orderData: {
    name: string;
    email: string;
    phone: string;
    car: string;
    price: string;
    totalAmount: number;
    distance: number;
    fromLocation: string;
    toLocation: string;
    stops: string[];
    date: string;
    time: string;
    duration: string;
    passengers: string;
    bags: string;
    isReturn?: boolean;
    returnDate?: string;
    returnTime?: string;
    isFlightTrack?: boolean;
    isMeetGreet?: boolean;
    extraStopsCount?: string;
    isReturnFlightTrack?: boolean;
    isReturnMeetGreet?: boolean;
    returnExtraStopsCount?: string;
    isAirportPickup?: boolean;
    flightName?: string;
    flightNumber?: string;
    instructions?: string;
    category: 'trip' | 'hourly';
  };
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

export const useProcessCheckoutSuccess = () => {
  return useApiMutation<CheckoutSuccessResponse, CheckoutSuccessRequest>({
    mutationFn: processCheckoutSuccess,
    ...criticalMutationOptions,
  });
};


