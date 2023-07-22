import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import Error from "@/components/common/Error";
import WorkSkeleton from "@/components/skeletons/WorkSkeleton";
import UpcomingEventsPage from "@/components/upcomingEvents/UpcomingEventsPage";
import Layout from "@/layout/Layout";
import { getUpcomingEvents } from "@/services/apiServices";
import Head from "next/head";
import { useQuery } from "react-query";

export default function UpcomingEvents() {
  const upcomingEvents = useQuery("upcomingEventsPage", () =>
    getUpcomingEvents()
  );
  return (
    <>
      <Head>
        <title>Work</title>
        <meta name="description" content="Work Bigining" />
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
                errorContainerClassName="h-[500px] w-full overflow-hidden flex justify-center items-center"
                errorText="Failed to load works :("
              />
            }
          >
            <UpcomingEventsPage upcomingEvents={upcomingEvents} theme="light" />
          </RenderAppropriateComponent>
        </main>
      </Layout>
    </>
  );
}
