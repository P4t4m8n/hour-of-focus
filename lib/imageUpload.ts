import { AppError } from "@/utils/server/Error.util";

const uploadToCdn = async (file: Blob): Promise<string> => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const cloudPreset = process.env.CLOUDINARY_UPLOAD_PRESET;

  if (!cloudName || !cloudPreset) {
    throw AppError.create("No cloudinary credentials", 502);
  }
  const UPLOAD_URL = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("upload_preset", cloudPreset);
  formData.append("file", file);
  formData.append("folder", "hof");
  const res = await fetch(UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  const result = await res.json();

  if (!result || !result?.secure_url) {
    throw AppError.create("No return value", 502);
  }

  return result.secure_url;
};

const removeFromCdn = async (assetId: string): Promise<void> => {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const cloudApiKey = process.env.CLOUDINARY_API_KEY;

  if (!cloudName || !cloudApiKey) {
    throw AppError.create("No cloudinary credentials", 502);
  }
  const DELETE_URL = `https://api.cloudinary.com/v1_1/${cloudName}/video/destroy`;

  const res = await fetch(`${DELETE_URL}/${assetId}`, {
    method: "POST",
    body: JSON.stringify({
      assetId,
      api_key: cloudApiKey,
    }),
  });

  const result = await res.json();

  if (!result || result?.result !== "ok") {
    throw AppError.create("No return value", 502);
  }
};

export const imageUpload = {
  uploadToCdn,
  removeFromCdn,
};
