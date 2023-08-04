import * as yup from "yup";

export const featureSchema = yup
  .object({
    features: yup.array().of(
      yup.object({
        title: yup.string().required("Title is required"),
        description: yup.string().required("Description is required"),
      })
    ),
  })
  .required();
