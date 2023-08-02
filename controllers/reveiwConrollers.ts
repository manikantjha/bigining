import { createGenericController } from "@/HOFs/controllersHOF";
import Review from "@/models/review";
import { reviewSchema } from "@/schemas/reviewSchema";

const reviewControllers = createGenericController({
  Model: Review,
  schema: reviewSchema,
});

export default reviewControllers;
