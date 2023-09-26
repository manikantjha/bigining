import ArtistsRow from "@/components/artists/ArtistsRow";
import Loading from "@/components/common/Loading";
import PaginationNew from "@/components/common/PaginationNew";
import RowWrapper from "@/components/common/RowWrapper";
import Layout from "@/layout/Layout";
import { getEntityStaticPaths, getPaginated } from "@/lib/common";
import Artist from "@/models/artist";
import { IPaginatedApiResult } from "@/types/api";
import { IArtist } from "@/types/artist";
import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";

const limit = 10;

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const { page = 1 } = params as ParsedUrlQuery;
  const parsedPage = parseInt(page as string);

  const artists = JSON.parse(await getPaginated(parsedPage, limit, Artist));

  return {
    props: {
      artists,
    },
  };
}

export async function getStaticPaths() {
  const paths = JSON.parse(await getEntityStaticPaths(limit, Artist));
  return {
    // Opt-in to on-demand generation for non-existent pages
    fallback: true,
    paths,
  };
}

export default function ArtistsPage({
  artists,
}: {
  artists: IPaginatedApiResult<IArtist>;
}) {
  const router = useRouter();

  if (router.isFallback) {
    return (
      <>
        <Head>
          <title>Artists</title>
          <meta name="description" content="Bigining artists page" />
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
        <title>Artists</title>
        <meta name="description" content="Bigining artists page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <RowWrapper
          title="Artists We Have Worked With"
          containerWrapperClassName="min-h-[calc(100vh-89px)]"
        >
          <ArtistsRow artists={artists?.items} />
          <PaginationNew
            currentPage={artists?.currentPage}
            totalItems={artists?.totalItems}
            itemsPerPage={limit}
            containerClassName="mt-[80px]"
            baseHref="/artists"
            scroll={false}
          />
        </RowWrapper>
      </Layout>
    </>
  );
}
