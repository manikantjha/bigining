import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import ReviewList from "@/components/admin/manageReviews/ReviewsList";
import AdminLayout from "@/layout/admin/AdminLayout";
import { deleteReview, getReviews } from "@/services/apiServices";
import { useMutation, useQuery } from "react-query";

export default function ManageReviews() {
  const reviews = useQuery("manageReviews", () => getReviews());
  const useDeleteReview = () => {
    const mutate = useMutation("deleteReview", (id: string) =>
      deleteReview({ id })
    );
    return mutate;
  };
  const { mutate, isLoading } = useDeleteReview();

  return (
    <AdminLayout>
      <FormSectionTitle title="Manage Reviews" />
      <RenderAppropriateComponent
        queryResult={reviews}
        loaderContainerHeightWidth="h-[400px] w-full"
      >
        <ReviewList reviews={reviews} handleDelete={mutate} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
