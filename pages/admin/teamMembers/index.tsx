import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import TeamMembersList from "@/components/admin/teamMembers/TeamMembersList";
import Pagination from "@/components/common/Pagination";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getTeamMembersPaginated } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function ArtistsListPage() {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const teamMembers = useQuery({
    queryKey: ["teamMembers", page],
    queryFn: () => {
      return getTeamMembersPaginated(parseInt(page as string), limit);
    },
  });

  return (
    <AdminLayout>
      <FormSectionTitle title="Team Members" />
      <RenderAppropriateComponent
        queryResult={teamMembers}
        containerSize="h-[400px] w-full"
      >
        <TeamMembersList teamMembers={teamMembers} />
        <Pagination
          currentPage={teamMembers?.data?.currentPage || 0}
          totalItems={teamMembers?.data?.totalItems || 0}
          itemsPerPage={limit}
          alwaysVisible
          containerClassName="!mt-[80px]"
          baseHref="/admin/artists"
        />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
