import CommonButton from "@/components/admin/common/CommonButton";
import { GetIcon } from "@/components/common/icons/icons";
import { useFieldArray, useFormContext } from "react-hook-form";
import TicketDate from "./TicketDate";

function TicketDatesListForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { fields, remove, append } = useFieldArray({
    control,
    name: `dates`,
  });

  return (
    <>
      <div className="grid grid-cols-[1fr_auto] gap-2 items-center mb-4">
        <p className="font-medium text-sm">Date</p>
        <CommonButton
          type="button"
          icon={<GetIcon name="add" />}
          onClick={() => append("")}
        >
          Add More Dates
        </CommonButton>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-[1fr_auto] gap-2 items-center"
          >
            <TicketDate index={index} />
            <CommonButton
              icon={<GetIcon name="close" />}
              className="!h-fit !w-fit"
              onClick={() => remove(index)}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default TicketDatesListForm;
