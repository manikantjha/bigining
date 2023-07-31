import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import ServiceForm from "@/components/admin/services/ServicesForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getService } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function ServiceFormPage() {
  const router = useRouter();
  const { id } = router.query;

  const caseOfAdd = id === "add" ? true : false;

  const service = useQuery({
    queryKey: ["service", id],
    queryFn: () => {
      if (caseOfAdd) {
        return Promise.resolve(undefined);
      }
      return getService(id as string);
    },
  });

  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add Service" : "Edit Service"}
        hasBackButton
      />
      <RenderAppropriateComponent
        queryResult={service}
        containerSize="h-[400px] w-full"
      >
        <ServiceForm service={service} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
