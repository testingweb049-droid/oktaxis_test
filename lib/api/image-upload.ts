import apiClient from './client';
import { API_ENDPOINTS } from './api-endpoints';
import type { ApiResponse } from './types';

export interface UploadImageOptions {
  folder: string;
  timeout?: number;
}

export interface UploadImageVariables {
  file: File;
  options: UploadImageOptions;
}

export interface UploadImageResponse extends ApiResponse<{
  url: string;
  public_id?: string;
}> {
  url?: string;
  public_id?: string;
}

export interface UploadMultipleImagesVariables {
  files: (File | null)[];
  options: UploadImageOptions;
}

export const uploadImage = async ({
  file,
  options,
}: UploadImageVariables): Promise<string> => {
  if (!file) {
    throw {
      message: 'No file provided',
      status: 400,
      data: null,
    };
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('folder', options.folder);

  try {
    const response = await apiClient.post<UploadImageResponse>(
      API_ENDPOINTS.UPLOAD_IMAGE,
      formData
    );

    // Backend returns: { success: true, data: { url, public_id } }
    if (response.data?.success && response.data?.data?.url) {
      return response.data.data.url;
    }
    
    // Fallback for direct url in response
    if (response.data?.url) {
      return response.data.url;
    }

    throw new Error('No URL returned from upload');
  } catch (error: any) {
    console.error('Image upload error:', error);
    throw {
      message: error?.response?.data?.message || error?.message || 'Failed to upload image',
      status: error?.response?.status || error?.status || 500,
      data: error?.response?.data || null,
    };
  }
};

export const uploadMultipleImages = async ({
  files,
  options,
}: UploadMultipleImagesVariables): Promise<(string | null)[]> => {
  const uploadPromises = files.map((file) => {
    if (!file) {
      return Promise.resolve(null);
    }
    return uploadImage({ file, options }).catch(() => null);
  });

  return Promise.all(uploadPromises);
};

