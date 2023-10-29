import * as yup from "yup";
import { imageSchema } from "./imageSchemas";

export const upcomingEventSchema = yup.object().shape({
  name: yup.string().trim().required("Event name is requried"),
  description: yup.string().trim(),
  image: imageSchema.required("Event image is requried"),
  startDate: yup.date().nullable(),
  endDate: yup
    .date()
    .when("startDate", (startDate, schema) => {
      if (startDate && Array.isArray(startDate) && startDate[0]) {
        return schema.min(
          startDate[0],
          "End date must be after or equal to the start date"
        );
      }
      return schema;
    })
    .nullable(),
  location: yup.string(),
});
