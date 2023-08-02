import UpcomingEvent from "@/models/upcomingEvent";
import { upcomingEventSchema } from "@/schemas/upcomingEventSchema";
import { IImage } from "@/types/image";
import { IUpcomingEvent } from "@/types/upcomingEvent";
import {
  deleteImageFromFirebase,
  firebaseImageUploader,
  sendError,
  sendResponse,
} from "@/utils/server";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

export const getAllUpcomingEvents = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const upcomingEvents = await UpcomingEvent.find();
    if (!upcomingEvents) sendError(res, 404, "No upcoming events found!");
    sendResponse(res, 200, upcomingEvents);
  } catch (error) {
    sendError(res, 500, "Server error!");
  }
};

export const getUpcomingEventsPaginated = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const parsedPageNumber = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);
    const skip = (parsedPageNumber - 1) * parsedLimit;

    const totalUpcomingEvents = await UpcomingEvent.countDocuments();

    const upcomingEvents = await UpcomingEvent.find()
      .skip(skip)
      .limit(parsedLimit);

    if (!upcomingEvents) sendError(res, 404, "No upcoming events found!");

    sendResponse(res, 200, {
      totalUpcomingEvents,
      currentPage: parsedPageNumber,
      upcomingEvents,
    });
  } catch (error) {
    console.error("Error fetching paginated upcoming events: ", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const getUpcomingEventById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid upcoming event ID!");
    }
    const upcomingEvent = await UpcomingEvent.findById(id);
    if (!upcomingEvent) {
      return sendError(res, 404, "Upcoming event not found!");
    }
    sendResponse(res, 200, upcomingEvent);
  } catch (error) {
    console.error("Error getting upcoming event:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const addUpcomingEvent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // Validate the request body
    try {
      await upcomingEventSchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const { name, description, image, ...rest }: IUpcomingEvent = req.body;

    const newImage = await firebaseImageUploader<IImage>(image);

    const newUpcomingEvent = new UpcomingEvent({
      name,
      description,
      image: newImage,
      ...rest,
    });

    await newUpcomingEvent.save();

    sendResponse(res, 201, newUpcomingEvent);
  } catch (error) {
    console.error("Error adding upcoming event:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const updateUpcomingEvent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid upcoming event ID!");
    }

    // Validate the request body
    try {
      await upcomingEventSchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const existingUpcomingEvent = await UpcomingEvent.findById(id);
    if (!existingUpcomingEvent) {
      return sendError(res, 404, "Upcoming event not found!");
    }

    const { name, description, image, ...rest }: IUpcomingEvent = req.body;

    // These only need to happen if the image is changed!
    const newImage = await firebaseImageUploader<IImage>(image);

    if (
      image.original.url.startsWith("data:image") &&
      existingUpcomingEvent.image.original.url
    ) {
      deleteImageFromFirebase(existingUpcomingEvent.image);
    }

    existingUpcomingEvent.set({
      name,
      description,
      image: newImage,
      ...rest,
    });

    await existingUpcomingEvent.save();

    sendResponse(res, 200, existingUpcomingEvent);
  } catch (error) {
    console.error("Error updating upcoming event:", error);
    sendError(res, 500, "Internal server error!");
  }
};

export const deleteUpcomingEvent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query;
    const body = req.body;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid upcoming event ID!");
    }

    deleteImageFromFirebase(body.image);

    await UpcomingEvent.findByIdAndDelete(id);

    sendResponse(res, 200, { message: "Upcoming event deleted successfully!" });
  } catch (error) {
    console.error("Error deleting upcoming event:", error);
    sendError(res, 500, "Internal server error!");
  }
};
