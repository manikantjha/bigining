import { Schema, model, models } from "mongoose";

const upcomingEventSchema = new Schema(
  {
    imageURL: { type: String, required: true },
    name: { type: String, trim: true, required: true },
    description: { type: String, trim: true },
    startDate: { type: Date, trim: true },
    endDate: { type: Date, trim: true },
    location: { type: String, trim: true },
  },
  { timestamps: true }
);

const upcomingEventsSchema = new Schema({
  upcomingEvents: [upcomingEventSchema],
});

const UpcomingEvents =
  models.upcomingEvents || model("upcomingEvents", upcomingEventsSchema);

export default UpcomingEvents;
