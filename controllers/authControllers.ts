import Users from "@/models/users";
import { auth } from "@/services/firebaseServices";
import { getEnvVariable } from "@/utils/server";
import { signJWT } from "@/utils/token";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function signup(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;

    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }

    const users = await Users.find();

    if (users.length > 0) {
      throw new Error("Max users limit reached!");
    }

    const response = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    if (!response || (response && !response.user)) {
      throw new Error("Something went wrong! User not created!");
    }

    await Users.create({
      uid: response.user.uid,
      name: "",
      email: response.user.email,
    });

    const token = await signJWT(
      {
        uid: response.user.uid,
        displayName: response.user.displayName,
        email: response.user.email,
      },
      { expiresIn: "7d" }
    );

    return res.status(200).json({ token });
  } catch (error: any) {
    return res.status(500).json({
      error: error?.message ? error?.message : "Something went wrong!",
    });
  }
}

export async function signin(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;

    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }

    const email = getEnvVariable("ADMIN_EMAIL");

    if (email != data.email) {
      throw new Error("Unauthorized email address!");
    }

    const response = await signInWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const token = await signJWT(
      {
        uid: response.user.uid,
        displayName: response.user.displayName,
        email: response.user.email,
      },
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
