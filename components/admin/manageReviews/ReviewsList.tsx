import React from "react";
import { UseMutateFunction, UseQueryResult } from "react-query";
import ReviewListItem from "./ReviewListItem";
import CommonButton from "../common/CommonButton";
import { GetIcon } from "@/components/common/icons/icons";

export interface IReviewListItem {
  _id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
}

interface ReviewListProps {
  reviews: UseQueryResult<any, unknown>;
  handleDelete: UseMutateFunction<any, unknown, string, unknown>;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, handleDelete }) => {
  if (!reviews?.data?.reviews) return;
  const lstReviews = reviews?.data?.reviews;

  return (
    <div>
      {lstReviews.map((review: IReviewListItem) => (
        <div
          key={review._id}
          className="mb-4 border rounded-lg p-4 bg-white grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4"
        >
          <ReviewListItem review={review} />
          <CommonButton
            className="h-fit w-fit place-self-end"
            color="red"
            icon={<GetIcon name="delete" size="h-5 w-5" />}
            onClick={() => {
              handleDelete(review._id, {
                onSuccess: async () => await reviews.refetch(),
              });
            }}
          >
            Delete Review
          </CommonButton>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
