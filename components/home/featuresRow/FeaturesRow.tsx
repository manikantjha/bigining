import RowWrapper from "@/components/common/RowWrapper";
import { IFeature } from "@/types/features";
import { IRowTheme } from "@/types/row";
import candymachine from "../../../public/assets/icons/icon_candymachine.svg";
import flash from "../../../public/assets/icons/icon_flash.svg";
import roll from "../../../public/assets/icons/icon_roll.svg";
import ufo from "../../../public/assets/icons/icon_ufo.svg";
import FeatureCard from "./FeatureCard";

const icons = [flash, ufo, roll, candymachine];

interface IFeaturesRowProps extends IRowTheme {
  features: IFeature[];
}

export default function FeaturesRow(props: IFeaturesRowProps) {
  const data = props.features || [];
  return (
    <RowWrapper title="Features" theme={props.theme}>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {data.map((item: any, index: number) => (
          <FeatureCard
            key={index}
            objFeature={{ ...item, icon: icons[index] }}
            theme={props.theme}
          />
        ))}
      </div>
    </RowWrapper>
  );
}
