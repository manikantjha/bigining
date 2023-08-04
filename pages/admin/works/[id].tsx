import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import WorkForm from "@/components/admin/works/WorkForm";
import useEntityData from "@/customHooks/useEntityData";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getWork } from "@/services/apiServices";

export default function WorkFormAdminPage() {
  const { data, caseOfAdd } = useEntityData("work", getWork);

  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add Work" : "Edit Work"}
        hasBackButton
      />
      <RenderAppropriateComponent
        queryResult={data}
        containerSize="h-[400px] w-full"
      >
        <WorkForm work={data} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
