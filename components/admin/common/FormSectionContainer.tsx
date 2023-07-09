import React, { ReactNode } from "react";

interface IFormSectionContainer {
  children: ReactNode;
  className?: string;
}

export default function FormSectionContainer(props: IFormSectionContainer) {
  return (
    <div className={`p-4 border border-gray-200 rounded-md ${props.className}`}>
      <>{props.children}</>
    </div>
  );
}
