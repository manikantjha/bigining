import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import WorkForm from "@/components/admin/works/WorkForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getWork } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function WorkFormAdminPage() {
  const router = useRouter();
  const { id } = router.query;

  const caseOfAdd = id === "add" ? true : false;

  const work = useQuery({
    queryKey: ["work", id],
    queryFn: () => {
      if (caseOfAdd) {
        return Promise.resolve(undefined);
      }
      return getWork(id as string);
    },
  });

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
        <WorkForm work={work} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
