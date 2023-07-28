import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import Error from "@/components/common/Error";
import Pagination from "@/components/common/Pagination";
import RowWrapper from "@/components/common/RowWrapper";
import WorkSkeleton from "@/components/skeletons/WorkSkeleton";
import WorksGallery from "@/components/works/WorksGallery";
import Layout from "@/layout/Layout";
import { getWorksForGalleryPaginated } from "@/services/apiServices";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function Works() {
  const limit = 10;
  const router = useRouter();
  const { page } = router.query;
  const works = useQuery(
    ["paginatedWorksForGallery", page ? parseInt(page as string) || 1 : 1],
    () => {
      if (!parseInt(page as string))
        return getWorksForGalleryPaginated(1, limit);
      return getWorksForGalleryPaginated(parseInt(page as string), limit);
    }
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
            queryResult={works}
            loadingComponent={<WorkSkeleton />}
            errorComponent={
              <Error
                containerClassName="h-[500px] w-full overflow-hidden flex justify-center items-center"
                errorText="Failed to load works :("
              />
            }
          >
            <RowWrapper
              containerWrapperClassName="min-h-[calc(100vh-76px)] bg-bgLight"
              title="Recent Work"
            >
              <WorksGallery works={works} />
              <Pagination
                currentPage={works.data?.currentPage}
                totalWorks={works.data?.totalWorks}
                worksPerPage={limit}
                containerClassName="mt-[80px]"
                baseHref="/works"
              />
            </RowWrapper>
          </RenderAppropriateComponent>
        </main>
      </Layout>
    </>
  );
}
