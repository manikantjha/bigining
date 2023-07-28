import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import CompaniesForm from "@/components/admin/companies/CompaniesForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getCompanies } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function Companies() {
  const companies = useQuery("companies", () => getCompanies());

  return (
    <AdminLayout>
      <FormSectionTitle title="Companies We Have Worked With" />
      <RenderAppropriateComponent
        queryResult={companies}
        containerSize="h-[400px] w-full"
      >
        <CompaniesForm companies={companies} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
