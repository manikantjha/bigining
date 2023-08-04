import TeamMembersList from "@/components/admin/teamMembers/TeamMembersList";
import AdminLayout from "@/layout/admin/AdminLayout";

export default function TeamMembersListAdminPage() {
  return (
    <AdminLayout>
      <TeamMembersList />
    </AdminLayout>
  );
}
