import { GetIcon } from "@/components/common/icons/icons";
import { serviceSchema } from "@/schemas/serviceSchema";
import { addService, updateService } from "@/services/apiServices";
import { IService } from "@/types/services";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { FormProvider, useForm } from "react-hook-form";
import { UseQueryResult, useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import CommonButton from "../common/CommonButton";
import FormSectionContainer from "../common/FormSectionContainer";
import FormSectionWrapper from "../common/FormSectionWrapper";
import ServicesListForm from "./ServicesListForm";

type TForm = yup.InferType<typeof serviceSchema>;

interface IServicesFormProps {
  service?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function ServiceForm(props: IServicesFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { page = 1 } = router.query;

  const objService = props.caseOfAdd ? {} : props.service?.data;

  const defaultValues = props.service?.data
    ? props.service?.data
    : {
        title: "",
      };

  const objForm = useForm<TForm>({
    resolver: yupResolver<TForm>(serviceSchema),
    defaultValues: defaultValues,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = objForm;

  const addServiceMutation = useMutation({
    mutationFn: addService,
    onSuccess: (data) => {
      queryClient.setQueryData(["service", data._id], data);
      queryClient.invalidateQueries(["services"]);
      router.replace(`/admin/services?page=${page}`);
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: updateService,
    onSuccess: (data) => {
      queryClient.setQueryData(["service", data._id], data);
      queryClient.invalidateQueries(["services", page]);
      router.replace(`/admin/services?page=${page}`);
    },
  });

  const onSubmit = (data: IService) => {
    try {
      if (objService._id) {
        updateServiceMutation.mutate({ ...data, _id: objService._id });
      } else {
        addServiceMutation.mutate(data);
      }
    } catch (error) {
      console.log("Error submitting form: ", error);
    }
  };

  return (
    <FormSectionWrapper>
      <FormProvider {...objForm}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormSectionContainer>
            <FormSectionContainer className="mb-4">
              <div className="grid gap-4 mb-4">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Service Title
                  </label>
                  <input
                    id="title"
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                    placeholder="Title"
                    {...register("title")}
                  />
                </div>
                {errors.title && (
                  <p className="text-red-700 text-sm">
                    * {errors.title.message}
                  </p>
                )}
                <ServicesListForm />
              </div>
            </FormSectionContainer>
            <div className="w-full flex items-center space-x-4 mt-8">
              <CommonButton
                type="submit"
                color="accent"
                loading={
                  props.caseOfAdd
                    ? addServiceMutation.isLoading
                    : updateServiceMutation.isLoading
                }
                icon={<GetIcon name="send" size="w-5 h-5" />}
              >
                Submit
              </CommonButton>
            </div>
          </FormSectionContainer>
        </form>
      </FormProvider>
    </FormSectionWrapper>
  );
}
