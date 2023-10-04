import { createHandler } from "@/HOFs/handlersHOF";
import upcomingEventControllers from "@/controllers/upcomingEventControllers";

const handler = createHandler({
  getFunction: upcomingEventControllers.getById,
  postFunction: upcomingEventControllers.update,
  deleteFunction: upcomingEventControllers.remove,
});

export default handler;
