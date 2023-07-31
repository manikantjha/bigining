import { SVGProps } from "react";

type TName =
  | "send"
  | "edit"
  | "delete"
  | "back"
  | "add"
  | "close"
  | "check-circle";

interface IIconProps extends SVGProps<SVGSVGElement> {
  name: TName;
  size?: string;
  className?: string;
}

const icons = new Map<TName, JSX.Element>([
  [
    "send",
    <path
      key="send"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
    />,
  ],
  [
    "edit",
    <path
      key="edit"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
    />,
  ],
  [
    "delete",
    <path
      key="delete"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
    />,
  ],
  [
    "back",
    <path
      key="back"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
    />,
  ],
  [
    "add",
    <path
      key="add"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 4.5v15m7.5-7.5h-15"
    />,
  ],
  [
    "close",
    <path
      key="close"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />,
  ],
  [
    "check-circle",
    <path
      key="check-circle"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />,
  ],
]);

export function GetIcon({
  name,
  size = "w-6 h-6",
  className = "",
  strokeWidth = 1.75,
  ...rest
}: IIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={strokeWidth}
      stroke="currentColor"
      className={`${size} ${className}`}
      {...rest}
    >
      {icons.get(name)}
    </svg>
  );
}
