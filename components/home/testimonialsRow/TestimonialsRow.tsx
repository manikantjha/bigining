import RowWrapper from "@/components/common/RowWrapper";
import { IReview } from "@/types/review";
import { IRowTheme } from "@/types/row";
import { UseQueryResult } from "react-query";
import ReviewCard from "../reviewRow/ReviewCard";

interface ITestimonialsRowProps extends IRowTheme {
  reviews?: UseQueryResult<any, unknown>;
}

export default function TestimonialsRow(props: ITestimonialsRowProps) {
  if (!props.reviews?.data?.reviews || !props.reviews?.data?.reviews?.length)
    return;
  const reviews = props.reviews?.data?.reviews?.slice(0, 3);
  return (
    <RowWrapper title="What Our Clients Have to Say" theme={props.theme}>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reviews.map((review: IReview, index: number) => (
          <ReviewCard key={index} review={review} theme={props.theme} />
        ))}
      </div>
    </RowWrapper>
  );
}
