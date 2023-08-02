import { GetIcon } from "@/components/common/icons/icons";
import { updateReview } from "@/services/apiServices";
import { IReview } from "@/types/review";
import { useRouter } from "next/router";
import React from "react";
import {
  UseMutateFunction,
  UseQueryResult,
  useMutation,
  useQueryClient,
} from "react-query";
import CommonButton from "../common/CommonButton";
import ReviewListItem from "./ReviewListItem";

interface ReviewListProps {
  reviews: UseQueryResult<any, unknown>;
  handleDelete: UseMutateFunction<any, unknown, any, unknown>;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews, handleDelete }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { page = 1 } = router.query;

  const updateReveiwMutation = useMutation({
    mutationFn: updateReview,
    onSuccess: (data) => {
      queryClient.invalidateQueries("manageReviews");
      router.replace(`/admin/manageReviews?page=${page}`);
    },
  });

  if (!reviews?.data?.items) return;
  const lstReviews = reviews?.data?.items;

  function handleApprove(review: IReview) {
    const updatedReview = { ...review, isActive: !review.isActive };
    updateReveiwMutation.mutate(updatedReview);
  }

  return (
    <div>
      {lstReviews.map((review: IReview) => (
        <div
          key={review._id}
          className="mb-4 border rounded-lg p-4 bg-white grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-4"
        >
          <ReviewListItem review={review} />
          <div className="flex space-x-4">
            <CommonButton
              className="h-fit w-fit place-self-end"
              color={review.isActive ? "green" : "primary"}
              icon={<GetIcon name="check-circle" size="h-5 w-5" />}
              onClick={() => {
                handleApprove(review);
              }}
            >
              {review.isActive ? "Approved" : "Approve"}
            </CommonButton>
            <CommonButton
              className="h-fit w-fit place-self-end"
              color="red"
              icon={<GetIcon name="delete" size="h-5 w-5" />}
              onClick={() => {
                handleDelete(review, {
                  onSuccess: async () => await reviews.refetch(),
                });
              }}
            >
              Delete
            </CommonButton>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
