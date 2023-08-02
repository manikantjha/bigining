import { deleteArtist } from "@/services/apiServices";
import { IArtist } from "@/types/artist";
import { truncateText } from "@/utils/utils";
import { UseQueryResult } from "react-query";
import DataList from "../common/DataList";

interface IArtistsListProps {
  artists: UseQueryResult<any, unknown>;
}

export default function ArtistsList(props: IArtistsListProps) {
  const data = props.artists?.data?.items || [];

  const handleRenderListItem = (artist: IArtist) => (
    <>
      <div>
        <h3 className="text-lg font-semibold">{artist.name}</h3>
        {artist.description && (
          <p className="text-gray-500">
            {truncateText(artist.description, 120)}
          </p>
        )}
      </div>
      <div className="h-[200px] overflow-hidden border-2 border-dashed rounded-md bg-gray-50">
        <img
          src={artist?.image?.medium?.url || ""}
          alt={artist.name}
          className="w-full h-full rounded object-cover"
        />
      </div>
    </>
  );

  return (
    <DataList<IArtist>
      data={data}
      entityName="Artist"
      renderListItem={handleRenderListItem}
      deleteMutation={deleteArtist}
    />
  );
}
