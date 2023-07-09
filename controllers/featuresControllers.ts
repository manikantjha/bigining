import Features from "@/models/features";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export async function getFeatures(req: NextApiRequest, res: NextApiResponse) {
  try {
    const features = await Features.find({});
    if (!features) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ features });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getFeature(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    const { id }: { id?: string } = data;
    const features = await Features.findById(new ObjectId(id));
    if (!features) return res.status(404).json({ error: "No Data Found" });
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
    const { id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    if (id) {
      const response = await Features.findByIdAndUpdate(id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Features.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function deleteFeatures(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({ error: "Id Not Provided" });
    }
    const response = await Features.findByIdAndDelete(id);
    return res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
}
