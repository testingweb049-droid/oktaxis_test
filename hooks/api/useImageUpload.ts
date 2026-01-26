import { useApiMutation } from './useApiMutation';
import type { ApiError } from '@/lib/api/types';
import {
  uploadImage,
  uploadMultipleImages,
  type UploadImageOptions,
  type UploadImageVariables,
  type UploadMultipleImagesVariables,
} from '@/lib/api/image-upload';

export const useUploadImage = () => {
  return useApiMutation<string, UploadImageVariables, ApiError>({
    mutationFn: uploadImage,
  });
};

export const useUploadMultipleImages = () => {
  return useApiMutation<(string | null)[], UploadMultipleImagesVariables, ApiError>({
    mutationFn: uploadMultipleImages,
  });
};

export const useImageUpload = () => {
  const uploadImageMutation = useUploadImage();
  const uploadMultipleImagesMutation = useUploadMultipleImages();

  const uploadImageFn = async (
    file: File | null,
    options: UploadImageOptions
  ): Promise<string | null> => {
    if (!file) return null;
    return uploadImageMutation.mutateAsync({ file, options });
  };

  const uploadMultipleImagesFn = async (
    files: (File | null)[],
    options: UploadImageOptions
  ): Promise<(string | null)[]> => {
    return uploadMultipleImagesMutation.mutateAsync({ files, options });
  };

  return {
    uploadImage: uploadImageFn,
    uploadMultipleImages: uploadMultipleImagesFn,
    uploading: uploadImageMutation.isPending || uploadMultipleImagesMutation.isPending,
    error: uploadImageMutation.error || uploadMultipleImagesMutation.error,
    isPending: uploadImageMutation.isPending || uploadMultipleImagesMutation.isPending,
    isError: uploadImageMutation.isError || uploadMultipleImagesMutation.isError,
    isSuccess: uploadImageMutation.isSuccess || uploadMultipleImagesMutation.isSuccess,
  };
};

export type {
  UploadImageOptions,
  UploadImageVariables,
  UploadImageResponse,
  UploadMultipleImagesVariables,
} from '@/lib/api/image-upload';

