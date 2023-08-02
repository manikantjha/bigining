import Features from "@/models/feature";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export async function getFeatures(req: NextApiRequest, res: NextApiResponse) {
  try {
    const features = await Features.find({});
    if (!features) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ features });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getFeature(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Features ID not provied!" });
    }
    const { id }: { id?: string } = data;
    const features = await Features.findById(new ObjectId(id));
    if (!features) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ features });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateFeatures(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }
    if (_id) {
      const response = await Features.findByIdAndUpdate(_id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Features.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
