import * as yup from "yup";

export const signUpSchema = yup
  .object({
    email: yup.string().required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be atleast 6 characters")
      .required("Password is required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref(`password`), undefined], "Passwords don't match")
      .required("Re-enter your password"),
  })
  .required();
