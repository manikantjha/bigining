import { sendContactForm } from "@/services/apiServices";
import { ISendMessage } from "@/types/contact";
import { phoneRegex } from "@/utils/utils";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as yup from "yup";
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
    message: yup.string().required("Message is required"),
  })
  .required();

// type FormData = yup.InferType<typeof schema>;

export default function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  function handleClose() {
    setIsOpen(false);
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      message: "",
    },
    resolver: yupResolver(schema),
  });

  const form = useRef<HTMLFormElement>(null);

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

  const onSubmit = (data: ISendMessage) => {
    contactMutation.mutate(data);
  };

  return (
    <div className="w-full p-4 bg-accentLighter rounded-lg sm:p-6 md:p-8 border border-black">
      <form ref={form} className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
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
          className="w-full text-accentLighter bg-black hover:bg-secondaryDark focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-md px-5 py-2 text-center"
        >
          Send
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
