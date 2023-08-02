import { Schema, model, models } from "mongoose";

const figureSchema = new Schema({
  figure: { type: Number, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const figuresSchema = new Schema({ figures: [figureSchema] });

const Figures = models.figures || model("figures", figuresSchema);

export default Figures;
