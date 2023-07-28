export interface IImageSize {
  _id?: string;
  url: string;
  width: number;
  height: number;
  path: string;
}

export interface IWorkImage {
  original: IImageSize;
  medium: IImageSize;
  small: IImageSize;
}

export interface IWork {
  _id: string;
  name: string;
  description: string;
  images: IWorkImage[];
}

export interface IWorkForm {
  name: string;
  description: string;
  images: IWorkImage[];
}
