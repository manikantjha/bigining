import ArtistsForm from "@/components/admin/artists/ArtistsForm";
import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getArtists } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function Artists() {
  const artists = useQuery("artists", () => getArtists());

  return (
    <AdminLayout>
      <FormSectionTitle title="Artists" />
      <RenderAppropriateComponent
        queryResult={artists}
        loaderContainerHeightWidth="h-[400px] w-full"
      >
        <ArtistsForm artists={artists} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
