import ArtistsForm from "@/components/admin/artists/ArtistsForm";
import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import useEntityData from "@/customHooks/useEntityData";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getArtist } from "@/services/apiServices";

export default function ArtistFormAdminPage() {
  const { data, caseOfAdd } = useEntityData("artist", getArtist);

  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add Artist" : "Edit Artist"}
        hasBackButton
      />
      <RenderAppropriateComponent
        queryResult={data}
        containerSize="h-[400px] w-full"
      >
        <ArtistsForm artist={data} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
