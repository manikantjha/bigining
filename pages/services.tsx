import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import Error from "@/components/common/Error";
import Hero from "@/components/common/Hero";
import LinkBtn from "@/components/common/LinkBtn";
import Pagination from "@/components/common/Pagination";
import RowWrapper from "@/components/common/RowWrapper";
import ContactMain from "@/components/contact/ContactMain";
import ServicesRow from "@/components/home/servicesRow/ServicesRow";
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import ServicesRowSkeleton from "@/components/skeletons/ServicesRowSkeleton";
import usePagination from "@/customHooks/usePagination";
import Layout from "@/layout/Layout";
import { getHero, getServicesPaginated } from "@/services/apiServices";
import Head from "next/head";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

export default function ServicesPage() {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const services = useQuery({
    queryKey: ["clientServices", page],
    queryFn: () => getServicesPaginated(parseInt(page as string), limit),
  });

  const hero = useQuery({
    queryKey: "clientServiceHero",
    queryFn: () => getHero("service"),
  });

  return (
    <>
      <Head>
        <title>Services</title>
        <meta name="description" content="Services RJ Inerior" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <main>
          <RenderAppropriateComponent
            queryResult={hero}
            loadingComponent={<HeroSkeleton />}
            errorComponent={
              <Error
                containerClassName="h-[70vh] bg-gray-200 w-full overflow-hidden flex justify-center items-center"
                errorText="Failed to load image :("
              />
            }
          >
            <Hero
              imgSrc={hero?.data?.hero?.imageURL}
              imgAlt="service image"
              title={hero?.data?.hero?.title}
              description={hero?.data?.hero?.description}
              hasContent={true}
              renderButton={() =>
                hero?.data?.hero?.hasContactButton ? (
                  <div className="mt-12">
                    <LinkBtn href="/contact" text="Get In Touch" />
                  </div>
                ) : null
              }
            />
          </RenderAppropriateComponent>
          <RenderAppropriateComponent
            queryResult={services}
            loadingComponent={<ServicesRowSkeleton />}
            errorComponent={
              <Error
                containerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
                errorText="Failed to load services :("
              />
            }
          >
            <RowWrapper title="Our Services" theme="dark">
              <ServicesRow services={services} />
              <Pagination
                currentPage={services.data?.currentPage}
                totalItems={services.data?.totalItems}
                itemsPerPage={limit}
                containerClassName="mt-[80px]"
                baseHref="/services"
                scroll={false}
              />
            </RowWrapper>
          </RenderAppropriateComponent>
          <ContactMain />
        </main>
      </Layout>
    </>
  );
}
