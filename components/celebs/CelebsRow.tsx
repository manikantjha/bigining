import React from "react";
import RowWrapper from "../common/RowWrapper";
import { IRowTheme } from "@/types/row";
import { UseQueryResult } from "react-query";
import CelebCard from "./CelebCard";

interface ICelebsRowProps extends IRowTheme {
  celebs: UseQueryResult<any, unknown>;
}

export default function CelebsRow(props: ICelebsRowProps) {
  return (
    <RowWrapper
      title="Celebrities We Can Work With"
      theme={props.theme}
      containerWrapperClassName="min-h-[calc(100vh-89px)]"
    >
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {props.celebs?.data?.celebs &&
          props.celebs?.data?.celebs[0]?.celebs?.map((item: any) => (
            <CelebCard key={item.id} objCeleb={item} theme={props.theme} />
          ))}
      </div>
    </RowWrapper>
  );
}
