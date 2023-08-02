import { Schema, model, models } from "mongoose";

const featureSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const figuresSchema = new Schema({ features: [featureSchema] });

const Features = models.features || model("features", figuresSchema);

export default Features;
