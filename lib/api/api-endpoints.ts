export const API_ENDPOINTS = {
  BOOKINGS: '/bookings',
  CREATE_CHECKOUT_SESSION: '/create-checkout-session',
  CHECKOUT_SUCCESS: '/checkout-success',
  GET_DISTANCE: '/get-distance',
  FLEETS: '/fleets',
  DRIVERS: '/drivers',
  ORDER_BY_BOOKING_ID: (bookingId: string) => `/orders/${bookingId}`,
  ORDER_BY_SESSION_ID: (sessionId: string) => `/orders/session/${sessionId}`,
  BOOKING_BY_ID: (id: string) => `/bookings/${id}`,
  CALCULATE_FLEET_PRICE: '/fleet-pricing/calculate',
  PRICING: '/pricing',
} as const;

export type ApiEndpointKey = keyof typeof API_ENDPOINTS;


