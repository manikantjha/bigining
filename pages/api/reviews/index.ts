import { createHandler } from "@/HOFs/handlersHOF";
import reviewControllers, { addReview } from "@/controllers/reveiwConrollers";

const handler = createHandler({
  getFunction: reviewControllers.getPaginated,
  postFunction: addReview,
  isProtected: { get: false, post: false, delete: true },
});

export default handler;
