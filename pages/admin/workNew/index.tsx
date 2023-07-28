import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import WorksListNew from "@/components/admin/workNew/WorksListNew";
import Pagination from "@/components/common/Pagination";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getWorksNew } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function WorksListPageNew() {
  const router = useRouter();
  const { page } = router.query;
  const limit = 10;

  const works = useQuery(["worksNew", page || 1], () => {
    if (!page) {
      return getWorksNew(1, limit);
    }
    return getWorksNew(parseInt(page as string), limit);
  });

  return (
    <AdminLayout>
      <FormSectionTitle title="Works" />
      <RenderAppropriateComponent
        queryResult={{} as any}
        containerSize="h-[400px] w-full"
      >
        <WorksListNew works={works} />
        <Pagination
          currentPage={works?.data?.currentPage}
          totalWorks={works?.data?.totalWorks}
          worksPerPage={limit}
          containerClassName="!mt-[80px]"
          baseHref="/admin/workNew"
        />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
