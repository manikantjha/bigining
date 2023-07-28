import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import Error from "@/components/common/Error";
import WorkSkeleton from "@/components/skeletons/WorkSkeleton";
import WorkGallery from "@/components/work/WorkGallery";
import Layout from "@/layout/Layout";
import { getWorks } from "@/services/apiServices";
import Head from "next/head";
import { useQuery } from "react-query";

export default function Work() {
  const works = useQuery("works", () => getWorks());
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
            <WorkGallery works={works} />
          </RenderAppropriateComponent>
        </main>
      </Layout>
    </>
  );
}
