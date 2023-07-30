import { NextRouter } from "next/router";
import CommonButton from "./CommonButton";
import { GetIcon } from "@/components/common/icons/icons";

interface IAddButtonProps {
  router: NextRouter;
  herf: string;
  text?: string;
  containerClassName?: string;
}

export default function AddNewButton({
  router,
  herf,
  text = "Add New",
  containerClassName = "",
}: IAddButtonProps) {
  return (
    <div
      key="add"
      className={`border p-4 rounded-lg flex items-center justify-center h-[400px] ${containerClassName}`}
    >
      <div className="flex flex-col justify-center items-center space-y-4">
        <CommonButton
          onClick={() => router.push(herf)}
          variant="filled"
          className="w-fit"
          color="accent"
          icon={<GetIcon name="add" size="w-12 h-12" />}
        />
        <h3 className="text-lg font-semibold">{text}</h3>
      </div>
    </div>
  );
}
