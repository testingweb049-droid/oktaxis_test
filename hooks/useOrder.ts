import apiClient from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/lib/api/api-endpoints';
import { queryKeys } from '@/lib/api/query-keys';
import { useApiQuery } from './api/useApiQuery';

// Order response type matching backend structure
export interface OrderData {
  id: string;
  category: string;
  price: string;
  car: string;
  distance?: string | null;
  stops?: string[] | null;
  pickup_date?: string | null;
  pickup_time?: string | null;
  return_date?: string | null;
  return_time?: string | null;
  is_return?: boolean | null;
  pickup_location: string;
  dropoff_location?: string | null;
  passengers: number;
  bags: number;
  name: string;
  email: string;
  phone: string;
  flight_name?: string | null;
  flight_number?: string | null;
  payment_id?: string | null;
  payment_method?: string | null;
  duration?: number | null;
  flight_track?: boolean | null;
  meet_greet?: boolean | null;
  extra_stops_count?: number | null;
  return_flight_track?: boolean | null;
  return_meet_greet?: boolean | null;
  return_extra_stops_count?: number | null;
  instructions?: string | null;
  updated_at: string;
  created_at: string;
}

// Backend response structure (uses 'order' instead of 'data')
interface OrderResponse {
  success: boolean;
  status: number;
  order: OrderData;
}

const getOrderByIdentifier = async (identifier: string): Promise<OrderData> => {
  const response = await apiClient.get<OrderResponse>(
    API_ENDPOINTS.ORDER_BY_IDENTIFIER(identifier)
  );
  return response.data.order;
};

export const useOrder = (identifier: string | null) => {
  return useApiQuery<OrderData>({
    queryKey: queryKeys.orders.detail(identifier || ''),
    queryFn: () => getOrderByIdentifier(identifier!),
    enabled: !!identifier,
  });
};

