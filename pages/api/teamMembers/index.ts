import { createHandler } from "@/HOFs/handlersHOF";
import teamMemberControllers from "@/controllers/teamMemberControllers";

const handler = createHandler({
  getFunction: teamMemberControllers.getPaginated,
  postFunction: teamMemberControllers.create,
});

export default handler;
