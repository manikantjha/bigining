import * as yup from "yup";

export const signInSchema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be atleast 6 characters")
      .required("Password is required"),
  })
  .required();
