import { useState, useEffect, useCallback } from "react";

interface UseFilePreviewReturn {
  preview: string | null;
  setPreview: (preview: string | null) => void;
  clearPreview: () => void;
}

export function useFilePreview(file: File | null): UseFilePreviewReturn {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
      setPreview(null);
      return;
    }

    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);

    return () => {
      URL.revokeObjectURL(previewUrl);
    };
  }, [file]);

  const clearPreview = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview(null);
  }, [preview]);

  return {
    preview,
    setPreview,
    clearPreview,
  };
}

