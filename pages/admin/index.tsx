import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import FormSectionWrapper from "@/components/admin/common/FormSectionWrapper";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import AboutHeroForm from "@/components/admin/heros/AboutHeroForm";
import HomeHeroForm from "@/components/admin/heros/HomeHeroForm";
import ServiceHeroForm from "@/components/admin/heros/ServiceHeroForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getHero } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function HeroesAdminPage() {
  const homeHero = useQuery("homeHero", () => getHero("home"));
  const aboutHero = useQuery("aboutHero", () => getHero("about"));
  const serviceHero = useQuery("serviceHero", () => getHero("service"));

  return (
    <AdminLayout>
      <FormSectionWrapper>
        <FormSectionTitle title="Home Page Hero" />
        <RenderAppropriateComponent
          queryResult={homeHero}
          containerSize="h-[400px] w-full"
        >
          <HomeHeroForm hero={homeHero} />
        </RenderAppropriateComponent>
      </FormSectionWrapper>
      <FormSectionWrapper>
        <FormSectionTitle title="About Page Hero" />
        <RenderAppropriateComponent
          queryResult={aboutHero}
          containerSize="h-[400px] w-full"
        >
          <AboutHeroForm hero={aboutHero} />
        </RenderAppropriateComponent>
      </FormSectionWrapper>
      <FormSectionWrapper>
        <FormSectionTitle title="Service Page Hero" />
        <RenderAppropriateComponent
          queryResult={serviceHero}
          containerSize="h-[400px] w-full"
        >
          <ServiceHeroForm hero={serviceHero} />
        </RenderAppropriateComponent>
      </FormSectionWrapper>
    </AdminLayout>
  );
}
