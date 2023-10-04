import { deleteArtist, getArtistsPaginated } from "@/services/apiServices";
import { IArtist } from "@/types/artist";
import DataList from "../common/dataList/DataList";
import RowListItem from "../common/dataList/RowListItem";

interface IArtistsListProps {}

export default function ArtistsList(props: IArtistsListProps) {
  return (
    <DataList<IArtist>
      title="Artists"
      entityPlural="artists"
      renderListItem={(item, onEdit, onDelete) => (
        <RowListItem
          key={item._id}
          item={item}
          title={item.name}
          imageURL={item.image?.medium?.url || ""}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      deleteEntityFn={deleteArtist}
      getEntitiesPaginatedFn={getArtistsPaginated}
    />
  );
}
