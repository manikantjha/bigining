import { Schema, model, models } from "mongoose";
import { imageSchema } from "./images";

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: imageSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const Company = models.companies || model("companies", companySchema);

export default Company;
