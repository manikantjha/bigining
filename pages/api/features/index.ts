import { createHandler } from "@/HOFs/handlersHOF";
import featuresControllers from "@/controllers/featuresControllers";

const handler = createHandler({
  getFunction: featuresControllers.getSingle,
  postFunction: featuresControllers.createOrUpdate,
});

export default handler;
