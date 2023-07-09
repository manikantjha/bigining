import type { NextApiRequest, NextApiResponse } from "next";
import connect from "@/database/connection";
import {
  addUpdateContactInfo,
  deleteContactInfo,
  getContactInfos,
} from "@/controllers/contactInfoControllers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connect().catch(() =>
    res.status(405).json({ error: "Error in connection." })
  );

  switch (req.method) {
    case "GET":
      await getContactInfos(req, res);
      break;
    case "POST":
      await addUpdateContactInfo(req, res);
      break;
    case "DELETE":
      await deleteContactInfo(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
