import { createGenericController } from "@/HOFs/controllersHOF";
import Service from "@/models/service";
import { serviceSchema } from "@/schemas/serviceSchema";
import { sendError, sendResponse } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

const serviceControllers = createGenericController({
  Model: Service,
  schema: serviceSchema,
  revalidate: async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/"}`
    );

    const limit = 10;
    const totalItems = await Service.count();
    const totalPages = Math.ceil(totalItems / limit);

    for (let i = 0; i < totalPages; i++) {
      await fetch(
        `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
          process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
        }&path=${"/services"}/${i + 1}`
      );
    }
  },
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
