import FAQsRow from "@/components/faqs/FAQsRow";
import Layout from "@/layout/Layout";
import { getAll } from "@/lib/common";
import Faq from "@/models/faq";
import { IFaq } from "@/types/faqs";
import Head from "next/head";

export async function getStaticProps() {
  const faqs = JSON.parse(await getAll(Faq));

  return {
    props: {
      faqs,
    },
  };
}

export default function FAQsPage({ faqs }: { faqs: IFaq[] }) {
  return (
    <>
      <Head>
        <title>FAQs</title>
        <meta name="description" content="Bigining FAQs page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <FAQsRow faqs={faqs} />
      </Layout>
    </>
  );
}
