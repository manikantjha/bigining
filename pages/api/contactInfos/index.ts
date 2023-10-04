import { createHandler } from "@/HOFs/handlersHOF";
import contactInfoControllers from "@/controllers/contactInfoControllers";

const handler = createHandler({
  getFunction: contactInfoControllers.getSingle,
  postFunction: contactInfoControllers.createOrUpdate,
});

export default handler;
