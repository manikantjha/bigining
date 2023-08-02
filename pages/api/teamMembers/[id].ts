import { createHandler } from "@/HOFs/handlersHOF";
import teamMemberControllers from "@/controllers/teamMemberControllers";

const artistsHandler = createHandler({
  getFunction: teamMemberControllers.getById,
  postFunction: teamMemberControllers.update,
  deleteFunction: teamMemberControllers.remove,
});

export default artistsHandler;
