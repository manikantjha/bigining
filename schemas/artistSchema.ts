import * as yup from "yup";
import { imageSchema } from "./imageSchemas";

export const artistSchema = yup.object().shape({
  name: yup.string().trim().required("Artist name is requried"),
  description: yup.string().trim(),
  category: yup.string().trim().required("Artist category is requried"),
  numberOfEvents: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable(),
  image: imageSchema.required("Artist image is requried"),
});
