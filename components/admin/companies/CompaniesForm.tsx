import { addUpdateCompany } from "@/services/apiServices";
import { storage } from "@/services/firebaseServices";
import { ICompanies } from "@/types/companies";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteObject, ref } from "firebase/storage";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import { ToastOptions, toast } from "react-toastify";
import * as yup from "yup";
import AddMoreButton from "../common/AddMoreButton";
import FormSectionContainer from "../common/FormSectionContainer";
import ImageUploader from "../common/ImageUploader";
import SubmitButton from "../common/SubmitButton";
import Toast from "../common/Toast";

interface ICompaniesFormProps {
  companies?: UseQueryResult<any, unknown>;
}

const schema = yup.object({
  companies: yup
    .array()
    .of(
      yup.object({
        imageURL: yup.string().required("Company logo is required!"),
        name: yup.string().required("Company name is required!"),
      })
    )
    .required(),
});

export default function CompaniesForm(props: ICompaniesFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ICompanies>({
    resolver: yupResolver(schema),
    defaultValues: {
      companies: props.companies?.data
        ? props.companies?.data?.companies[0]?.companies
        : [{ name: "", imageURL: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "companies",
  });

  const addUpdateCompanyMutation = useMutation(addUpdateCompany, {
    onSuccess: () => {},
  });

  function deleteFile(index: number) {
    if (
      !(
        props.companies?.data?.companies &&
        props.companies?.data?.companies[0]?.companies[index]?.imageURL
      )
    ) {
      return;
    }
    const imageRef = ref(
      storage,
      (props.companies?.data?.companies &&
        props.companies?.data?.companies[0]?.companies[index]?.imageURL) ||
        ""
    );

    deleteObject(imageRef)
      .then(() => {
        console.log("Deleted successfuly!");
        notify("Image removed", { type: "success" });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  const notify = (text: string, options: ToastOptions) => toast(text, options);

  function onSubmit(data: ICompanies) {
    const _id = props.companies?.data?.companies
      ? props.companies?.data?.companies[0]?._id
      : "";
    addUpdateCompanyMutation.mutate(
      {
        ...data,
        _id,
      },
      {
        onSuccess: () => {
          notify("Submitted succesfully!", { type: "success" });
        },
        onError: () => {
          notify("Failed to submit!", { type: "error" });
        },
      }
    );
  }
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSectionContainer>
          <div className="grid gap-6 mb-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {fields.map((item, index) => (
              <div key={item.id}>
                <FormSectionContainer>
                  <div className="w-full flex justify-end">
                    <button
                      type="button"
                      className="bg-accentDark text-white border hover:bg-orange-800 active:bg-orange-800 p-1 font-semibold rounded-full flex"
                      onClick={() => {
                        deleteFile(index);
                        remove(index);
                        const temp = fields.filter((company, i) => i !== index);
                        onSubmit({ companies: temp });
                      }}
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
                  <div className="mb-4">
                    <Controller
                      control={control}
                      name={`companies.${index}.imageURL`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <ImageUploader
                          label="Company Logo"
                          onChange={onChange}
                          index={index}
                          id={`companies.${index}.imageURL`}
                          imageURL={fields[index]?.imageURL || ""}
                        />
                      )}
                    />
                    {errors.companies &&
                      (errors as any).companies[index]?.imageURL && (
                        <p className="text-red-700 text-sm">
                          *{" "}
                          {(errors as any).companies[index]?.imageURL?.message}
                        </p>
                      )}
                  </div>
                  <div>
                    <div>
                      <p className="block mb-2 text-sm font-medium text-gray-900">
                        Company Name
                      </p>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                        placeholder="Company Name"
                        {...register(`companies.${index}.name`)}
                      />
                      {errors.companies &&
                        (errors as any).companies[index]?.name && (
                          <p className="text-red-700 text-sm">
                            * {(errors as any).companies[index]?.name?.message}
                          </p>
                        )}
                    </div>
                  </div>
                </FormSectionContainer>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center space-x-4 mt-8">
            <AddMoreButton
              onClick={() => append({ name: "", imageURL: "" })}
              text="Add Company"
            />
            <SubmitButton isLoading={addUpdateCompanyMutation.isLoading} />
          </div>
        </FormSectionContainer>
      </form>
      <Toast />
    </>
  );
}
