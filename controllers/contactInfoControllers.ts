import ContactInfos from "@/models/contactInfo";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export async function getContactInfos(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const contactInfos = await ContactInfos.find({});
    if (!contactInfos) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ contactInfos });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getContactInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Contact info ID not provided!" });
    }
    const { id }: { id?: string } = data;
    const contactInfos = await ContactInfos.findById(new ObjectId(id));
    if (!contactInfos) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ contactInfos });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateContactInfo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }
    if (_id) {
      const response = await ContactInfos.findByIdAndUpdate(_id, data);
      return res.status(200).json({ response });
    } else {
      const response = await ContactInfos.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
