import { IArtist } from "@/types/artist";
import { IRowTheme } from "@/types/row";
import NoData from "../common/NoData";
import ArtistCard from "./ArtistCard";

interface IArtistsRowProps extends IRowTheme {
  artists: IArtist[];
}

export default function ArtistsRow(props: IArtistsRowProps) {
  if (!props.artists || !props.artists.length) {
    return <NoData />;
  }

  const artists = props.artists;

  const celebs: IArtist[] = artists.filter(
    (item: IArtist) => item.category === "celebrity"
  );

  const singers: IArtist[] = artists.filter(
    (item: IArtist) => item.category === "singer"
  );

  return (
    <>
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
            {celebs.map((item, index: number) => (
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
            {singers.map((item, index: number) => (
              <ArtistCard
                key={index + "singer"}
                objArtist={item}
                theme={props.theme}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
