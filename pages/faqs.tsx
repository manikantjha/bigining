import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import Error from "@/components/common/Error";
import FAQsRow from "@/components/faqs/FAQsRow";
import Layout from "@/layout/Layout";
import { getFaqsPaginated } from "@/services/apiServices";
import Head from "next/head";
import { useQuery } from "react-query";

export default function FAQsPage() {
  const faqs = useQuery("faqs", () => getFaqsPaginated(1, 10));
  return (
    <>
      <Head>
        <title>FAQs</title>
        <meta name="description" content="Services RJ Inerior" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <RenderAppropriateComponent
          queryResult={faqs}
          errorComponent={
            <Error
              containerClassName="h-[500px] w-full overflow-hidden flex justify-center items-center"
              errorText="Failed to load faqs :("
            />
          }
        >
          <FAQsRow faqs={faqs} />
        </RenderAppropriateComponent>
      </Layout>
    </>
  );
}
