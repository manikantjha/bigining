import { addUpdateTeamMember, addUpdateWork } from "@/services/apiServices";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import * as yup from "yup";
import AddMoreButton from "../common/AddMoreButton";
import FormSectionContainer from "../common/FormSectionContainer";
import ImageUploader from "../common/ImageUploader";
import SubmitButton from "../common/SubmitButton";
import Toast from "../common/Toast";
import { ToastOptions, toast } from "react-toastify";
import { storage } from "@/services/firebaseServices";
import { deleteObject, ref } from "firebase/storage";

type WorksForm = {
  works: {
    imageURL: string;
    name: string;
    description: string;
  }[];
};

interface IWorksFormProps {
  works?: UseQueryResult<any, unknown>;
}

const schema = yup.object({
  works: yup.array().of(
    yup.object({
      imageURL: yup.string().required("Image is required"),
      name: yup.string(),
      description: yup.string(),
    })
  ),
});

export default function WorksForm(props: IWorksFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WorksForm>({
    resolver: yupResolver(schema as any),
    defaultValues: {
      works: props.works?.data?.works
        ? props.works?.data?.works[0]?.works
        : [{ name: "", description: "", imageURL: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "works",
  });

  const addUpdateWorkMutation = useMutation(addUpdateWork, {
    onSuccess: () => {},
  });

  function deleteFile(index: number) {
    if (
      !(
        props.works?.data?.works &&
        props.works?.data?.works[0]?.works[index]?.imageURL
      )
    ) {
      return;
    }
    const imageRef = ref(
      storage,
      (props.works?.data?.works &&
        props.works?.data?.works[0]?.works[index]?.imageURL) ||
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

  function onSubmit(data: any) {
    const id = props.works?.data?.works ? props.works?.data?.works[0]?._id : "";
    addUpdateWorkMutation.mutate(
      {
        ...data,
        id: id,
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
                      name={`works.${index}.imageURL`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <ImageUploader
                          label="Work Image"
                          onChange={onChange}
                          index={index}
                          id={`works.${index}.imageURL`}
                          imageURL={
                            (props.works?.data?.works &&
                              props.works?.data?.works[0]?.works[index]
                                ?.imageURL) ||
                            ""
                          }
                        />
                      )}
                    />
                    {errors.works && errors.works[index]?.imageURL && (
                      <p className="text-red-700 text-sm">
                        * {errors.works[index]?.imageURL?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <div>
                      <p className="block mb-2 text-sm font-medium text-gray-900">
                        Work Name
                      </p>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                        placeholder="Member Name"
                        {...register(`works.${index}.name`)}
                      />
                    </div>
                    <div>
                      <p className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                        Work Short Description
                      </p>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                        placeholder="Hero Short Description"
                        {...register(`works.${index}.description`)}
                      />
                    </div>
                  </div>
                </FormSectionContainer>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center space-x-4 mt-8">
            <AddMoreButton
              onClick={() =>
                append({ name: "", description: "", imageURL: "" })
              }
              text="Add Work"
            />
            <SubmitButton isLoading={addUpdateWorkMutation.isLoading} />
          </div>
        </FormSectionContainer>
      </form>
      <Toast />
    </>
  );
}
