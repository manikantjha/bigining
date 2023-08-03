import { teamMemberSchema } from "@/schemas/teamMemberSchema";
import { addTeamMember, updateTeamMember } from "@/services/apiServices";
import { ITeamMember } from "@/types/teamMember";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { UseQueryResult, useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import FormSectionContainer from "../common/FormSectionContainer";
import Toast from "../common/Toast";
import ImageUploaderNew from "../common/imageUploaderNew/ImageUploaderNew";
import CommonButton from "../common/CommonButton";
import { GetIcon } from "@/components/common/icons/icons";

type TForm = yup.InferType<typeof teamMemberSchema>;

interface ITeamMembersFormProps {
  teamMember?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function TeamMembersForm(props: ITeamMembersFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { page = 1 } = router.query;

  const objTeamMember = props.caseOfAdd ? {} : props.teamMember?.data;

  const defaultValues = props.teamMember?.data ? props.teamMember?.data : {};

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<TForm>({
    resolver: yupResolver(teamMemberSchema),
    defaultValues,
  });

  const addTeamMemberMutation = useMutation({
    mutationFn: addTeamMember,
    onSuccess: (data) => {
      queryClient.setQueryData(["teamMember", data._id], data);
      queryClient.invalidateQueries(["teamMembers"]);
      router.replace(`/admin/teamMembers?page=${page}`);
    },
  });

  const updateTeamMemberMutation = useMutation({
    mutationFn: updateTeamMember,
    onSuccess: (data) => {
      queryClient.setQueryData(["teamMember", data?._id], data);
      queryClient.invalidateQueries(["teamMembers", page]);
      router.replace(`/admin/teamMembers?page=${page}`);
    },
  });

  function onSubmit(data: ITeamMember) {
    try {
      if (objTeamMember._id) {
        updateTeamMemberMutation.mutate({ ...data, _id: objTeamMember._id });
      } else {
        addTeamMemberMutation.mutate(data);
      }
    } catch (error) {
      console.log("Error submitting form: ", error);
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSectionContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Other Fields*/}
            <FormSectionContainer>
              <div>
                <div>
                  <p className="block mb-2 text-sm font-medium text-gray-900">
                    Member Name
                  </p>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                    placeholder="Member Name"
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="text-red-700 text-sm">
                      * {errors.name?.message}
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
                    {...register(`description`)}
                  />
                  {errors.description && errors.description && (
                    <p className="text-red-700 text-sm">
                      * {errors.description?.message}
                    </p>
                  )}
                </div>
              </div>
            </FormSectionContainer>
            {/* Image Field*/}
            <FormSectionContainer>
              <div className="mb-4">
                <Controller
                  control={control}
                  name={`image`}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <ImageUploaderNew
                      label="Member Image"
                      onChange={onChange}
                      image={value}
                      folderName="teamMembers"
                      fileName={getValues("name")}
                    />
                  )}
                />
              </div>
            </FormSectionContainer>
          </div>

          <div className="flex !mt-8 space-x-4">
            <CommonButton
              type="submit"
              color="accent"
              loading={
                props.caseOfAdd
                  ? addTeamMemberMutation.isLoading
                  : updateTeamMemberMutation.isLoading
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
