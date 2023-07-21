import LinkBtn from "@/components/common/LinkBtn";
import RowWrapper from "@/components/common/RowWrapper";
import { IRowTheme } from "@/types/row";
import { UseQueryResult } from "react-query";
import ServiceCard from "./ServiceCard";

interface IServicesRow extends IRowTheme {
  containerClassName?: string;
  showButton?: boolean;
  services?: UseQueryResult<any, unknown>;
  isHomePage?: boolean;
}

export default function ServicesRow(props: IServicesRow) {
  return (
    <RowWrapper title="Our Services" theme={props.theme}>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {props?.services?.data?.services &&
          props?.services?.data?.services[0]?.services
            .slice(
              0,
              props.isHomePage
                ? 3
                : props?.services?.data?.services[0]?.services?.length
            )
            ?.map((item: any) => (
              <ServiceCard
                key={item.id}
                objService={item}
                theme={props.theme}
              />
            ))}
      </div>
      {props.showButton && (
        <div className="mt-16">
          <LinkBtn
            text="See All Services"
            href="/services"
            theme={props.theme}
          />
        </div>
      )}
    </RowWrapper>
  );
}
