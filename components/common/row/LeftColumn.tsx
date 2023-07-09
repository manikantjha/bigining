/* eslint-disable @next/next/no-img-element */
import Image, { StaticImageData } from "next/image";
import { ReactNode } from "react";

export interface ILeftCoumn {
  renderLeftColumn?: () => ReactNode;
  imgSrc?: StaticImageData;
  imgAlt?: string;
}

export default function LeftColumn(props: ILeftCoumn) {
  if (props.renderLeftColumn) {
    return <>{props.renderLeftColumn()} </>;
  }
  return (
    <div className="w-full h-[300px] md:h-[500px] rounded-xl overflow-hidden border-2 border-black">
      <Image
        src={props.imgSrc || ""}
        alt={props.imgAlt || "row image"}
        className="h-full w-full object-cover"
      />
    </div>
  );
}
