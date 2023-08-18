import useFormLogic from "@/customHooks/useFormLogic";
import { companySchema } from "@/schemas/companySchema";
import { addCompany, updateCompany } from "@/services/apiServices";
import { Controller } from "react-hook-form";
import { UseQueryResult } from "react-query";
import * as yup from "yup";
import FormSectionContainer from "../common/FormSectionContainer";
import SubmitButton from "../common/form/SubmitButton";
import TextInput from "../common/form/TextInput";
import ImageUploaderNew from "../common/imageUploaderNew/ImageUploaderNew";

type TForm = yup.InferType<typeof companySchema>;

interface ICompaniesFormProps {
  company?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function CompaniesForm(props: ICompaniesFormProps) {
  const defaultValues = props.company?.data ? props.company?.data : {};

  const { onSubmit, isLoading, methods } = useFormLogic<TForm>({
    defaultValues,
    schema: companySchema,
    mutationFn: props.caseOfAdd ? addCompany : updateCompany,
    entity: "company",
    entityPlural: "companies",
  });

  const {
    control,
    formState: { errors },
    getValues,
    handleSubmit,
    register,
  } = methods;

  return (
    <FormSectionContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Name Field */}
          <FormSectionContainer>
            <TextInput
              label="Company Name"
              name="name"
              register={register}
              error={errors.name}
              placeholder="Company Name"
            />
          </FormSectionContainer>
          {/* Image Field */}
          <FormSectionContainer>
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <ImageUploaderNew
                  label="Company Logo"
                  onChange={onChange}
                  image={value}
                  folderName="companies"
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
