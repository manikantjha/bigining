import FAQs from "@/models/faqs";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function getFAQs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const faqs = await FAQs.find({});
    if (!faqs) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ faqs });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getFAQ(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    const { id }: { id?: string } = data;
    const faqs = await FAQs.findById(new ObjectId(id));
    if (!faqs) return res.status(404).json({ error: "No Data Found" });
    return res.status(200).json({ faqs });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateFAQs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form Datat Not Provided" });
    }
    if (id) {
      const response = await FAQs.findByIdAndUpdate(id, data);
      return res.status(200).json({ response });
    } else {
      const response = await FAQs.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

export async function deleteFAQs(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.body;
    if (!id) {
      return res.status(404).json({ error: "Id Not Provided" });
    }
    const response = await FAQs.findByIdAndDelete(id);
    return res.status(200).json({ response });
  } catch (error) {
    res.status(404).json({ error });
  }
}
