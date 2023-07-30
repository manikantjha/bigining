import * as yup from "yup";

export const artistSchema = yup.object().shape({
  name: yup.string().trim().required("Artist name is requried"),
  description: yup.string().trim(),
  category: yup.string().trim().required("Artist category is requried"),
  numberOfEvents: yup
    .number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable(),
  image: yup
    .object({
      original: yup
        .object({
          url: yup.string().required(),
          width: yup.number().integer().required(),
          height: yup.number().integer().required(),
          path: yup.string().required(),
        })
        .required(),
      medium: yup
        .object({
          url: yup.string().required(),
          width: yup.number().integer().required(),
          height: yup.number().integer().required(),
          path: yup.string().required(),
        })
        .required(),
      small: yup
        .object({
          url: yup.string().required(),
          width: yup.number().integer().required(),
          height: yup.number().integer().required(),
          path: yup.string().required(),
        })
        .required(),
    })
    .required("Artist image is requried"),
});
