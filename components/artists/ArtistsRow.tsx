import React from "react";
import RowWrapper from "../common/RowWrapper";
import { IRowTheme } from "@/types/row";
import { UseQueryResult } from "react-query";
import ArtistCard from "./ArtistCard";

interface IArtistsRowProps extends IRowTheme {
  artists: UseQueryResult<any, unknown>;
}

export default function ArtistsRow(props: IArtistsRowProps) {
  return (
    <RowWrapper
      title="Artists We Can Work With"
      theme={props.theme}
      containerWrapperClassName="min-h-[calc(100vh-89px)]"
    >
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {props.artists?.data?.artists &&
          props.artists?.data?.artists[0]?.artists?.map((item: any) => (
            <ArtistCard key={item.id} objArtist={item} theme={props.theme} />
          ))}
      </div>
    </RowWrapper>
  );
}
