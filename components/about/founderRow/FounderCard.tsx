import Card from "@/components/common/Card";
import { IRowTheme } from "@/types/row";
import Image, { StaticImageData } from "next/image";

interface IFounderCard extends IRowTheme {
  imgSrc: StaticImageData;
  name: string;
  description: string;
  designation: string;
}

export default function FounderCard(props: IFounderCard) {
  return (
    <Card
      className="grid grid-cols-1 gap-6 md:gap-8 !p-8 max-w-xl justify-items-center"
      theme={props.theme}
    >
      <div className="rounded-full h-[150px] w-[150px] md:h-[200px] md:w-[200px] overflow-hidden border border-black">
        <Image
          src={props.imgSrc}
          alt="founder"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-semibold">{props.name}</h3>
        <p className="text-base mt-1 mb-4">{props.designation}</p>
        <p className="text-small text-black">{props.description}</p>
      </div>
    </Card>
  );
}
