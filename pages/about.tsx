import StoryRow from "@/components/about/StoryRow";
import FounderRow from "@/components/about/founderRow/FounderRow";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import Hero from "@/components/common/Hero";
import LinkBtn from "@/components/common/LinkBtn";
import CompaniesRow from "@/components/home/companiesRow/CompaniesRow";
import FiguresRow from "@/components/home/figuresRow/FiguresRow";
import CompaniesRowSkeleton from "@/components/skeletons/CompaniesRowSkeleton";
import FiguresRowSkeleton from "@/components/skeletons/FiguresRowSkeleton";
import HeroSkeleton from "@/components/skeletons/HeroSkeleton";
import Layout from "@/layout/Layout";
import {
  getCompaniesPaginated,
  getFigures,
  getHero,
  getTeamMembersPaginated,
} from "@/services/apiServices";
import Head from "next/head";
import { useQuery } from "react-query";

export default function About() {
  const hero = useQuery("aboutHero", () => getHero("about"));
  const figures = useQuery("figures", () => getFigures());
  const companies = useQuery("clientCompaniesHome", () =>
    getCompaniesPaginated(0, 20)
  );
  const teamMembers = useQuery("teamMembers", () =>
    getTeamMembersPaginated(1, 2)
  );

  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="About" />
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
            imgSrc={hero?.data?.hero?.imageURL}
            imgAlt="about image"
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
          queryResult={companies}
          loadingComponent={<CompaniesRowSkeleton />}
          containerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load features :("
        >
          <CompaniesRow companies={companies} theme="dark" />
        </RenderAppropriateComponent>
        <StoryRow />

        <FounderRow theme="dark" />
        <RenderAppropriateComponent
          queryResult={figures}
          loadingComponent={<FiguresRowSkeleton />}
          containerClassName="h-[300px] w-full overflow-hidden flex justify-center items-center"
          errorText="Failed to load figures :("
        >
          <FiguresRow figures={figures} theme="light" />
        </RenderAppropriateComponent>
        {/* <RenderAppropriateComponent
            queryResult={teamMembers}
            loadingComponent={<OurTeamRowSkeleton />}
            errorContainerClassName="h-[300px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
            errorText="Failed to load team members :("
          >
            <TeamRow teamMembers={teamMembers} theme="dark" />
          </RenderAppropriateComponent> */}
      </Layout>
    </>
  );
}
