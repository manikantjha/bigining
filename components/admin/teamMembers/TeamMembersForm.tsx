import { addUpdateTeamMember } from "@/services/apiServices";
import { storage } from "@/services/firebaseServices";
import { ITeamMembers } from "@/types/teamMembers";
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

interface ITeamMembersFormProps {
  teamMembers?: UseQueryResult<any, unknown>;
}

const schema = yup.object({
  teamMembers: yup
    .array()
    .of(
      yup.object({
        imageURL: yup.string().required("Image is required"),
        name: yup.string().required("Name is required"),
        description: yup.string().required("Description is required"),
      })
    )
    .required(),
});

export default function TeamMembersForm(props: ITeamMembersFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ITeamMembers>({
    resolver: yupResolver(schema),
    defaultValues: {
      teamMembers: props.teamMembers?.data
        ? props.teamMembers?.data?.teamMembers[0]?.teamMembers
        : [{ name: "", description: "", imageURL: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "teamMembers",
  });

  const addUpdateTeamMemberMutation = useMutation(addUpdateTeamMember, {
    onSuccess: () => {},
  });

  function deleteFile(index: number) {
    if (
      !(
        props.teamMembers?.data?.teamMembers &&
        props.teamMembers?.data?.teamMembers[0]?.teamMembers[index]?.imageURL
      )
    ) {
      return;
    }
    const imageRef = ref(
      storage,
      (props.teamMembers?.data?.teamMembers &&
        props.teamMembers?.data?.teamMembers[0]?.teamMembers[index]
          ?.imageURL) ||
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

  function onSubmit(data: ITeamMembers) {
    const _id = props.teamMembers?.data?.teamMembers
      ? props.teamMembers?.data?.teamMembers[0]?._id
      : "";
    addUpdateTeamMemberMutation.mutate(
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
                        const temp = fields.filter((member, i) => i !== index);
                        onSubmit({ teamMembers: temp });
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
                      name={`teamMembers.${index}.imageURL`}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <ImageUploader
                          label="Member Image"
                          onChange={onChange}
                          index={index}
                          id={`teamMembers.${index}.imageURL`}
                          imageURL={fields[index]?.imageURL || ""}
                        />
                      )}
                    />
                  </div>
                  <div>
                    <div>
                      <p className="block mb-2 text-sm font-medium text-gray-900">
                        Member Name
                      </p>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                        placeholder="Member Name"
                        {...register(`teamMembers.${index}.name`)}
                      />
                      {errors.teamMembers &&
                        errors.teamMembers[index]?.name && (
                          <p className="text-red-700 text-sm">
                            * {errors.teamMembers[index]?.name?.message}
                          </p>
                        )}
                    </div>
                    <div>
                      <p className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                        Member Short Description
                      </p>
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                        placeholder="Member Short Description"
                        {...register(`teamMembers.${index}.description`)}
                      />
                      {errors.teamMembers &&
                        errors.teamMembers[index]?.description && (
                          <p className="text-red-700 text-sm">
                            * {errors.teamMembers[index]?.description?.message}
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
              onClick={() =>
                append({ name: "", description: "", imageURL: "" })
              }
              text="Add Member"
            />
            <SubmitButton isLoading={addUpdateTeamMemberMutation.isLoading} />
          </div>
        </FormSectionContainer>
      </form>
      <Toast />
    </>
  );
}
