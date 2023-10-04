import {
  deleteTeamMember,
  getTeamMembersPaginated,
} from "@/services/apiServices";
import { ITeamMember } from "@/types/teamMember";
import DataList from "../common/dataList/DataList";
import RowListItem from "../common/dataList/RowListItem";

interface ITeamMembersListProps {}

export default function TeamMembersList(props: ITeamMembersListProps) {
  return (
    <DataList<ITeamMember>
      title="Team Members"
      entityPlural="teamMembers"
      getEntitiesPaginatedFn={getTeamMembersPaginated}
      deleteEntityFn={deleteTeamMember}
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
