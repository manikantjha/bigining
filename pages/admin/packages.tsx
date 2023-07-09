import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import PackagesForm from "@/components/admin/packages/PackagesForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getPackages } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function Packages() {
  const packages = useQuery("packages", () => getPackages());
  return (
    <AdminLayout>
      <FormSectionTitle title="Packages" />
      <RenderAppropriateComponent
        queryResult={packages}
        loaderContainerHeightWidth="h-[400px] w-full"
      >
        <PackagesForm packages={packages} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
