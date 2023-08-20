import { createGenericController } from "@/HOFs/controllersHOF";
import Review from "@/models/review";
import { reviewSchema } from "@/schemas/reviewSchema";

const reviewControllers = createGenericController({
  Model: Review,
  schema: reviewSchema,
  revalidate: async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/"}`
    );
  },
});

export default reviewControllers;
