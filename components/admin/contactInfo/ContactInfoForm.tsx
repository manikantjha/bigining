import { useAddUpdate } from "@/customHooks/useAddUpdate";
import { contactInfoSchema } from "@/schemas/contactInfoSchema";
import { createUpdateContactInfo } from "@/services/apiServices";
import { IContactInfo } from "@/types/contactInfo";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { UseQueryResult } from "react-query";
import * as yup from "yup";
import FormSectionContainer from "../common/FormSectionContainer";
import SubmitButton from "../common/form/SubmitButton";
import TextArea from "../common/form/TextArea";
import TextInput from "../common/form/TextInput";

type TForm = yup.InferType<typeof contactInfoSchema>;

interface IContactInfoFormProps {
  contactInfos: UseQueryResult<any, unknown>;
}

export default function ContactInfoForm(props: IContactInfoFormProps) {
  const defaultValues = props?.contactInfos?.data
    ? { ...props?.contactInfos?.data }
    : {};

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TForm>({
    resolver: yupResolver<TForm>(contactInfoSchema),
    defaultValues,
  });

  const addUpdateMutation = useAddUpdate(createUpdateContactInfo);

  const onSubmit = (data: IContactInfo) => {
    const _id = props.contactInfos?.data
      ? props.contactInfos?.data._id
      : undefined;
    addUpdateMutation.mutate({ ...data, _id });
  };

  return (
    <FormSectionContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4 mb-4">
          <TextInput
            label="Section Title"
            name="title"
            register={register}
            error={errors.title}
            placeholder="Section title"
          />
          <TextArea
            label="Description"
            name="description"
            register={register}
            error={errors.description}
            placeholder="Description"
          />
        </div>
        <div className="grid gap-6 mb-4 md:grid-cols-2">
          <TextInput
            label="Email"
            name="email"
            register={register}
            error={errors.email}
            placeholder="Email address"
            type="email"
          />
          <TextInput
            label="Phone 1"
            name="phone1"
            register={register}
            error={errors.phone1}
            placeholder="Phone number"
          />
        </div>
        <div className="grid gap-6 mb-4 md:grid-cols-2">
          <TextInput
            label="Phone 2"
            name="phone2"
            register={register}
            error={errors.phone2}
            placeholder="Phone number"
          />
          <TextInput
            label="Address"
            name="address"
            register={register}
            error={errors.address}
            placeholder="Address"
          />
        </div>
        <div className="w-full mt-8">
          <SubmitButton loading={addUpdateMutation.isLoading} />
        </div>
      </form>
    </FormSectionContainer>
  );
}
