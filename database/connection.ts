import { initFirebaseAdminApp } from "@/services/firebaseAdminServices";
import { getEnvVariable } from "@/utils/helpers";
import admin from "firebase-admin";
import mongoose from "mongoose";

const connect = async () => {
  try {
    const MONGO_URI = getEnvVariable("MONGO_URI");
    if (!MONGO_URI) throw new Error("Unable to Connect to the Database");
    const { connection } = await mongoose.connect(MONGO_URI);
    if (connection.readyState === 1) {
      console.log("Database connected");
      if (!admin.app.length) {
        initFirebaseAdminApp();
      }
    }
  } catch (error) {
    Promise.reject(error);
  }
};

export default connect;
