import RowWrapper from "@/components/common/RowWrapper";
import { lstTestimonials } from "@/data/data";
import { IRowTheme } from "@/types/row";
import TestimonialCard from "./TestimonialCard";

interface ITestimonialsRowProps extends IRowTheme {}

export default function TestimonialsRow(props: IRowTheme) {
  return (
    <RowWrapper title="What Our Clients Have to Say" theme={props.theme}>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {lstTestimonials.map((item) => (
          <TestimonialCard
            key={item.id}
            objTestimonial={item}
            theme={props.theme}
          />
        ))}
      </div>
    </RowWrapper>
  );
}
