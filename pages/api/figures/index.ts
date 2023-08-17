import { createHandler } from "@/HOFs/handlersHOF";
import figuresControllers from "@/controllers/figuresControllers";

const handler = createHandler({
  getFunction: figuresControllers.getSingle,
  postFunction: figuresControllers.createOrUpdate,
});

export default handler;
