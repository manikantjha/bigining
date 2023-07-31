import ArtistsList from "@/components/admin/artists/ArtistsList";
import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import CompaniesList from "@/components/admin/companies/CompaniesList";
import Pagination from "@/components/common/Pagination";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getCompaniesPaginated } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function CompaniesListPage() {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const companies = useQuery({
    queryKey: ["companies", page],
    queryFn: () => {
      return getCompaniesPaginated(parseInt(page as string), limit);
    },
  });

  return (
    <AdminLayout>
      <FormSectionTitle title="Companies" />
      <RenderAppropriateComponent
        queryResult={companies}
        containerSize="h-[400px] w-full"
      >
        <CompaniesList companies={companies} />
        <Pagination
          currentPage={companies?.data?.currentPage}
          totalItems={companies?.data?.totalArtists}
          itemsPerPage={limit}
          alwaysVisible
          containerClassName="!mt-[80px]"
          baseHref="/admin/companies"
        />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
