/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import logoDark from "../../public/assets/logo_dark.svg";
import logoWhite from "../../public/assets/logo.svg";

interface ILogoProps {
  isWhite?: boolean;
  isVertical?: boolean;
  containerClassName?: string;
  imageClassName?: string;
}

export default function Logo(props: ILogoProps) {
  return (
    <div
      className={`flex ${
        props?.isVertical ? "flex-col" : "flex-row"
      } items-center w-full ${props.containerClassName || ""}`}
    >
      <Image
        src={props?.isWhite ? logoWhite : logoDark}
        className={`md:h-14 mr-3 h-12 w-fit ${props.imageClassName || ""}`}
        alt="RJ Interior Logo"
      />
    </div>
  );
}
