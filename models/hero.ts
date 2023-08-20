import { Schema, model, models } from "mongoose";
import { imageSchema } from "./image";

const heroSchema = new Schema({
  pageId: String,
  title: String,
  description: String,
  image: imageSchema,
  hasContactButton: Boolean,
});

const Heroes = models.hero || model("hero", heroSchema);

export default Heroes;
