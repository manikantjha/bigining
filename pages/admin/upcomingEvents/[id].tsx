import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import UpcomingEventsForm from "@/components/admin/upcomingEvents/UpcomingEventsForm";
import useEntityData from "@/customHooks/useEntityData";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getUpcomingEvent } from "@/services/apiServices";

export default function UpcomingEventsFormAdminPage() {
  const { data, caseOfAdd } = useEntityData("upcomingEvent", getUpcomingEvent);

  return (
    <AdminLayout>
      <FormSectionTitle
        title={caseOfAdd ? "Add An Upcoming Event" : "Edit Upcoming Event"}
        hasBackButton
      />
      <RenderAppropriateComponent
        queryResult={data}
        containerSize="h-[400px] w-full"
      >
        <UpcomingEventsForm upcomingEvent={data} caseOfAdd={caseOfAdd} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
