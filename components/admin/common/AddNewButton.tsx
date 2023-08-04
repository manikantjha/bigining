import { GetIcon } from "@/components/common/icons/icons";
import { NextRouter } from "next/router";
import CommonButton, { ICommonButtonProps } from "./CommonButton";

interface IAddButtonProps extends ICommonButtonProps {
  router: NextRouter;
  href: string;
  text?: string;
  containerClassName?: string;
}

export default function AddNewButton({
  children,
  router,
  href,
  text = "Add New",
  containerClassName = "",
}: IAddButtonProps) {
  return (
    <>
      {children ? (
        <CommonButton
          variant="filled"
          color="accent"
          icon={<GetIcon name="add" size="w-5 h-5" />}
          onClick={() => router.push(href)}
          className="!w-fit"
        >
          {children}
        </CommonButton>
      ) : (
        <div
          key="add"
          className={`border p-4 rounded-lg flex items-center justify-center h-[400px] ${containerClassName}`}
        >
          <div className="flex flex-col justify-center items-center space-y-4">
            <CommonButton
              onClick={() => router.push(href)}
              variant="filled"
              className="w-fit"
              color="accent"
              icon={<GetIcon name="add" size="w-12 h-12" />}
            />
          </div>
          <p className="text-lg font-semibold">{text}</p>
        </div>
      )}
    </>
  );
}
