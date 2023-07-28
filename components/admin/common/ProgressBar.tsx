import React from "react";

interface IProrgessBarProps {
  percentage: number;
  containerClassName?: string;
}

export default function ProgressBar(props: IProrgessBarProps) {
  if (props.percentage && props.percentage < 100) return null;
  return (
    <div className={`${props.containerClassName}`}>
      <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="bg-accentDark text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full"
          style={{ width: `${props.percentage}%` }}
        >
          {props.percentage}%
        </div>
      </div>
    </div>
  );
}
