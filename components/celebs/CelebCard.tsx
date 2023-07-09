import React from "react";
import Card from "../common/Card";
import { IRowTheme } from "@/types/row";

interface ICelebCard extends IRowTheme {
  objCeleb: {
    imageURL: string;
    name: string;
    description: string;
  };
}

export default function CelebCard(props: ICelebCard) {
  return (
    <Card theme={props.theme} className="flex flex-col items-center p-8">
      <div className="w-[75px] h-[75px] md:w-[150px] md:h-[150px] overflow-hidden rounded-full border border-black">
        <img
          src={props.objCeleb.imageURL}
          alt={props.objCeleb.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-center">
        <p className="text-xl mt-4 mb-3 font-semibold">{props.objCeleb.name}</p>
        <p className="text-base text-black">{props.objCeleb.description}</p>
      </div>
    </Card>
  );
}
