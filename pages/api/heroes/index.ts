// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addUpdateHero, getHeroes } from "@/controllers/heroControllers";
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
    case "GET":
      await getHeroes(req, res);
      break;
    case "POST":
      await addUpdateHero(req, res);
      break;
    // case "PUT":
    // await updateHero(req, res);
    // break;
    // case "DELETE":
    // await deleteHero(req, res);
    // break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
