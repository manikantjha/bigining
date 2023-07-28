import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import UpcomingEventsForm from "@/components/admin/upcomingEvents/UpcomingEventsForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getUpcomingEvents } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function UpcomingEvents() {
  const upcomingEvents = useQuery("services", () => getUpcomingEvents());
  return (
    <AdminLayout>
      <FormSectionTitle title="Upcoming Events" />
      <RenderAppropriateComponent
        queryResult={upcomingEvents}
        containerSize="h-[400px] w-full"
      >
        <UpcomingEventsForm upcomingEvents={upcomingEvents} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
