import RowWrapper from "@/components/common/RowWrapper";
import { IFigure } from "@/types/figures";
import { IRowTheme } from "@/types/row";
import FigureCard from "./FigureCard";

interface IFiguresRowProps extends IRowTheme {
  figures: IFigure[];
}

export default function FiguresRow(props: IFiguresRowProps) {
  const data = props.figures || [];
  return (
    <RowWrapper title="Our Journey So Far" theme={props.theme}>
      <div className="grid xs:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
        {data.map((item: any, index: number) => (
          <FigureCard key={index} objFigrue={item} theme={props.theme} />
        ))}
      </div>
    </RowWrapper>
  );
}
