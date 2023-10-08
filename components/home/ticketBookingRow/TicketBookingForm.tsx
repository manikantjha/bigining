import CommonButton from "@/components/admin/common/CommonButton";
import SelectInput from "@/components/admin/common/form/SelectInput";
import TextInput from "@/components/admin/common/form/TextInput";
import { TICKETS } from "@/data/data";
import { navratriTicketSchema } from "@/schemas/navratriTickectSchema";
import { checkout, paymentVerification } from "@/services/apiServices";
import { yupResolver } from "@hookform/resolvers/yup";
import "react-datepicker/dist/react-datepicker.css";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import TicketDatesListForm from "./TicketDatesListForm";
import { useRouter } from "next/navigation";

type TForm = yup.InferType<typeof navratriTicketSchema>;

function TicketBookingForm() {
  const methods = useForm({ resolver: yupResolver(navratriTicketSchema) });
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = methods;

  const onSubmit = async (data: TForm) => {
    const transformed = {
      ...data,
      passPrice: (TICKETS as any)[`${data.pass}`].price,
      amount: Number(
        (TICKETS as any)[`${data.pass}`].price *
          data.numberOfAttendees *
          (data.dates?.length || 0)
      ),
    };

    const response = await checkout(transformed);

    const options = {
      key: `${process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID}`,
      amount: response.order.amount,
      currency: "INR",
      name: "Bigining",
      description: "Navratri Pass Booking Transaction",
      image: "https://www.bigining.com/_next/static/media/logo.b63c4f91.svg",
      order_id: response.order.id,
      handler: async (data: any) => {
        const verificationResponse = await paymentVerification({
          ...data,
          _id: response.order._id,
        });
        if (verificationResponse.success) {
          router.replace(
            `/paymentSuccess?reference=${verificationResponse.order.paymentDetails.razorpay_payment_id}`
          );
        }
      },
      prefill: {
        name: response.order.ticketAndUserDetails.name,
        email: response.order.ticketAndUserDetails.email,
        contact: response.order.ticketAndUserDetails.phone,
      },
      notes: {},
      theme: {
        color: "#4B2D87",
      },
    };

    const razor = new (window as any).Razorpay(options);

    razor.open();
  };

  console.log("errors", errors);

  return (
    <FormProvider {...methods}>
      <form
        className="grid grid-cols-1 md:grid-cols-[1fr] gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput
          label="Your First Name & Last Name"
          placeholder="e.g. Jignesh Parmar"
          name="name"
          register={register}
          error={errors.name}
        />
        <TextInput
          label="Your Mobile Number"
          placeholder="e.g. 8956412356"
          name="phone"
          register={register}
          error={errors.phone}
          type="number"
        />
        <div>
          <TextInput
            label="Your Email Address"
            placeholder="e.g. jigneshparmar@gmail.com"
            name="email"
            register={register}
            error={errors.email}
            type="email"
          />
          <p className="mt-1 text-sm p-1">
            Please enter an email address that you currently use. Your pass will
            be mailed to this email address.
          </p>
        </div>
        <SelectInput
          label="Pass Type"
          register={register}
          error={errors.pass}
          name="pass"
          options={[
            {
              label: "Khelaiya Season Pass",
              value: "KHELIA_SEASON_PASS",
            },
            {
              label: "Non Traditional Season Pass",
              value: "NON_TRADITIONAL_SEASON_PASS",
            },
            {
              label: "Daily Gold Pass",
              value: "DAILY_GOLD_PASS",
            },
            {
              label: "Daily Silver Pass",
              value: "DAILY_SILVER_PASS",
            },
          ]}
        />
        <TextInput
          label="Number of Attendees"
          name="numberOfAttendees"
          register={register}
          error={errors.numberOfAttendees}
          type="number"
        />
        <div>
          <TicketDatesListForm />
        </div>
        <div className="border border-dashed border-gray-500 rounded-lg p-4">
          <p>Price Breakdown</p>
          <p>
            {getValues("numberOfAttendees")} Attendees x{" "}
            {getValues("dates")?.length} Days x{" "}
            {(TICKETS as any)[getValues("pass")]?.price} ={" "}
            {getValues("numberOfAttendees") *
              (TICKETS as any)[getValues("pass")]?.price *
              (getValues("dates")?.length || 0)}
          </p>
        </div>
        <CommonButton className="mt-8 w-full" type="submit">
          Book Now
        </CommonButton>
      </form>
    </FormProvider>
  );
}

export default TicketBookingForm;
