import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import TeamMembersForm from "@/components/admin/teamMembers/TeamMembersForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getTeamMembers } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function FoundersTeam() {
  const teamMembers = useQuery("teamMembers", () => getTeamMembers());

  return (
    <AdminLayout>
      <FormSectionTitle title="Team Members" />
      <RenderAppropriateComponent
        queryResult={teamMembers}
        loaderContainerHeightWidth="h-[400px] w-full"
      >
        <TeamMembersForm teamMembers={teamMembers} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
