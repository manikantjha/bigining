export interface IFigure {
  _id?: string;
  figure: number;
  description: string;
}

export interface IFigures {
  _id?: string;
  figures: Array<IFigure>;
}
