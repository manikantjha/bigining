import { createHandler } from "@/HOFs/handlersHOF";
import upcomingEventControllers from "@/controllers/upcomingEventControllers";

const handler = createHandler({
  getFunction: upcomingEventControllers.getPaginated,
  postFunction: upcomingEventControllers.create,
});

export default handler;
