import { useMutation } from '@tanstack/react-query';
import apiClient from './axios';

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

export interface CheckoutSessionResponse {
  url: string;
  sessionId?: string;
  error?: string;
}

/**
 * Create Stripe checkout session
 */
export const createCheckoutSession = async (
  data: CreateCheckoutSessionRequest
): Promise<CheckoutSessionResponse> => {
  const response = await apiClient.post<CheckoutSessionResponse>('/create-checkout-session', data);
  return response.data;
};

/**
 * React Query mutation hook for creating checkout session
 */
export const useCreateCheckoutSession = () => {
  return useMutation({
    mutationFn: createCheckoutSession,
    retry: 2, // Retry up to 2 times for payment-related operations
    retryDelay: 1000, // 1 second delay between retries
    onError: (error: any) => {
      console.error('Checkout session creation failed:', error);
      // Error handling is done in the component using toast
    },
  });
};

export interface CheckoutSuccessRequest {
  sessionId: string;
}

export interface CheckoutSuccessResponse {
  success: boolean;
  orderId?: string;
  order?: any;
  error?: string;
}

/**
 * Process checkout success
 */
export const processCheckoutSuccess = async (
  data: CheckoutSuccessRequest
): Promise<CheckoutSuccessResponse> => {
  const response = await apiClient.post<CheckoutSuccessResponse>('/checkout-success', data);
  return response.data;
};

/**
 * React Query mutation hook for processing checkout success
 */
export const useProcessCheckoutSuccess = () => {
  return useMutation({
    mutationFn: processCheckoutSuccess,
    retry: 2, // Retry up to 2 times
    retryDelay: 1000, // 1 second delay between retries
    onError: (error: any) => {
      console.error('Checkout processing failed:', error);
      // Error handling is done in the component using toast
    },
  });
};

