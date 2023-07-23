import { addUpdateUpcomingEvent } from "@/services/apiServices";
import { storage } from "@/services/firebaseServices";
import { IUpcomingEvents } from "@/types/upcomingEvents";
import { yupResolver } from "@hookform/resolvers/yup";
import { deleteObject, ref } from "firebase/storage";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import { ToastOptions, toast } from "react-toastify";
import * as yup from "yup";
import AddMoreButton from "../common/AddMoreButton";
import FormSectionContainer from "../common/FormSectionContainer";
import ImageUploader from "../common/ImageUploader";
import SubmitButton from "../common/SubmitButton";
import Toast from "../common/Toast";

const schema = yup.object({
  upcomingEvents: yup
    .array()
    .of(
      yup.object({
        imageURL: yup.string().required("Event image is required!"),
        name: yup.string().required("Event name is requried!"),
        description: yup.string(),
        startDate: yup.date(),
        endDate: yup.date(),
        location: yup.string(),
      })
    )
    .required(),
});

interface IUpcomingEventsFormProps {
  upcomingEvents: UseQueryResult<any, unknown>;
}

type TUpcomingEventsForm = yup.InferType<typeof schema>;

export default function UpcomingEventsForm(props: IUpcomingEventsFormProps) {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpcomingEventsForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      upcomingEvents: props.upcomingEvents?.data?.upcomingEvents
        ? props.upcomingEvents?.data?.upcomingEvents[0]?.upcomingEvents
        : [
            {
              name: "",
              description: "",
              imageURL: "",
              startdate: "",
              endDate: "",
              location: "",
            },
          ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "upcomingEvents",
  });

  const addUpdateUpcomingEventsMutation = useMutation(addUpdateUpcomingEvent, {
    onSuccess: () => {},
  });

  function deleteFile(index: number) {
    if (
      !(
        props.upcomingEvents?.data?.upcomingEvents &&
        props.upcomingEvents?.data?.upcomingEvents[0]?.upcomingEvents[index]
          ?.imageURL
      )
    ) {
      return;
    }
    const imageRef = ref(
      storage,
      (props.upcomingEvents?.data?.upcomingEvents &&
        props.upcomingEvents?.data?.upcomingEvents[0]?.upcomingEvents[index]
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

  function onSubmit(data: IUpcomingEvents) {
    const _id = props.upcomingEvents?.data?.upcomingEvents
      ? props.upcomingEvents?.data?.upcomingEvents[0]?._id
      : "";

    addUpdateUpcomingEventsMutation.mutate(
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
                        const temp = fields.filter((event, i) => i !== index);
                        onSubmit({ upcomingEvents: temp });
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
                  <div className="space-y-3">
                    <div>
                      <Controller
                        control={control}
                        name={`upcomingEvents.${index}.imageURL`}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <ImageUploader
                            label="Event Image"
                            onChange={onChange}
                            index={index}
                            id={`upcomingEvents.${index}.imageURL`}
                            imageURL={fields[index].imageURL || ""}
                          />
                        )}
                      />
                      {errors.upcomingEvents &&
                        errors.upcomingEvents[index]?.imageURL && (
                          <p className="text-red-700 text-sm">
                            * {errors.upcomingEvents[index]?.imageURL?.message}
                          </p>
                        )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <p className="block mb-2 text-sm font-medium text-gray-900">
                          Event Name
                        </p>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                          placeholder="Event Name"
                          {...register(`upcomingEvents.${index}.name`)}
                        />
                      </div>
                      <div>
                        <p className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                          Event Short Description
                        </p>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                          placeholder="Event Short Description"
                          {...register(`upcomingEvents.${index}.description`)}
                        />
                      </div>
                      <div className="w-full">
                        <p className="block mb-2 text-sm font-medium text-gray-900 mt-2">
                          Start Date
                        </p>
                        <Controller
                          control={control}
                          name={`upcomingEvents.${index}.startDate`}
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <DatePicker
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block !w-full p-2.5"
                              wrapperClassName="!w-full"
                              startDate={startDate}
                              onChange={(date: Date) => {
                                if (date) onChange(date);
                              }}
                              placeholderText="Start Date"
                              value={
                                (value && new Date(value).toDateString()) || ""
                              }
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
                          name={`upcomingEvents.${index}.endDate`}
                          render={({
                            field: { onChange, onBlur, value, ref },
                          }) => (
                            <DatePicker
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block !w-full p-2.5"
                              wrapperClassName="!w-full"
                              startDate={endDate}
                              onChange={(date: Date) => {
                                if (date) onChange(date);
                              }}
                              placeholderText="End Date"
                              value={
                                (value && new Date(value).toDateString()) || ""
                              }
                            />
                          )}
                        />
                      </div>
                      <div>
                        <p className="block mb-2 text-sm font-medium text-gray-900">
                          Location
                        </p>
                        <input
                          type="text"
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                          placeholder="Event Location"
                          {...register(`upcomingEvents.${index}.location`)}
                        />
                      </div>
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
              text="Add Event"
            />
            <SubmitButton
              isLoading={addUpdateUpcomingEventsMutation.isLoading}
            />
          </div>
        </FormSectionContainer>
      </form>
      <Toast />
    </>
  );
}
