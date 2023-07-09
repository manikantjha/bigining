import { Schema, model, models } from "mongoose";

const workSchema = new Schema({
  name: String,
  description: String,
  imageURL: String,
  createdAt: { type: Date, default: Date.now },
});

const worksSchema = new Schema({ works: [workSchema] });

const Works = models.works || model("works", worksSchema);

export default Works;
