import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import ServicesList from "@/components/admin/services/list/ServicesList";
import Pagination from "@/components/common/Pagination";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getServicesPaginated } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function ServicesListPage() {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const services = useQuery({
    queryKey: ["services", page],
    queryFn: () => {
      return getServicesPaginated(parseInt(page as string), limit);
    },
  });

  return (
    <AdminLayout>
      <FormSectionTitle title="Services" />
      <RenderAppropriateComponent
        queryResult={{} as any}
        containerSize="h-[400px] w-full"
      >
        <ServicesList services={services} />
        <Pagination
          currentPage={services?.data?.currentPage}
          totalItems={services?.data?.totalServices}
          itemsPerPage={limit}
          containerClassName="!mt-[80px]"
          baseHref="/admin/services"
          alwaysVisible
        />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
