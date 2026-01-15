import apiClient from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/api-endpoints';
import { useApiMutation } from './api/useApiMutation';

export interface CalculateDistanceRequest {
  from: string;
  to: string;
  stops?: string[];
}

export interface CalculateDistanceResponse {
  status: number;
  mileDistance?: number;
  error?: string;
}

interface DistanceApiResponse {
  status: number;
  mileDistance?: number;
  error?: string;
}

export const calculateDistance = async (
  data: CalculateDistanceRequest
): Promise<CalculateDistanceResponse> => {
  try {
    const response = await apiClient.post<DistanceApiResponse>(
      API_ENDPOINTS.GET_DISTANCE,
      data
    );
    
    // Ensure the response has the expected format
    if (response.data.status === 200 && response.data.mileDistance !== undefined) {
      return {
        status: 200,
        mileDistance: response.data.mileDistance,
      };
    }
    
    return {
      status: response.data.status || 500,
      error: response.data.error || 'Failed to calculate distance',
    };
  } catch (error: unknown) {
    // Handle axios errors - error is already transformed by axios interceptor
    const apiError = error as { status?: number; message?: string; data?: { error?: string } };
    const errorStatus = apiError?.status || 500;
    const errorMessage = apiError?.data?.error || apiError?.message || 'Failed to calculate distance';
    
    return {
      status: errorStatus,
      error: errorMessage,
    };
  }
};

export const useCalculateDistance = () => {
  return useApiMutation<CalculateDistanceResponse, CalculateDistanceRequest>({
    mutationFn: calculateDistance,
  });
};


