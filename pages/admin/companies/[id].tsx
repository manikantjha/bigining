import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import CompaniesForm from "@/components/admin/companies/CompaniesForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getCompany } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function CompaniesFormPage() {
  const router = useRouter();
  const { id } = router.query;

  const caseOfAdd = id === "add" ? true : false;

  const company = useQuery({
    queryKey: ["company", id],
    queryFn: () => {
      if (caseOfAdd) {
        return Promise.resolve(undefined);
      }
      return getCompany(id as string);
    },
  });

  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add Company" : "Edit Company"}
        hasBackButton
      />
      <RenderAppropriateComponent
        queryResult={company}
        containerSize="h-[400px] w-full"
      >
        <CompaniesForm company={company} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
