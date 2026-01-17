export const API_ENDPOINTS = {
  BOOKINGS: '/bookings',
  CREATE_CHECKOUT_SESSION: '/create-checkout-session',
  CHECKOUT_SUCCESS: '/checkout-success',
  GET_DISTANCE: '/get-distance',
  FLEETS: '/fleets',
  DRIVERS: '/drivers',
  ORDER_BY_IDENTIFIER: (identifier: string) => `/orders/${identifier}`,
  BOOKING_BY_ID: (id: string) => `/bookings/${id}`,
  CALCULATE_FLEET_PRICE: '/fleet-pricing/calculate',
} as const;

export type ApiEndpointKey = keyof typeof API_ENDPOINTS;


