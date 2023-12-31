import { Schema, model, models } from "mongoose";

const contactInfoSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    email: { type: String, required: true },
    phone1: { type: String, required: true },
    phone2: { type: String },
    address: { type: String, required: true },
  },
  { timestamps: true }
);

const ContactInfo =
  models.contactInfos || model("contactInfos", contactInfoSchema);

export default ContactInfo;
