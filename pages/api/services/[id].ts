import { createHandler } from "@/HOFs/handlersHOF";
import serviceControllers from "@/controllers/serviceControllers";

const handler = createHandler({
  getFunction: serviceControllers.getById,
  postFunction: serviceControllers.update,
  deleteFunction: serviceControllers.remove,
});

export default handler;
