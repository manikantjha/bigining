import Users from "@/models/user";
import { signUpSchema } from "@/schemas/signUpSchema";
import { app } from "@/services/firebaseAdminServices";
import { sendError, sendResponse } from "@/utils/server";
import { getAuth } from "firebase-admin/auth";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

export async function signUp(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;

    try {
      await signUpSchema.validate(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const emails = process.env.SIGNUP_EMAILS;

    if (!emails) sendError(res, 500, "Internal server error!");

    const aryValidEmails = emails?.split(",");

    if (!aryValidEmails?.includes(data.email))
      sendError(res, 401, "Email not supported!");

    const user = await getAuth(app).createUser({
      email: data.email,
      emailVerified: false,
      password: data.password,
      displayName: data.displayName,
      disabled: false,
    });

    // Store the user in the database.
    await Users.create({
      uid: user.uid,
      name: user.displayName,
      email: user.email,
    });

    const token = await getAuth().createCustomToken(user.uid);
    sendResponse(res, 200, { token, user });
  } catch (error) {
    console.log(error);
    sendError(res, 500, "Internal server error!");
  }
}
