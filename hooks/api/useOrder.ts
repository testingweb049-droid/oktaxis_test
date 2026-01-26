import { useApiQuery } from './useApiQuery';
import { queryKeys } from '@/lib/api/query-keys';
import {
  getBookingBySessionId,
  getBookingByBookingId,
  getBookingPlacedBySessionId,
  type BookingData,
  type BookingPlacedData,
} from '@/lib/api/orders';

export const useBooking = (sessionId: string | null) => {
  return useApiQuery<BookingData>({
    queryKey: queryKeys.bookings.detail(sessionId || ''),
    queryFn: () => getBookingBySessionId(sessionId!),
    enabled: !!sessionId,
    staleTime: 5 * 60 * 1000, // 5 minutes - booking data doesn't change
    gcTime: 10 * 60 * 1000, // 10 minutes cache
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export const useBookingByBookingId = (bookingId: string | null) => {
  return useApiQuery<BookingData>({
    queryKey: queryKeys.bookings.detail(bookingId || ''),
    queryFn: () => getBookingByBookingId(bookingId!),
    enabled: !!bookingId,
  });
};

export const useBookingPlaced = (sessionId: string | null) => {
  return useApiQuery<BookingPlacedData>({
    queryKey: [...queryKeys.bookings.detail(sessionId || ''), 'placed'],
    queryFn: () => getBookingPlacedBySessionId(sessionId!),
    enabled: !!sessionId,
    staleTime: 5 * 60 * 1000, // 5 minutes - booking data doesn't change
    gcTime: 10 * 60 * 1000, // 10 minutes cache
    retry: 2,
    refetchOnWindowFocus: false,
  });
};

export type { BookingData, BookingPlacedData } from '@/lib/api/orders';

