/**
 * API Module Index
 * Centralized exports for core API functionality
 * 
 * Note: API functions are now consolidated in their respective hooks
 * @see /hooks/useBooking, /hooks/useCheckout, /hooks/useDistance, /hooks/useFleets
 */

// Core API client
export { default as apiClient } from './axios';

// Configuration
export * from './config';
export * from './types';
export * from './query-keys';

// API Endpoints
export * from './api-endpoints';

// API Functions
export * from './contact';

