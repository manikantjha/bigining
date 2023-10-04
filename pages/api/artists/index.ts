import { createHandler } from "@/HOFs/handlersHOF";
import artistsControllers from "@/controllers/artistControllers";

const handler = createHandler({
  getFunction: artistsControllers.getPaginated,
  postFunction: artistsControllers.create,
});

export default handler;
