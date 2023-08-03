import useFormLogic from "@/customHooks/useFormLogic";
import { artistSchema } from "@/schemas/artistSchema";
import { addArtist, updateArtist } from "@/services/apiServices";
import { Controller } from "react-hook-form";
import { UseQueryResult } from "react-query";
import * as yup from "yup";
import FormSectionContainer from "../common/FormSectionContainer";
import SelectInput from "../common/form/SelectInput";
import SubmitButton from "../common/form/SubmitButton";
import TextArea from "../common/form/TextArea";
import TextInput from "../common/form/TextInput";
import ImageUploaderNew from "../common/imageUploaderNew/ImageUploaderNew";

type TForm = yup.InferType<typeof artistSchema>;

interface IArtistsFormProps {
  artist?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function ArtistsForm(props: IArtistsFormProps) {
  const defaultValues = props.artist?.data
    ? props.artist?.data
    : {
        name: "",
        description: "",
        category: "celebrity",
        numberOfEvents: "",
        image: {},
      };

  const {
    onSubmit,
    control,
    errors,
    getValues,
    handleSubmit,
    isLoading,
    register,
  } = useFormLogic<TForm>({
    defaultValues,
    schema: artistSchema,
    mutationFn: props.caseOfAdd ? addArtist : updateArtist,
    entity: "artist",
    entityPlural: "artists",
  });

  return (
    <FormSectionContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Other Fields */}
          <FormSectionContainer className="space-y-3">
            {/* Name Field */}
            <TextInput
              label="Artist Name"
              name="name"
              register={register}
              error={errors.name}
              placeholder="Artist Name"
            />
            {/* Description Field */}
            <TextArea
              label="Artist Description"
              name="description"
              register={register}
              error={errors.description}
              placeholder="Artist Description"
            />
            {/* Category Field */}
            <SelectInput
              label="Artist Category"
              name="category"
              options={[
                { label: "singer", value: "singer" },
                { label: "celebrity", value: "celebrity" },
              ]}
              register={register}
              error={errors.category}
            />
            {/* Number of Events Field */}
            <TextInput
              label="Number of Events"
              name="numberOfEvents"
              register={register}
              error={errors.numberOfEvents}
              placeholder="Number of Events"
              type="number"
            />
          </FormSectionContainer>
          {/* Image Field */}
          <FormSectionContainer>
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <ImageUploaderNew
                  label="Artist Image"
                  onChange={onChange}
                  image={value}
                  folderName="artists"
                  fileName={getValues("name")}
                  error={errors.image}
                />
              )}
            />
          </FormSectionContainer>
        </div>
        {/* Submit Button */}
        <div className="flex !mt-8 space-x-4">
          <SubmitButton loading={isLoading} />
        </div>
      </form>
    </FormSectionContainer>
  );
}
