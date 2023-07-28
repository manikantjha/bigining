import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import WorksForm from "@/components/admin/works/WorksForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getWorks } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function Work() {
  const works = useQuery("works", () => getWorks());
  return (
    <AdminLayout>
      <FormSectionTitle title="Works" />
      <RenderAppropriateComponent
        queryResult={works}
        containerSize="h-[400px] w-full"
      >
        <WorksForm works={works} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
