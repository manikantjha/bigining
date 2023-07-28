import {
  deleteWorkNew,
  getWorkByIdNew,
  updateWorkNew,
} from "@/controllers/worksControllersNew";
import connect from "@/database/connection";
import { jwtMiddleware } from "@/middlewares/jwtMiddleware";
import { app } from "firebase-admin";
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
      await getWorkByIdNew(req, res);
      break;
    case "POST":
      await jwtMiddleware(req, res, updateWorkNew);
      break;
    case "DELETE":
      await jwtMiddleware(req, res, deleteWorkNew);
      break;
    default:
      res.status(405).end(`Method ${req.method} not allowed!`);
      break;
  }
}
