import { signUp } from "@/controllers/authControllers";
import connect from "@/database/connection";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connect().catch(() =>
    res.status(405).json({ error: "Error in connection!" })
  );

  switch (req.method) {
    case "POST":
      await signUp(req, res);
      break;
    default:
      res.status(405).end(`Method ${req.method} not allowed!`);
      break;
  }
}
