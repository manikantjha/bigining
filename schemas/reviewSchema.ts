import * as yup from "yup";

export const reviewSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  rating: yup.number().required("Rating is required").min(1).max(5),
  name: yup.string().required("Name is required"),
  message: yup.string().required("Message is required"),
  isActive: yup.boolean(),
});
