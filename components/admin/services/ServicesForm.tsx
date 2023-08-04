import useFormLogic from "@/customHooks/useFormLogic";
import { serviceSchema } from "@/schemas/serviceSchema";
import { addService, updateService } from "@/services/apiServices";
import { FormProvider } from "react-hook-form";
import { UseQueryResult } from "react-query";
import * as yup from "yup";
import FormSectionContainer from "../common/FormSectionContainer";
import FormSectionWrapper from "../common/FormSectionWrapper";
import SubmitButton from "../common/form/SubmitButton";
import TextInput from "../common/form/TextInput";
import ServicesListForm from "./ServicesListForm";

type TForm = yup.InferType<typeof serviceSchema>;

interface IServicesFormProps {
  service?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function ServiceForm(props: IServicesFormProps) {
  const defaultValues = props.service?.data
    ? props.service?.data
    : {
        title: "",
      };

  const { onSubmit, isLoading, methods } = useFormLogic<TForm>({
    defaultValues,
    schema: serviceSchema,
    mutationFn: props.caseOfAdd ? addService : updateService,
    entity: "service",
    entityPlural: "services",
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = methods;

  return (
    <FormSectionWrapper>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSectionContainer>
            <FormSectionContainer className="mb-4">
              <div className="grid gap-4 mb-4">
                <TextInput
                  label="Service Title"
                  name="title"
                  register={register}
                  error={errors.title}
                  placeholder="Title"
                />
                <ServicesListForm />
              </div>
            </FormSectionContainer>
            <div className="w-full flex items-center space-x-4 mt-8">
              <SubmitButton loading={isLoading} />
            </div>
          </FormSectionContainer>
        </form>
      </FormProvider>
    </FormSectionWrapper>
  );
}
