import {
  addUpdateWork,
  deleteWork,
  getWorks,
} from "@/controllers/worksControllers";
import connect from "@/database/connection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connect().catch(() =>
    res.status(405).json({ error: "Error in connection." })
  );

  switch (req.method) {
    case "GET":
      await getWorks(req, res);
      break;
    case "POST":
      await addUpdateWork(req, res);
      break;
    case "DELETE":
      await deleteWork(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
