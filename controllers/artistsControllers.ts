import Artists from "@/models/artists";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function getArtists(req: NextApiRequest, res: NextApiResponse) {
  try {
    const artists = await Artists.find({});
    if (!artists) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ artists });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getArtist(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Artists ID not provided!" });
    }
    const { id }: { id?: string } = data;
    const artists = await Artists.findById(new ObjectId(id));
    if (!artists) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ artists });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateArtist(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }
    if (_id) {
      const response = await Artists.findByIdAndUpdate(_id, data);
      return res.status(200).json({ response });
    } else {
      const response = await Artists.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
