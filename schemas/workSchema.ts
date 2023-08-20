import * as yup from "yup";
import { imageSchema } from "./imageSchemas";

export const workSchema = yup.object().shape({
  name: yup.string().trim().required("Wrok name is required"),
  description: yup.string().trim().required("Work description is required"),
  images: yup
    .array()
    .of(imageSchema)
    .min(1, "Please upload at least one image")
    .required(),
});
