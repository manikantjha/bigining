import Reviews from "@/models/reviews";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import * as yup from "yup";

// Validation schema using Yup
const reviewSchema = yup.object({
  email: yup.string().required().email(),
  name: yup.string().required(),
  rating: yup.number().required().min(1).max(5),
  message: yup.string().required().trim(),
});

// Add review controller
export async function addReview(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Validate the request data
    const { email, rating, message, name } = req.body;
    await reviewSchema.validate({ email, rating, message, name });

    // Check if a review with the same email already exists
    const existingReview = await Reviews.findOne({ email });
    if (existingReview) {
      return res
        .status(400)
        .json({ error: "A review with this email already exists" });
    }

    const reviewCount = await Reviews.countDocuments();
    if (reviewCount >= 50) {
      return res.status(400).json({ error: "Review limit (50) reached" });
    }

    // Create and save the review
    const review = new Reviews({ email, rating, message, name });
    await review.save();

    res.status(201).json({ message: "Review added successfully", review });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}

// Get all reviews controller
export async function getReviews(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Fetch all reviews from the database
    const reviews = await Reviews.find();

    res.status(200).json({ reviews });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}

export default async function deleteReview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Get the review ID from the request body
    const { id } = req.body;

    // Find the review by ID and delete it
    const deletedReview = await Reviews.findByIdAndDelete(new ObjectId(id));

    if (!deletedReview) {
      return res.status(404).json({ error: "Review not found" });
    }

    res
      .status(200)
      .json({ message: "Review deleted successfully", review: deletedReview });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
}
