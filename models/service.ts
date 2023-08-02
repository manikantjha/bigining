import { Document, Schema, model, models } from "mongoose";

export interface IServiceDocument extends Document {
  title: string;
  list: string;
}

const serviceSchema = new Schema(
  {
    title: { type: String, required: true },
    list: [String],
  },
  { timestamps: true }
);

const Service = models.services || model("services", serviceSchema);

export default Service;
