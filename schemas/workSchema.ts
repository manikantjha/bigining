import * as yup from "yup";

export const workSchema = yup.object().shape({
  name: yup.string().trim().required("Wrok name is required"),
  description: yup.string().trim().required("Work description is required"),
  images: yup
    .array()
    .of(
      yup.object({
        original: yup.object({
          path: yup.string().required(),
          url: yup.string().required(),
          width: yup.number().required(),
          height: yup.number().required(),
        }),
        medium: yup.object({
          path: yup.string().required(),
          url: yup.string().required(),
          width: yup.number().required(),
          height: yup.number().required(),
        }),
        small: yup.object({
          path: yup.string().required(),
          url: yup.string().required(),
          width: yup.number().required(),
          height: yup.number().required(),
        }),
      })
    )
    .min(1, "Please upload at least one image")
    .required(),
});
