import {
  deleteUpcomingEvent,
  getUpcomingEventsPaginated,
} from "@/services/apiServices";
import { IUpcomingEvent } from "@/types/upcomingEvent";
import DataList from "../common/dataList/DataList";
import RowListItem from "../common/dataList/RowListItem";

interface IUpcomingEventsListProps {}

export default function UpcomingEventsList(props: IUpcomingEventsListProps) {
  return (
    <DataList<IUpcomingEvent>
      title="Upcoming Events"
      entityPlural="upcomingEvents"
      getEntitiesPaginatedFn={getUpcomingEventsPaginated}
      deleteEntityFn={deleteUpcomingEvent}
      renderListItem={(item, onEdit, onDelete) => (
        <RowListItem
          key={item._id}
          item={item}
          title={item.name}
          imageURL={item.image?.small?.url || ""}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      )}
    />
  );
}
