import { Schema, model, models } from "mongoose";
import { imageSchema } from "./image";

const artistSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      default: "celebrity",
      trim: true,
    },
    numberOfEvents: {
      type: Number,
    },
    image: {
      type: imageSchema,
      required: true,
    },
  },
  { timestamps: true }
);

const Artist = models.artists || model("artists", artistSchema);

export default Artist;
