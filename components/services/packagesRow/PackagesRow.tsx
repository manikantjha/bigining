import ContainerWrapper from "@/components/common/ContainerWrapper";
import Title from "@/components/common/Title";
import { lstPackages } from "@/data/data";
import PackageCard from "./PackageCard";
import { UseQueryResult } from "react-query";
import RowWrapper from "@/components/common/RowWrapper";
import { IRowTheme } from "@/types/row";

interface IPackagesRow extends IRowTheme {
  packages?: UseQueryResult<any, unknown>;
}

export default function PackagesRow(props: IPackagesRow) {
  return (
    <RowWrapper title="Our Packages" theme={props.theme}>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {props?.packages?.data?.packages &&
          props?.packages?.data?.packages[0]?.packages?.map(
            (item: any, index: number) => (
              <PackageCard key={index} objPackage={item} theme={props.theme} />
            )
          )}
      </div>
    </RowWrapper>
  );
}
