import { deleteWork, getWorksPaginated } from "@/services/apiServices";
import { IWork } from "@/types/work";
import DataList from "../common/dataList/DataList";
import RowListItem from "../common/dataList/RowListItem";

interface IWorksListProps {}

export default function WorksList(props: IWorksListProps) {
  return (
    <DataList<IWork>
      title="Works"
      entityPlural="works"
      renderListItem={(item, onEdit, onDelete) => (
        <RowListItem
          key={item._id}
          item={item}
          title={item.name}
          imageURL={(item.images && item.images[0]?.small?.url) || ""}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      deleteEntityFn={deleteWork}
      getEntitiesPaginatedFn={getWorksPaginated}
    />
  );
}
