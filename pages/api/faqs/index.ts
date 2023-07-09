import {
  addUpdateFAQs,
  getFAQs,
  deleteFAQs,
} from "@/controllers/faqsControllers";
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
      await getFAQs(req, res);
      break;
    case "POST":
      await addUpdateFAQs(req, res);
      break;
    case "DELETE":
      await deleteFAQs(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
