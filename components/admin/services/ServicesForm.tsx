import { addUpdateService } from "@/services/apiServices";
import { IServices } from "@/types/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import { ToastOptions, toast } from "react-toastify";
import * as yup from "yup";
import AddMoreButton from "../common/AddMoreButton";
import FormSectionContainer from "../common/FormSectionContainer";
import FormSectionWrapper from "../common/FormSectionWrapper";
import SubmitButton from "../common/SubmitButton";
import Toast from "../common/Toast";
import ServicesListForm from "./ServicesListForm";

interface IServicesFormProps {
  services: UseQueryResult<any, unknown>;
}

const schema = yup
  .object({
    services: yup.array().of(
      yup.object({
        title: yup.string().required("Title is required"),
        list: yup.array().of(yup.string().required("List item is required")),
      })
    ),
  })
  .required();

export default function ServicesForm(props: IServicesFormProps) {
  const objForm = useForm<IServices>({
    resolver: yupResolver(schema as any),
    defaultValues: {
      services: props?.services?.data?.services
        ? props?.services?.data?.services[0]?.services
        : [{ title: "", list: [] }],
    },
  });

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = objForm;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "services",
  });

  const notify = (text: string, options: ToastOptions) => toast(text, options);

  const addUpdateServicesMutation = useMutation(addUpdateService, {
    onSuccess: () => {},
  });

  const onSubmit = (data: IServices) => {
    const _id = props?.services?.data?.services
      ? props?.services?.data?.services[0]?._id
      : undefined;
    addUpdateServicesMutation.mutate(
      { ...data, _id },
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
    <FormSectionWrapper>
      <FormProvider {...objForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSectionContainer>
            {fields.map((item, index) => (
              <FormSectionContainer key={item.id} className="mb-4">
                <div className="grid gap-4 mb-4">
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
                  <div>
                    <label
                      htmlFor={`title${index}`}
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Service {index + 1} Title
                    </label>
                    <input
                      id={`title${index}`}
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                      placeholder="Title"
                      {...register(`services.${index}.title`)}
                    />
                  </div>
                  {errors.services && errors.services[index]?.title && (
                    <p className="text-red-700 text-sm">
                      * {errors.services[index]?.title?.message}
                    </p>
                  )}
                  <ServicesListForm parentIndex={index} />
                </div>
              </FormSectionContainer>
            ))}
            <div className="w-full flex items-center space-x-4 mt-8">
              <AddMoreButton
                onClick={() => append({ title: "", list: [""] })}
                text="Add Service"
              />
              <SubmitButton isLoading={addUpdateServicesMutation.isLoading} />
            </div>
          </FormSectionContainer>
        </form>
      </FormProvider>
      <Toast />
    </FormSectionWrapper>
  );
}
