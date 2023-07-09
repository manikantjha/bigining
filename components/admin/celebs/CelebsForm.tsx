import { addUpdateCeleb } from "@/services/apiServices";
import { storage } from "@/services/firebaseServices";
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

type CelebsForm = {
  celebs: {
    imageURL: string;
    name: string;
    description?: string;
  }[];
};

interface ICelebsFormProps {
  celebs?: UseQueryResult<any, unknown>;
}

const schema = yup.object({
  celebs: yup.array().of(
    yup.object({
      imageURL: yup.string().required("Celeb image is required!"),
      name: yup.string().required("Celeb name is required!"),
      description: yup.string(),
    })
  ),
});

export default function CelebsForm(props: ICelebsFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CelebsForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      celebs: props.celebs?.data
        ? props.celebs?.data?.celebs[0]?.celebs
        : [{ name: "", imageURL: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "celebs",
  });

  const addUpdateCelebMutation = useMutation(addUpdateCeleb, {
    onSuccess: () => {},
  });

  function deleteFile(index: number) {
    if (
      !(
        props.celebs?.data?.celebs &&
        props.celebs?.data?.celebs[0]?.celebs[index]?.imageURL
      )
    ) {
      return;
    }
    const imageRef = ref(
      storage,
      (props.celebs?.data?.celebs &&
        props.celebs?.data?.celebs[0]?.celebs[index]?.imageURL) ||
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
    const id = props.celebs?.data?.celebs
      ? props.celebs?.data?.celebs[0]?._id
      : "";
    addUpdateCelebMutation.mutate(
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
                      name={`celebs.${index}.imageURL`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <ImageUploader
                          label="Celebrity Image"
                          onChange={onChange}
                          index={index}
                          id={`celebs.${index}.imageURL`}
                          imageURL={
                            props.celebs?.data?.celebs[0]?.celebs[index]
                              ?.imageURL || ""
                          }
                        />
                      )}
                    />
                    {errors.celebs && errors.celebs[index]?.imageURL && (
                      <p className="text-red-700 text-sm">
                        * {errors.celebs[index]?.imageURL?.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <div>
                      <p className="block mb-2 text-sm font-medium text-gray-900">
                        Celebrity Name
                      </p>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                        placeholder="Celebrity Name"
                        {...register(`celebs.${index}.name`)}
                      />
                      {errors.celebs && errors.celebs[index]?.name && (
                        <p className="text-red-700 text-sm">
                          * {errors.celebs[index]?.name?.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="block mb-2 text-sm font-medium text-gray-900">
                      Celebrity Description
                    </p>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                      placeholder="Celebrity Description"
                      {...register(`celebs.${index}.description`)}
                    />
                    {errors.celebs && errors.celebs[index]?.description && (
                      <p className="text-red-700 text-sm">
                        * {errors.celebs[index]?.description?.message}
                      </p>
                    )}
                  </div>
                </FormSectionContainer>
              </div>
            ))}
          </div>

          <div className="w-full flex items-center space-x-4 mt-8">
            <AddMoreButton
              onClick={() =>
                append({ name: "", imageURL: "", description: "" })
              }
              text="Add Celebrity"
            />
            <SubmitButton isLoading={addUpdateCelebMutation.isLoading} />
          </div>
        </FormSectionContainer>
      </form>
      <Toast />
    </>
  );
}
