import PrivacyMain from "@/components/privacy/PrivacyMain";
import Layout from "@/layout/Layout";
import Head from "next/head";

export default function PrivacyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Bigining privacy policy page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <PrivacyMain />
      </Layout>
    </>
  );
}
