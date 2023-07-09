import { Schema, model, models } from "mongoose";

const companySchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Company name is required!"],
      trim: true,
    },
    imageURL: { type: String, required: [true, "Company logo is required!"] },
  },
  { timestamps: true }
);

const companiesSchema = new Schema({ companies: [companySchema] });

const Companies = models.companies || model("companies", companiesSchema);

export default Companies;
