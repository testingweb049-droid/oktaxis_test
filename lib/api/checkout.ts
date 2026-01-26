import apiClient from './client';
import { API_ENDPOINTS } from './api-endpoints';
import type { ApiResponse } from './types';

export interface CreateCheckoutSessionRequest {
  bookingId: string;
  amount: number;
}

export interface CheckoutSessionResponse {
  url: string;
  sessionId: string;
}

export interface CreateCheckoutSessionResponse extends ApiResponse<CheckoutSessionResponse> {}

export const createCheckoutSession = async (
  data: CreateCheckoutSessionRequest
): Promise<CheckoutSessionResponse> => {
  const response = await apiClient.post<CreateCheckoutSessionResponse>(
    API_ENDPOINTS.CREATE_CHECKOUT_SESSION,
    data
  );
  return response.data.data;
};

