import Companies from "@/models/companies";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function getCompanies(req: NextApiRequest, res: NextApiResponse) {
  try {
    const companies = await Companies.find({});
    if (!companies) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ companies });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getCompany(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Companies ID not provided!" });
    }
    const { id }: { id?: string } = data;
    const companies = await Companies.findById(new ObjectId(id));
    if (!companies) return res.status(404).json({ error: "No data found!" });
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
    const { _id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }
    if (_id) {
      const response = await Companies.findByIdAndUpdate(_id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Companies.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
