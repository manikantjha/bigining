import { phoneRegex } from "@/utils/utils";
import * as yup from "yup";

export const navratriTicketSchema = yup
  .object({
    name: yup.string().required("Name is required"),
    phone: yup
      .string()
      .matches(phoneRegex, "A valid phone number is required")
      .required("Phone number is required!"),
    email: yup
      .string()
      .email("Please enter a valid Email")
      .required("Email is required"),
    pass: yup.string().required("Pass type is required"),
    passPrice: yup.number(),
    numberOfAttendees: yup
      .number()
      .min(1, "Atleast 1 attendee is required")
      .required("Please provide number of attendees"),
    dates: yup
      .array()
      .of(yup.string())
      .min(1, "Please select at least one date"),
  })
  .required();
