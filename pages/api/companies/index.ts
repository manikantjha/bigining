import { createHandler } from "@/HOFs/handlersHOF";
import companyControllers from "@/controllers/companyControllers";

const handler = createHandler({
  getFunction: companyControllers.getPaginated,
  postFunction: companyControllers.create,
});

export default handler;
