/* eslint-disable @next/next/no-img-element */
import RowWrapper from "@/components/common/RowWrapper";
import { objFounderInfo } from "@/data/data";
import { IRowTheme } from "@/types/row";
import FounderCard from "./FounderCard";

interface IFounderRow extends IRowTheme {}

export default function FounderRow(props: IFounderRow) {
  return (
    <RowWrapper title="Meet Our Founder" theme={props.theme}>
      <div className="flex flex-col space-y-4 space-x-0 lg:flex-row lg:space-x-4 lg:space-y-0 items-center justify-center">
        <FounderCard
          imgSrc={objFounderInfo.raja.imgSrc}
          name={"Kewal Singh"}
          description={objFounderInfo.raja.description}
          designation={objFounderInfo.raja.designation}
          theme={props.theme}
        />
      </div>
    </RowWrapper>
  );
}
