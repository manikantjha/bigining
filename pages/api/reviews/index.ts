import deleteReview, {
  addReview,
  getReviews,
} from "@/controllers/reveiwConrollers";
import connect from "@/database/connection";
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
      await getReviews(req, res);
      break;
    case "POST":
      await addReview(req, res);
      break;
    case "DELETE":
      await deleteReview(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} not allowed!`);
      break;
  }
}
