import { createHandler } from "@/HOFs/handlersHOF";
import teamMemberControllers from "@/controllers/teamMemberControllers";

const handler = createHandler({
  getFunction: teamMemberControllers.getAll,
  postFunction: teamMemberControllers.create,
});

export default handler;
