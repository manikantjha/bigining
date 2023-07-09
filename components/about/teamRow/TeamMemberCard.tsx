/* eslint-disable @next/next/no-img-element */
import Card from "@/components/common/Card";
import { IRowTheme } from "@/types/row";

interface ITeamMemberCard extends IRowTheme {
  objTeamMember: {
    imageURL: string;
    name: string;
    description: string;
  };
}

export default function TeamMemberCard(props: ITeamMemberCard) {
  return (
    <Card theme={props.theme} className="flex flex-col items-center p-8">
      <div className="w-[75px] h-[75px] md:w-[150px] md:h-[150px] overflow-hidden rounded-full border border-black">
        <img
          src={props.objTeamMember.imageURL}
          alt={props.objTeamMember.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-center">
        <p className="text-xl mt-4 mb-3 font-semibold">
          {props.objTeamMember.name}
        </p>
        <p className="text-base text-black">
          {props.objTeamMember.description}
        </p>
      </div>
    </Card>
  );
}
