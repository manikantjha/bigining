import { createHandler } from "@/HOFs/handlersHOF";
import teamMemberControllers from "@/controllers/teamMemberControllers";

const handler = createHandler({
  getFunction: teamMemberControllers.getPaginated,
});

export default handler;
