import { createHandler } from "@/HOFs/handlersHOF";
import artistsControllers from "@/controllers/artistControllers";

const artistsHandler = createHandler({
  getFunction: artistsControllers.getPaginated,
  postFunction: artistsControllers.create,
});

export default artistsHandler;
