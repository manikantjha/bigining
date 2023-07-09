import { addUpdatePackage } from "@/services/apiServices";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import * as yup from "yup";
import FormSectionContainer from "../common/FormSectionContainer";
import FormSectionWrapper from "../common/FormSectionWrapper";
import PackagesListForm from "./PackagesListForm";
import AddMoreButton from "../common/AddMoreButton";
import SubmitButton from "../common/SubmitButton";
import { ToastOptions, toast } from "react-toastify";
import Toast from "../common/Toast";

type PackagesForm = {
  packages: {
    title: string;
    price: number;
    list: string[];
  }[];
};

interface IPackages {
  packages: UseQueryResult<any, unknown>;
}

const schema = yup
  .object({
    packages: yup.array().of(
      yup.object({
        title: yup.string().required("Title is required"),
        price: yup
          .number()
          .positive("Price must be greater than 0")
          .required("Price is required"),
        list: yup.array().of(yup.string().required("List item is required")),
      })
    ),
  })
  .required();

export default function PackagesForm(props: IPackages) {
  const objForm = useForm<PackagesForm>({
    resolver: yupResolver(schema as any),
    defaultValues: {
      packages: props?.packages?.data?.packages
        ? props?.packages?.data?.packages[0]?.packages
        : [{ title: "", price: 0, list: [] }],
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
    name: "packages",
  });

  const notify = (text: string, options: ToastOptions) => toast(text, options);

  const addUpdatePackagesMutation = useMutation(addUpdatePackage, {
    onSuccess: () => {},
  });

  const onSubmit = (data: PackagesForm) => {
    const id = props?.packages?.data?.packages
      ? props?.packages?.data?.packages[0]?._id
      : undefined;
    addUpdatePackagesMutation.mutate(
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
    <FormSectionWrapper>
      <FormProvider {...objForm}>
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
                <div className="grid gap-6 mb-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Package {index + 1} Title
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                      placeholder="Package title"
                      {...register(`packages.${index}.title`)}
                    />
                    {errors.packages && errors.packages[index]?.title && (
                      <p className="text-red-700 text-sm">
                        * {errors.packages[index]?.title?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Starting Price
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                      placeholder="0"
                      {...register(`packages.${index}.price`)}
                    />
                    {errors.packages && errors.packages[index]?.price && (
                      <p className="text-red-700 text-sm">
                        * {errors.packages[index]?.price?.message}
                      </p>
                    )}
                  </div>
                </div>
                <PackagesListForm parentIndex={index} />
              </FormSectionContainer>
            ))}

            <div className="w-full flex items-center space-x-4 mt-8">
              <AddMoreButton
                onClick={() => append({ title: "", price: 0, list: [] })}
                text="Add Package"
              />
              <SubmitButton isLoading={addUpdatePackagesMutation.isLoading} />
            </div>
          </FormSectionContainer>
        </form>
      </FormProvider>
      <Toast />
    </FormSectionWrapper>
  );
}
