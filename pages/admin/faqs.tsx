import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import FAQsForm from "@/components/admin/faqs/FAQsForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getFAQs } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function FAQs() {
  const faqs = useQuery("faqs", () => getFAQs());
  return (
    <AdminLayout>
      <FormSectionTitle title="FAQs" />
      <RenderAppropriateComponent
        queryResult={faqs}
        loaderContainerHeightWidth="h-[400px] w-full"
      >
        <FAQsForm faqs={faqs} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
