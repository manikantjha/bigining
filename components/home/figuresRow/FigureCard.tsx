import Card from "@/components/common/Card";
import { IRowTheme } from "@/types/row";
import CountUp from "react-countup";

interface IFigrueCard extends IRowTheme {
  objFigrue: {
    figure: string;
    description: string;
  };
}

export default function FigureCard(props: IFigrueCard) {
  return (
    <Card theme={props.theme}>
      <div className="text-center">
        <p className="mb-2 text-5xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primaryDark via-secondaryLight to-accentDark">
          <CountUp end={parseInt(props.objFigrue.figure)} scrollSpyOnce />
          <sup className="text-3xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-primaryDark via-secondaryLight to-accentDark">
            +
          </sup>
        </p>
        <p className="font-medium text-black text-xl md:text-xl mr-4">
          {props.objFigrue.description}
        </p>
      </div>
    </Card>
  );
}
