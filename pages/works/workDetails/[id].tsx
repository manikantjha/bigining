import CommonButton from "@/components/admin/common/CommonButton";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import Error from "@/components/common/Error";
import RowWrapper from "@/components/common/RowWrapper";
import WorkDetailComponent from "@/components/works/WorkDetailComponent";
import Layout from "@/layout/Layout";
import { getWork } from "@/services/apiServices";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function WorkDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const work = useQuery({
    queryKey: ["clientWorkDetail", id],
    queryFn: () => {
      return getWork(id as string);
    },
  });

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
            queryResult={work}
            errorComponent={
              <Error
                containerClassName="h-[500px] w-full overflow-hidden flex justify-center items-center"
                errorText="Failed to load works :("
              />
            }
          >
            <RowWrapper
              containerWrapperClassName="min-h-[calc(100vh-76px)] bg-bgLight"
              title="Work Details"
              titleContainerClassName="mb-[8px]"
            >
              <div className="mb-16 flex items-center justify-center">
                <CommonButton
                  type="button"
                  onClick={() => router.back()}
                  className="w-fit h-fit"
                  color="primary"
                  icon={
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
                      />
                    </svg>
                  }
                >
                  Go Back
                </CommonButton>
              </div>
              <WorkDetailComponent work={work} />
            </RowWrapper>
          </RenderAppropriateComponent>
        </main>
      </Layout>
    </>
  );
}
