import { IRowTheme } from "@/types/row";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import RowWrapper from "../common/RowWrapper";
import Card from "../common/Card";
import { sendReviewForm } from "@/services/apiServices";
import { useState } from "react";
import { useMutation } from "react-query";
import Modal from "../common/Modal";
import ContactModalContent from "../contact/ContactModalContent";

const schema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email address"),
  rating: yup.number().required("Rating is required").min(1).max(5),
  name: yup.string().required("Name is required"),
  message: yup.string().required("Message is required"),
});

type ReviewFormData = {
  email: string;
  name: string;
  rating: number;
  message: string;
};

interface IReviewFormProps extends IRowTheme {}

const ReviewForm = (props: IReviewFormProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    register,
  } = useForm<ReviewFormData>({
    resolver: yupResolver(schema),
  });

  const reviewMutation = useMutation(sendReviewForm, {
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

  function handleClose() {
    setIsOpen(false);
  }

  const onSubmit = (data: ReviewFormData) => {
    reviewMutation.mutate(data);
  };

  return (
    <RowWrapper
      title="Add A Review"
      // description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis, error?"
      theme={props.theme}
      containerWrapperClassName="border-t-4 border-secondaryDark bg-primaryLighter"
    >
      <Card
        className="max-w-7xl mx-auto bg-bgLight !text-left"
        theme={props.theme}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-900"
              >
                Rating:
              </label>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => field.onChange(value)}
                        className="text-5xl text-orange-600"
                      >
                        {value <= field.value ? "★" : "☆"}
                      </button>
                    ))}
                  </div>
                )}
              />
              {errors.rating && (
                <p className="text-red-500">{errors.rating.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Name:
              </label>

              <input
                type="text"
                {...register("name")}
                className="bg-transparent border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5 placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-red-500">{errors.name?.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email:
              </label>
              <input
                type="email"
                {...register("email")}
                className="bg-transparent border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5 placeholder-gray-400"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div>
              <label
                htmlFor="message"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Message:
              </label>
              <Controller
                name="message"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="bg-transparent border-2 border-black text-gray-900 text-sm rounded-lg focus:ring-accentDark focus:border-accentDark block w-full p-2.5 placeholder-gray-400"
                    rows={4}
                  />
                )}
              />
              {errors.message && (
                <p className="text-red-500">{errors.message.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full text-accentLighter bg-black hover:bg-secondaryDark focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-md px-5 py-2 text-center flex items-center justify-center"
            >
              Submit
            </button>
          </div>
        </form>
      </Card>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          handleClose={handleClose}
          modalTitle="Message Status"
          renderContent={() => (
            <ContactModalContent
              isSuccess={isSuccess}
              handleClose={handleClose}
              message={
                isSuccess ? (
                  <p className="text-md md:text-lg text-black text-center">
                    Review submitted succesfully!
                  </p>
                ) : (
                  <p className="text-md md:text-lg text-black text-center">
                    Failed to submit review :(
                  </p>
                )
              }
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
    </RowWrapper>
  );
};

export default ReviewForm;
