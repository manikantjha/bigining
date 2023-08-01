import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import Hero from "@/components/common/Hero";
import LinkBtn from "@/components/common/LinkBtn";
import Logo from "@/components/common/Logo";
import RowWrapper from "@/components/common/RowWrapper";
import ContactMain from "@/components/contact/ContactMain";
import CompaniesRow from "@/components/home/companiesRow/CompaniesRow";
import FeaturesRow from "@/components/home/featuresRow/FeaturesRow";
import FiguresRow from "@/components/home/figuresRow/FiguresRow";
import RecentWorkRow from "@/components/home/recentWorkRow/RecentWorkRow";
import ServicesRow from "@/components/home/servicesRow/ServicesRow";
import TestimonialsRow from "@/components/home/testimonialsRow/TestimonialsRow";
import ReviewForm from "@/components/reviews/ReviewForm";
import CompaniesRowSkeleton from "@/components/skeletons/CompaniesRowSkeleton";
import FeaturesRowSkeleton from "@/components/skeletons/FeaturesRowSkeleton";
import FiguresRowSkeleton from "@/components/skeletons/FiguresRowSkeleton";
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import RecentWorkRowSkeleton from "@/components/skeletons/RecentWorkRowSkeleton";
import ServicesRowSkeleton from "@/components/skeletons/ServicesRowSkeleton";
import UpcomingEventsRow from "@/components/upcomingEvents/UpcomingEventsRow";
import Layout from "@/layout/Layout";
import {
  getCompaniesPaginated,
  getFeatures,
  getFigures,
  getHero,
  getReviews,
  getServicesPaginated,
  getUpcomingEventsPaginated,
  getWorksForGalleryPaginated,
} from "@/services/apiServices";
import Head from "next/head";
import { useQuery } from "react-query";

export default function Home() {
  const hero = useQuery({
    queryKey: ["clientHeroHome"],
    queryFn: () => getHero("home"),
  });
  const companies = useQuery({
    queryKey: ["clientCompaniesHome"],
    queryFn: () => getCompaniesPaginated(1, 20),
  });
  const features = useQuery({
    queryKey: ["clientFeaturesHome"],
    queryFn: () => getFeatures(),
  });
  const figures = useQuery({
    queryKey: ["clientFiguresHome"],
    queryFn: () => getFigures(),
  });
  const services = useQuery({
    queryKey: ["clientServicesHome"],
    queryFn: () => getServicesPaginated(1, 3),
  });
  const works = useQuery({
    queryKey: ["clientRecentWorksHome"],
    queryFn: () => getWorksForGalleryPaginated(1, 8),
  });
  const upcomingEvents = useQuery({
    queryKey: ["clientUpcomingEventsHome"],
    queryFn: () => getUpcomingEventsPaginated(1, 6),
  });
  const reviews = useQuery({
    queryKey: ["clientReviewsHome"],
    queryFn: () => getReviews(),
  });

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
          containerClassName="h-[70vh] bg-gray-200 w-full overflow-hidden flex justify-center items-center"
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
          containerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load upcoming events :("
        >
          <UpcomingEventsRow
            upcomingEvents={upcomingEvents}
            theme="dark"
            rowWrapperClassName="bg-gradient-to-tl from-primaryDark via-primaryLight to-secondaryDark text-textLight"
          />
        </RenderAppropriateComponent>
        <RenderAppropriateComponent
          queryResult={works}
          loadingComponent={<RecentWorkRowSkeleton />}
          containerClassName="h-[500px] bg-gray-100 w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load works :("
        >
          <RecentWorkRow works={works} theme="light" />
        </RenderAppropriateComponent>
        <RenderAppropriateComponent
          queryResult={features}
          loadingComponent={<FeaturesRowSkeleton />}
          containerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load features :("
        >
          <FeaturesRow features={features} theme="dark" />
        </RenderAppropriateComponent>
        <RenderAppropriateComponent
          queryResult={services}
          loadingComponent={<ServicesRowSkeleton />}
          containerClassName="h-[500px] w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load services :("
        >
          <RowWrapper title="Our Services" theme="light">
            <ServicesRow showButton services={services} theme="light" />
          </RowWrapper>
        </RenderAppropriateComponent>
        <RenderAppropriateComponent
          queryResult={figures}
          loadingComponent={<FiguresRowSkeleton />}
          containerClassName="h-[300px] w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load figures :("
        >
          <FiguresRow figures={figures} theme="dark" />
        </RenderAppropriateComponent>
        <RenderAppropriateComponent
          queryResult={companies}
          loadingComponent={<CompaniesRowSkeleton />}
          containerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load companies :("
        >
          <CompaniesRow companies={companies} theme="light" />
        </RenderAppropriateComponent>
        <RenderAppropriateComponent
          queryResult={reviews}
          loadingComponent={<FeaturesRowSkeleton />}
          containerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load reviews :("
        >
          <TestimonialsRow theme="dark" reviews={reviews} />
        </RenderAppropriateComponent>
        <ContactMain
          theme="light"
          containerClassName="border-t-2 border-secondaryDark"
        />
        <ReviewForm />
      </Layout>
    </>
  );
}
