import LinkBtn from "@/components/common/LinkBtn";
import { IRowTheme } from "@/types/row";
import { IService } from "@/types/service";
import ServiceCard from "./ServiceCard";

interface IServicesRow extends IRowTheme {
  containerClassName?: string;
  showButton?: boolean;
  services: IService[];
}

export default function ServicesRow(props: IServicesRow) {
  const services: IService[] = props.services || [];

  if (!services.length) return null;

  return (
    <>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((item: any, index: number) => (
          <ServiceCard key={index} objService={item} theme={props.theme} />
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
    </>
  );
}
