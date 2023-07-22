import { IArtist } from "@/types/artists";
import { IRowTheme } from "@/types/row";
import { UseQueryResult } from "react-query";
import NoData from "../common/NoData";
import RowWrapper from "../common/RowWrapper";
import ArtistCard from "./ArtistCard";

interface IArtistsRowProps extends IRowTheme {
  artists: UseQueryResult<any, unknown>;
}

export default function ArtistsRow(props: IArtistsRowProps) {
  if (
    !props.artists ||
    !props.artists.data ||
    !props.artists.data.artists ||
    !props.artists.data.artists[0] ||
    !props.artists.data.artists[0].artists ||
    !props.artists.data.artists[0].artists.length
  ) {
    return <NoData />;
  }

  const celebs = props.artists.data.artists[0].artists.filter(
    (item: IArtist) => item.category === "Celebrity"
  );

  const singers = props.artists.data.artists[0].artists.filter(
    (item: IArtist) => item.category === "Singer"
  );

  return (
    <RowWrapper
      title="Artists We Have Worked With"
      theme={props.theme}
      containerWrapperClassName="min-h-[calc(100vh-89px)]"
    >
      {!!celebs.length && (
        <div className="mb-16">
          <div className={`text-center mb-16`}>
            <h3
              className={`text-2xl md:text-3xl mb-4 font-display uppercase text-textDark`}
            >
              Celebrities
            </h3>
          </div>
          <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {celebs.map((item: any, index: number) => (
              <ArtistCard
                key={index + "celeb"}
                objArtist={item}
                theme={props.theme}
              />
            ))}
          </div>
        </div>
      )}
      {!!singers.length && (
        <div>
          <div className={`text-center mb-16`}>
            <h3
              className={`text-2xl md:text-3xl mb-4 font-display uppercase text-textDark`}
            >
              Singers
            </h3>
          </div>
          <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {singers.map((item: any, index: number) => (
              <ArtistCard
                key={index + "singer"}
                objArtist={item}
                theme={props.theme}
              />
            ))}
          </div>
        </div>
      )}
    </RowWrapper>
  );
}
