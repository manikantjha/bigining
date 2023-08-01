import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import UpcomingEventsForm from "@/components/admin/upcomingEvents/UpcomingEventsForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getUpcomingEvent } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function UpcomingEventsListPage() {
  const router = useRouter();
  const { id } = router.query;

  const caseOfAdd = id === "add" ? true : false;

  const upcomingEvent = useQuery({
    queryKey: ["upcomingEvent", id],
    queryFn: () => {
      if (caseOfAdd) {
        return Promise.resolve(undefined);
      }
      return getUpcomingEvent(id as string);
    },
  });

  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add An Upcoming Event" : "Edit Upcoming Event"}
      />
      <RenderAppropriateComponent
        queryResult={upcomingEvent}
        containerSize="h-[400px] w-full"
      >
        <UpcomingEventsForm
          upcomingEvent={upcomingEvent}
          caseOfAdd={caseOfAdd}
        />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
