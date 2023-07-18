import { addUpdateArtist } from "@/services/apiServices";
import { storage } from "@/services/firebaseServices";
import { IArtists } from "@/types/artists";
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

interface IArtistsFormProps {
  artists?: UseQueryResult<any, unknown>;
}

const schema = yup.object({
  artists: yup
    .array()
    .of(
      yup.object({
        imageURL: yup.string().required("Artist image is required!"),
        name: yup.string().required("Artist name is required!"),
        description: yup.string(),
      })
    )
    .required(),
});

type TArtistsForm = yup.InferType<typeof schema>;

export default function ArtistsForm(props: IArtistsFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TArtistsForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      artists: props.artists?.data
        ? props.artists?.data?.artists[0]?.artists
        : [{ imageURL: "", name: "", description: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "artists",
  });

  const addUpdateArtistMutation = useMutation(addUpdateArtist, {
    onSuccess: () => {},
  });

  function deleteFile(index: number) {
    if (
      !(
        props.artists?.data?.artists &&
        props.artists?.data?.artists[0]?.artists[index]?.imageURL
      )
    ) {
      return;
    }
    const imageRef = ref(
      storage,
      (props.artists?.data?.artists &&
        props.artists?.data?.artists[0]?.artists[index]?.imageURL) ||
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

  function onSubmit(data: IArtists) {
    const _id = props.artists?.data?.artists
      ? props.artists?.data?.artists[0]?._id
      : "";
    addUpdateArtistMutation.mutate(
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
                        const temp = fields.filter((artist, i) => i !== index);
                        onSubmit({ artists: temp });
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
                      name={`artists.${index}.imageURL`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <ImageUploader
                          label="Artist Image"
                          onChange={onChange}
                          index={index}
                          id={`artists.${index}.imageURL`}
                          imageURL={fields[index]?.imageURL || ""}
                        />
                      )}
                    />
                    {errors.artists &&
                      (errors as any).artists[index]?.imageURL && (
                        <p className="text-red-700 text-sm">
                          * {(errors as any).artists[index]?.imageURL?.message}
                        </p>
                      )}
                  </div>
                  <div>
                    <div>
                      <p className="block mb-2 text-sm font-medium text-gray-900">
                        Artist Name
                      </p>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                        placeholder="Artist Name"
                        {...register(`artists.${index}.name`)}
                      />
                      {errors.artists &&
                        (errors as any).artists[index]?.name && (
                          <p className="text-red-700 text-sm">
                            * {(errors as any).artists[index]?.name?.message}
                          </p>
                        )}
                    </div>
                  </div>

                  <div className="mt-2">
                    <p className="block mb-2 text-sm font-medium text-gray-900">
                      Artist Description
                    </p>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                      placeholder="Artist Description"
                      {...register(`artists.${index}.description`)}
                    />
                    {errors.artists &&
                      (errors as any).artists[index]?.description && (
                        <p className="text-red-700 text-sm">
                          *{" "}
                          {(errors as any).artists[index]?.description?.message}
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
              text="Add Artist"
            />
            <SubmitButton isLoading={addUpdateArtistMutation.isLoading} />
          </div>
        </FormSectionContainer>
      </form>
      <Toast />
    </>
  );
}
