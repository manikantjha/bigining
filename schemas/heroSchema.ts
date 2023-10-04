import * as yup from "yup";
import { imageSchema } from "./imageSchemas";

export const heroSchema = yup
  .object({
    title: yup.string().required("Title is required!"),
    description: yup.string(),
    image: imageSchema.required("Image is required!"),
    hasContactButton: yup.boolean(),
  })
  .required();
