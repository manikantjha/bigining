import ArtistsForm from "@/components/admin/artists/ArtistsForm";
import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getArtist } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function ArtistFormPage() {
  const router = useRouter();
  const { id } = router.query;

  const caseOfAdd = id === "add" ? true : false;

  const artist = useQuery({
    queryKey: ["artist", id],
    queryFn: () => {
      if (caseOfAdd) {
        return Promise.resolve(undefined);
      }
      return getArtist(id as string);
    },
  });

  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add Artist" : "Edit Artist"}
        hasBackButton
      />
      <RenderAppropriateComponent
        queryResult={artist}
        containerSize="h-[400px] w-full"
      >
        <ArtistsForm artist={artist} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
