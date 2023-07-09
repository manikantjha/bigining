import Users from "@/models/users";
import { auth } from "@/services/firebaseServices";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";
const jwt = require("jsonwebtoken");

export async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;
    const key = process.env.JWT_SECRET;
    if (!data) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    if (!key) {
      throw new Error("Failed to get token!");
    }
    const users = await Users.find();
    if (users.length > 0) {
      throw new Error("Max users limit reached!");
    }
    const firebaseResponse = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );
    if (!firebaseResponse || (firebaseResponse && !firebaseResponse.user)) {
      throw new Error("Something went wrong! User not created!");
    }
    const response = await Users.create({
      uid: firebaseResponse.user.uid,
      name: "",
      email: firebaseResponse.user.email,
    });
    const token = jwt.sign(
      {
        uid: firebaseResponse.user.uid,
        displayName: firebaseResponse.user.displayName,
        email: firebaseResponse.user.email,
      },
      key,
      { expiresIn: "7d" }
    );
    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message ? error?.message : "Something went wrong!",
    });
  }
}

export async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    const email = process.env.ADMIN_EMAIL;
    const key = process.env.JWT_SECRET;

    if (!key) {
      throw new Error("Failed to get key!");
    }

    if (email != data.email) {
      throw new Error("Unauthorized email address!");
    }

    const response = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const token = jwt.sign(
      {
        uid: response.user.uid,
        displayName: response.user.displayName,
        email: response.user.email,
      },
      key,
      { expiresIn: "7d" }
    );

    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message ? error?.message : "Something went wrong!",
    });
  }
}

export async function signout(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await signOut(auth);
    return res.status(200).json({ response });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message ? error?.message : "Something went wrong!",
    });
  }
}
