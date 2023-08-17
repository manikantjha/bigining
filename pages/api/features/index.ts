import { createHandler } from "@/HOFs/handlersHOF";
import featuresControllers from "@/controllers/featureControllers";

const handler = createHandler({
  getFunction: featuresControllers.getSingle,
  postFunction: featuresControllers.createOrUpdate,
});

export default handler;
