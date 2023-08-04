import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import Error from "@/components/common/Error";
import Pagination from "@/components/common/Pagination";
import WorkSkeleton from "@/components/skeletons/WorkSkeleton";
import UpcomingEvents from "@/components/upcomingEvents/UpcomingEvents";
import Layout from "@/layout/Layout";
import { getUpcomingEventsPaginated } from "@/services/apiServices";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function UpcomingEventsPage() {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const upcomingEvents = useQuery({
    queryKey: ["clientUpcomingEvents", page],
    queryFn: () => getUpcomingEventsPaginated(parseInt(page as string), limit),
  });

  return (
    <>
      <Head>
        <title>Upcoming Events</title>
        <meta name="description" content="Bigining upcoming events page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <RenderAppropriateComponent
            queryResult={upcomingEvents}
            loadingComponent={<WorkSkeleton />}
            errorComponent={
              <Error
                containerClassName="h-[500px] w-full overflow-hidden flex justify-center items-center"
                errorText="Failed to load upcoming events :("
              />
            }
          >
            <UpcomingEvents upcomingEvents={upcomingEvents} theme="light" />
            <Pagination
              currentPage={upcomingEvents.data?.currentPage}
              totalItems={upcomingEvents.data?.totalItems}
              itemsPerPage={limit}
              containerClassName="mt-[80px]"
              baseHref="/upcomingEvents"
            />
          </RenderAppropriateComponent>
        </main>
      </Layout>
    </>
  );
}
