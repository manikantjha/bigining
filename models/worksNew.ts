import { ImageSize, WorkImage } from "@/types/worksNew";
import mongoose, { Document, Schema } from "mongoose";

export interface IWorkNewDocument extends Document {
  name: string;
  description: string;
  images: WorkImage[];
}

const ImageSizeSchema = new Schema<ImageSize>({
  url: { type: String, required: true },
  path: { type: String, required: true },
  width: { type: Number, required: true },
  height: { type: Number, required: true },
});

const WorkImageSchema = new Schema<WorkImage>({
  original: { type: ImageSizeSchema, required: true },
  medium: { type: ImageSizeSchema, required: true },
  small: { type: ImageSizeSchema, required: true },
});

const WorkSchema = new Schema<IWorkNewDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [WorkImageSchema], required: true },
});

const Work =
  mongoose.models.workNew ||
  mongoose.model<IWorkNewDocument>("workNew", WorkSchema);

export default Work;
