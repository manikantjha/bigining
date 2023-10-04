import { createHandler } from "@/HOFs/handlersHOF";
import reviewControllers from "@/controllers/reveiwConrollers";

const handler = createHandler({
  getFunction: reviewControllers.getById,
  postFunction: reviewControllers.update,
  deleteFunction: reviewControllers.remove,
  isProtected: { get: true, post: true, delete: true },
});

export default handler;
