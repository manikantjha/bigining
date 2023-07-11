import Services from "@/models/services";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function getServices(req: NextApiRequest, res: NextApiResponse) {
  try {
    const services = await Services.find({});
    if (!services) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ services });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getService(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Services ID not provided!" });
    }
    const { id }: { id?: string } = data;
    const services = await Services.findById(new ObjectId(id));
    if (!services) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ services });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateServices(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }
    if (_id) {
      const response = await Services.findByIdAndUpdate(_id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Services.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
