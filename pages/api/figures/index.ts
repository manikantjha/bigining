import type { NextApiRequest, NextApiResponse } from "next";
import connect from "@/database/connection";
import {
  addUpdateFigure,
  deleteFigures,
  getFigures,
} from "@/controllers/figuresControllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connect().catch(() =>
    res.status(405).json({ error: "Error in connection." })
  );

  switch (req.method) {
    case "GET":
      await getFigures(req, res);
      break;
    case "POST":
      await addUpdateFigure(req, res);
      break;
    case "DELETE":
      await deleteFigures(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
