import apiClient from './axios';

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

/**
 * Calculate distance between locations using Google Maps Directions API
 * This provides accurate driving distance, not straight-line distance
 */
export const calculateDistance = async (
  data: CalculateDistanceRequest
): Promise<CalculateDistanceResponse> => {
  try {
    const response = await apiClient.post<CalculateDistanceResponse>('/get-distance', data);
    
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
  } catch (error: any) {
    // Handle axios errors
    const errorStatus = error?.response?.status || error?.status || 500;
    const errorMessage = error?.response?.data?.error || error?.message || 'Failed to calculate distance';
    
    return {
      status: errorStatus,
      error: errorMessage,
    };
  }
};

