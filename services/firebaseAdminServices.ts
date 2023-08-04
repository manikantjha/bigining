import * as admin from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

export function initFirebaseAdminApp() {
  try {
    if (
      !process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CONFIG ||
      !process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
    ) {
      throw new Error("Firebase config not provided!");
    }
    const firebaseAdminConfig = JSON.parse(
      process.env.NEXT_PUBLIC_FIREBASE_ADMIN_CONFIG
    );

    const app = admin.initializeApp({
      credential: admin.cert(firebaseAdminConfig),
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });

    return app;
  } catch (error) {
    console.log("Firebase admin initialization error: ", error);
  }
}

export const app = initFirebaseAdminApp();

export const storage = getStorage();
