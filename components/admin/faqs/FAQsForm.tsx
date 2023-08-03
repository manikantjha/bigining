import { faqSchema } from "@/schemas/faqSchema";
import { IFaq } from "@/types/faqs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { UseQueryResult, useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import FormSectionContainer from "../common/FormSectionContainer";
import Toast from "../common/Toast";
import { addFaq, updateFaq } from "@/services/apiServices";
import CommonButton from "../common/CommonButton";
import { GetIcon } from "@/components/common/icons/icons";

type TForm = yup.InferType<typeof faqSchema>;

interface IFaqFormProps {
  faq?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function FaqsForm(props: IFaqFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { page = 1 } = router.query;

  const defaultValues = props.faq?.data || {};
  const objFaq = props.caseOfAdd ? {} : props.faq?.data;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    resolver: yupResolver<TForm>(faqSchema),
    defaultValues,
  });

  const addFaqMutation = useMutation({
    mutationFn: addFaq,
    onSuccess: (data) => {
      queryClient.setQueryData(["faq", data._id], data);
      queryClient.invalidateQueries(["faqs"]);
      router.replace(`/admin/faqs?page=${page}`);
    },
  });
  const updateFaqMutation = useMutation({
    mutationFn: updateFaq,
    onSuccess: (data) => {
      if (data) queryClient.setQueryData(["faq", data._id], data);
      queryClient.invalidateQueries(["faqs", page]);
      router.replace(`/admin/faqs?page=${page}`);
    },
  });

  function onSubmit(data: IFaq) {
    try {
      if (objFaq._id) {
        updateFaqMutation.mutate({ ...data, _id: objFaq._id });
      } else {
        addFaqMutation.mutate(data);
      }
    } catch (error) {
      console.log("Error submitting form: ", error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSectionContainer>
          <FormSectionContainer className="mb-4">
            <div className="grid gap-4 mb-4">
              <div>
                <label
                  htmlFor={`question`}
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Question
                </label>
                <input
                  id={`question`}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                  placeholder="Question"
                  {...register(`question`)}
                />
                {errors.question && (
                  <p className="text-red-700 mt-2 text-sm">
                    * {errors.question?.message}
                  </p>
                )}
              </div>
              <div>
                <label
                  htmlFor={`answer`}
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Answer
                </label>
                <textarea
                  id={`answer`}
                  rows={4}
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-accentDark focus:border-accentDark"
                  placeholder="Answer..."
                  {...register(`answer`)}
                ></textarea>
                {errors.answer && (
                  <p className="text-red-700 mt-2 text-sm">
                    * {errors.answer?.message}
                  </p>
                )}
              </div>
            </div>
          </FormSectionContainer>
          <div className="flex !mt-8 space-x-4">
            <CommonButton
              type="submit"
              color="accent"
              loading={
                props.caseOfAdd
                  ? addFaqMutation.isLoading
                  : updateFaqMutation.isLoading
              }
              icon={<GetIcon name="send" size="w-5 h-5" />}
            >
              Submit
            </CommonButton>
          </div>
        </FormSectionContainer>
      </form>
      <Toast />
    </>
  );
}
