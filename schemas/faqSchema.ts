import * as yup from "yup";

export const faqSchema = yup
  .object({
    question: yup.string().required("Question is required"),
    answer: yup.string().required("Answer is required"),
  })
  .required();
