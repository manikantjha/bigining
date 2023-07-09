import { Schema, model, models } from "mongoose";

const celebSchema = new Schema(
  {
    imageURL: { type: String, required: [true, "Celeb logo is required!"] },
    name: {
      type: String,
      required: [true, "Celebrity name is required!"],
      trim: true,
    },
    description: { type: String },
  },
  { timestamps: true }
);

const celebsSchema = new Schema({ celebs: [celebSchema] });

const Celebs = models.celebs || model("celebs", celebsSchema);

export default Celebs;
