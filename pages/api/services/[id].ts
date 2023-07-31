import {
  deleteService,
  getServiceById,
  updateService,
} from "@/controllers/servicesControllers";
import connect from "@/database/connection";
import { jwtMiddleware } from "@/middlewares/jwtMiddleware";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connect().catch(() =>
    res.status(405).json({ error: "Error in connection!" })
  );

  switch (req.method) {
    case "GET":
      await getServiceById(req, res);
      break;
    case "POST":
      await jwtMiddleware(req, res, updateService);
      break;
    case "DELETE":
      await jwtMiddleware(req, res, deleteService);
      break;
    default:
      res.status(405).end(`Method ${req.method} not allowed!`);
      break;
  }
}
