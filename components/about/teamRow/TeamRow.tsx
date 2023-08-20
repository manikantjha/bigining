import RowWrapper from "@/components/common/RowWrapper";
import { IRowTheme } from "@/types/row";
import { ITeamMember } from "@/types/teamMember";
import TeamMemberCard from "./TeamMemberCard";

interface IFeaturesRowProps extends IRowTheme {
  teamMembers: ITeamMember[];
}

export default function TeamRow(props: IFeaturesRowProps) {
  const data = props.teamMembers || [];

  if (data.length === 0) {
    return null;
  }

  return (
    <RowWrapper title="Meet Our Team" theme={props.theme}>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {data.map((item: ITeamMember) => (
          <TeamMemberCard
            key={item._id}
            objTeamMember={item}
            theme={props.theme}
          />
        ))}
      </div>
    </RowWrapper>
  );
}
