import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import UpcomingEventsList from "@/components/admin/upcomingEvents/UpcomingEventsList";
import Pagination from "@/components/common/Pagination";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getUpcomingEventsPaginated } from "@/services/apiServices";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function UpcomingEventsListPage() {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const upcomingEvents = useQuery({
    queryKey: ["upcomingEvents", page],
    queryFn: () => {
      return getUpcomingEventsPaginated(parseInt(page as string), limit);
    },
  });

  return (
    <AdminLayout>
      <FormSectionTitle title="Upcoming Events" />
      <RenderAppropriateComponent
        queryResult={upcomingEvents}
        containerSize="h-[400px] w-full"
      >
        <UpcomingEventsList upcomingEvents={upcomingEvents} />
        <Pagination
          currentPage={upcomingEvents?.data?.currentPage}
          totalItems={upcomingEvents?.data?.totalUpcomingEvents}
          itemsPerPage={limit}
          alwaysVisible
          containerClassName="!mt-[80px]"
          baseHref="/admin/upcomingEvents"
        />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
