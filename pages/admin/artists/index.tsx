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
  const { page } = router.query;
  const limit = 10;

  const artists = useQuery(["artistsPaginated", page || 1], () => {
    if (!page) {
      return getArtistsPaginated(1, limit);
    }
    return getArtistsPaginated(parseInt(page as string), limit);
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
          totalItems={artists?.data?.totalArtists}
          itemsPerPage={limit}
          alwaysVisible
          containerClassName="!mt-[80px]"
          baseHref="/admin/artists"
        />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
