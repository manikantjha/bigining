import Figures from "@/models/figures";
import { ObjectId } from "mongodb";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export async function getFigures(req: NextApiRequest, res: NextApiResponse) {
  try {
    const figures = await Figures.find({});
    if (!figures) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ figures });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getFigure(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    const { id }: { id?: string } = data;
    const figures = await Figures.findById(new ObjectId(id));
    if (!figures) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ figures });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateFigure(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    if (id) {
      // Update Case
      const response = await Figures.findByIdAndUpdate(id, data);
      return res.status(200).json({ response });
    } else {
      // Add Case
      const response = await Figures.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function deleteFigures(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({ error: "Id Not Provided" });
    }
    const response = await Figures.findByIdAndDelete(id);
    return res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
}
