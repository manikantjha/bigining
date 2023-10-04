import * as yup from "yup";

export const serviceSchema = yup
  .object({
    title: yup.string().required("Service title is required"),
    list: yup
      .array()
      .of(
        yup
          .string()
          .required("List item is requried")
          .typeError("List items must be strings")
      ),
  })
  .required();
