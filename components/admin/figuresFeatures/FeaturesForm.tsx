import { featuresSchema } from "@/schemas/featuresSchema";
import { createUpdateFeatures } from "@/services/apiServices";
import { IFeatures } from "@/types/features";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import FormSectionContainer from "../common/FormSectionContainer";
import SubmitButton from "../common/form/SubmitButton";
import TextInput from "../common/form/TextInput";

interface IFeaturesFormProps {
  features: UseQueryResult<any, unknown>;
}

export default function FeaturesForm(props: IFeaturesFormProps) {
  const defaultValues = props.features?.data ? props.features?.data : {};
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFeatures>({
    resolver: yupResolver(featuresSchema as any),
    defaultValues,
  });

  const addUpdateMutation = useMutation({ mutationFn: createUpdateFeatures });

  const onSubmit = (data: IFeatures) => {
    const _id = props.features?.data ? props.features?.data?._id : undefined;
    addUpdateMutation.mutate({ ...data, _id });
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSectionContainer>
          {[...Array(4)].map((item, index) => (
            <div key={index}>
              <div className="grid gap-6 mb-4 md:grid-cols-2">
                <TextInput
                  label={`Title ${index + 1}`}
                  name={`features.${index}.title`}
                  register={register}
                  error={
                    (errors.features && errors.features[index]?.title) ||
                    undefined
                  }
                  placeholder="Feature Title"
                />
                <TextInput
                  label={`Description ${index + 1}`}
                  name={`features.${index}.description`}
                  register={register}
                  error={
                    (errors.features && errors.features[index]?.description) ||
                    undefined
                  }
                  placeholder="Feature Description"
                />
              </div>
            </div>
          ))}
          <div className="w-full flex items-center space-x-4 mt-8">
            <SubmitButton loading={addUpdateMutation.isLoading} />
          </div>
        </FormSectionContainer>
      </form>
    </div>
  );
}
