import { Schema, model, models } from "mongoose";

const figureSchema = new Schema(
  {
    figure: { type: Number, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const figuresSchema = new Schema(
  { figures: [figureSchema] },
  { timestamps: true }
);

const Figures = models.figures || model("figures", figuresSchema);

export default Figures;
