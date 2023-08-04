import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import ServiceForm from "@/components/admin/services/ServicesForm";
import useEntityData from "@/customHooks/useEntityData";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getService } from "@/services/apiServices";

export default function ServiceFormAdminPage() {
  const { data, caseOfAdd } = useEntityData("service", getService);

  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add Service" : "Edit Service"}
        hasBackButton
      />
      <RenderAppropriateComponent
        queryResult={data}
        containerSize="h-[400px] w-full"
      >
        <ServiceForm service={data} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
