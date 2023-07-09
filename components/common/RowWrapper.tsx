import { ReactNode } from "react";
import ContainerWrapper from "./ContainerWrapper";
import Title from "./Title";

interface IRowWrapperProps {
  theme?: "light" | "dark";
  containerWrapperClassName?: string;
  title?: string;
  description?: string;
  children: ReactNode;
}

export default function RowWrapper(props: IRowWrapperProps) {
  return (
    <ContainerWrapper
      containerClassName={`${
        props.theme === "dark" ? "bg-primaryDark" : "bg-accentLighter"
      } ${props.containerWrapperClassName}`}
    >
      {props.title && (
        <Title
          title={props.title}
          description={props.description || ""}
          titleClassName={`${
            props.theme === "dark" ? "text-accentLighter" : "text-primaryDark"
          }`}
          descriptionClassName={`${
            props.theme === "dark" ? "text-accentLighter" : "text-primaryDark"
          }`}
        />
      )}
      <>{props.children}</>
    </ContainerWrapper>
  );
}
