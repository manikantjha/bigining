import ContactMain from "@/components/contact/ContactMain";
import Layout from "@/layout/Layout";
import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact</title>
        <meta name="description" content="Contact RJ Inerior" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <ContactMain />
      </Layout>
    </>
  );
}
