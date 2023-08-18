import { useAuth } from "@/contexts/AuthContext";
import { heroSchema } from "@/schemas/heroSchema";
import { addUpdateHero } from "@/services/apiServices";
import { IAuthContext } from "@/types/auth";
import { IHero } from "@/types/hero";
import { yupResolver } from "@hookform/resolvers/yup";
import { User } from "firebase/auth";
import { Controller, useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { ToastOptions, toast } from "react-toastify";
import FormSectionContainer from "../common/FormSectionContainer";
import ImageUploader from "../common/ImageUploader";
import Toast from "../common/Toast";
import SubmitButton from "../common/form/SubmitButton";
import { IHeroFormProps } from "./HomeHeroForm";

export default function AboutHeroForm(props: IHeroFormProps) {
  const { user } = useAuth() as IAuthContext<User>;
  const addUpdateHeroMutation = useMutation({
    mutationFn: async (data: IHero) =>
      addUpdateHero(data, await user.getIdToken()),
  });
  const notify = (text: string, options: ToastOptions) => toast(text, options);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IHero>({
    resolver: yupResolver(heroSchema as any),
    defaultValues: props.hero.data ? { ...props.hero.data.hero } : {},
  });

  async function onSubmit(data: IHero) {
    addUpdateHeroMutation.mutate(
      {
        ...data,
        pageId: "about",
        _id: props?.hero?.data?.hero?._id || "",
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
          <div className="grid gap-6 mb-4 md:grid-cols-2">
            <div>
              <label
                htmlFor="about_hero_title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Hero Title
              </label>
              <input
                type="text"
                id="about_hero_title"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                placeholder="Hero Title"
                {...register(`title`)}
              />
              {errors.title && (
                <p className="text-red-700 mt-2 text-sm">
                  * {errors.title?.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="about_hero_short_description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Hero Short Description
              </label>
              <input
                type="text"
                id="about_hero_short_description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                placeholder="Hero Short Description"
                {...register(`description`)}
              />
            </div>
          </div>
          <div className="mb-4">
            <Controller
              control={control}
              name={`imageURL`}
              render={({ field: { onChange, onBlur, value, ref } }) => (
                <ImageUploader
                  label="Hero Image"
                  onChange={onChange}
                  id={`about_hero_imageURL`}
                  imageURL={props?.hero?.data?.hero?.imageURL || ""}
                />
              )}
            />
            {errors.imageURL && (
              <p className="text-red-700 mt-2 text-sm">
                * {errors.imageURL?.message}
              </p>
            )}
          </div>
          <div className="flex items-center mb-4">
            <input
              id="default-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-accentDark bg-gray-100 border-gray-300 rounded focus:ring-accentDark dark:focus:ring-accentDark focus:ring-2"
              {...register(`hasContactButton`)}
            />
            <label
              htmlFor="default-checkbox"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Has Contact Button
            </label>
          </div>
          <div>
            <SubmitButton loading={addUpdateHeroMutation.isLoading} />
          </div>
        </FormSectionContainer>
      </form>
      <Toast />
    </>
  );
}
