import { createGenericController } from "@/HOFs/controllersHOF";
import TeamMember from "@/models/teamMember";
import { teamMemberSchema } from "@/schemas/teamMemberSchema";

const teamMemberControllers = createGenericController({
  Model: TeamMember,
  schema: teamMemberSchema,
  imageKey: "image",
});

export default teamMemberControllers;
