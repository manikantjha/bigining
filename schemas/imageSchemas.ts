import * as yup from "yup";

export const imageSizeSchema = yup.object().shape({
  url: yup.string().required("Image URL is required"),
  width: yup.number().integer().min(1).required("Image width is required"),
  height: yup.number().integer().min(1).required("Image height is required"),
  path: yup.string().required("Image path is required"),
});

export const imageSchema = yup.object({
  original: imageSizeSchema.required(),
  medium: imageSizeSchema.required(),
  small: imageSizeSchema.required(),
});
