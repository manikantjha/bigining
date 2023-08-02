import { createHandler } from "@/HOFs/handlersHOF";
import teamMemberControllers from "@/controllers/teamMemberControllers";

const artistsHandler = createHandler({
  getFunction: teamMemberControllers.getPaginated,
  postFunction: teamMemberControllers.create,
});

export default artistsHandler;
