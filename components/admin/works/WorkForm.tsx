import { workSchema } from "@/schemas/workSchema";
import { addWork, updateWork } from "@/services/apiServices";
import { IWork } from "@/types/work";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { UseQueryResult, useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import CommonButton from "../common/CommonButton";
import FormSectionContainer from "../common/FormSectionContainer";
import ImageUploaderNew from "../common/imageUploaderNew/ImageUploaderNew";
import { GetIcon } from "@/components/common/icons/icons";

type TForm = yup.InferType<typeof workSchema>;

interface IWorkFormProps {
  work?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function WorkForm(props: IWorkFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { page = 1 } = router.query;

  const objWork = props.caseOfAdd ? {} : props.work?.data;

  const defaultValues = props.work?.data ? props.work?.data : {};

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
    getFieldState,
  } = useForm<TForm>({
    resolver: yupResolver(workSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  const addWorkMutation = useMutation({
    mutationFn: addWork,
    onSuccess: (data) => {
      queryClient.setQueryData(["work", data._id], data);
      queryClient.invalidateQueries(["works"]);
      router.replace(`/admin/works?page=${page}`);
    },
  });

  const updateWorkMutation = useMutation({
    mutationFn: updateWork,
    onSuccess: (data) => {
      queryClient.setQueryData(["work", data._id], data);
      queryClient.invalidateQueries(["works", page]);
      router.replace(`/admin/works?page=${page}`);
    },
  });

  const onSubmit = async (data: IWork) => {
    try {
      if (objWork._id) {
        updateWorkMutation.mutate({
          ...data,
          _id: objWork._id,
        });
      } else {
        addWorkMutation.mutate(data);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
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
            <span className="text-red-500">{errors.description.message}</span>
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
            type="button"
            variant="outlined"
            color="accent"
            onClick={() =>
              append({
                original: { url: "", width: 0, height: 0, path: "" },
                medium: { url: "", width: 0, height: 0, path: "" },
                small: { url: "", width: 0, height: 0, path: "" },
              })
            }
            icon={<GetIcon name="add" size="w-5 h-5" />}
          >
            Add Image
          </CommonButton>
          <CommonButton
            type="submit"
            color="accent"
            loading={
              props.caseOfAdd
                ? addWorkMutation.isLoading
                : updateWorkMutation.isLoading
            }
            icon={<GetIcon name="send" size="w-5 h-5" />}
          >
            Submit
          </CommonButton>
        </div>
      </form>
    </FormSectionContainer>
  );
}
