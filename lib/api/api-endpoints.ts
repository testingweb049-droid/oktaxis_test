// Centralized API endpoint definitions
// All paths here are relative to the Axios baseURL configured in `axios.ts`

export const API_ENDPOINTS = {
  BOOKINGS: '/bookings',
  BOOKING_BY_ID: (id: string) => `/bookings/${id}`,

  CREATE_CHECKOUT_SESSION: '/create-checkout-session',
  CHECKOUT_SUCCESS: '/checkout-success',

  GET_DISTANCE: '/get-distance',

  FLEETS: '/fleets',

  // Public order lookup (paymentId, stripeSessionId, or MongoDB _id)
  ORDER_BY_IDENTIFIER: (identifier: string) => `/orders/${identifier}`,
} as const;

export type ApiEndpointKey = keyof typeof API_ENDPOINTS;


