import * as yup from "yup";
import { imageSchema } from "./imageSchemas";

export const teamMemberSchema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  image: imageSchema.required("Image is required"),
});
