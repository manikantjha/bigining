import RowWrapper from "@/components/common/RowWrapper";
import { UseQueryResult } from "react-query";
import flash from "../../../public/assets/icons/icon_flash.svg";
import roll from "../../../public/assets/icons/icon_roll.svg";
import candymachine from "../../../public/assets/icons/icon_candymachine.svg";
import ufo from "../../../public/assets/icons/icon_ufo.svg";
import FeatureCard from "./FeatureCard";
import { IRowTheme } from "@/types/row";

const icons = [flash, ufo, roll, candymachine];

interface IFeaturesRowProps extends IRowTheme {
  features: UseQueryResult<any, unknown>;
}

export default function FeaturesRow(props: IFeaturesRowProps) {
  return (
    <RowWrapper title="Features" theme={props.theme}>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {props?.features?.data?.features
          ? props?.features?.data?.features?.map((item: any, index: number) => (
              <FeatureCard
                key={index}
                objFeature={{ ...item, icon: icons[index] }}
                theme={props.theme}
              />
            ))
          : null}
      </div>
    </RowWrapper>
  );
}
