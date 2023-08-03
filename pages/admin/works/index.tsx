import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import WorksList from "@/components/admin/works/WorksList";
import Pagination from "@/components/common/Pagination";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getWorksPaginated } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function WorksListAdminPage() {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const works = useQuery({
    queryKey: ["works", page],
    queryFn: () => {
      return getWorksPaginated(parseInt(page as string), limit);
    },
  });

  return (
    <AdminLayout>
      <FormSectionTitle title="Works" />
      <RenderAppropriateComponent
        queryResult={{} as any}
        containerSize="h-[400px] w-full"
      >
        <WorksList works={works} />
        <Pagination
          currentPage={works?.data?.currentPage}
          totalItems={works?.data?.totalWorks}
          itemsPerPage={limit}
          containerClassName="!mt-[80px]"
          baseHref="/admin/works"
          alwaysVisible
        />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
