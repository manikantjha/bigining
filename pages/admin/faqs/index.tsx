import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import FAQsList from "@/components/admin/faqs/FaqsList";
import Pagination from "@/components/common/Pagination";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getFaqsPaginated } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function FaqsListAdminPage() {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const faqs = useQuery({
    queryKey: ["faqs", page],
    queryFn: () => {
      return getFaqsPaginated(parseInt(page as string), limit);
    },
  });

  console.log(faqs);

  return (
    <AdminLayout>
      <FormSectionTitle title="FAQs" />
      <RenderAppropriateComponent
        queryResult={{} as any}
        containerSize="h-[400px] w-full"
      >
        <FAQsList faqs={faqs} />
        <Pagination
          currentPage={faqs?.data?.currentPage || 0}
          totalItems={faqs?.data?.totalItems || 0}
          itemsPerPage={limit}
          containerClassName="!mt-[80px]"
          baseHref="/admin/faqs"
          alwaysVisible
        />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
