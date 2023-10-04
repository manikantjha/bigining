import { createHandler } from "@/HOFs/handlersHOF";
import faqControllers from "@/controllers/faqControllers";

const handler = createHandler({
  getFunction: faqControllers.getPaginated,
  postFunction: faqControllers.create,
});

export default handler;
