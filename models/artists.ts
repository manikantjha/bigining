import { Schema, model, models } from "mongoose";

const artistSchema = new Schema(
  {
    imageURL: { type: String, required: [true, "Artist image is required!"] },
    name: {
      type: String,
      required: [true, "Artist name is required!"],
      trim: true,
    },
    description: { type: String, trim: true },
    category: { type: String, required: true, default: "Celebrity" },
    numberOfEvents: { type: Number },
  },
  { timestamps: true }
);

const artistsSchema = new Schema({ artists: [artistSchema] });

const Artists = models.artists || model("artists", artistsSchema);

export default Artists;
