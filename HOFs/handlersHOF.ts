import connect from "@/database/connection";
import { jwtMiddleware } from "@/middlewares/jwtMiddleware";
import type { NextApiRequest, NextApiResponse } from "next";

type ControllerFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  imageKey?: "image" | "images"
) => Promise<void>;

interface HandlerProps {
  getFunction?: ControllerFunction;
  postFunction?: ControllerFunction;
  deleteFunction?: ControllerFunction;
}

export const createHandler = ({
  getFunction,
  postFunction,
  deleteFunction,
}: HandlerProps) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    connect().catch(() =>
      res.status(405).json({ error: "Error in connection!" })
    );

    switch (req.method) {
      case "GET":
        if (getFunction) await getFunction(req, res);
        break;
      case "POST":
        if (postFunction) await jwtMiddleware(req, res, postFunction);
        break;
      case "DELETE":
        if (deleteFunction) await jwtMiddleware(req, res, deleteFunction);
        break;
      default:
        res.status(405).end(`Method ${req.method} not allowed!`);
        break;
    }
  };
};
