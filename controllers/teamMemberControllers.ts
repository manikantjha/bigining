import { createGenericController } from "@/HOFs/controllersHOF";
import TeamMember from "@/models/teamMember";
import { teamMemberSchema } from "@/schemas/teamMemberSchema";

const teamMemberControllers = createGenericController({
  Model: TeamMember,
  schema: teamMemberSchema,
  imageKey: "image",
  revalidate: async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_DEV_BASE_PATH}/api/revalidate?secret=${
        process.env.NEXT_PUBLIC_REVALIDATION_TOKEN
      }&path=${"/about"}`
    );
  },
});

export default teamMemberControllers;
