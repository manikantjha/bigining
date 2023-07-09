import Celebs from "@/models/celebs";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function getCelebs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const celebs = await Celebs.find({});
    if (!celebs) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ celebs });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getCeleb(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    const { id }: { id?: string } = data;
    const celebs = await Celebs.findById(new ObjectId(id));
    if (!celebs) return res.status(404).json({ error: "No Data Found" });
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
    const { id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    if (id) {
      const response = await Celebs.findByIdAndUpdate(id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Celebs.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function deleteCeleb(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({ error: "Id Not Provided" });
    }
    const response = await Celebs.findByIdAndDelete(id);
    return res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
}
