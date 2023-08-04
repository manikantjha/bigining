import { createGenericController } from "@/HOFs/controllersHOF";
import Service from "@/models/service";
import { serviceSchema } from "@/schemas/serviceSchema";
import { sendError, sendResponse } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

const serviceControllers = createGenericController({
  Model: Service,
  schema: serviceSchema,
});

export async function getServicesList(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const lstServices = await Service.find({}, "title");
    if (!lstServices) sendError(res, 404, "No services found!");
    sendResponse(res, 200, lstServices);
  } catch (error) {
    console.error("Error fetching services list: ", error);
    sendError(res, 500, "Internal server error!");
  }
}

export default serviceControllers;
