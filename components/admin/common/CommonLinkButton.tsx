import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";
import { getColorClass } from "./CommonButton";

const getDisabledClass = (variant?: "outlined" | "text" | "filled") => {
  switch (variant) {
    case "filled":
      return "!bg-gray-200 !text-white !pointer-events-none";
    case "outlined":
      return "!border !border-gray-200 !text-gray-400 !bg-gray-50 !pointer-events-none";
    case "text":
      return "!text-gray-200 bg-gray-50 !pointer-events-none";
    default:
      return "!bg-gray-200 !text-white !pointer-events-none";
  }
};

interface CommonLinkButtonProps extends LinkProps {
  variant?: "outlined" | "text" | "filled";
  children?: ReactNode;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  color?: "blue" | "green" | "red" | "yellow" | "gray" | "primary" | "accent";
  customColorClass?: string;
  href: string;
  className?: string;
}

const CommonLinkButton = ({
  variant = "filled",
  children,
  icon,
  iconPosition = "left",
  disabled = false,
  color = "primary",
  customColorClass,
  href,
  className,
  ...rest
}: CommonLinkButtonProps) => {
  return (
    <Link
      href={href}
      passHref
      className={`flex items-center justify-center ${
        disabled ? getDisabledClass(variant) : getColorClass(color, variant)
      } rounded-full ${
        children ? "px-4" : "px-2"
      } py-2 focus:outline-none transition-colors duration-200 ease-in-out ${
        className || ""
      }`}
      {...rest}
    >
      {icon && iconPosition === "left" && (
        <span className={`${children ? "mr-2" : "mr-0"}`}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className={`${children ? "ml-2" : "ml-0"}`}>{icon}</span>
      )}
    </Link>
  );
};

export default CommonLinkButton;
