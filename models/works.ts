import { Schema, model, models } from "mongoose";

const workSchema = new Schema(
  {
    imageURL: { type: String, required: true },
    name: { type: String },
    description: String,
  },
  { timestamps: true }
);

const worksSchema = new Schema({ works: [workSchema] });

const Works = models.works || model("works", worksSchema);

export default Works;
