import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import FaqsForm from "@/components/admin/faqs/FaqsForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getFaq } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function FaqsFormAdminPage() {
  const router = useRouter();
  const { id } = router.query;

  const caseOfAdd = id === "add" ? true : false;

  const faq = useQuery({
    queryKey: ["artist", id],
    queryFn: () => {
      if (caseOfAdd) {
        return Promise.resolve(undefined);
      }
      return getFaq(id as string);
    },
  });

  return (
    <AdminLayout>
      <FormSectionTitle title="FAQs" hasBackButton />
      <RenderAppropriateComponent
        queryResult={faq}
        containerSize="h-[400px] w-full"
      >
        <FaqsForm faq={faq} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
