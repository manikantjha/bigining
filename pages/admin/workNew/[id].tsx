import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import WorkFormNew from "@/components/admin/workNew/WorkFormNew";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getWorkNew } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function WorkFormPageNew() {
  const router = useRouter();
  const { id } = router.query;

  const caseOfAdd = id === "add" ? true : false;

  const work = useQuery(["workNew", id], () => getWorkNew(id as string));

  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add Work" : "Edit Work"}
        hasBackButton
      />
      <RenderAppropriateComponent
        queryResult={work}
        containerSize="h-[400px] w-full"
      >
        <WorkFormNew work={work} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
