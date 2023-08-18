import * as yup from "yup";

export const heroSchema = yup
  .object({
    title: yup.string().required("Title is required!"),
    description: yup.string(),
    imageURL: yup.string().required("Image is required!"),
    hasContactButton: yup.boolean(),
    isVideo: yup.boolean(),
  })
  .required();
