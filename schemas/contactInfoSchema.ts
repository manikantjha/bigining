import { phoneRegex } from "@/utils/utils";
import * as yup from "yup";

const optionalPhoneValidation = yup
  .string()
  .test("phone", "Please provide a valid phone number", function (value) {
    if (!value) {
      return true;
    }

    if (value && phoneRegex.test(value)) {
      return phoneRegex.test(value);
    }

    return false;
  });

export const contactInfoSchema = yup
  .object({
    title: yup.string().required("Title is required"),
    description: yup.string(),
    email: yup.string().email().required("Email is required"),
    phone1: yup
      .string()
      .matches(phoneRegex, "Please provide a valid phone number")
      .required("Phone number is required"),
    phone2: optionalPhoneValidation,
    address: yup.string().required("Address is required"),
  })
  .required();
