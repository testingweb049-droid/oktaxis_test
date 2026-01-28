"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { FileText, X, Car } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  name: string;
  label: string;
  value: File | null;
  preview: string | null;
  onChange: (file: File | null) => void;
  onPreviewChange: (preview: string | null) => void;
  error?: boolean;
  accept?: string;
  maxSizeMB?: number;
  icon?: React.ReactNode;
}

export function FileUpload({
  name,
  label,
  value,
  preview,
  onChange,
  onPreviewChange,
  error = false,
  accept = "image/png,image/jpeg,image/jpg",
  maxSizeMB = 10,
  icon,
}: FileUploadProps) {
  const { toast } = useToast();
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(preview);

  // Sync preview with prop
  useEffect(() => {
    setPreviewUrl(preview);
  }, [preview]);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (!file) return;

    const MAX_FILE_SIZE = maxSizeMB * 1024 * 1024;

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      const fileSizeMB = (file.size / (1024 * 1024)).toFixed(2);
      toast({
        title: "File Too Large",
        description: `The ${label.toLowerCase()} file is ${fileSizeMB}MB. Maximum file size is ${maxSizeMB}MB.`,
        variant: "destructive",
      });
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    // Validate file type
    if (!file.type.match(/^image\/(jpeg|jpg|png)$/i)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a JPEG, JPG, or PNG image file.",
        variant: "destructive",
      });
      if (inputRef.current) inputRef.current.value = "";
      return;
    }

    // Clean up previous preview
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    // Create new preview
    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrl(newPreviewUrl);
    onPreviewChange(newPreviewUrl);
    onChange(file);
  };

  const handleRemove = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    onPreviewChange(null);
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div
      className={cn(
        "w-full rounded-lg bg-white py-3 px-1",
        error ? "border-red-500" : "border-gray-200"
      )}
    >
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label} <span className="text-red-500">*</span>
      </label>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
        id={name}
      />
      {previewUrl ? (
        <div className="relative w-full mt-2">
          <div className="relative w-full h-64 sm:h-72 md:h-80 border border-gray-300 rounded-lg overflow-hidden bg-white shadow-none">
            <Image
              src={previewUrl}
              alt={`${label} preview`}
              fill
              className="object-contain"
            />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {value && "name" in value && (
            <p className="text-xs text-gray-600 mt-2 truncate">
              {(value as File).name}
            </p>
          )}
        </div>
      ) : (
        <label
          htmlFor={name}
          className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-400 rounded-lg cursor-pointer hover:border-gray-500 transition-colors bg-white mt-2 shadow-none"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="relative">
              <FileText className="h-8 w-8 text-gray-400 mb-2" />
              {icon || <Car className="absolute -bottom-1 -right-1 h-4 w-4 text-gray-500" />}
            </div>
            <p className="mb-1 text-sm text-gray-500 text-center">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-400">PNG, JPG up to {maxSizeMB}MB</p>
          </div>
        </label>
      )}
    </div>
  );
}

