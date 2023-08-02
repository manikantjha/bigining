import ArtistsList from "@/components/admin/artists/ArtistsList";
import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import Pagination from "@/components/common/Pagination";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getArtistsPaginated } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function ArtistsListPage() {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const artists = useQuery({
    queryKey: ["artists", page],
    queryFn: () => {
      return getArtistsPaginated(parseInt(page as string), limit);
    },
  });

  return (
    <AdminLayout>
      <FormSectionTitle title="Artists" />
      <RenderAppropriateComponent
        queryResult={artists}
        containerSize="h-[400px] w-full"
      >
        <ArtistsList artists={artists} />
        <Pagination
          currentPage={artists?.data?.currentPage}
          totalItems={artists?.data?.totalItems}
          itemsPerPage={limit}
          alwaysVisible
          containerClassName="!mt-[80px]"
          baseHref="/admin/artists"
        />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
