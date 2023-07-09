import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import CelebsRow from "@/components/celebs/CelebsRow";
import Error from "@/components/common/Error";
import OurTeamRowSkeleton from "@/components/skeletons/OurTeamRowSkeleton";
import Layout from "@/layout/Layout";
import { getCelebs } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function Celebs() {
  const celebs = useQuery("celebs", () => getCelebs());
  return (
    <Layout>
      <RenderAppropriateComponent
        queryResult={celebs}
        loadingComponent={<OurTeamRowSkeleton />}
        errorComponent={
          <Error
            errorContainerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
            errorText="Failed to load celebs :("
          />
        }
      >
        <CelebsRow celebs={celebs} />
      </RenderAppropriateComponent>
    </Layout>
  );
}
