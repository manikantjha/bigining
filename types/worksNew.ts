export interface ImageSize {
  url: string;
  width: number;
  height: number;
  path: string;
}

export interface WorkImage {
  original: ImageSize;
  medium: ImageSize;
  small: ImageSize;
}

export interface IWorkNew {
  _id: string;
  name: string;
  description: string;
  images: WorkImage[];
}

export interface IWorkFormDataNew {
  name: string;
  description: string;
  images: WorkImage[];
}
