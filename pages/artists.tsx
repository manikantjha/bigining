import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import ArtistsRow from "@/components/artists/ArtistsRow";
import Error from "@/components/common/Error";
import Pagination from "@/components/common/Pagination";
import RowWrapper from "@/components/common/RowWrapper";
import OurTeamRowSkeleton from "@/components/skeletons/OurTeamRowSkeleton";
import Layout from "@/layout/Layout";
import { getArtistsPaginated } from "@/services/apiServices";
import Head from "next/head";
import { useRouter } from "next/router";

import { useQuery } from "react-query";

export default function ArtistsPage() {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const artists = useQuery({
    queryKey: "clientArtists",
    queryFn: () => getArtistsPaginated(parseInt(page as string), limit),
  });

  return (
    <>
      <Head>
        <title>Artists</title>
        <meta name="description" content="Bigining artists page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <RenderAppropriateComponent
          queryResult={artists}
          loadingComponent={<OurTeamRowSkeleton />}
          errorComponent={
            <Error
              containerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
              errorText="Failed to load artists :("
            />
          }
        >
          <RowWrapper
            title="Artists We Have Worked With"
            containerWrapperClassName="min-h-[calc(100vh-89px)]"
          >
            <ArtistsRow artists={artists} />
            <Pagination
              currentPage={artists.data?.currentPage}
              totalItems={artists.data?.totalItems}
              itemsPerPage={limit}
              containerClassName="mt-[80px]"
              baseHref="/artists"
              scroll={false}
            />
          </RowWrapper>
        </RenderAppropriateComponent>
      </Layout>
    </>
  );
}
