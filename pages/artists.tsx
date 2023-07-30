import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import ArtistsRow from "@/components/artists/ArtistsRow";
import Error from "@/components/common/Error";
import OurTeamRowSkeleton from "@/components/skeletons/OurTeamRowSkeleton";
import Layout from "@/layout/Layout";
import { getArtistsPaginated } from "@/services/apiServices";

import { useQuery } from "react-query";

export default function Artists() {
  const artists = useQuery("artists", () => getArtistsPaginated(1, 10));
  return (
    <Layout>
      <RenderAppropriateComponent
        queryResult={artists}
        loadingComponent={<OurTeamRowSkeleton />}
        errorComponent={
          <Error
            containerClassName="h-[500px] bg-gray-50 w-full overflow-hidden flex justify-center items-center"
            errorText="Failed to load artists :("
          />
        }
      >
        <ArtistsRow artists={artists} />
      </RenderAppropriateComponent>
    </Layout>
  );
}
