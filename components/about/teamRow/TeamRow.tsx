import RowWrapper from "@/components/common/RowWrapper";
import { UseQueryResult } from "react-query";
import TeamMemberCard from "./TeamMemberCard";
import { IRowTheme } from "@/types/row";

interface IFeaturesRowProps extends IRowTheme {
  teamMembers: UseQueryResult<any, unknown>;
}

export default function TeamRow(props: IFeaturesRowProps) {
  return (
    <RowWrapper title="Meet Our Team" theme={props.theme}>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {props.teamMembers?.data?.teamMembers &&
          props.teamMembers?.data?.teamMembers[0]?.teamMembers?.map(
            (item: any) => (
              <TeamMemberCard
                key={item.id}
                objTeamMember={item}
                theme={props.theme}
              />
            )
          )}
      </div>
    </RowWrapper>
  );
}
