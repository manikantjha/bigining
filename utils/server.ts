import { IImageSize, IWorkImage } from "@/types/works";
import { storage } from "firebase-admin";
import { NextApiResponse } from "next";

type EnvVariableKey =
  | "JWT_SECRET"
  | "JWT_EXPIRES_IN"
  | "MONGO_URI"
  | "NEXT_PUBLIC_FIREBASE_CONFIG"
  | "NEXT_PUBLIC_DEV_BASE_PATH"
  | "NEXT_PUBLIC_BASE_PATH"
  | "ADMIN_EMAIL"
  | "EMAIL"
  | "EMAIL_PASS";

export function getEnvVariable(key: EnvVariableKey): string {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}

// Helper function to send response
export const sendResponse = <T>(
  res: NextApiResponse,
  status: number,
  data: T
) => {
  res.status(status).json(data);
};

// Helper function to send error response
export const sendError = (
  res: NextApiResponse,
  status: number,
  message: string
) => {
  res.status(status).json({ success: false, error: message });
};

// Function to upload image to Firebase Storage and get its URL
export const uploadImageToFirebase = async (
  image: IImageSize
): Promise<string> => {
  // Convert imageBase64 to a Buffer
  const buffer = Buffer.from(image.url.split(",")[1], "base64");

  const file = storage().bucket().file(image.path);

  // Upload the image to Firebase Storage and get its URL
  const result = await file
    .save(buffer, {
      metadata: {
        contentType: "image/webp",
      },
    })
    .then(() => {
      return file.getSignedUrl({
        action: "read",
        expires: "03-09-2500",
      });
    })
    .then((urls: any[]) => {
      const url = urls[0];
      return url;
    })
    .catch((err: any) => {
      console.log(`Unable to upload encoded file ${err}`);
    });

  return result;
};

// Function to delete image from Firebase Storage
export const deleteImageFromFirebase = async (image: IWorkImage) => {
  try {
    await storage().bucket().file(image.original.path).delete();
    await storage().bucket().file(image.medium.path).delete();
    await storage().bucket().file(image.small.path).delete();
  } catch (error) {
    console.error("Error deleting image from Firebase:", error);
  }
};
