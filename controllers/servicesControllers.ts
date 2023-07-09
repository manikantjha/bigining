import Services from "@/models/services";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export async function getServices(req: NextApiRequest, res: NextApiResponse) {
  try {
    const services = await Services.find({});
    if (!services) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ services });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getService(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    const { id }: { id?: string } = data;
    const services = await Services.findById(new ObjectId(id));
    if (!services) return res.status(404).json({ error: "No Data Found" });
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
    const { id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    if (id) {
      const response = await Services.findByIdAndUpdate(id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Services.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function deleteServices(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({ error: "Id Not Provided" });
    }
    const response = await Services.findByIdAndDelete(id);
    return res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
}
