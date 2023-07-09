import { ReactNode } from "react";

interface IContainerWrapper {
  children: ReactNode;
  containerClassName?: string;
}

export default function ContainerWrapper(props: IContainerWrapper) {
  return (
    <div className={`${props.containerClassName}`}>
      <div className="container mx-auto py-14 md:py-20 px-4 md:px-0">
        <>{props.children}</>
      </div>
    </div>
  );
}
