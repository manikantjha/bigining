import useFormLogic from "@/customHooks/useFormLogic";
import { upcomingEventSchema } from "@/schemas/upcomingEventSchema";
import { addUpcomingEvent, updateUpcomingEvent } from "@/services/apiServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import { UseQueryResult } from "react-query";
import * as yup from "yup";
import FormSectionContainer from "../common/FormSectionContainer";
import SubmitButton from "../common/form/SubmitButton";
import ImageUploaderNew from "../common/imageUploaderNew/ImageUploaderNew";

type TForm = yup.InferType<typeof upcomingEventSchema>;

interface IUpcomingEventsFormProps {
  upcomingEvent?: UseQueryResult<any, unknown>;
  caseOfAdd: boolean;
}

export default function UpcomingEventsForm(props: IUpcomingEventsFormProps) {
  const defaultValues = props.upcomingEvent?.data
    ? props.upcomingEvent?.data
    : {};

  const { onSubmit, isLoading, methods } = useFormLogic<TForm>({
    defaultValues,
    schema: upcomingEventSchema,
    mutationFn: props.caseOfAdd ? addUpcomingEvent : updateUpcomingEvent,
    entity: "upcomingEvent",
    entityPlural: "upcomingEvents",
  });

  const {
    control,
    getValues,
    formState: { errors },
    handleSubmit,
    register,
  } = methods;

  return (
    <FormSectionContainer>
      <form
        onSubmit={handleSubmit((data) => {
          if (data.startDate === null) {
            delete data.startDate;
          }
          if (data.endDate === null) {
            delete data.endDate;
          }
          onSubmit(data);
        })}
      >
        <div className="grid gap-4 mb-4 grid-cols-2">
          {/* Other Fields */}
          <FormSectionContainer>
            <div className="space-y-3">
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900">
                  Event Name
                </p>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                  placeholder="Event Name"
                  {...register(`name`)}
                />
                {errors.name && (
                  <p className="text-red-700 text-sm">
                    * {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                  Event Short Description
                </p>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                  placeholder="Event Short Description"
                  {...register(`description`)}
                />
              </div>
              <div className="w-full">
                <p className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                  Start Date
                </p>
                <Controller
                  control={control}
                  name={`startDate`}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePicker
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block !w-full p-2.5"
                      wrapperClassName="!w-full"
                      startDate={
                        typeof value === "string" ? new Date(value) : value
                      }
                      onChange={(date: Date) => {
                        onChange(date);
                      }}
                      placeholderText="Start Date"
                      selected={
                        typeof value === "string" ? new Date(value) : value
                      }
                      isClearable
                      minDate={new Date()}
                    />
                  )}
                />
              </div>
              <div className="w-full">
                <p className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                  End Date
                </p>
                <Controller
                  control={control}
                  name={`endDate`}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePicker
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block !w-full p-2.5"
                      wrapperClassName="!w-full"
                      startDate={
                        typeof value === "string" ? new Date(value) : value
                      }
                      onChange={(date: Date) => {
                        onChange(date);
                      }}
                      isClearable
                      placeholderText="End Date"
                      selected={
                        typeof value === "string" ? new Date(value) : value
                      }
                      minDate={new Date()}
                    />
                  )}
                />
                {errors.endDate && (
                  <p className="text-red-500 text-sm">
                    *{errors.endDate.message}
                  </p>
                )}
              </div>
              <div>
                <p className="block mb-2 text-sm font-medium text-gray-900">
                  Location
                </p>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                  placeholder="Event Location"
                  {...register(`location`)}
                />
              </div>
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
                    label="Upcoming Event Image"
                    onChange={onChange}
                    folderName="upcomingEvents"
                    fileName={getValues("name")}
                    image={value}
                  />
                )}
              />
              {errors.image && (
                <p className="text-red-700 text-sm">
                  * Event image is required
                </p>
              )}
            </div>
          </FormSectionContainer>
        </div>
        {/* Submit Button */}
        <div className="flex !mt-8 space-x-4">
          <SubmitButton loading={isLoading} />
        </div>
      </form>
    </FormSectionContainer>
  );
}
