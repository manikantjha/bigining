import ContainerWrapper from "@/components/common/ContainerWrapper";
import LinkBtn from "@/components/common/LinkBtn";
import Title from "@/components/common/Title";
import { UseQueryResult } from "react-query";
import ServiceCard from "./ServiceCard";
import { IRowTheme } from "@/types/row";
import RowWrapper from "@/components/common/RowWrapper";

interface IServicesRow extends IRowTheme {
  containerClassName?: string;
  showButton?: boolean;
  services?: UseQueryResult<any, unknown>;
}

export default function ServicesRow(props: IServicesRow) {
  return (
    <RowWrapper title="Our Services" theme={props.theme}>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {props?.services?.data?.services &&
          props?.services?.data?.services[0]?.services?.map((item: any) => (
            <ServiceCard key={item.id} objService={item} theme={props.theme} />
          ))}
      </div>
      {props.showButton && (
        <div className="mt-16">
          <LinkBtn text="See All Services" href="/services" />
        </div>
      )}
    </RowWrapper>
  );
}
