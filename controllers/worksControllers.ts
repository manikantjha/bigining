import Work, { IWorkDocument } from "@/models/works";
import { IWork, IWorkImage } from "@/types/works";
import {
  deleteImageFromFirebase,
  sendError,
  sendResponse,
  uploadImageToFirebase,
} from "@/utils/server";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export const getWorksPaginated = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const parsedPageNumber = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    if (!parsedPageNumber || !parsedLimit)
      return sendError(res, 404, "Bad request!");

    // Calculate the number of documents to skip
    const skipDocs = (parsedPageNumber - 1) * parsedLimit;

    // Fetch paginated works from the database
    const totalWorks = await Work.countDocuments();
    const works = await Work.find().skip(skipDocs).limit(parsedLimit);
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

    // Convert page and limit to numbers
    const parsedPageNumber = parseInt(page as string);
    const parsedLimit = parseInt(limit as string);
    if (!parsedPageNumber || !parsedLimit)
      return sendError(res, 404, "Bad request!");

    const totalWorks = await Work.countDocuments();
    // Calculate the number of documents to skip
    const skip = (parsedPageNumber - 1) * parsedLimit;

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

export const getWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query;
    if (!id) return sendError(res, 404, "Bad request!");
    const work = await Work.findById(id);
    if (!work) return sendError(res, 404, "No work found!");
    sendResponse(res, 200, work);
  } catch (error) {
    console.error("Error getting work:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const addWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, description, images } = req.body;

    if (!name || !description || !images || !images.length) {
      return sendError(res, 404, "Bad request!");
    }

    // Upload images to Firebase Storage and get their URLs
    const firebaseUrls: IWorkImage[] = await Promise.all(
      images.map(async (image: IWorkImage) => {
        const originalUrl = await uploadImageToFirebase(image.original);
        const mediumUrl = await uploadImageToFirebase(image.medium);
        const smallUrl = await uploadImageToFirebase(image.small);

        return {
          original: {
            url: originalUrl,
            width: image.original.width,
            height: image.original.height,
            path: image.original.path,
          },
          medium: {
            url: mediumUrl,
            width: image.medium.width,
            height: image.medium.height,
            path: image.medium.path,
          },
          small: {
            url: smallUrl,
            width: image.small.width,
            height: image.small.height,
            path: image.small.path,
          },
        };
      })
    );

    // Create a new work document with the Firebase URLs
    const newWork: IWorkDocument = new Work({
      name,
      description,
      images: firebaseUrls,
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
    const { name, description, images } = req.body;
    if (!id || !name || !description || !images || !images.length)
      return sendError(res, 404, "Bad request!");

    const existingWork: IWorkDocument | null = await Work.findById(id);

    if (!existingWork) {
      return sendError(res, 404, "No work found!");
    }

    // Upload new images to Firebase Storage and get their URLs
    const newImages: IWorkImage[] = await Promise.all(
      images.map(async (image: IWorkImage) => {
        if (image.original.url.startsWith("data:image")) {
          // New image, upload to Firebase
          const originalUrl = await uploadImageToFirebase(image.original);
          const mediumUrl = await uploadImageToFirebase(image.medium);
          const smallUrl = await uploadImageToFirebase(image.small);

          return {
            original: {
              url: originalUrl,
              width: image.original.width,
              height: image.original.height,
              path: image.original.path,
            },
            medium: {
              url: mediumUrl,
              width: image.medium.width,
              height: image.medium.height,
              path: image.medium.path,
            },
            small: {
              url: smallUrl,
              width: image.small.width,
              height: image.small.height,
              path: image.small.path,
            },
          };
        } else {
          // Existing image, keep the same URL
          return image;
        }
      })
    );

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
    existingWork.name = name;
    existingWork.description = description;
    existingWork.images = newImages;

    await existingWork.save();
    sendResponse(res, 200, existingWork);
  } catch (error) {
    console.error("Error updating work:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const deleteWork = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data: IWork = req.body;
    if (!data._id) return sendError(res, 404, "Bad request!");

    // Delete images from Firebase Storage
    data.images.forEach((existingImage) => {
      deleteImageFromFirebase(existingImage);
    });

    // Remove the work record from the database
    await Work.findByIdAndDelete(new ObjectId(data._id));
    sendResponse(res, 200, { message: "Work deleted successfully!" });
  } catch (error) {
    console.error("Error deleting work:", error);
    sendError(res, 500, "Internal server error!");
  }
};
