import { IRowTheme } from "@/types/row";
import React, { ReactNode } from "react";

interface ICardProps extends IRowTheme {
  className?: string;
  children: ReactNode;
}

export default function Card(props: ICardProps) {
  return (
    <div
      className={`block p-6 ${
        props.theme === "dark" ? "bg-bgLight" : "bg-bgDarkLight"
      } border border-black rounded-lg shadow-sm-light text-center w-full overflow-hidden ${
        props.className || ""
      }`}
    >
      {props.children}
    </div>
  );
}
