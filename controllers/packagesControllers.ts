import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import Packages from "@/models/packages";

export async function getPackages(req: NextApiRequest, res: NextApiResponse) {
  try {
    const packages = await Packages.find({});
    if (!packages) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ packages });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getPackage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    const { id }: { id?: string } = data;
    const packages = await Packages.findById(new ObjectId(id));
    if (!packages) return res.status(404).json({ error: "No Data Found" });
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
    const { id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    if (id) {
      const response = await Packages.findByIdAndUpdate(id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Packages.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function deletePackage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({ error: "Id Not Provided" });
    }
    const response = await Packages.findByIdAndDelete(id);
    return res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
}
