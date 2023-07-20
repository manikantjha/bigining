import UpcomingEvents from "@/models/upcomingEvents";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export async function getUpcomingEvents(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const upcomingEvents = await UpcomingEvents.find({});
    if (!upcomingEvents)
      return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ upcomingEvents });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function getUpcomingEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const data = req.query;
    if (!data || !data.id) {
      return res.status(404).json({ error: "ID not provided!" });
    }
    const { id }: { id?: string } = data;
    const upcomingEvents = await UpcomingEvents.findById(new ObjectId(id));
    if (!upcomingEvents)
      return res.status(404).json({ error: "No data found!" });
    return res.status(200).json({ upcomingEvents });
  } catch (error) {
    res.status(404).json({ error });
  }
}

export async function addUpdateUpcomingEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { _id, ...data } = req.body;
    if (!data) {
      return res.status(404).json({ error: "Form data not provided!" });
    }
    if (_id) {
      const response = await UpcomingEvents.findByIdAndUpdate(_id, data);
      return res.status(200).json({ response });
    } else {
      const response = await UpcomingEvents.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}
