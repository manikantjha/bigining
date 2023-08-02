import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import TeamMembersForm from "@/components/admin/teamMembers/TeamMembersForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getTeamMember } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function TeamMembersFormPage() {
  const router = useRouter();
  const { id } = router.query;

  const caseOfAdd = id === "add" ? true : false;

  const teamMember = useQuery({
    queryKey: ["teamMember", id],
    queryFn: () => {
      if (caseOfAdd) {
        return Promise.resolve(undefined);
      }
      return getTeamMember(id as string);
    },
  });
  return (
    <AdminLayout>
      <FormSectionTitle title="Team Members" />
      <RenderAppropriateComponent
        queryResult={teamMember}
        containerSize="h-[400px] w-full"
      >
        <TeamMembersForm teamMember={teamMember} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
