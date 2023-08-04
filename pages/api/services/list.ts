import { getServicesList } from "@/controllers/serviceControllers";
import { createHandler } from "@/HOFs/handlersHOF";

const handler = createHandler({
  getFunction: getServicesList,
});

export default handler;
