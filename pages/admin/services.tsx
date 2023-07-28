import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import ServicesForm from "@/components/admin/services/ServicesForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getServices } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function Services() {
  const services = useQuery("services", () => getServices());
  return (
    <AdminLayout>
      <FormSectionTitle title="Services" />
      <RenderAppropriateComponent
        queryResult={services}
        containerSize="h-[400px] w-full"
      >
        <ServicesForm services={services} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
