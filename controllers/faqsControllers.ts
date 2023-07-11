import FAQs from "@/models/faqs";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function getFAQs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const faqs = await FAQs.find({});
    if (!faqs) return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ faqs });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getFAQ(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "FAQs ID not provided!" });
    }
    const { id }: { id?: string } = data;
    const faqs = await FAQs.findById(new ObjectId(id));
    if (!faqs) return res.status(404).json({ error: "No data found" });
    return res.status(200).json({ faqs });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateFAQs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { _id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }
    if (_id) {
      const response = await FAQs.findByIdAndUpdate(_id, data);
      return res.status(200).json({ response });
    } else {
      const response = await FAQs.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
