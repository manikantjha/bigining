import { getEnvVariable } from "@/utils/helpers";
import nodemailer from "nodemailer";

const email = getEnvVariable("EMAIL");
const pass = getEnvVariable("EMAIL_PASS");

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: email,
    pass,
  },
});

export const mailOptions = {
  from: email,
  to: email,
};
