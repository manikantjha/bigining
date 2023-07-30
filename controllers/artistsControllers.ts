import Artist from "@/models/artists";
import { artistSchema } from "@/schemas/artistSchema";
import { IImage } from "@/types/images";
import {
  deleteImageFromFirebase,
  firebaseImageUploader,
  sendError,
  sendResponse,
} from "@/utils/server";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

export const getAllArtists = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const artists = await Artist.find();
    sendResponse(res, 200, artists);
  } catch (error) {
    sendError(res, 500, "Server error!");
  }
};

export const getArtistsPaginated = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const parsedPageNumber = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    const skip = (parsedPageNumber - 1) * parsedLimit;

    const totalArtists = await Artist.countDocuments();

    const artists = await Artist.find().skip(skip).limit(parsedLimit);

    sendResponse(res, 200, {
      totalArtists,
      currentPage: parsedPageNumber,
      artists,
    });
  } catch (error) {
    console.error("Error fetching paginated artists: ", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const getArtistById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid artist ID!");
    }
    const artist = await Artist.findById(id);
    if (!artist) {
      return sendError(res, 404, "Artist not found!");
    }
    sendResponse(res, 200, artist);
  } catch (error) {
    console.error("Error getting artist:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const addArtist = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Validate the request body
    try {
      await artistSchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const { name, description, category, numberOfEvents, image } = req.body;

    const newImage = await firebaseImageUploader<IImage>(image);

    const newArtist = new Artist({
      name,
      description,
      category,
      numberOfEvents,
      image: newImage,
    });

    await newArtist.save();

    sendResponse(res, 201, newArtist);
  } catch (error) {
    console.error("Error adding artist:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const updateArtist = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid artist ID!");
    }

    // Validate the request body
    try {
      await artistSchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const existingArtist = await Artist.findById(id);
    if (!existingArtist) {
      return sendError(res, 404, "Artist not found!");
    }

    const { name, description, category, numberOfEvents, image } = req.body;

    // These only need to happen if the image is changed!

    const newImage = await firebaseImageUploader<IImage>(image);

    if (
      image.original.url.startsWith("data:image") &&
      existingArtist.image.original.url
    ) {
      deleteImageFromFirebase(existingArtist.image);
    }

    existingArtist.set({
      name,
      description,
      category,
      numberOfEvents,
      image: newImage,
    });

    await existingArtist.save();

    sendResponse(res, 200, existingArtist);
  } catch (error) {
    console.error("Error updating work:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const deleteArtist = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const body = req.body;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid artist ID!");
    }

    deleteImageFromFirebase(body.image);

    await Artist.findByIdAndDelete(id);

    sendResponse(res, 200, { message: "Artist deleted successfully!" });
  } catch (error) {
    console.error("Error deleting artist:", error);
    sendError(res, 500, "Internal server error!");
  }
};
