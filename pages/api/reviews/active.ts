import { createHandler } from "@/HOFs/handlersHOF";
import reviewControllers from "@/controllers/reveiwConrollers";

const handler = createHandler({
  getFunction: (req, res) =>
    reviewControllers.getPaginated(req, res, { isActive: true }),
  isProtected: { get: false, post: true, delete: true },
});

export default handler;
