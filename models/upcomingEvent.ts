import { Schema, model, models } from "mongoose";
import { imageSchema } from "./image";

const upcomingEventSchema = new Schema(
  {
    image: {
      type: imageSchema,
      required: true,
    },
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    startDate: { type: Date },
    endDate: { type: Date },
    location: { type: String, trim: true },
  },
  { timestamps: true }
);

const UpcomingEvent =
  models.upcomingEvents || model("upcomingEvents", upcomingEventSchema);

export default UpcomingEvent;
