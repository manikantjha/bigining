import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import TeamMembers from "@/models/teamMembers";

export async function getTeamMembers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const teamMembers = await TeamMembers.find({});
    if (!teamMembers) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ teamMembers });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getTeamMember(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    const { id }: { id?: string } = data;
    const teamMembers = await TeamMembers.findById(new ObjectId(id));
    if (!teamMembers) return res.status(404).json({ error: "No Data Found" });
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
    const { id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    if (id) {
      const response = await TeamMembers.findByIdAndUpdate(id, data);
      return res.status(200).json({ response });
    } else {
      const response = await TeamMembers.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function deleteTeamMember(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({ error: "Id Not Provided" });
    }
    const response = await TeamMembers.findByIdAndDelete(id);
    return res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
}
