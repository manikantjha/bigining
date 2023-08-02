import connect from "@/database/connection";
import { jwtMiddleware } from "@/middlewares/jwtMiddleware";
import { FilterQuery } from "mongoose";
import type { NextApiRequest, NextApiResponse } from "next";

type ControllerFunction = (
  req: NextApiRequest,
  res: NextApiResponse,
  filter?: FilterQuery<any>
) => Promise<void>;

interface HandlerProps {
  getFunction?: ControllerFunction;
  postFunction?: ControllerFunction;
  deleteFunction?: ControllerFunction;
  isProtected?: { get: boolean; post: boolean; delete: boolean };
}

export const createHandler = ({
  getFunction,
  postFunction,
  deleteFunction,
  isProtected = { get: false, post: true, delete: true },
}: HandlerProps) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    connect().catch(() =>
      res.status(405).json({ error: "Error in connection!" })
    );

    switch (req.method) {
      case "GET":
        if (getFunction) {
          if (isProtected.get) {
            await jwtMiddleware(req, res, getFunction);
          } else {
            await getFunction(req, res);
          }
        }
        break;
      case "POST":
        if (postFunction) {
          if (isProtected.post) {
            await jwtMiddleware(req, res, postFunction);
          } else {
            await postFunction(req, res);
          }
        }
        break;
      case "DELETE":
        if (deleteFunction) {
          if (isProtected.delete) {
            await jwtMiddleware(req, res, deleteFunction);
          } else {
            await deleteFunction(req, res);
          }
        }
        break;
      default:
        res.status(405).end(`Method ${req.method} not allowed!`);
        break;
    }
  };
};
