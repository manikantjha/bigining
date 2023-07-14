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
        props.theme === "dark" ? "bg-bgDark" : "bg-bgLight"
      } ${props.containerWrapperClassName}`}
    >
      {props.title && (
        <Title
          title={props.title}
          description={props.description || ""}
          titleClassName={`${
            props.theme === "dark" ? "text-textLight" : "text-textDark"
          }`}
          descriptionClassName={`${
            props.theme === "dark" ? "text-textLight" : "text-textDark"
          }`}
        />
      )}
      <>{props.children}</>
    </ContainerWrapper>
  );
}
