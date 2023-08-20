import * as yup from "yup";
import { imageSchema } from "./imageSchemas";

export const companySchema = yup.object().shape({
  name: yup.string().trim().required("Company name is requried"),
  image: imageSchema.required("Company logo is requried"),
});
