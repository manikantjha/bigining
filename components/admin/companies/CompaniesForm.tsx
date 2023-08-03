import { GetIcon } from "@/components/common/icons/icons";
import { companySchema } from "@/schemas/companySchema";
import { addCompany, updateCompany } from "@/services/apiServices";
import { ICompany } from "@/types/company";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { UseQueryResult, useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import CommonButton from "../common/CommonButton";
import FormSectionContainer from "../common/FormSectionContainer";
import Toast from "../common/Toast";
import ImageUploaderNew from "../common/imageUploaderNew/ImageUploaderNew";

type TForm = yup.InferType<typeof companySchema>;

interface ICompaniesFormProps {
  company?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function CompaniesForm(props: ICompaniesFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { page = 1 } = router.query;

  const objCompany = props.caseOfAdd ? {} : props.company?.data;

  const defaultValues = props.company?.data ? props.company?.data : {};

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<TForm>({
    resolver: yupResolver(companySchema),
    defaultValues,
  });

  const addCompanyMutation = useMutation({
    mutationFn: addCompany,
    onSuccess: (data) => {
      queryClient.setQueryData(["company", data._id], data);
      queryClient.invalidateQueries(["companies"]);
      router.replace(`/admin/companies?page=${page}`);
    },
  });
  const updateCompanyMutation = useMutation({
    mutationFn: updateCompany,
    onSuccess: (data) => {
      queryClient.setQueryData(["company", data._id], data);
      queryClient.invalidateQueries(["companies", page]);
      router.replace(`/admin/companies?page=${page}`);
    },
  });

  function onSubmit(data: ICompany) {
    try {
      if (objCompany._id) {
        updateCompanyMutation.mutate({
          ...data,
          _id: objCompany._id,
        });
      } else {
        addCompanyMutation.mutate(data);
      }
    } catch (error) {
      console.log("Error submitting form: ", error);
    }
  }

  return (
    <>
      <FormSectionContainer>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <FormSectionContainer>
              {/* Name Field */}
              <div>
                <div>
                  <p className="block mb-2 text-sm font-medium text-gray-900">
                    Company Name
                  </p>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                    placeholder="Company Name"
                    {...register(`name`)}
                  />
                  {errors.name && (
                    <p className="text-red-700 text-sm">
                      * {errors.name.message}
                    </p>
                  )}
                </div>
              </div>
            </FormSectionContainer>
            <FormSectionContainer>
              {/* Image Field */}
              <div className="w-full h-full">
                <Controller
                  control={control}
                  name="image"
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <ImageUploaderNew
                      label="Company Logo"
                      onChange={onChange}
                      image={value}
                      folderName="companies"
                      fileName={getValues("name")}
                    />
                  )}
                />
                {errors.image && (
                  <p className="text-red-700 text-sm">
                    * Company logo is required
                  </p>
                )}
              </div>
            </FormSectionContainer>
          </div>
          {/* Submit Button */}
          <div className="flex !mt-8 space-x-4">
            <CommonButton
              type="submit"
              color="accent"
              loading={
                props.caseOfAdd
                  ? addCompanyMutation.isLoading
                  : updateCompanyMutation.isLoading
              }
              icon={<GetIcon name="send" size="w-5 h-5" />}
            >
              Submit
            </CommonButton>
          </div>
        </form>
      </FormSectionContainer>
      <Toast />
    </>
  );
}
