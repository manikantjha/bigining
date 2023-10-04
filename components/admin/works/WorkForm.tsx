import { GetIcon } from "@/components/common/icons/icons";
import useFormLogic from "@/customHooks/useFormLogic";
import { workSchema } from "@/schemas/workSchema";
import { addWork, updateWork } from "@/services/apiServices";
import { Controller, useFieldArray } from "react-hook-form";
import { UseQueryResult } from "react-query";
import * as yup from "yup";
import CommonButton from "../common/CommonButton";
import FormSectionContainer from "../common/FormSectionContainer";
import SubmitButton from "../common/form/SubmitButton";
import TextArea from "../common/form/TextArea";
import TextInput from "../common/form/TextInput";
import ImageUploaderNew from "../common/imageUploaderNew/ImageUploaderNew";

type TForm = yup.InferType<typeof workSchema>;

interface IWorkFormProps {
  work?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function WorkForm(props: IWorkFormProps) {
  const defaultValues = props.work?.data ? props.work?.data : {};

  const { onSubmit, methods, isLoading } = useFormLogic<TForm>({
    defaultValues,
    schema: workSchema,
    mutationFn: props.caseOfAdd ? addWork : updateWork,
    entity: "work",
    entityPlural: "works",
  });

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    getFieldState,
  } = methods;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  return (
    <FormSectionContainer>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Name Field */}
        <TextInput
          label="Work Name"
          name="name"
          register={register}
          error={errors.name}
          placeholder="Work Name"
        />
        {/* Description Field */}
        <TextArea
          label="Work Description"
          name="description"
          register={register}
          error={errors.description}
          placeholder="Work Description"
        />
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
          <SubmitButton loading={isLoading} />
        </div>
      </form>
    </FormSectionContainer>
  );
}
