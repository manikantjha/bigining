import { UseQueryResult } from "react-query";
import FigureCard from "./FigureCard";
import RowWrapper from "@/components/common/RowWrapper";
import { IRowTheme } from "@/types/row";

interface IFiguresRowProps extends IRowTheme {
  figures: UseQueryResult<any, unknown>;
}

export default function FiguresRow(props: IFiguresRowProps) {
  return (
    <RowWrapper title="Our Journey So Far" theme={props.theme}>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
        {props?.figures?.data?.figures
          ? props?.figures?.data?.figures[0]?.figures?.map((item: any) => (
              <FigureCard key={item.id} objFigrue={item} theme={props.theme} />
            ))
          : null}
      </div>
    </RowWrapper>
  );
}
