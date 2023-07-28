import { IImageSize, IWorkImage } from "@/types/works";
import mongoose, { Document, Schema } from "mongoose";

export interface IWorkDocument extends Document {
  name: string;
  description: string;
  images: IWorkImage[];
}

const ImageSizeSchema = new Schema<IImageSize>({
  url: { type: String, required: true },
  path: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
});

const WorkImageSchema = new Schema<IWorkImage>({
  original: { type: ImageSizeSchema, required: true },
  medium: { type: ImageSizeSchema, required: true },
  small: { type: ImageSizeSchema, required: true },
});

const WorkSchema = new Schema<IWorkDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [WorkImageSchema], required: true },
});

const Work =
  mongoose.models.works || mongoose.model<IWorkDocument>("works", WorkSchema);

export default Work;
