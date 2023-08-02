import Review from "@/models/review";
import { reviewSchema } from "@/schemas/reviewSchema";
import { sendError, sendResponse } from "@/utils/server";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

export async function getReviews(req: NextApiRequest, res: NextApiResponse) {
  try {
    const reviews = await Review.find();
    sendResponse(res, 201, reviews);
  } catch (error) {
    sendError(res, 500, "Internal server error!");
  }
}

export const getReviewsPaginated = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const parsedPageNumber = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    const skip = (parsedPageNumber - 1) * parsedLimit;

    const totalReveiws = await Review.countDocuments();

    const reviews = await Review.find().skip(skip).limit(parsedLimit);

    if (!reviews) sendError(res, 404, "No reviews found!");

    sendResponse(res, 200, {
      totalReveiws,
      currentPage: parsedPageNumber,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching paginated reviews: ", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const getAvtiveReviewsPaginated = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const parsedPageNumber = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    const skip = (parsedPageNumber - 1) * parsedLimit;

    const totalReveiws = await Review.countDocuments({ isActive: true });

    const reviews = await Review.find({ isActive: true })
      .skip(skip)
      .limit(parsedLimit);

    if (!reviews) sendError(res, 404, "No reviews found!");

    sendResponse(res, 200, {
      totalReveiws,
      currentPage: parsedPageNumber,
      reviews,
    });
  } catch (error) {
    console.error("Error fetching paginated reviews: ", error);
    sendError(res, 500, "Internal server error!");
  }
};

export async function addReview(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { email, rating, message, name, isActive } = req.body;
    await reviewSchema.validate({ email, rating, message, name });

    const existingReview = await Review.findOne({ email });

    if (existingReview) {
      sendError(res, 400, "A review with this email already exists!");
    }

    const reviewCount = await Review.countDocuments();

    if (reviewCount >= 50) {
      sendError(res, 400, "Review limit (50) reached!");
    }

    const review = new Review({ email, rating, message, name, isActive });
    await review.save();
    sendResponse(res, 201, review);
  } catch (error: any) {
    console.error("Error adding review:", error);
    sendError(res, 500, "Internal server error!");
  }
}

export const updateArtist = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid review ID!");
    }

    // Validate the request body
    try {
      await reviewSchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const existingReview = await Review.findById(id);
    if (!existingReview) {
      return sendError(res, 404, "Review not found!");
    }

    const { email, rating, message, name, isActive } = req.body;

    existingReview.set({
      name,
      email,
      rating,
      message,
      isActive,
    });

    await existingReview.save();

    sendResponse(res, 200, existingReview);
  } catch (error) {
    console.error("Error updating review:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export default async function deleteReview(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid review ID!");
    }
    const deletedReview = await Review.findByIdAndDelete(new ObjectId(id));

    if (!deletedReview) {
      sendError(res, 500, "Review not found!");
    }

    sendResponse(res, 200, {
      message: "Review deleted successfully!",
      deletedReview,
    });
  } catch (error) {
    sendError(res, 500, "Internal server error!");
  }
}
