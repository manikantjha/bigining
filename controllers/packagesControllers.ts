import Packages from "@/models/packages";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function getPackages(req: NextApiRequest, res: NextApiResponse) {
  try {
    const packages = await Packages.find({});
    if (!packages) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ packages });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getPackage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Packages ID not provided!" });
    }
    const { id }: { id?: string } = data;
    const packages = await Packages.findById(new ObjectId(id));
    if (!packages) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ packages });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdatePackage(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }
    if (_id) {
      const response = await Packages.findByIdAndUpdate(_id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Packages.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
