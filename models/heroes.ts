import { Schema, model, models } from "mongoose";

const heroSchema = new Schema({
  pageId: String,
  title: String,
  description: String,
  imageURL: String,
  hasContactButton: Boolean,
  isVideo: Boolean,
});

const Heroes = models.hero || model("hero", heroSchema);

export default Heroes;
