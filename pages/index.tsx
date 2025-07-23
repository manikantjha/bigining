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
import UpcomingEventsRow from "@/components/upcomingEvents/UpcomingEventsRow";
import Layout from "@/layout/Layout";
import { getAll, getHero, getPaginated, getSingle } from "@/lib/common";
import Company from "@/models/company";
import Features from "@/models/features";
import Figures from "@/models/figures";
import Review from "@/models/review";
import Service from "@/models/service";
import UpcomingEvent from "@/models/upcomingEvent";
import Work from "@/models/work";
import { ICompany } from "@/types/company";
import { IFeature } from "@/types/features";
import { IFigure } from "@/types/figures";
import { IHero } from "@/types/hero";
import { IReview } from "@/types/review";
import { IService } from "@/types/service";
import { IUpcomingEvent } from "@/types/upcomingEvent";
import { IWork } from "@/types/work";
import Head from "next/head";

export async function getStaticProps() {
  const hero = JSON.parse(await getHero("home"));
  const upcomingEvents = JSON.parse(await getPaginated(1, 4, UpcomingEvent));
  const companies = JSON.parse(await getAll(Company));
  const services = JSON.parse(await getPaginated(1, 3, Service));
  const reviews = JSON.parse(
    await getPaginated(1, 4, Review, { isActive: true })
  );
  const works = JSON.parse(
    await getPaginated(
      1,
      6,
      Work,
      {},
      {
        _id: 1,
        name: 1,
        images: { $slice: 1 },
      },
      true
    )
  );
  const features = JSON.parse(await getSingle(Features));
  const figures = JSON.parse(await getSingle(Figures));

  return {
    props: {
      hero: hero,
      upcomingEvents: upcomingEvents?.items || [],
      companies: companies || [],
      services: services?.items || [],
      reviews: reviews?.items || [],
      works: works?.items || [],
      features: features?.features || [],
      figures: figures?.figures || [],
    },
  };
}

export default function HomePage({
  hero,
  companies,
  features,
  figures,
  services,
  works,
  reviews,
  upcomingEvents,
}: {
  hero: IHero;
  companies: ICompany[];
  features: IFeature[];
  figures: IFigure[];
  services: IService[];
  works: IWork[];
  reviews: IReview[];
  upcomingEvents: IUpcomingEvent[];
}) {
  return (
    <>
      <Head>
        <title>Bigining</title>
        <meta name="description" content="Bigining home page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <script lang="JavaScript" src="https://dunsregistered.dnb.com" type="text/javascript"></script>
      </Head>
      <Layout>
        <Hero
          imgSrc={hero?.image?.original.url}
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
                    {hero?.description}
                  </p>
                </div>
              </div>
            </>
          )}
          renderButton={() =>
            hero?.hasContactButton ? (
              <div className="mt-12">
                <LinkBtn href="/contact" text="Get In Touch" />
              </div>
            ) : null
          }
        />
        <UpcomingEventsRow
          upcomingEvents={upcomingEvents}
          theme="dark"
          rowWrapperClassName="bg-gradient-to-tl from-primaryDark via-primaryLight to-secondaryDark text-textLight"
        />
        <RecentWorkRow works={works} theme="light" />
        <FeaturesRow features={features} theme="dark" />
        <RowWrapper title="Our Services" theme="light">
          <ServicesRow showButton services={services} theme="light" />
        </RowWrapper>
        <FiguresRow figures={figures} theme="dark" />
        <CompaniesRow companies={companies} theme="light" />
        <TestimonialsRow theme="dark" reviews={reviews} />
        <ContactMain
          theme="light"
          containerClassName="border-t-2 border-secondaryDark"
        />
        <ReviewForm />
      </Layout>
    </>
  );
}
