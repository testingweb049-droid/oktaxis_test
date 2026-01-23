import apiClient from './axios';
import { API_ENDPOINTS } from './api-endpoints';

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export const submitContactForm = async (data: ContactFormData): Promise<ContactResponse> => {
  const response = await apiClient.post<ContactResponse>(API_ENDPOINTS.CONTACT, data);
  return response.data;
};

