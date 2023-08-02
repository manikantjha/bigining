import { createHandler } from "@/HOFs/handlersHOF";
import reviewControllers from "@/controllers/reveiwConrollers";

const handler = createHandler({
  getFunction: reviewControllers.getPaginated,
  postFunction: reviewControllers.create,
  isProtected: { get: false, post: false, delete: true },
});

export default handler;
