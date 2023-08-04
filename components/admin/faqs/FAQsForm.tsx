import useFormLogic from "@/customHooks/useFormLogic";
import { faqSchema } from "@/schemas/faqSchema";
import { addFaq, updateFaq } from "@/services/apiServices";
import { UseQueryResult } from "react-query";
import * as yup from "yup";
import FormSectionContainer from "../common/FormSectionContainer";
import TextArea from "../common/form/TextArea";
import TextInput from "../common/form/TextInput";
import SubmitButton from "../common/form/SubmitButton";

type TForm = yup.InferType<typeof faqSchema>;

interface IFaqFormProps {
  faq?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function FaqsForm(props: IFaqFormProps) {
  const defaultValues = props.faq?.data || {};

  const { onSubmit, isLoading, methods } = useFormLogic<TForm>({
    defaultValues,
    schema: faqSchema,
    mutationFn: props.caseOfAdd ? addFaq : updateFaq,
    entity: "faq",
    entityPlural: "faqs",
  });

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = methods;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormSectionContainer className="grid grid-rows-[auto_1fr] gap-8">
        <div className="grid grid-rows-[auto_1fr] gap-2">
          <TextInput
            label="Question"
            name="question"
            register={register}
            error={errors.question}
            placeholder="Question"
          />
          <TextArea
            label="Answer"
            name="answer"
            register={register}
            error={errors.answer}
            placeholder="Answer..."
          />
        </div>
        <div className="flex space-x-4">
          <SubmitButton loading={isLoading} />
        </div>
      </FormSectionContainer>
    </form>
  );
}
