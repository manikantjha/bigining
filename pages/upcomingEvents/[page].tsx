import Loading from "@/components/common/Loading";
import PaginationNew from "@/components/common/PaginationNew";
import RowWrapper from "@/components/common/RowWrapper";
import UpcomingEvents from "@/components/upcomingEvents/UpcomingEvents";
import Layout from "@/layout/Layout";
import { getEntityStaticPaths, getPaginated } from "@/lib/common";
import UpcomingEvent from "@/models/upcomingEvent";
import { IPaginatedApiResult } from "@/types/api";
import { IUpcomingEvent } from "@/types/upcomingEvent";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

const limit = 1;

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const { page = 1 } = params as ParsedUrlQuery;
  const parsedPage = parseInt(page as string);

  const upcomingEvents = JSON.parse(
    await getPaginated(parsedPage, limit, UpcomingEvent)
  );

  return {
    props: {
      upcomingEvents,
    },
  };
}

export async function getStaticPaths() {
  const paths = JSON.parse(await getEntityStaticPaths(limit, UpcomingEvent));
  return {
    // Opt-in to on-demand generation for non-existent pages
    fallback: true,
    paths,
  };
}

export default function UpcomingEventsPage({
  upcomingEvents,
}: {
  upcomingEvents: IPaginatedApiResult<IUpcomingEvent>;
}) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Upcoming Events</title>
          <meta name="description" content="Bigining upcoming events page" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout>
          <Loading color="text-orange-500" containerClassName="bg-bgLight" />
        </Layout>
      </>
    );
  }

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
          <RowWrapper
            title="Upcoming Events"
            theme="light"
            containerWrapperClassName={`min-h-[calc(100vh_-_80px)]`}
          >
            <UpcomingEvents
              upcomingEvents={upcomingEvents?.items}
              theme="light"
            />
            <PaginationNew
              currentPage={upcomingEvents?.currentPage}
              totalItems={upcomingEvents?.totalItems}
              itemsPerPage={limit}
              containerClassName="mt-[80px]"
              baseHref="/upcomingEvents"
            />
          </RowWrapper>
        </main>
      </Layout>
    </>
  );
}
