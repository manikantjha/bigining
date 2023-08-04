import { IReview } from "@/types/review";
import React from "react";

interface IReviewListItemProps {
  review: IReview;
}

export default function ReviewListItem({ review }: IReviewListItemProps) {
  return (
    <div className="">
      <h2 className="text-lg font-semibold">{review.name}</h2>
      <p className="text-gray-500">Email: {review.email}</p>
      <p className="text-gray-500">Rating: {review.rating}</p>
      <p>{review.message}</p>
    </div>
  );
}
