import { IImage, IImageSize } from "@/types/image";
import { storage } from "firebase-admin";
import { NextApiResponse } from "next";

type EnvVariableKey =
  | "JWT_SECRET"
  | "JWT_EXPIRES_IN"
  | "MONGO_URI"
  | "NEXT_PUBLIC_FIREBASE_CONFIG"
  | "NEXT_PUBLIC_DEV_BASE_PATH"
  | "NEXT_PUBLIC_BASE_PATH"
  | "SIGNUP_EMAILS"
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

export const uploadImageToFirebaseAndGetURL = async (
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

const uploadImageToFirebaseAndGetObject = async (
  image: IImage
): Promise<IImage> => {
  if (image.original.url.startsWith("data:image")) {
    // New image, upload to Firebase
    const originalUrl = await uploadImageToFirebaseAndGetURL(image.original);
    const mediumUrl = await uploadImageToFirebaseAndGetURL(image.medium);
    const smallUrl = await uploadImageToFirebaseAndGetURL(image.small);

    return {
      original: {
        url: originalUrl,
        width: image.original.width,
        height: image.original.height,
        path: image.original.path,
      },
      medium: {
        url: mediumUrl,
        width: image.medium.width,
        height: image.medium.height,
        path: image.medium.path,
      },
      small: {
        url: smallUrl,
        width: image.small.width,
        height: image.small.height,
        path: image.small.path,
      },
    };
  } else {
    // Existing image, keep the same URL
    return image;
  }
};

// A function to upload image/images to Firebase Storage and get IImage/IImage[]
export const firebaseImageUploader = async <T extends IImage[] | IImage>(
  images: T
): Promise<T> => {
  if (Array.isArray(images)) {
    const temp: IImage[] = await Promise.all(
      images.map(uploadImageToFirebaseAndGetObject)
    );
    return temp as T;
  } else {
    const temp = await uploadImageToFirebaseAndGetObject(images);
    return temp as T;
  }
};

// Function to delete image from Firebase Storage
export const deleteImageFromFirebase = async (image: IImage) => {
  try {
    await storage().bucket().file(image.original.path).delete();
    await storage().bucket().file(image.medium.path).delete();
    await storage().bucket().file(image.small.path).delete();
  } catch (error) {
    console.error("Error deleting image from Firebase:", error);
  }
};

export const revalidatePath = async (path: string) => {
  console.log("Revalidating Path: ", path);
  await fetch(
    `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${process.env.NEXT_PUBLIC_REVALIDATION_TOKEN}&path=${path}`
  );
};
