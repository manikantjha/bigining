import { createHandler } from "@/HOFs/handlersHOF";
import companyControllers from "@/controllers/companyControllers";

const handler = createHandler({
  getFunction: companyControllers.getAll,
  postFunction: companyControllers.create,
});

export default handler;
