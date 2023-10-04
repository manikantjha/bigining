import Error, { IErrorProps } from "@/components/common/Error";
import Loading, { ILoadingProps } from "@/components/common/Loading";
import { ReactNode } from "react";
import { UseQueryResult } from "react-query";

interface IRenderAppropriateComponentProps extends ILoadingProps, IErrorProps {
  queryResult: UseQueryResult<any, unknown>;
  loadingComponent?: ReactNode;
  errorComponent?: ReactNode;
  children: ReactNode;
}

export default function RenderAppropriateComponent(
  props: IRenderAppropriateComponentProps
) {
  if (props.queryResult.isLoading) {
    if (props.loadingComponent) {
      return <>{props.loadingComponent}</>;
    }
    return <Loading containerSize={props.containerSize} size={props.size} />;
  }
  if (props.queryResult.isError) {
    if (props.errorComponent) {
      return <>{props.errorComponent}</>;
    }
    return (
      <Error
        errorText={props.errorText}
        containerClassName={props.containerClassName}
      />
    );
  }
  return <>{props.children}</>;
}
