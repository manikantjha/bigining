import { sendContactForm } from "@/services/apiServices";
import { ISendMessage } from "@/types/contact";
import { phoneRegex } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { UseQueryResult, useMutation } from "react-query";
import * as yup from "yup";
import Loading from "../common/Loading";
import Modal from "../common/Modal";
import ContactModalContent from "./ContactModalContent";

const schema = yup
  .object({
    name: yup.string().required("Name is required"),
    phone: yup
      .string()
      .matches(phoneRegex, "A valid phone number is required")
      .required("Phone number is required!"),
    email: yup.string().email().required("Email is required"),
    service: yup.string().required("Service is requried"),
    message: yup.string().required("Message is required"),
  })
  .required();

// type FormData = yup.InferType<typeof schema>;

interface IContactFormProps {
  lstServices: UseQueryResult<any, unknown>;
}

export default function ContactForm(props: IContactFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      service: "Other",
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const contactMutation = useMutation(sendContactForm, {
    onSuccess(data, variables, context) {
      setIsSuccess(true);
      setIsOpen(true);
      reset();
    },
    onError(error, variables, context) {
      setIsSuccess(false);
      setIsOpen(true);
      reset();
    },
  });

  if (
    !props.lstServices.data ||
    !props.lstServices.data[0] ||
    !props.lstServices.data[0].services
  )
    return;

  const services = props.lstServices.data[0].services.map(
    (service: { title: string }) => service.title
  );

  function handleClose() {
    setIsOpen(false);
  }

  const onSubmit = (data: ISendMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="w-full p-4 bg-bgLight rounded-lg sm:p-6 md:p-8 border border-black">
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your name
          </label>
          <input
            id="name"
            type="text"
            className="bg-transparent border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5 placeholder-gray-400 "
            {...register("name")}
          />
          {errors.name && (
            <p className="text-red-600 mt-2">* {errors.name.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="phone"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your phone number
          </label>
          <input
            type="number"
            id="phone"
            className="bg-transparent border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-accentDark placeholder-gray-400 focus:border-accentDark block w-full p-2.5"
            {...register("phone")}
          />
          {errors.phone && (
            <p className="text-red-600 mt-2">* {errors.phone.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email address
          </label>
          <input
            id="email"
            type="email"
            className="bg-transparent border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-600 mt-2">* {errors.email.message}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="service"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select A Service
          </label>
          <Controller
            control={control}
            name="service"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <select
                id="countries"
                className="bg-transparent border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
                onChange={onChange}
                value={value}
              >
                {services.map((service: string, index: number) => (
                  <option key={index} value={service}>
                    {service}
                  </option>
                ))}
                <option key={"Other"} value="Other">
                  Other
                </option>
              </select>
            )}
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your enquiry
          </label>
          <textarea
            id="message"
            rows={4}
            placeholder="Enter your questions or message"
            className="bg-transparent border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5"
            {...register("message")}
          />
          {errors.message && (
            <p className="text-red-600 mt-2">* {errors.message.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full text-accentLighter bg-black hover:bg-secondaryDark focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-md px-5 py-2 text-center flex items-center justify-center"
        >
          {contactMutation.isLoading ? (
            <>
              <Loading containerSize="h-6 w-6" size="h-6 w-6" />
              <span>Sending...</span>
            </>
          ) : (
            <span>Send</span>
          )}
        </button>
      </form>

      {isOpen && (
        <Modal
          isOpen={isOpen}
          handleClose={handleClose}
          modalTitle="Message Status"
          renderContent={() => (
            <ContactModalContent
              isSuccess={isSuccess}
              handleClose={handleClose}
            />
          )}
          renderButtons={() => (
            <button
              className="block mx-auto text-center p-2 md:p-3 font-bold bg-black text-accentLighter rounded-full !w-[200px] hover:bg-secondaryDark hover:shadow-sm"
              onClick={() => {
                handleClose();
                reset();
              }}
            >
              Ok
            </button>
          )}
        />
      )}
    </div>
  );
}
