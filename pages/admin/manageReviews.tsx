import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import ReviewList from "@/components/admin/manageReviews/ReviewsList";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getReviewsPaginated } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function ManageReviewsAdminPage() {
  const reviews = useQuery({
    queryKey: "manageReviews",
    queryFn: () => getReviewsPaginated(1, 10),
  });

  return (
    <AdminLayout>
      <FormSectionTitle title="Manage Reviews" />
      <RenderAppropriateComponent
        queryResult={reviews}
        containerSize="h-[400px] w-full"
      >
        <ReviewList reviews={reviews} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
