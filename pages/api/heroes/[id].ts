// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getHero } from "@/controllers/heroControllers";
import connect from "@/database/connection";
import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any> // Data
) {
  connect().catch(() =>
    res.status(405).json({ error: "Error in the Connection" })
  );

  const { method } = req;

  switch (method) {
    case "POST":
      await getHero(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
