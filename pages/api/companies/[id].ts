import { createHandler } from "@/HOFs/handlersHOF";
import companyControllers from "@/controllers/companyControllers";

const handler = createHandler({
  getFunction: companyControllers.getById,
  postFunction: companyControllers.update,
  deleteFunction: companyControllers.remove,
});

export default handler;
