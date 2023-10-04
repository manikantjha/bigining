import { sendError } from "@/utils/server";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { secret, path } = req.query;
  // Check for secret to confirm this is a valid request
  if (!secret || secret !== process.env.NEXT_PUBLIC_REVALIDATION_TOKEN) {
    return sendError(res, 401, "Invalid token!");
  }

  console.log("path", path, secret);

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    await res.revalidate(path as string);
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
