import {
  deleteArtist,
  getArtistById,
  updateArtist,
} from "@/controllers/artistsControllers";
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
      await getArtistById(req, res);
      break;
    case "POST":
      await jwtMiddleware(req, res, updateArtist);
      break;
    case "DELETE":
      await jwtMiddleware(req, res, deleteArtist);
      break;
    default:
      res.status(405).end(`Method ${req.method} not allowed!`);
      break;
  }
}
