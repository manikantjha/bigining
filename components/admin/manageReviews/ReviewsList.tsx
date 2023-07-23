import React from "react";
import { UseMutateFunction, UseQueryResult } from "react-query";
import ReviewListItem from "./ReviewListItem";

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
          className="mb-4 border rounded-lg p-4 bg-white grid grid-cols-[1fr_auto]"
        >
          <ReviewListItem review={review} />
          <button
            className="bg-red-500 hover:bg-red-700 active:bg-red-800 font-bold text-white px-4 py-2 h-fit rounded-full"
            onClick={() => {
              handleDelete(review._id, {
                onSuccess: async () => await reviews.refetch(),
              });
            }}
          >
            Delete Review
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
