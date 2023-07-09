import React from "react";

interface IProrgessBarProps {
  percentage: number;
}

export default function ProgressBar(props: IProrgessBarProps) {
  return (
    <div>
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
