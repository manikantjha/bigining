import { deleteArtist } from "@/services/apiServices";
import { IArtist } from "@/types/artist";
import { UseQueryResult } from "react-query";
import DataList from "../common/dataList/DataList";
import ListItem from "../common/dataList/ListItem";

interface IArtistsListProps {
  artists: UseQueryResult<any, unknown>;
}

export default function ArtistsList(props: IArtistsListProps) {
  const data = props.artists?.data?.items || [];

  const handleRenderListItem = <T extends IArtist>(
    item: T,
    onEdit: (item: T) => void,
    onDelete: (item: T) => void
  ) => (
    <div key={(item as any)._id}>
      <ListItem
        item={item}
        title={item.name}
        description={item.description}
        imageURL={item?.image?.small?.url || ""}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </div>
  );

  return (
    <DataList<IArtist>
      data={data}
      entityName="Artist"
      renderListItem={handleRenderListItem}
      deleteMutation={deleteArtist}
      containerClassName="!grid-cols-1"
      renderAddNewButton={() => <></>}
    />
  );
}
