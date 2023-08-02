import { createHandler } from "@/HOFs/handlersHOF";
import artistControllers from "@/controllers/artistControllers";

const artistsHandler = createHandler({
  getFunction: artistControllers.getById,
  postFunction: artistControllers.update,
  deleteFunction: artistControllers.remove,
});

export default artistsHandler;
