import { addUpdateFAQ } from "@/services/apiServices";
import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import { ToastOptions, toast } from "react-toastify";
import * as yup from "yup";
import AddMoreButton from "../common/AddMoreButton";
import FormSectionContainer from "../common/FormSectionContainer";
import SubmitButton from "../common/SubmitButton";
import Toast from "../common/Toast";

type FAQsForm = {
  faqs: {
    question: string;
    answer: string;
  }[];
};

interface IFAQsForm {
  faqs: UseQueryResult<any, unknown>;
}

const schema = yup
  .object({
    faqs: yup.array().of(
      yup.object({
        question: yup.string().required("Question is required"),
        answer: yup.string().required("Answer is required"),
      })
    ),
  })
  .required();

export default function FAQsForm(props: IFAQsForm) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      faqs: props?.faqs?.data?.faqs
        ? props?.faqs?.data?.faqs[0]?.faqs
        : [{ question: "", answer: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  const notify = (text: string, options: ToastOptions) => toast(text, options);

  const addUpdateFAQsMutation = useMutation(addUpdateFAQ, {
    onSuccess: () => {},
  });

  const onSubmit = (data: FAQsForm) => {
    const id = props?.faqs?.data?.faqs
      ? props?.faqs?.data?.faqs[0]?._id
      : undefined;
    addUpdateFAQsMutation.mutate(
      { ...data, id: id },
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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSectionContainer>
          {fields.map((item, index) => (
            <FormSectionContainer key={item.id} className="mb-4">
              <div className="w-full flex justify-end">
                <button
                  type="button"
                  className="bg-accentDark text-white border hover:bg-orange-800 active:bg-orange-800 p-1 font-semibold rounded-full flex"
                  onClick={() => remove(index)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="grid gap-4 mb-4">
                <div>
                  <label
                    htmlFor={`question${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Question {index + 1}
                  </label>
                  <input
                    id={`question${index}`}
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                    placeholder="Question"
                    {...register(`faqs.${index}.question`)}
                  />
                  {errors.faqs && (errors as any).faqs[index]?.question && (
                    <p className="text-red-700 mt-2 text-sm">
                      * {(errors as any).faqs[index]?.question?.message}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`answer${index}`}
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Answer
                  </label>
                  <textarea
                    id={`answer${index}`}
                    rows={4}
                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-accentDark focus:border-accentDark"
                    placeholder="Answer..."
                    {...register(`faqs.${index}.answer`)}
                  ></textarea>
                  {errors.faqs && (errors as any).faqs[index]?.answer && (
                    <p className="text-red-700 mt-2 text-sm">
                      * {(errors as any).faqs[index]?.answer?.message}
                    </p>
                  )}
                </div>
              </div>
            </FormSectionContainer>
          ))}
          <div className="w-full flex items-center space-x-4 mt-8">
            <AddMoreButton
              onClick={() => append({ question: "", answer: "" })}
              text="Add More FAQ"
            />
            <SubmitButton isLoading={addUpdateFAQsMutation.isLoading} />
          </div>
        </FormSectionContainer>
      </form>
      <Toast />
    </>
  );
}
