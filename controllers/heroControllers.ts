import Heroes from "@/models/heroes";
import { NextApiRequest, NextApiResponse } from "next";

// Get All Heroes

export async function getHeroes(req: NextApiRequest, res: NextApiResponse) {
  try {
    const heroes = await Heroes.find({});
    if (!heroes) return res.status(404).json({ error: "No Data Found" });
    res.status(200).json({ heroes });
  } catch (error) {
    res.status(404).json({ error });
  }
}

// Get Hero

export async function getHero(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;
    if (data && data.pageId) {
      const hero = await Heroes.findOne({ pageId: data.pageId });
      if (!hero) return res.status(404).json({ error: "No Data Found" });
      return res.status(200).json({ hero });
    }
    return res.status(404).json({ error: "No Data Provided" });
  } catch (error) {
    res.status(404).json({ error });
  }
}

// Add Update Hero

export async function addUpdateHero(req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = req.body;
    if (!data) return res.status(404).json({ error: "Form Data Not Provided" });
    if (data.id) {
      // Update Case
      const response = await Heroes.findByIdAndUpdate(data.id, data);
      return res.status(200).json({ response });
    } else {
      // Add Case
      const response = await Heroes.create(data);
      return res.status(200).json({ response });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
}

// export async function addHero(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const data = req.body;
//     if (!data) return res.status(404).json({ error: "Form Data Not Provided" });
//     const response = await Heroes.create(data);
//     return res.status(200).json({ response });
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// }

// export async function updateHero(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const data = req.body;
//     if (data && data.id) {
//       const response = await Heroes.findOneAndUpdate({ id: data.id }, data);
//       res.status(200).json({ response });
//     }
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// }

// export async function deleteHero(req: NextApiRequest, res: NextApiResponse) {
//   try {
//     const data = req.body;
//     if (data && data.id) {
//       const response = await Heroes.findOneAndDelete({ id: data.id });
//       res.status(200).json({ response });
//     }
//   } catch (error) {
//     res.status(500).json({ error });
//   }
// }
