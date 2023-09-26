import Loading from "@/components/common/Loading";
import PaginationNew from "@/components/common/PaginationNew";
import RowWrapper from "@/components/common/RowWrapper";
import WorksGallery from "@/components/works/WorksGallery";
import Layout from "@/layout/Layout";
import { getEntityStaticPaths, getPaginated } from "@/lib/common";
import Work from "@/models/work";
import { IPaginatedApiResult } from "@/types/api";
import { IWork } from "@/types/work";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

const limit = 10;

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const { page = 1 } = params as ParsedUrlQuery;
  const parsedPage = parseInt(page as string);

  const works = JSON.parse(
    await getPaginated(
      parsedPage,
      limit,
      Work,
      {},
      {
        _id: 1,
        name: 1,
        images: { $slice: 1 },
      },
      true
    )
  );

  return {
    props: {
      works,
    },
  };
}

export async function getStaticPaths() {
  const paths = JSON.parse(await getEntityStaticPaths(limit, Work));
  return {
    // Opt-in to on-demand generation for non-existent pages
    fallback: true,
    paths,
  };
}

export default function WorksPage({
  works,
}: {
  works: IPaginatedApiResult<IWork>;
}) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Work</title>
          <meta name="description" content="Work Bigining" />
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
        <title>Work</title>
        <meta name="description" content="Work Bigining" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <RowWrapper
            containerWrapperClassName="min-h-[calc(100vh-76px)] bg-bgLight"
            title="Recent Work"
          >
            <WorksGallery works={works?.items} />
            <PaginationNew
              currentPage={works?.currentPage}
              totalItems={works?.totalItems}
              itemsPerPage={limit}
              containerClassName="mt-[80px]"
              baseHref="/works"
            />
          </RowWrapper>
        </main>
      </Layout>
    </>
  );
}
