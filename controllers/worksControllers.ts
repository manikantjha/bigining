import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import Works from "@/models/works";

export async function getWorks(req: NextApiRequest, res: NextApiResponse) {
  try {
    const works = await Works.find({});
    if (!works) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ works: works });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getWork(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    const { id }: { id?: string } = data;
    const works = await Works.findById(new ObjectId(id));
    if (!works) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ works });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateWork(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    if (id) {
      const response = await Works.findByIdAndUpdate(id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Works.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function deleteWork(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({ error: "Id Not Provided" });
    }
    const response = await Works.findByIdAndDelete(id);
    return res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
}
