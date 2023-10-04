import { createHandler } from "@/HOFs/handlersHOF";
import faqControllers from "@/controllers/faqControllers";

const handler = createHandler({
  getFunction: faqControllers.getById,
  postFunction: faqControllers.update,
  deleteFunction: faqControllers.remove,
});

export default handler;
