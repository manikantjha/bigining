import * as yup from "yup";

export const figureSchema = yup
  .object({
    figures: yup.array().of(
      yup.object({
        figure: yup
          .number()
          .positive("Must be greater than 0")
          .required("Figure is required"),
        description: yup.string().required("Description is required"),
      })
    ),
  })
  .required();
