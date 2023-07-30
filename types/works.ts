import { IImage } from "./images";

export interface IWork {
  _id?: string;
  name: string;
  description: string;
  images: IImage[];
}

export interface IWorkForm {
  name: string;
  description: string;
  images: IImage[];
}
