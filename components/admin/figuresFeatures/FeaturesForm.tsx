import { featureSchema } from "@/schemas/featureSchema";
import { addUpdateFeature } from "@/services/apiServices";
import { IFeatures } from "@/types/features";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import { ToastOptions, toast } from "react-toastify";
import FormSectionContainer from "../common/FormSectionContainer";
import SubmitButton from "../common/SubmitButton";
import Toast from "../common/Toast";

interface IFeaturesFormProps {
  features: UseQueryResult<any, unknown>;
}

export default function FeaturesForm(props: IFeaturesFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFeatures>({
    resolver: yupResolver(featureSchema as any),
    defaultValues: {
      features: props?.features?.data?.features
        ? props?.features?.data?.features[0]?.features
        : [],
    },
  });

  const notify = (text: string, options: ToastOptions) => toast(text, options);

  const addUpdateFeaturesMutation = useMutation(addUpdateFeature, {
    onSuccess: () => {},
  });

  const onSubmit = (data: IFeatures) => {
    const _id = props?.features?.data?.features
      ? props?.features?.data?.features[0]?._id
      : undefined;
    addUpdateFeaturesMutation.mutate(
      { ...data, _id },
      {
        onSuccess: () => {
          notify("Submitted succesfully!", { type: "success" });
        },
        onError: () => {
          notify("Failed to submit!", { type: "error" });
        },
      }
    );
  };

  return (
    <div className="mb-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSectionContainer>
          {[...Array(4)].map((item, index) => (
            <div key={index}>
              <div className="grid gap-6 mb-4 md:grid-cols-2">
                <div>
                  <label
                    htmlFor={`title${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Title
                  </label>
                  <input
                    id={`title${index}`}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Title"
                    {...register(`features.${index}.title`)}
                  />
                  {errors.features && errors.features[index]?.title && (
                    <p className="text-red-700 mt-2 text-sm">
                      * {errors.features[index]?.title?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`description${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Description
                  </label>
                  <input
                    id={`description${index}`}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Description"
                    {...register(`features.${index}.description`)}
                  />
                  {errors.features && errors.features[index]?.description && (
                    <p className="text-red-700 mt-2 text-sm">
                      * {errors.features[index]?.description?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div className="w-full flex items-center space-x-4 mt-8">
            <SubmitButton isLoading={addUpdateFeaturesMutation.isLoading} />
          </div>
        </FormSectionContainer>
      </form>
      <Toast />
    </div>
  );
}
