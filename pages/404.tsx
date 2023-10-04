/* eslint-disable @next/next/no-img-element */
import ContainerWrapper from "@/components/common/ContainerWrapper";
import LinkBtn from "@/components/common/LinkBtn";
import Title from "@/components/common/Title";
import Layout from "@/layout/Layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <ContainerWrapper containerClassName="bg-bgLight">
        <div className="max-w-lg mx-auto text-center grid grid-rows-[auto_1fr_auto] md:gap-6 gap-12">
          <div className="grid grid-rows-[auto_auto] gap-6">
            <Title
              title="OOPS!"
              description="Looks like what you are looking for cannot be found."
              titleContainerClassName="!mb-4"
            />
          </div>
          <div className="mb-4 w-full flex items-center justify-center">
            <img
              src="/assets/404.svg"
              className="h-[200px] lg:h-[400px] w-auto"
              alt="404"
            />
          </div>
          <div>
            <LinkBtn text="Back to Home" href="/" theme="light" />
          </div>
        </div>
      </ContainerWrapper>
    </Layout>
  );
}
