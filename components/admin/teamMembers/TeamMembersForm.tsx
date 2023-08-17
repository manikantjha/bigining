import useFormLogic from "@/customHooks/useFormLogic";
import { teamMemberSchema } from "@/schemas/teamMemberSchema";
import { addTeamMember, updateTeamMember } from "@/services/apiServices";
import { Controller } from "react-hook-form";
import { UseQueryResult } from "react-query";
import * as yup from "yup";
import FormSectionContainer from "../common/FormSectionContainer";
import SubmitButton from "../common/form/SubmitButton";
import TextArea from "../common/form/TextArea";
import TextInput from "../common/form/TextInput";
import ImageUploaderNew from "../common/imageUploaderNew/ImageUploaderNew";

type TForm = yup.InferType<typeof teamMemberSchema>;

interface ITeamMembersFormProps {
  teamMember?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function TeamMembersForm(props: ITeamMembersFormProps) {
  const defaultValues = props.teamMember?.data ? props.teamMember?.data : {};

  const { onSubmit, isLoading, methods } = useFormLogic<TForm>({
    defaultValues,
    schema: teamMemberSchema,
    mutationFn: props.caseOfAdd ? addTeamMember : updateTeamMember,
    entity: "teamMember",
    entityPlural: "teamMembers",
  });

  const {
    control,
    getValues,
    formState: { errors },
    handleSubmit,
    register,
  } = methods;

  return (
    <FormSectionContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Other Fields*/}
          <FormSectionContainer className="grid grid-rows-[auto_1fr] gap-2">
            <TextInput
              label="Member Name"
              name="name"
              register={register}
              error={errors.name}
              placeholder="Member Name"
            />
            <TextArea
              label="Member Short Description"
              name="description"
              register={register}
              error={errors.description}
              placeholder="Member Short Description"
            />
          </FormSectionContainer>
          {/* Image Field*/}
          <FormSectionContainer>
            <Controller
              control={control}
              name={`image`}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <ImageUploaderNew
                  label="Member Image"
                  onChange={onChange}
                  image={value}
                  folderName="teamMembers"
                  fileName={getValues("name")}
                  error={errors.image}
                />
              )}
            />
          </FormSectionContainer>
        </div>
        <div className="flex !mt-8 space-x-4">
          <SubmitButton loading={isLoading} />
        </div>
      </form>
    </FormSectionContainer>
  );
}
