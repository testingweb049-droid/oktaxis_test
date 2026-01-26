import { useApiQuery } from './useApiQuery';
import { queryKeys } from '@/lib/api/query-keys';
import {
  fetchBookingSettings,
  type BookingSettingsData,
} from '@/lib/api/booking-settings';

export const useBookingSettings = () => {
  return useApiQuery<BookingSettingsData>({
    queryKey: queryKeys.bookingSettings.current(),
    queryFn: fetchBookingSettings,
  });
};

export type { BookingSettingsData } from '@/lib/api/booking-settings';
export { DEFAULT_BOOKING_SETTINGS } from '@/lib/api/booking-settings';

