import { getEnvVariable } from "@/utils/helpers";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

function initFirebaseApp() {
  try {
    const FIREBASE_CONFIG = getEnvVariable("NEXT_PUBLIC_FIREBASE_CONFIG");

    const firebaseConfig = JSON.parse(FIREBASE_CONFIG);

    const app = initializeApp(firebaseConfig);

    return app;
  } catch (error) {
    console.log("Firebase initialization error: ", error);
  }
}

export const app = initFirebaseApp();
export const auth = getAuth();
export const storage = getStorage();
