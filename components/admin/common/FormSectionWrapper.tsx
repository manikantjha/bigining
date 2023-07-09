import { ReactNode } from "react";

interface IFormSectionWrapper {
  children: ReactNode;
}

export default function FormSectionWrapper(props: IFormSectionWrapper) {
  return (
    <div className="mb-8">
      <>{props.children}</>
    </div>
  );
}
