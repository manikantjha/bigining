import FormSectionTitle from "@/components/admin/common/FormSectionTitle";
import RenderAppropriateComponent from "@/components/admin/common/RenderAppropriateComponent";
import FeaturesForm from "@/components/admin/figuresFeatures/FeaturesForm";
import FiguresForm from "@/components/admin/figuresFeatures/FiguresForm";
import AdminLayout from "@/layout/admin/AdminLayout";
import { getFeatures, getFigures } from "@/services/apiServices";
import { useQuery } from "react-query";

export default function FiguresFeaturesAdminPage() {
  const figures = useQuery({
    queryKey: "figures",
    queryFn: getFigures,
  });

  const features = useQuery({
    queryKey: "features",
    queryFn: getFeatures,
  });

  return (
    <AdminLayout>
      <FormSectionTitle title="Figures" />
      <RenderAppropriateComponent
        queryResult={figures}
        containerSize="h-[400px] w-full"
      >
        <FiguresForm figures={figures} />
      </RenderAppropriateComponent>
      <FormSectionTitle title="Features" />
      <RenderAppropriateComponent
        queryResult={features}
        containerSize="h-[400px] w-full"
      >
        <FeaturesForm features={features} />
      </RenderAppropriateComponent>
    </AdminLayout>
  );
}
