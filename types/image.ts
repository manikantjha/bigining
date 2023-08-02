export interface IImageSize {
  _id?: string;
  url: string;
  width: number;
  height: number;
  path: string;
}

export interface IImage {
  original: IImageSize;
  medium: IImageSize;
  small: IImageSize;
}
