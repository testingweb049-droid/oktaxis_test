import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key: process.env.CLOUDINARY_API_KEY || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

export interface UploadResult {
  success: boolean;
  url?: string;
  public_id?: string;
  error?: string;
}

/**
 * Upload image to Cloudinary
 */
export async function uploadImageToCloudinary(
  file: File | Blob,
  folder: string = "oktaxis-drivers"
): Promise<UploadResult> {
  try {
    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64 = buffer.toString("base64");
    const dataURI = `data:${file.type};base64,${base64}`;

    // Upload to Cloudinary
    // Note: Timeout is handled at the API route level (60s) and fetch level (55s)
    const result = await cloudinary.uploader.upload(dataURI, {
      folder: folder,
      resource_type: "image",
      transformation: [
        {
          quality: "auto",
          fetch_format: "auto",
        },
      ],
    });

    return {
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * Delete image from Cloudinary
 */
export async function deleteImageFromCloudinary(
  publicId: string
): Promise<boolean> {
  try {
    await cloudinary.uploader.destroy(publicId);
    return true;
  } catch (error) {
    return false;
  }
}

export default cloudinary;

