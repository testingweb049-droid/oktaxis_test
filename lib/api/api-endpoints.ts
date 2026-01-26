export const API_ENDPOINTS = {
  BOOKINGS: '/bookings',
  CREATE_CHECKOUT_SESSION: '/create-checkout-session',
  CHECKOUT_SUCCESS: '/checkout-success',
  FLEETS: '/fleets',
  FLEETS_WITH_PRICES: '/fleets/with-prices',
  DRIVERS: '/drivers',
  BOOKING_BY_SESSION_ID: (sessionId: string) => `/bookings/session/${sessionId}`,
  BOOKING_BY_BOOKING_ID: (bookingId: string) => `/bookings/${bookingId}`,
  BOOKING_PLACED_BY_SESSION_ID: (sessionId: string) => `/bookings/session/${sessionId}/placed`,
  BOOKING_BY_ID: (id: string) => `/bookings/${id}`,
  CALCULATE_FLEET_PRICE: '/fleet-pricing/calculate',
  PRICING: '/pricing',
  BOOKING_SETTINGS: '/booking-settings',
  CONTACT: '/contact',
  CREATE_PENDING_BOOKING: '/bookings/create-pending',
  UPLOAD_IMAGE: '/upload-image',
} as const;

export type ApiEndpointKey = keyof typeof API_ENDPOINTS;


