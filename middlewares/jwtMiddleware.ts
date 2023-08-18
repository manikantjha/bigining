import { getAuth } from "firebase-admin/auth";
import { NextApiRequest, NextApiResponse } from "next";

export async function jwtMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  handler: (req: NextApiRequest, res: NextApiResponse) => Promise<void>
) {
  try {
    if (
      !req.headers.authorization ||
      (req.headers.authorization &&
        !req.headers.authorization.startsWith("Bearer "))
    ) {
      return res.status(401).json({ error: "Authorization failed!" });
    }
    const token = req.headers.authorization.substring(7);
    await getAuth().verifyIdToken(token);
    return handler(req, res);
  } catch (error) {
    return res.status(401).json({ error: "Authorization failed!" });
  }
}
