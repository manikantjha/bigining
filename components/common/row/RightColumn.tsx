import { ReactNode } from "react";

export interface IRightColumn {
  renderRightColumn?: () => ReactNode;
  title?: string;
  description?: string;
  onClick?: () => void;
  rightColumnContainerClassName?: string;
}

export default function RightColumn(props: IRightColumn) {
  if (props.renderRightColumn) {
    return <>{props.renderRightColumn()}</>;
  }
  return (
    <div
      className={`flex flex-col justify-center h-full ${
        props.rightColumnContainerClassName
          ? props.rightColumnContainerClassName
          : ""
      }`}
    >
      <h3 className="text-4xl mb-6 font-display uppercase">{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}
