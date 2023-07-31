import { GetIcon } from "@/components/common/icons/icons";
import { artistSchema } from "@/schemas/artistSchema";
import { addArtist, updateArtist } from "@/services/apiServices";
import { IArtist } from "@/types/artists";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { Controller, useForm } from "react-hook-form";
import { UseQueryResult, useMutation, useQueryClient } from "react-query";
import * as yup from "yup";
import CommonButton from "../common/CommonButton";
import FormSectionContainer from "../common/FormSectionContainer";
import ImageUploaderNew from "../common/imageUploaderNew/ImageUploaderNew";

type TForm = yup.InferType<typeof artistSchema>;

interface IArtistsFormProps {
  artist?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function ArtistsForm(props: IArtistsFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { page = 1 } = router.query;

  const objArtist = props.caseOfAdd ? {} : props.artist?.data;

  const defaultValues = props.artist?.data
    ? props.artist?.data
    : {
        name: "",
        description: "",
        category: "celebrity",
        numberOfEvents: "",
        image: {},
      };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    getValues,
  } = useForm<TForm>({
    resolver: yupResolver<TForm>(artistSchema),
    defaultValues,
  });

  const addArtistMutation = useMutation({
    mutationFn: addArtist,
    onSuccess: (data) => {
      queryClient.setQueryData(["artist", data._id], data);
      queryClient.invalidateQueries(["artists"]);
      router.replace(`/admin/artists?page=${page}`);
    },
  });
  const updateArtistMutation = useMutation({
    mutationFn: updateArtist,
    onSuccess: (data) => {
      queryClient.setQueryData(["artist", data._id], data);
      queryClient.invalidateQueries(["artists", page]);
      router.replace(`/admin/artists?page=${page}`);
    },
  });

  function onSubmit(data: IArtist) {
    try {
      if (objArtist._id) {
        updateArtistMutation.mutate({ ...data, _id: objArtist._id });
      } else {
        addArtistMutation.mutate(data);
      }
    } catch (error) {
      console.log("Error submitting form: ", error);
    }
  }

  return (
    <FormSectionContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Other Fields */}
          <FormSectionContainer>
            {/* Name Field */}
            <div>
              <p className="block mb-2 text-sm font-medium text-gray-900">
                Artist Name
              </p>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                placeholder="Artist Name"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-700 text-sm">* {errors.name.message}</p>
              )}
            </div>
            {/* Description Field */}
            <div className="mt-2">
              <p className="block mb-2 text-sm font-medium text-gray-900">
                Artist Description
              </p>
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                placeholder="Artist Description"
                {...register("description")}
              />
              {errors.description && (
                <p className="text-red-700 text-sm">
                  * {errors.description.message}
                </p>
              )}
            </div>
            {/* Category Field */}
            <div className="mt-2">
              <p className="block mb-2 text-sm font-medium text-gray-900">
                Category
              </p>
              <Controller
                control={control}
                name={"category"}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <select
                    id="celebrity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                    onChange={onChange}
                    value={value}
                  >
                    <option>Choose a category</option>
                    <option value="celebrity">Celebrity</option>
                    <option value="singer">Singer</option>
                  </select>
                )}
              />
              {errors.category && (
                <p className="text-red-700 text-sm">
                  * {errors.category.message}
                </p>
              )}
            </div>
            {/* Number of Events Field */}
            <div className="mt-2">
              <p className="block mb-2 text-sm font-medium text-gray-900">
                Number of Events
              </p>
              <input
                type="number"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                placeholder="Number of Events Done"
                {...register("numberOfEvents")}
              />
              {errors.numberOfEvents && (
                <p className="text-red-700 text-sm">
                  * {errors.numberOfEvents.message}
                </p>
              )}
            </div>
          </FormSectionContainer>
          {/* Image Field */}
          <FormSectionContainer>
            <div className="w-full h-full">
              <Controller
                control={control}
                name="image"
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <ImageUploaderNew
                    label="Artist Image"
                    onChange={onChange}
                    id={`artistImage`}
                    folderName="artists"
                    fileName={getValues("name")}
                    image={value}
                  />
                )}
              />
              {errors.image && (
                <p className="text-red-700 text-sm">
                  * Artist image is required
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
                ? addArtistMutation.isLoading
                : updateArtistMutation.isLoading
            }
            icon={<GetIcon name="send" size="w-5 h-5" />}
          >
            Submit
          </CommonButton>
        </div>
      </form>
    </FormSectionContainer>
  );
}
