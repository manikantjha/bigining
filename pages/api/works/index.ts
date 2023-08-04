import { createHandler } from "@/HOFs/handlersHOF";
import workControllers from "@/controllers/workControllers";

const handler = createHandler({
  getFunction: workControllers.getPaginated,
  postFunction: workControllers.create,
});

export default handler;
