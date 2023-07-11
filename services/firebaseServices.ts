import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

function initFirebaseApp() {
  try {
    if (!process.env.NEXT_PUBLIC_FIREBASE_CONFIG) {
      throw new Error("Firebase config not provided.");
    }

    const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);

    const app = initializeApp(firebaseConfig);

    return app;
  } catch (error) {
    console.log("Firebase initialization error: ", error);
  }
}

export const app = initFirebaseApp();
export const auth = getAuth();
export const storage = getStorage();
