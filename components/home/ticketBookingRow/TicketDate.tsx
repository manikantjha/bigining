import ReactDatePicker from "react-datepicker";
import { Controller, useFormContext } from "react-hook-form";

interface ITicketDate {
  index: number;
}

function TicketDate(props: ITicketDate) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  let minDate = new Date(2023, 10, 15);
  const maxDate = new Date(2023, 10, 24);
  const today = new Date();

  if (today.getDate() > minDate.getDate()) {
    minDate = today;
  }

  return (
    <Controller
      name={`dates[${props.index}]`}
      control={control}
      render={({ field: { onChange, value } }) => (
        <ReactDatePicker
          className="rounded-md border-gray-300"
          wrapperClassName="!w-full [&>*>*]:!w-full"
          selected={value}
          onChange={(date) => onChange(date)}
          dateFormat={"dd/MM/yyyy"}
          minDate={minDate}
          maxDate={maxDate}
        />
      )}
    />
  );
}

export default TicketDate;
