import React from "react";
import Card from "../common/Card";
import { IRowTheme } from "@/types/row";

interface IArtistCard extends IRowTheme {
  objArtist: {
    imageURL: string;
    name: string;
    description: string;
    numberOfEvents?: number;
  };
}

export default function ArtistCard(props: IArtistCard) {
  return (
    <Card theme={props.theme} className="flex flex-col items-center p-8">
      <div className="w-[150px] h-[150px] overflow-hidden rounded-full border border-black">
        <img
          src={props.objArtist.imageURL}
          alt={props.objArtist.name}
          className="h-full w-full object-cover object-top"
        />
      </div>
      <div className="text-center">
        <p className="text-xl mt-4 mb-3 font-semibold">
          {props.objArtist.name}
        </p>
        {props.objArtist.description && (
          <p className="text-base text-black">{props.objArtist.description}</p>
        )}
        {props.objArtist.numberOfEvents && (
          <p>Events done: {props.objArtist.numberOfEvents}</p>
        )}
      </div>
    </Card>
  );
}
