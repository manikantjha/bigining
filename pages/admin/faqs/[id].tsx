import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import FaqsForm from "@/components/admin/faqs/FAQsForm";
import useEntityData from "@/customHooks/useEntityData";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getFaq } from "@/services/apiServices";

export default function FaqsFormAdminPage() {
  const { data, caseOfAdd } = useEntityData("faq", getFaq);

  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add FAQ" : "Edit FAQ"}
        hasBackButton
      />
      <RenderAppropriateComponent
        queryResult={data}
        containerSize="h-[400px] w-full"
      >
        <FaqsForm faq={data} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
