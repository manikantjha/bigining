import { createGenericController } from "@/HOFs/controllersHOF";
import TeamMember from "@/models/teamMember";
import { teamMemberSchema } from "@/schemas/teamMemberSchema";
import { revalidatePath } from "@/utils/server";

const teamMemberControllers = createGenericController({
  Model: TeamMember,
  schema: teamMemberSchema,
  imageKey: "image",
  revalidate: async () => {
    revalidatePath(`/about`);
  },
});

export default teamMemberControllers;
