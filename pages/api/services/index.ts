import { createHandler } from "@/HOFs/handlersHOF";
import serviceControllers from "@/controllers/serviceControllers";

const handler = createHandler({
  getFunction: serviceControllers.getPaginated,
  postFunction: serviceControllers.create,
});

export default handler;
