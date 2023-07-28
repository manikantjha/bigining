import { addWorkNew, updateWorkNew } from "@/services/apiServices";
import { WorkImage } from "@/types/worksNew";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import * as yup from "yup";
import CommonButton from "../common/CommonButton";
import FormSectionContainer from "../common/FormSectionContainer";
import ImageUploaderNew from "../common/imageUploaderNew/ImageUploaderNew";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  images: yup
    .array()
    .of(
      yup.object({
        original: yup.object({
          path: yup.string().required(),
          url: yup.string().required(),
          width: yup.number().required(),
          height: yup.number().required(),
        }),
        medium: yup.object({
          path: yup.string().required(),
          url: yup.string().required(),
          width: yup.number().required(),
          height: yup.number().required(),
        }),
        small: yup.object({
          path: yup.string().required(),
          url: yup.string().required(),
          width: yup.number().required(),
          height: yup.number().required(),
        }),
      })
    )
    .min(1, "Please upload at least one image")
    .required(),
});

type IForm = yup.InferType<typeof schema>;

interface IWorkFormNewProps {
  work: UseQueryResult<any, unknown>;
}

const WorkFormNew = (props: IWorkFormNewProps) => {
  const router = useRouter();
  const { id } = router.query;

  const caseOfAdd = id === "add" ? true : false;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    watch,
    getFieldState,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: props.work?.data?.data ? { ...props.work?.data?.data } : {},
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  watch();

  const addWorkMutation = useMutation(
    "addWork",
    (data: { name: string; description: string; images: WorkImage[] }) =>
      addWorkNew(data)
  );

  const updateWorkMutation = useMutation(
    "updateWork",
    (data: {
      _id: string;
      name: string;
      description: string;
      images: WorkImage[];
    }) => updateWorkNew(data)
  );

  const onSubmit = async (data: IForm) => {
    try {
      if (props.work?.data?.data?._id) {
        updateWorkMutation.mutate(
          {
            ...data,
            _id: props.work?.data?.data?._id,
          },
          { onSuccess: () => router.replace("/admin/workNew") }
        );
      } else {
        addWorkMutation.mutate(data, {
          onSuccess: () => router.replace("/admin/workNew"),
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <>
      <div className="container">
        <FormSectionContainer>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                {...register("name")}
              />
              {errors.name && (
                <span className="text-red-500">{errors.name.message}</span>
              )}
            </div>
            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Description
              </label>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>
            {/* Images Fields */}
            <div>
              <label
                htmlFor="images"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Images (Multiple)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {fields.map((field, index) => (
                  <div key={field.id}>
                    <Controller
                      control={control}
                      name={`images.${index}`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <ImageUploaderNew
                          id={`images.${index}`}
                          label={`Image ${index + 1}`}
                          index={index}
                          onRemove={remove}
                          onChange={onChange}
                          image={field}
                          fileName={getValues("name")}
                          folderName="works"
                        />
                      )}
                    />
                    {getFieldState(`images.${index}.medium.url`).error && (
                      <p className="text-red-500">Plese select an image!</p>
                    )}
                  </div>
                ))}
              </div>
              {getFieldState(`images`).error && (
                <p className="text-red-500">
                  {getFieldState(`images`).error?.message}
                </p>
              )}
            </div>
            {/* Submit Button */}
            <div className="flex !mt-8 space-x-4">
              <CommonButton
                variant="outlined"
                color="accent"
                onClick={() =>
                  append({
                    original: { url: "", width: 0, height: 0, path: "" },
                    medium: { url: "", width: 0, height: 0, path: "" },
                    small: { url: "", width: 0, height: 0, path: "" },
                  })
                }
              >
                Add Image
              </CommonButton>
              <CommonButton
                type="submit"
                color="accent"
                loading={
                  caseOfAdd
                    ? addWorkMutation.isLoading
                    : updateWorkMutation.isLoading
                }
              >
                Submit
              </CommonButton>
            </div>
          </form>
        </FormSectionContainer>
      </div>
    </>
  );
};

export default WorkFormNew;
