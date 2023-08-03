import { GetIcon, IIconProps } from "@/components/common/icons/icons";
import CommonButton from "../CommonButton";
import { ReactNode } from "react";

interface ISubmitButtonProps {
  loading: boolean;
  icon?: IIconProps["name"];
  buttonText?: ReactNode;
}

const SubmitButton = ({
  loading,
  icon = "send",
  buttonText = "Submit",
}: ISubmitButtonProps) => {
  return (
    <CommonButton
      type="submit"
      color="accent"
      loading={loading}
      icon={<GetIcon name={icon} size="w-5 h-5" />}
    >
      {buttonText}
    </CommonButton>
  );
};

export default SubmitButton;
