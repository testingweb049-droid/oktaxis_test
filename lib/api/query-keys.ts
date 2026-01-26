/**
 * Query Key Factory
 * Centralized query key management for better cache invalidation and type safety
 */

export const queryKeys = {
  // Fleet queries
  fleets: {
    all: ['fleets'] as const,
    lists: () => [...queryKeys.fleets.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.fleets.lists(), { filters }] as const,
    details: () => [...queryKeys.fleets.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.fleets.details(), id] as const,
    withPrices: (options?: Record<string, unknown>) => [...queryKeys.fleets.all, 'with-prices', options] as const,
  },

  // Booking queries
  bookings: {
    all: ['bookings'] as const,
    lists: () => [...queryKeys.bookings.all, 'list'] as const,
    list: (filters?: Record<string, unknown>) => [...queryKeys.bookings.lists(), { filters }] as const,
    details: () => [...queryKeys.bookings.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.bookings.details(), id] as const,
  },

  // Distance queries (for cache)
  distance: {
    all: ['distance'] as const,
    calculation: (params: { from: string; to: string; stops?: string[] }) =>
      [...queryKeys.distance.all, 'calculate', params] as const,
  },

  // Checkout queries
  checkout: {
    all: ['checkout'] as const,
    session: (sessionId?: string) => [...queryKeys.checkout.all, 'session', sessionId] as const,
  },


  // Pricing queries
  pricing: {
    all: ['pricing'] as const,
    current: () => [...queryKeys.pricing.all, 'current'] as const,
  },

  // Booking settings queries
  bookingSettings: {
    all: ['booking-settings'] as const,
    current: () => [...queryKeys.bookingSettings.all, 'current'] as const,
  },
} as const;

