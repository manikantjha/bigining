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
      title="Artists We Have Worked With"
      theme={props.theme}
      containerWrapperClassName="min-h-[calc(100vh-89px)]"
    >
      <div className="mb-16">
        <div className={`text-center mb-16`}>
          <h3
            className={`text-2xl md:text-3xl mb-4 font-display uppercase text-textDark`}
          >
            Celebrities
          </h3>
        </div>
        <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {props.artists?.data?.artists &&
            props.artists?.data?.artists[0]?.artists
              ?.filter((item: any) => item.category === "Celebrity")
              .map((item: any) => (
                <ArtistCard
                  key={item.id}
                  objArtist={item}
                  theme={props.theme}
                />
              ))}
        </div>
      </div>
      <div>
        <div className={`text-center mb-16`}>
          <h3
            className={`text-2xl md:text-3xl mb-4 font-display uppercase text-textDark`}
          >
            Singers
          </h3>
        </div>
        <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {props.artists?.data?.artists &&
            props.artists?.data?.artists[0]?.artists
              ?.filter((item: any) => item.category === "Singer")
              .map((item: any) => (
                <ArtistCard
                  key={item.id}
                  objArtist={item}
                  theme={props.theme}
                />
              ))}
        </div>
      </div>
    </RowWrapper>
  );
}
