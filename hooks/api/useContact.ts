import { useApiMutation } from './useApiMutation';
import {
  submitContactForm,
  type ContactFormData,
  type ContactResponse,
} from '@/lib/api/contact';

export const useSubmitContactForm = () => {
  return useApiMutation<ContactResponse, ContactFormData>({
    mutationFn: submitContactForm,
  });
};

export type {
  ContactFormData,
  ContactResponse,
} from '@/lib/api/contact';

