import Service, { IServiceDocument } from "@/models/services";
import { serviceSchema } from "@/schemas/serviceSchema";
import { sendError, sendResponse } from "@/utils/server";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { ValidationError } from "yup";

export async function getServicesList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const lstServices = await Service.find({}, "services.title");
    if (!lstServices) sendError(res, 404, "No services found!");
    sendResponse(res, 200, lstServices);
  } catch (error) {
    console.error("Error fetching services list: ", error);
    sendError(res, 500, "Internal server error!");
  }
}

export async function getServicesPaginated(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { page = 1, limit = 10 } = req.query;
    const parsedPageNumber = parseInt(page as string, 10);
    const parsedLimit = parseInt(limit as string, 10);

    const skip = (parsedPageNumber - 1) * parsedLimit;

    const totalServices = await Service.countDocuments();

    const services = await Service.find().skip(skip).limit(parsedLimit);
    if (!services) sendError(res, 404, "No services found!");
    sendResponse(res, 200, {
      totalServices,
      currentPage: parsedPageNumber,
      services,
    });
  } catch (error) {
    console.error("Error fetching paginated services: ", error);
    sendError(res, 500, "Internal server error!");
  }
}

export async function getServiceById(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid service ID!");
    }
    const service = await Service.findById(id);
    if (!service) return res.status(404).json({ error: "Service not found!" });
    sendResponse(res, 200, service);
  } catch (error) {
    console.error("Error getting service:", error);
    sendError(res, 500, "Internal server error!");
  }
}

export async function addService(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Validate the request body
    try {
      await serviceSchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const { title, list } = req.body;

    const newService = new Service({
      title,
      list,
    });

    await newService.save();

    sendResponse(res, 201, newService);
  } catch (error) {
    console.error("Error adding service:", error);
    sendError(res, 500, "Internal server error!");
  }
}

export async function updateService(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid work ID!");
    }

    // Validate the request body
    try {
      await serviceSchema.validate(req.body);
    } catch (error) {
      if (error instanceof ValidationError) {
        return sendError(res, 400, error.message);
      }
      return sendError(res, 400, "Bad request!");
    }

    const existingService: IServiceDocument | null = await Service.findById(id);
    if (!existingService) {
      return sendError(res, 404, "Service not found!");
    }

    const { title, list } = req.body;

    existingService.set({
      title,
      list,
    });

    await existingService.save();

    sendResponse(res, 200, existingService);
  } catch (error) {
    console.error("Error updating service:", error);
    sendError(res, 500, "Internal server error!");
  }
}

export async function deleteService(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    if (!mongoose.Types.ObjectId.isValid(id as string)) {
      return sendError(res, 400, "Invalid artist ID!");
    }
    await Service.findByIdAndDelete(id);
    sendResponse(res, 200, { message: "Service deleted successfully!" });
  } catch (error) {
    console.error("Error deleting service:", error);
    sendError(res, 500, "Internal server error!");
  }
}
