import ContactInfo from "@/models/contactInfo";
import { contactInfoSchema } from "@/schemas/contactInfoSchema";
import { sendError, sendResponse } from "@/utils/server";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

export async function getContactInfos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const contactInfos = await ContactInfo.find({});
    if (!contactInfos) return sendError(res, 404, "No data found!");
    sendResponse(res, 200, contactInfos);
  } catch (error) {
    console.log("Error getting contactInfos: ", error);
    sendError(res, 500, "Internal server error!");
  }
}

export async function getContactInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid ID!");
    }
    const contactInfos = await ContactInfo.findById(id);
    if (!contactInfos) return sendError(res, 404, "contactInfo not found!");
    sendResponse(res, 200, contactInfos);
  } catch (error) {
    console.log("Error getting contactInfo: ", error);
    sendError(res, 500, "Internal server error!");
  }
}

export async function addUpdateContactInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, ...data } = req.body;

    try {
      await contactInfoSchema.validate(data);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    if (_id) {
      if (!mongoose.Types.ObjectId.isValid(_id as string)) {
        return sendError(res, 400, "Invalid ID!");
      }
      const response = await ContactInfo.findByIdAndUpdate(_id, data);
      return sendResponse(res, 200, response);
    } else {
      const response = await ContactInfo.create(data);
      return sendResponse(res, 200, response);
    }
  } catch (error) {
    console.log("Error adding/updating contactInfo: ", error);
    sendError(res, 500, "Internal server error!");
  }
}
