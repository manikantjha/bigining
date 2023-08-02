import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import ReviewList from "@/components/admin/manageReviews/ReviewsList";
import AdminLayout from "@/layout/admin/AdminLayout";
import { deleteReview, getReviewsPaginated } from "@/services/apiServices";
import { IReview } from "@/types/review";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";

export default function ManageReviews() {
  const router = useRouter();
  const { page = 1 } = router.query;
  const limit = 10;

  const reviews = useQuery({
    queryKey: "manageReviews",
    queryFn: () => getReviewsPaginated(1, 10),
  });

  const useDeleteReview = () => {
    const mutate = useMutation({
      mutationFn: (data: IReview) => deleteReview(data),
    });
    return mutate;
  };

  const { mutate, isLoading } = useDeleteReview();

  return (
    <AdminLayout>
      <FormSectionTitle title="Manage Reviews" />
      <RenderAppropriateComponent
        queryResult={reviews}
        containerSize="h-[400px] w-full"
      >
        <ReviewList reviews={reviews} handleDelete={mutate} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
