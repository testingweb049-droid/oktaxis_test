import { useApiMutation } from './useApiMutation';
import {
  createCheckoutSession,
  type CreateCheckoutSessionRequest,
  type CheckoutSessionResponse,
} from '@/lib/api/checkout';

export const useCreateCheckoutSession = () => {
  return useApiMutation<CheckoutSessionResponse, CreateCheckoutSessionRequest>({
    mutationFn: createCheckoutSession,
  });
};

export type {
  CreateCheckoutSessionRequest,
  CheckoutSessionResponse,
} from '@/lib/api/checkout';

