import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import TeamMembers from "@/models/teamMembers";

export async function getTeamMembers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const teamMembers = await TeamMembers.find({});
    if (!teamMembers) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ teamMembers });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getTeamMember(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Team members ID not provided!" });
    }
    const { id }: { id?: string } = data;
    const teamMembers = await TeamMembers.findById(new ObjectId(id));
    if (!teamMembers) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ teamMembers });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateTeamMember(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }
    if (_id) {
      const response = await TeamMembers.findByIdAndUpdate(_id, data);
      return res.status(200).json({ response });
    } else {
      const response = await TeamMembers.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
