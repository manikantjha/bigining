import { createGenericController } from "@/HOFs/controllersHOF";
import Review from "@/models/review";
import { reviewSchema } from "@/schemas/reviewSchema";
import { revalidatePath, sendError, sendResponse } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

const reviewControllers = createGenericController({
  Model: Review,
  schema: reviewSchema,
  revalidate: async () => {
    revalidatePath("/");
  },
});

export default reviewControllers;

export const addReview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    try {
      await reviewSchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const existingReviews = await Review.find({ email: req.body.email });

    if (existingReviews.length > 0) {
      return sendError(
        res,
        400,
        "A review with the given email already exists!"
      );
    }

    const newItem = new Review(req.body);

    await newItem.save();

    revalidatePath("/");

    sendResponse(res, 201, newItem);
  } catch (error) {
    sendError(res, 500, "Internal server error!");
  }
};
