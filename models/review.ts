import { models, Schema, model } from "mongoose";

// Define the Review schema
const reviewSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create the Review model
const Review = models.reviews || model("reviews", reviewSchema);

export default Review;
