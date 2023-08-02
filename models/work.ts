import { IImage } from "@/types/image";
import { Document, Schema, model, models } from "mongoose";
import { imageSchema } from "./image";

export interface IWorkDocument extends Document {
  name: string;
  description: string;
  images: IImage[];
}

const workSchema = new Schema<IWorkDocument>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    images: { type: [imageSchema], required: true },
  },
  { timestamps: true }
);

const Work = models.works || model<IWorkDocument>("works", workSchema);

export default Work;
