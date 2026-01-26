import { useApiQuery } from './useApiQuery';
import { useApiMutation } from './useApiMutation';
import { queryKeys } from '@/lib/api/query-keys';
import {
  createBooking,
  getBookingById,
  createPendingBooking,
  type CreateBookingRequest,
  type CreatePendingBookingRequest,
  type BookingResponse,
  type CreatePendingBookingResponse,
  type BookingData,
} from '@/lib/api/bookings';

export const useCreateBooking = () => {
  return useApiMutation<BookingResponse, CreateBookingRequest>({
    mutationFn: createBooking,
  });
};

export const useCreatePendingBooking = () => {
  return useApiMutation<CreatePendingBookingResponse, CreatePendingBookingRequest>({
    mutationFn: createPendingBooking,
  });
};

export const useBooking = (id: string | null) => {
  return useApiQuery<BookingData>({
    queryKey: queryKeys.bookings.detail(id || ''),
    queryFn: () => getBookingById(id!),
    enabled: !!id,
  });
};

export type {
  CreateBookingRequest,
  CreatePendingBookingRequest,
  BookingResponse,
  CreatePendingBookingResponse,
  BookingData,
} from '@/lib/api/bookings';

