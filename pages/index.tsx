import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import Hero from "@/components/common/Hero";
import LinkBtn from "@/components/common/LinkBtn";
import Logo from "@/components/common/Logo";
import ContactMain from "@/components/contact/ContactMain";
import CompaniesRow from "@/components/home/companiesRow/CompaniesRow";
import FeaturesRow from "@/components/home/featuresRow/FeaturesRow";
import FiguresRow from "@/components/home/figuresRow/FiguresRow";
import RecentWorkRow from "@/components/home/recentWorkRow/RecentWorkRow";
import ServicesRow from "@/components/home/servicesRow/ServicesRow";
import TestimonialsRow from "@/components/home/testimonialsRow/TestimonialsRow";
import CompaniesRowSkeleton from "@/components/skeletons/CompaniesRowSkeleton";
import FeaturesRowSkeleton from "@/components/skeletons/FeaturesRowSkeleton";
import FiguresRowSkeleton from "@/components/skeletons/FiguresRowSkeleton";
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import RecentWorkRowSkeleton from "@/components/skeletons/RecentWorkRowSkeleton";
import ServicesRowSkeleton from "@/components/skeletons/ServicesRowSkeleton";
import UpcomingEventsRow from "@/components/upcomingEvents/UpcomingEventsRow";
import Layout from "@/layout/Layout";
import {
  getCompanies,
  getFeatures,
  getFigures,
  getHero,
  getServices,
  getUpcomingEvents,
  getWorks,
} from "@/services/apiServices";
import { useQuery } from "react-query";
import Head from "next/head";

export default function Home() {
  const hero = useQuery("homeHero", () => getHero("home"));
  const companies = useQuery("companies", () => getCompanies());
  const features = useQuery("features", () => getFeatures());
  const figures = useQuery("figures", () => getFigures());
  const services = useQuery("services", () => getServices());
  const works = useQuery("recentWorks", () => getWorks());
  const upcomingEvents = useQuery("upcomingEvents", () => getUpcomingEvents());

  return (
    <>
      <Head>
        <title>Bigining</title>
        <meta name="description" content="Bigining Home" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <RenderAppropriateComponent
          queryResult={hero}
          loadingComponent={<HeroSkeleton />}
          errorContainerClassName="h-[70vh] bg-gray-200 w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load image :("
        >
          <Hero
            isVideo={hero?.data?.hero?.isVideo}
            imgSrc={hero?.data?.hero?.imageURL}
            imgAlt="home hero"
            hasContent
            renderContent={() => (
              <>
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(0,0,0,0.75)]" />
                <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 text-center w-full">
                  <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-10 md:space-y-6 space-y-6 flex flex-col items-center justify-center !w-full px-8">
                    <Logo
                      imageClassName="h-[80px] md:h-[125px] lg:h-[150px] !w-fit"
                      containerClassName="!w-fit"
                      isWhite
                    />
                    <p className="text-textLight text-xl md:text-3xl lg-text !w-full">
                      {hero?.data?.hero?.description}
                    </p>
                  </div>
                </div>
              </>
            )}
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
          queryResult={upcomingEvents}
          loadingComponent={<FeaturesRowSkeleton />}
          errorContainerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load upcoming events :("
        >
          <UpcomingEventsRow upcomingEvents={upcomingEvents} theme="dark" />
        </RenderAppropriateComponent>
        <RenderAppropriateComponent
          queryResult={works}
          loadingComponent={<RecentWorkRowSkeleton />}
          errorContainerClassName="h-[500px] bg-gray-100 w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load works :("
        >
          <RecentWorkRow works={works} theme="light" />
        </RenderAppropriateComponent>
        <RenderAppropriateComponent
          queryResult={features}
          loadingComponent={<FeaturesRowSkeleton />}
          errorContainerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load features :("
        >
          <FeaturesRow features={features} theme="dark" />
        </RenderAppropriateComponent>
        <RenderAppropriateComponent
          queryResult={services}
          loadingComponent={<ServicesRowSkeleton />}
          errorContainerClassName="h-[500px] w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load services :("
        >
          <ServicesRow
            showButton
            services={services}
            isHomePage
            theme="light"
          />
        </RenderAppropriateComponent>
        <RenderAppropriateComponent
          queryResult={figures}
          loadingComponent={<FiguresRowSkeleton />}
          errorContainerClassName="h-[300px] w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load figures :("
        >
          <FiguresRow figures={figures} theme="dark" />
        </RenderAppropriateComponent>
        <RenderAppropriateComponent
          queryResult={companies}
          loadingComponent={<CompaniesRowSkeleton />}
          errorContainerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load companies :("
        >
          <CompaniesRow companies={companies} theme="light" />
        </RenderAppropriateComponent>
        <TestimonialsRow theme="dark" />
        <ContactMain
          theme="light"
          containerClassName="border-t-2 border-secondaryDark"
        />
      </Layout>
    </>
  );
}
