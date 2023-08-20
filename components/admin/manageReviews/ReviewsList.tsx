import ConfirmDeleteModal from "@/components/common/ConfirmDeleteModal";
import { GetIcon } from "@/components/common/icons/icons";
import { useAuth } from "@/contexts/AuthContext";
import { deleteReview, updateReview } from "@/services/apiServices";
import { IAuthContext } from "@/types/auth";
import { IReview } from "@/types/review";
import { User } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { UseQueryResult, useMutation, useQueryClient } from "react-query";
import CommonButton from "../common/CommonButton";
import ReviewListItem from "./ReviewListItem";

interface ReviewListProps {
  reviews: UseQueryResult<any, unknown>;
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<IReview>();
  const router = useRouter();
  const { user } = useAuth() as IAuthContext<User>;
  const queryClient = useQueryClient();
  const { page = 1 } = router.query;

  function handleClose() {
    setIsOpen(false);
  }

  function handleConfirm() {
    if (itemToDelete) {
      mutate(itemToDelete, {
        onSuccess: async () => await reviews.refetch(),
      });
    }
  }

  const useDeleteReview = () => {
    const mutate = useMutation({
      mutationFn: async (data: IReview) =>
        deleteReview(data, await user.getIdToken()),
      onSettled: () => {
        setIsOpen(false);
      },
    });
    return mutate;
  };

  const { mutate, isLoading } = useDeleteReview();

  const updateReveiwMutation = useMutation({
    mutationFn: async (data: IReview) =>
      updateReview(data, await user.getIdToken()),
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
                setItemToDelete(review);
                setIsOpen(true);
              }}
            >
              Delete
            </CommonButton>
          </div>
        </div>
      ))}
      {isOpen && (
        <ConfirmDeleteModal
          isOpen={isOpen}
          onClose={handleClose}
          onConfirm={handleConfirm}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default ReviewList;
