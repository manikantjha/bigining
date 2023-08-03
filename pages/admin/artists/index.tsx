import ArtistsList from "@/components/admin/artists/ArtistsList";
import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import usePagination from "@/customHooks/usePagination";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getArtistsPaginated } from "@/services/apiServices";

export default function ArtistsListAdminPage() {
  const { data, PaginationComponent } = usePagination(
    "artists",
    getArtistsPaginated
  );

  return (
    <AdminLayout>
      <FormSectionTitle title="Artists" />
      <RenderAppropriateComponent
        queryResult={data}
        containerSize="h-[400px] w-full"
      >
        <ArtistsList artists={data} />
        <PaginationComponent />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
