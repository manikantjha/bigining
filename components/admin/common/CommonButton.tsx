import Loading from "@/components/common/Loading";
import { ButtonHTMLAttributes, ReactNode } from "react";

export const getColorClass = (
  color?: "blue" | "green" | "red" | "yellow" | "gray" | "primary" | "accent",
  variant?: "outlined" | "text" | "filled"
) => {
  switch (color) {
    case "green":
      return getGreenClass(variant);
    case "red":
      return getRedClass(variant);
    case "yellow":
      return getYellowClass(variant);
    case "gray":
      return getGrayClass(variant);
    case "primary":
      return getPrimaryClass(variant);
    case "accent":
      return getAccentClass(variant);
    default:
      return getBlueClass(variant);
  }
};

const getPrimaryClass = (variant?: "outlined" | "text" | "filled") => {
  switch (variant) {
    case "filled":
      return "bg-violet-500 hover:bg-violet-600 text-white";
    case "outlined":
      return "border border-violet-500 text-violet-500 hover:border-violet-600 hover:text-violet-600 hover:bg-violet-50 bg-gray-50";
    case "text":
      return "text-violet-500 hover:text-violet-600 hover:bg-violet-50 bg-gray-50";
    default:
      return "bg-violet-500 hover:bg-violet-600 text-white";
  }
};

const getAccentClass = (variant?: "outlined" | "text" | "filled") => {
  switch (variant) {
    case "filled":
      return "bg-orange-500 hover:bg-orange-600 text-white";
    case "outlined":
      return "border border-orange-500 text-orange-500 hover:border-orange-600 hover:text-orange-600 hover:bg-orange-50 bg-gray-50";
    case "text":
      return "text-orange-500 hover:text-orange-600 hover:bg-orange-50 bg-gray-50";
    default:
      return "bg-orange-500 hover:bg-orange-600 text-white";
  }
};

const getGreenClass = (variant?: "outlined" | "text" | "filled") => {
  switch (variant) {
    case "filled":
      return "bg-green-500 hover:bg-green-600 text-white";
    case "outlined":
      return "border border-green-500 text-green-500 hover:border-green-600 hover:text-green-600 hover:bg-green-50 bg-gray-50";
    case "text":
      return "text-green-500 hover:text-green-800 hover:bg-green-50 bg-gray-50";
    default:
      return "bg-green-500 hover:bg-green-600 text-white";
  }
};

const getRedClass = (variant?: "outlined" | "text" | "filled") => {
  switch (variant) {
    case "filled":
      return "bg-red-500 hover:bg-red-600 text-white";
    case "outlined":
      return "border border-red-500 text-red-500 hover:border-red-600 hover:text-red-600 hover:bg-red-50 bg-gray-50";
    case "text":
      return "text-red-500 hover:text-red-800 hover:bg-red-50 bg-gray-50";
    default:
      return "bg-red-500 hover:bg-red-600 text-white";
  }
};

const getYellowClass = (variant?: "outlined" | "text" | "filled") => {
  switch (variant) {
    case "filled":
      return "bg-amber-500 hover:bg-amber-600 text-white";
    case "outlined":
      return "border border-amber-500 text-amber-500 hover:border-amber-600 hover:text-amber-600 hover:bg-amber-50 bg-gray-50";
    case "text":
      return "text-amber-500 hover:text-amber-800 hover:bg-amber-50 bg-gray-50";
    default:
      return "bg-amber-500 hover:bg-amber-600 text-white";
  }
};

const getBlueClass = (variant?: "outlined" | "text" | "filled") => {
  switch (variant) {
    case "filled":
      return "bg-blue-500 hover:bg-blue-600 text-white";
    case "outlined":
      return "border border-blue-500 text-blue-500 hover:border-blue-600 hover:text-blue-600 hover:bg-blue-50 bg-gray-50";
    case "text":
      return "text-blue-500 hover:text-blue-800 hover:bg-blue-50 bg-gray-50";
    default:
      return "bg-blue-500 hover:bg-blue-600 text-white";
  }
};

const getGrayClass = (variant?: "outlined" | "text" | "filled") => {
  switch (variant) {
    case "filled":
      return "bg-gray-400 hover:bg-gray-500 text-white";
    case "outlined":
      return "border border-gray-400 text-gray-400 hover:border-gray-500 hover:text-gray-500 hover:bg-gray-50 bg-gray-50";
    case "text":
      return "text-gray-400 hover:text-gray-500 hover:bg-gray-100 bg-gray-50";
    default:
      return "bg-gray-400 hover:bg-gray-500 text-white";
  }
};

export interface ICommonButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "outlined" | "text" | "filled";
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  loading?: boolean;
  disabled?: boolean;
  color?: "blue" | "green" | "red" | "yellow" | "gray" | "primary" | "accent";
  loadingText?: string;
}

const CommonButton = ({
  children,
  variant = "filled",
  icon,
  iconPosition = "left",
  loading = false,
  disabled = false,
  color = "primary",
  className,
  loadingText,
  ...rest
}: ICommonButtonProps) => {
  return (
    <button
      className={`flex items-center justify-center ${getColorClass(
        color,
        variant
      )} rounded-full ${
        children ? "px-4" : "px-2"
      } py-2 focus:outline-none transition-colors duration-200 ease-in-out ${
        className || ""
      }`}
      disabled={loading || disabled}
      {...rest}
    >
      {!loading && icon && iconPosition === "left" && (
        <span className={`${children ? "mr-2" : "mr-0"}`}>{icon}</span>
      )}
      {loading ? (
        children ? (
          <div className="flex items-center justify-center space-x-2">
            <Loading
              size="w-5 h-5"
              containerSize="w-5 h-5"
              color="text-primary"
            />
            <span>{loadingText || "Loading..."}</span>
          </div>
        ) : (
          <Loading containerSize="h-5 w-5" size="h-5 w-5" />
        )
      ) : (
        children
      )}
      {icon && iconPosition === "right" && (
        <span className={`${children ? "ml-2" : "ml-0"}`}>{icon}</span>
      )}
    </button>
  );
};

export default CommonButton;
