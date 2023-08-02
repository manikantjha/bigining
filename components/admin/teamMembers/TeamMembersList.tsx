import { deleteTeamMember } from "@/services/apiServices";
import { ITeamMember } from "@/types/teamMember";
import { truncateText } from "@/utils/utils";
import { UseQueryResult } from "react-query";
import DataList from "../common/DataList";

interface ITeamMembersListProps {
  teamMembers: UseQueryResult<any, unknown>;
}

export default function TeamMembersList(props: ITeamMembersListProps) {
  const data = props.teamMembers?.data?.items || [];

  const handleRenderListItem = (teamMember: ITeamMember) => (
    <>
      <div>
        <h3 className="text-lg font-semibold">{teamMember.name}</h3>
        {teamMember.description && (
          <p className="text-gray-500">
            {truncateText(teamMember.description, 120)}
          </p>
        )}
      </div>
      <div className="h-[200px] overflow-hidden border-2 border-dashed rounded-md bg-gray-50">
        <img
          src={teamMember?.image?.medium?.url || ""}
          alt={teamMember.name}
          className="w-full h-full rounded object-cover"
        />
      </div>
    </>
  );

  return (
    <DataList<ITeamMember>
      data={data}
      entityName="Team Member"
      renderListItem={handleRenderListItem}
      deleteMutation={deleteTeamMember}
    />
  );
}
