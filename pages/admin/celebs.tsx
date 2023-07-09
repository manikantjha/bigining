import CelebsForm from "@/components/admin/celebs/CelebsForm";
import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getCelebs } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function Celebs() {
  const celebs = useQuery("celebs", () => getCelebs());

  return (
    <AdminLayout>
      <FormSectionTitle title="Celebrities" />
      <RenderAppropriateComponent
        queryResult={celebs}
        loaderContainerHeightWidth="h-[400px] w-full"
      >
        <CelebsForm celebs={celebs} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
