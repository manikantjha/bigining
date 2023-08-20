import { useAuth } from "@/contexts/AuthContext";
import { heroSchema } from "@/schemas/heroSchema";
import { addUpdateHero } from "@/services/apiServices";
import { IAuthContext } from "@/types/auth";
import { IHero } from "@/types/hero";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import { ToastOptions, toast } from "react-toastify";
import { InferType } from "yup";
import FormSectionContainer from "../common/FormSectionContainer";
import Toast from "../common/Toast";
import Checkbox from "../common/form/Checkbox";
import SubmitButton from "../common/form/SubmitButton";
import TextInput from "../common/form/TextInput";
import ImageUploaderNew from "../common/imageUploaderNew/ImageUploaderNew";

interface ICommonHeroForm {
  hero: UseQueryResult<any, unknown>;
  pageId: "home" | "about" | "service";
}

type TForm = InferType<typeof heroSchema>;

export default function CommonHeroForm({ hero, pageId }: ICommonHeroForm) {
  const pageName = pageId[0].toUpperCase() + pageId.slice(1);

  const { user } = useAuth() as IAuthContext<User>;

  const addUpdateHeroMutation = useMutation({
    mutationFn: async (data: IHero) =>
      addUpdateHero(data, await user.getIdToken()),
    onSuccess: () => {
      notify("Submitted succesfully!", { type: "success" });
    },
    onError: () => {
      notify("Failed to submit!", { type: "error" });
    },
  });

  const notify = (text: string, options: ToastOptions) => toast(text, options);

  const defaultValues = hero.data ? { ...hero.data.hero } : {};

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TForm>({
    resolver: yupResolver<TForm>(heroSchema),
    defaultValues,
  });

  async function onSubmit(data: TForm) {
    const _id = hero?.data?.hero?._id || "";
    addUpdateHeroMutation.mutate({
      ...data,
      pageId,
      _id,
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSectionContainer>
          <div className="grid gap-6 mb-4 md:grid-cols-2">
            <TextInput
              label={`${pageName} Hero Title`}
              name="title"
              register={register}
              error={errors.title}
              placeholder="Hero Title"
            />
            <TextInput
              label={`${pageName} Hero Short Description`}
              name="description"
              register={register}
              error={errors.description}
              placeholder="Hero Short Description"
            />
          </div>
          <div className="mb-4">
            <Controller
              control={control}
              name="image"
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <ImageUploaderNew
                  label={`${pageName} Hero Image`}
                  onChange={onChange}
                  image={value}
                  folderName="heroes"
                  error={errors.image}
                />
              )}
            />
          </div>
          <div className="flex items-center mb-4">
            <Checkbox
              label={`Has ${pageName} Contact Button`}
              name="hasContactButton"
              register={register}
            />
          </div>
          <div>
            <SubmitButton loading={addUpdateHeroMutation.isLoading} />
          </div>
        </FormSectionContainer>
      </form>
      <Toast />
    </div>
  );
}
