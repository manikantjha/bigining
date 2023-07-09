import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import TeamMembers from "@/models/teamMembers";
import Companies from "@/models/companies";

export async function getCompanies(req: NextApiRequest, res: NextApiResponse) {
  try {
    const companies = await Companies.find({});
    if (!companies) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ companies });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getCompany(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    const { id }: { id?: string } = data;
    const companies = await Companies.findById(new ObjectId(id));
    if (!companies) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ companies });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateCompany(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    if (id) {
      const response = await Companies.findByIdAndUpdate(id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Companies.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function deleteCompany(req: NextApiRequest, res: NextApiResponse) {
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
