import Card from "@/components/common/Card";
import { IRowTheme } from "@/types/row";
import Image from "next/image";

interface IFeatureCard extends IRowTheme {
  objFeature: {
    icon: any;
    title: string;
    description: string;
  };
}

export default function FeatureCard(props: IFeatureCard) {
  return (
    <Card theme={props.theme}>
      <div className="mx-auto w-fit">
        <Image
          src={props.objFeature.icon}
          alt="icon"
          height={75}
          className="mb-4"
        />
      </div>
      <p className="mb-2 text-2xl font-semibold text-gray-900">
        {props.objFeature.title}
      </p>
      <p className="mb-3 font-normal text-black">
        {props.objFeature.description}
      </p>
    </Card>
  );
}
