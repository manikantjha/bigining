import { createHandler } from "@/HOFs/handlersHOF";
import teamMemberControllers from "@/controllers/teamMemberControllers";

const handler = createHandler({
  getFunction: teamMemberControllers.getById,
  postFunction: teamMemberControllers.update,
  deleteFunction: teamMemberControllers.remove,
});

export default handler;
