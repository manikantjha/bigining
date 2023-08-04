import { getServicesPaginated } from "@/services/apiServices";
import { IService } from "@/types/service";
import DataList from "../../common/dataList/DataList";
import RowListItem from "../../common/dataList/RowListItem";

interface IServicesListProps {}

export default function ServicesList(props: IServicesListProps) {
  return (
    <DataList<IService>
      title="Services"
      entityPlural="services"
      renderListItem={(item, onEdit, onDelete) => (
        <RowListItem
          key={item._id}
          item={item}
          title={item.title}
          // description={item.list}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
      deleteEntityFn={(id) => Promise.resolve(undefined)}
      getEntitiesPaginatedFn={getServicesPaginated}
    />
  );
}
