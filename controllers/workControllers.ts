import Work from "@/models/work";
import { workSchema } from "@/schemas/workSchema";
import { sendError, sendResponse } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";
import { createGenericController } from "../HOFs/controllersHOF";

const workControllers = createGenericController({
  Model: Work,
  schema: workSchema,
  imageKey: "images",
  revalidate: async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/"}`
    );
    const limit = 10;
    const totalItems = await Work.count();
    const totalPages = Math.ceil(totalItems / limit);

    for (let i = 0; i < totalPages; i++) {
      await fetch(
        `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
          process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
        }&path=${"/works"}/${i + 1}`
      );
    }

    // To-Do: Also revalidate work details page
  },
});

export default workControllers;

export const getWorksForGalleryPaginated = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // Define the pagination parameters
    const { page = 1, limit = 10 } = req.query;
    const parsedPageNumber = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);

    // Calculate the number of documents to skip
    const skip = (parsedPageNumber - 1) * parsedLimit;

    // Get the total number of documents
    const totalWorks = await Work.countDocuments();

    // Fetch paginated works from the database
    const works = await Work.find(
      {},
      { _id: 1, name: 1, images: { $slice: 1 } }
    )
      .skip(skip)
      .limit(parsedLimit)
      .lean();
    if (!works) sendError(res, 404, "No works found!");
    sendResponse(res, 200, {
      totalWorks,
      currentPage: parsedPageNumber,
      works,
    });
  } catch (error) {
    console.error("Error fetching paginated works for gallery:", error);
    sendError(res, 500, "Internal server error!");
  }
};
