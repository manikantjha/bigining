import {
  addUpdateTeamMember,
  deleteTeamMember,
  getTeamMembers,
} from "@/controllers/teamMembersControllers";
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
      await getTeamMembers(req, res);
      break;
    case "POST":
      await addUpdateTeamMember(req, res);
      break;
    case "DELETE":
      await deleteTeamMember(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
      break;
  }
}
