import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import CompaniesForm from "@/components/admin/companies/CompaniesForm";
import useEntityData from "@/customHooks/useEntityData";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getCompany } from "@/services/apiServices";

export default function CompaniesFormAdminPage() {
  const { data, caseOfAdd } = useEntityData("company", getCompany);

  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add Company" : "Edit Company"}
        hasBackButton
      />
      <RenderAppropriateComponent
        queryResult={data}
        containerSize="h-[400px] w-full"
      >
        <CompaniesForm company={data} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
