import { NextApiRequest, NextApiResponse } from "next";
import emailjs from "@emailjs/browser";

export async function contact(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;

    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }

    if (
      !process.env.EMAIL_JS_SERVICE_ID ||
      !process.env.EMAIL_JS_TEMPLATE_ID ||
      !process.env.EMAIL_JS_PUBLIC_KEY
    ) {
      throw new Error("Failed to get env variables!");
    }

    const response = await emailjs.sendForm(
      // "YOUR_SERVICE_ID",
      process.env.EMAIL_JS_SERVICE_ID,
      // "YOUR_TEMPLATE_ID",
      process.env.EMAIL_JS_TEMPLATE_ID,
      // Data,
      data,
      // "YOUR_PUBLIC_KEY"
      process.env.EMAIL_JS_PUBLIC_KEY
    );

    return res.status(200).json({ response });
  } catch (error: any) {
    console.log(error);
    return res.status(500).json({
      error: error?.message ? error?.message : "Something went wrong!",
    });
  }
}
