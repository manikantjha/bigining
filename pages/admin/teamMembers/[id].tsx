import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import TeamMembersForm from "@/components/admin/teamMembers/TeamMembersForm";
import useEntityData from "@/customHooks/useEntityData";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getTeamMember } from "@/services/apiServices";

export default function TeamMembersFormAdminPage() {
  const { data, caseOfAdd } = useEntityData("teamMember", getTeamMember);
  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add Team Member" : "Edit Team Member"}
        hasBackButton
      />
      <RenderAppropriateComponent
        queryResult={data}
        containerSize="h-[400px] w-full"
      >
        <TeamMembersForm teamMember={data} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
