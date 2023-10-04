import StoryRow from "@/components/about/StoryRow";
import FounderRow from "@/components/about/founderRow/FounderRow";
import TeamRow from "@/components/about/teamRow/TeamRow";
import Hero from "@/components/common/Hero";
import LinkBtn from "@/components/common/LinkBtn";
import CompaniesRow from "@/components/home/companiesRow/CompaniesRow";
import FiguresRow from "@/components/home/figuresRow/FiguresRow";
import Layout from "@/layout/Layout";
import { getAll, getHero, getPaginated, getSingle } from "@/lib/common";
import Company from "@/models/company";
import Figures from "@/models/figures";
import TeamMember from "@/models/teamMember";
import { ICompany } from "@/types/company";
import { IFigure } from "@/types/figures";
import { IHero } from "@/types/hero";
import { ITeamMember } from "@/types/teamMember";
import Head from "next/head";

export async function getStaticProps() {
  const hero = JSON.parse(await getHero("about"));
  const companies = JSON.parse(await getPaginated(1, 40, Company));
  const figures = JSON.parse(await getSingle(Figures));
  const teamMembers = JSON.parse(await getAll(TeamMember));

  console.log("teamMembers", teamMembers);

  return {
    props: {
      hero: hero,
      companies: companies.items,
      figures: figures.figures,
      teamMembers: teamMembers,
    },
  };
}

export default function AboutPage({
  hero,
  companies,
  figures,
  teamMembers,
}: {
  hero: IHero;
  companies: ICompany[];
  figures: IFigure[];
  teamMembers: ITeamMember[];
}) {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="Bigining about page" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
        <Hero
          imgSrc={hero?.image.original.url}
          imgAlt="about image"
          title={hero?.title}
          description={hero?.description}
          hasContent={true}
          renderButton={() =>
            hero?.hasContactButton ? (
              <div className="mt-12">
                <LinkBtn
                  href="/contact"
                  text="Get In Touch"
                  className="!bg-secondaryDark hover:!bg-secondaryLight text-textLight hover:text-textLight"
                />
              </div>
            ) : null
          }
        />
        <CompaniesRow companies={companies} theme="dark" />
        <StoryRow />
        <FounderRow theme="dark" />
        <FiguresRow figures={figures} theme="light" />
        <TeamRow teamMembers={teamMembers} theme="dark" />
      </Layout>
    </>
  );
}
