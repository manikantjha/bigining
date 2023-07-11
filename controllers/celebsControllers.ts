import Celebs from "@/models/celebs";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function getCelebs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const celebs = await Celebs.find({});
    if (!celebs) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ celebs });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getCeleb(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Celebs ID not provided!" });
    }
    const { id }: { id?: string } = data;
    const celebs = await Celebs.findById(new ObjectId(id));
    if (!celebs) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ celebs });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateCeleb(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }
    if (_id) {
      const response = await Celebs.findByIdAndUpdate(_id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Celebs.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
