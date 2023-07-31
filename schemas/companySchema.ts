import * as yup from "yup";

export const companySchema = yup.object().shape({
  name: yup.string().trim().required("Company name is requried"),
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
    .required("Company logo is requried"),
});
