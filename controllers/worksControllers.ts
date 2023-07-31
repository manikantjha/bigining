import Work, { IWorkDocument } from "@/models/works";
import { workSchema } from "@/schemas/workSchema";
import { IImage } from "@/types/images";
import { IWork } from "@/types/works";
import {
  deleteImageFromFirebase,
  firebaseImageUploader,
  sendError,
  sendResponse,
} from "@/utils/server";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

export const getWorksPaginated = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const parsedPageNumber = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    // Calculate the number of documents to skip
    const skip = (parsedPageNumber - 1) * parsedLimit;

    // Get the total number of documents
    const totalWorks = await Work.countDocuments();

    // Fetch paginated works from the database
    const works = await Work.find().skip(skip).limit(parsedLimit);
    if (!works) sendError(res, 404, "No works found!");
    sendResponse(res, 200, {
      totalWorks,
      currentPage: parsedPageNumber,
      works,
    });
  } catch (error) {
    console.error("Error fetching paginated works: ", error);
    sendError(res, 500, "Internal server error!");
  }
};

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

export const getAllWorks = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const works = await Work.find({});
    if (!works) sendError(res, 404, "No works found!");
    sendResponse(res, 200, works);
  } catch (error) {
    console.error("Error getting all works:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const getWorkById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid work ID!");
    }
    const work = await Work.findById(id);
    if (!work) {
      return sendError(res, 404, "Work not found!");
    }
    sendResponse(res, 200, work);
  } catch (error) {
    console.error("Error getting work:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const addWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Validate the request body
    try {
      await workSchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const { name, description, images } = req.body;

    // Upload images to Firebase Storage and get images with their URLs
    const newImages = await firebaseImageUploader<IImage[]>(images);

    // Create a new work document with the Firebase URLs
    const newWork: IWorkDocument = new Work({
      name,
      description,
      images: newImages,
    });

    await newWork.save();

    sendResponse(res, 201, newWork);
  } catch (error) {
    console.error("Error adding work:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const updateWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid work ID!");
    }

    // Validate the request body
    try {
      await workSchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const existingWork: IWorkDocument | null = await Work.findById(id);
    if (!existingWork) {
      return sendError(res, 404, "Work not found!");
    }

    const { name, description, images } = req.body;

    // Upload new images to Firebase Storage and get images with their URLs
    const newImages = await firebaseImageUploader<IImage[]>(images);

    // Delete removed images from Firebase Storage
    existingWork.images.forEach((existingImage) => {
      const imageUrl = existingImage.original.url;
      const imageExists = newImages.some(
        (newImage) => newImage.original.url === imageUrl
      );

      if (!imageExists) {
        deleteImageFromFirebase(existingImage);
      }
    });

    // Update the work data in the database with the new images
    existingWork.set({
      name,
      description,
      images: newImages,
    });

    await existingWork.save();

    sendResponse(res, 200, existingWork);
  } catch (error) {
    console.error("Error updating work:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const deleteWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    const body: IWork = req.body;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid artist ID!");
    }

    // Delete images from Firebase Storage
    body.images.forEach((existingImage) => {
      deleteImageFromFirebase(existingImage);
    });

    // Remove the work record from the database
    await Work.findByIdAndDelete(id);

    sendResponse(res, 200, { message: "Work deleted successfully!" });
  } catch (error) {
    console.error("Error deleting work:", error);
    sendError(res, 500, "Internal server error!");
  }
};
