import { Schema, model, models } from "mongoose";

const packageSchema = new Schema({
  title: { type: String, required: true },
  price: Number,
  list: [String],
  createdAt: { type: Date, default: Date.now },
});

const packagesSchema = new Schema({ packages: [packageSchema] });

const Packages = models.packages || model("packages", packagesSchema);

export default Packages;
